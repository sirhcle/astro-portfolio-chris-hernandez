/*!
 * Modal Manager
 * Handles modal functionality including open, close, and accessibility
 */

export class ModalManager {
    constructor() {
        this.activeModal = null;
        this.lastFocusedElement = null;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.init();
            });
        } else {
            this.init();
        }
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardNavigation();
    }

    setupEventListeners() {
        // Modal triggers - use a more specific approach
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetId = trigger.getAttribute('data-modal-target');
                this.openModal(targetId);
            });
        });

        // Close buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-close') || e.target.closest('.modal-close')) {
                e.preventDefault();
                this.closeModal();
            }
        });

        // Overlay clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-overlay')) {
                this.closeModal();
            }
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.activeModal) return;

            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    this.closeModal();
                    break;
                case 'Tab':
                    this.trapFocus(e);
                    break;
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.warn(`Modal with ID "${modalId}" not found`);
            return;
        }

        // Store current focus
        this.lastFocusedElement = document.activeElement;

        // Prevent body scroll only if modal opens successfully
        document.body.style.overflow = 'hidden';

        // Show modal
        modal.classList.add('active');
        this.activeModal = modal;

        // Focus first focusable element
        setTimeout(() => {
            const firstFocusable = this.getFocusableElements(modal)[0];
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);

        // Announce to screen readers
        modal.setAttribute('aria-hidden', 'false');
    }

    closeModal() {
        if (!this.activeModal) return;

        const modal = this.activeModal;
        const modalId = modal.id;

        // Hide modal
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        // Restore body scroll
        document.body.style.overflow = '';

        // Restore focus
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
        }

        // Clear active modal
        this.activeModal = null;
        this.lastFocusedElement = null;
    }

    trapFocus(e) {
        if (!this.activeModal) return;

        const focusableElements = this.getFocusableElements(this.activeModal);
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    getFocusableElements(container) {
        const focusableSelectors = [
            'button',
            '[href]',
            'input',
            'select',
            'textarea',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',');

        return Array.from(container.querySelectorAll(focusableSelectors))
            .filter(el => !el.disabled && !el.getAttribute('aria-hidden'));
    }

    // Public API
    isModalOpen() {
        return this.activeModal !== null;
    }

    getCurrentModal() {
        return this.activeModal;
    }
}