export class Modal {
    constructor() {
        this.container = document.getElementById('modalContainer');
        this.isOpen = false;
        this.setupContainer();
    }

    setupContainer() {
        this.container.innerHTML = `
            <div class="modal-overlay" id="modalOverlay">
                <div class="modal-box">
                    <div class="modal-header">
                        <h3 id="modalTitle">Modal Title</h3>
                        <button class="modal-close-btn" id="modalCloseBtn">✕</button>
                    </div>
                    <div class="modal-body" id="modalBody">
                        Modal content
                    </div>
                    <div class="modal-footer" id="modalFooter">
                        <button class="btn btn-secondary" id="modalCancelBtn">Close</button>
                    </div>
                </div>
            </div>
        `;

        // Event listeners
        document.getElementById('modalCloseBtn').addEventListener('click', () => this.close());
        document.getElementById('modalCancelBtn').addEventListener('click', () => this.close());
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.close();
        });

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    show(title, content, footer = null) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        
        if (footer) {
            document.getElementById('modalFooter').innerHTML = footer;
        } else {
            document.getElementById('modalFooter').innerHTML = `
                <button class="btn btn-secondary" id="modalCancelBtn">Close</button>
            `;
            document.getElementById('modalCancelBtn').addEventListener('click', () => this.close());
        }

        document.getElementById('modalOverlay').classList.add('open');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    close() {
        document.getElementById('modalOverlay').classList.remove('open');
        this.isOpen = false;
        document.body.style.overflow = '';
    }

    isOpen() {
        return this.isOpen;
    }
}
