/*!
 * Sirhcle Apps - Form Management
 * Form validation and submission handling
 */

import { Utils } from './utils.js';

export class FormManager {
    constructor() {
        this.contactForm = Utils.$('#contactForm');
        this.submitButton = Utils.$('#submitBtn');
        this.statusElement = Utils.$('#submit-status');
        
        this.isSubmitting = false;
        
        this.init();
    }

    init() {
        if (!this.contactForm) return;
        
        // Deshabilitar validación nativa del navegador
        if (this.contactForm instanceof HTMLFormElement) {
            this.contactForm.setAttribute('novalidate', 'true');
        }
        
        this.bindEvents();
        this.setupRealTimeValidation();
        this.setupSelectTracking();
    }

    bindEvents() {
        if (this.contactForm instanceof HTMLFormElement) {
            Utils.on(this.contactForm, 'submit', (e) => this.handleSubmit(e));
        }
    }

    setupRealTimeValidation() {
        const characterCount = Utils.$('#project');
        if (characterCount instanceof HTMLTextAreaElement) {
            Utils.on(characterCount, 'input', () => {
                const current = characterCount.value.length;
                const max = parseInt(characterCount.getAttribute('maxlength') || '1000');
                const hint = characterCount.parentElement?.querySelector('.form-hint');
                
                if (hint && Utils.isHTMLElement(hint)) {
                    hint.textContent = `${current}/${max} caracteres`;
                    
                    if (current > max * 0.9) {
                        hint.style.color = 'var(--accent-warning)';
                    } else {
                        hint.style.color = '';
                    }
                }
            });
        }
    }

    setupSelectTracking() {
        // Marcar todos los selects como "pristine" al inicio
        const selects = this.contactForm?.querySelectorAll('select');
        selects?.forEach(select => {
            if (select instanceof HTMLSelectElement) {
                select.setAttribute('data-pristine', 'true');
                
                // Remover el atributo cuando el usuario interactúe
                Utils.on(select, 'change', () => {
                    select.removeAttribute('data-pristine');
                });
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting || !(this.contactForm instanceof HTMLFormElement)) return;
        
        // Marcar formulario como enviado para activar validación visual
        this.contactForm.classList.add('submitted');
        
        // Basic validation
        const nameInput = this.contactForm.querySelector('#name');
        const emailInput = this.contactForm.querySelector('#email');
        const projectTypeInput = this.contactForm.querySelector('#project-type');
        const projectInput = this.contactForm.querySelector('#project');
        const privacyInput = this.contactForm.querySelector('#privacy');
        
        const name = nameInput instanceof HTMLInputElement ? nameInput.value : '';
        const email = emailInput instanceof HTMLInputElement ? emailInput.value : '';
        const projectType = projectTypeInput instanceof HTMLSelectElement ? projectTypeInput.value : '';
        const project = projectInput instanceof HTMLTextAreaElement ? projectInput.value : '';
        const privacy = privacyInput instanceof HTMLInputElement ? privacyInput.checked : false;
        
        if (!this.validateForm(name, email, projectType, project, privacy)) {
            return;
        }
        
        this.submitForm(name, email, project);
    }

    validateForm(name, email, projectType, project, privacy) {
        if (!name.trim()) {
            //this.showError('Por favor, ingresa tu nombre.');
            return false;
        }
        
        if (!Utils.isValidEmail(email)) {
            //this.showError('Por favor, ingresa un email válido.');
            return false;
        }
        
        if (!projectType) {
            //this.showError('Por favor, selecciona un tipo de proyecto.');
            return false;
        }
        
        if (project.trim().length < 10) {
            //this.showError('Por favor, describe tu proyecto con más detalle (mínimo 10 caracteres).');
            return false;
        }
        
        if (!privacy) {
            this.showError('Debes aceptar la política de privacidad para continuar.');
            return false;
        }
        
        return true;
    }

    showError(message) {
        alert(message); // Temporal, puedes mejorarlo con un modal o toast
    }

    submitForm(name, email, project) {
        this.isSubmitting = true;
        this.setSubmitState(true);
        
        // Simulate form submission (replace with your actual endpoint)
        setTimeout(() => {
            this.handleSubmitSuccess();
        }, 2000);
    }

    setSubmitState(isSubmitting) {
        if (!(this.submitButton instanceof HTMLButtonElement)) return;

        if (isSubmitting) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'Enviando...';
            this.submitButton.setAttribute('aria-busy', 'true');
        } else {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Enviar Propuesta';
            this.submitButton.setAttribute('aria-busy', 'false');
        }
    }

    handleSubmitSuccess() {
        if (this.statusElement && Utils.isHTMLElement(this.statusElement)) {
            this.statusElement.className = 'form-status success';
            this.statusElement.textContent = '¡Gracias! Te contactaré pronto 🚀';
            this.statusElement.style.display = 'block';
        }
        
        if (this.contactForm instanceof HTMLFormElement) {
            this.contactForm.reset();
            // Limpiar clase de validación visual
            this.contactForm.classList.remove('submitted');
        }
        
        this.isSubmitting = false;
        this.setSubmitState(false);
        
        // Track success event
        this.trackEvent('form_submit', 'contact', 'success');
    }

    trackEvent(action, category, label) {
        // Analytics tracking (Google Analytics 4 example)
        if (typeof gtag === 'function') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                custom_parameter: 'sirhcle_portfolio'
            });
        }
    }
}