export class State {
    constructor() {
        this.state = {
            currentModule: null,
            currentView: 'dashboard',
            theme: 'light',
            pins: [],
            recent: [],
            preferences: {}
        };
        this.loadFromStorage();
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        this.state[key] = value;
        this.saveToStorage();
    }

    getPins() {
        return this.state.pins || [];
    }

    addPin(moduleId, title, icon) {
        const pins = this.getPins();
        if (!pins.find(p => p.id === moduleId)) {
            pins.push({ id: moduleId, title, icon });
            this.set('pins', pins);
        }
    }

    removePin(moduleId) {
        const pins = this.getPins().filter(p => p.id !== moduleId);
        this.set('pins', pins);
    }

    isPinned(moduleId) {
        return this.getPins().some(p => p.id === moduleId);
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('gst-state');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
            }
        } catch (e) {
            console.warn('Failed to load state from storage');
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('gst-state', JSON.stringify(this.state));
        } catch (e) {
            console.warn('Failed to save state to storage');
        }
    }
}
