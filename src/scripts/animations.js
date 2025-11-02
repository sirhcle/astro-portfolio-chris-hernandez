/*!
 * Sirhcle Apps - Scroll Animations
 * Intersection Observer based animations with reduced motion support
 */

import { Utils } from './utils.js';

export class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = null;
        this.animatedElements = new Set();
        
        this.init();
    }

    init() {
        if (this.prefersReducedMotion()) {
            this.handleReducedMotion();
            return;
        }
        
        this.setupScrollAnimations();
    }

    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    handleReducedMotion() {
        // Show all elements immediately without animation
        const animatedElements = Utils.$$('[data-animate]');
        animatedElements.forEach(element => {
            if (Utils.isHTMLElement(element)) {
                element.style.opacity = '1';
                element.style.transform = 'none';
            }
        });
    }

    setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            this.fallbackAnimations();
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => this.handleIntersection(entry));
        }, this.observerOptions);

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            Utils.on(document, 'DOMContentLoaded', () => this.observeElements());
        } else {
            this.observeElements();
        }
    }

    observeElements() {
        const animatedElements = Utils.$$('[data-animate]');
        animatedElements.forEach(element => {
            this.prepareElement(element);
            this.observer?.observe(element);
        });
    }

    prepareElement(element) {
        if (!Utils.isHTMLElement(element)) return;
        
        const animationType = element.getAttribute('data-animate') || 'fade-up';
        const delay = element.getAttribute('data-delay') || '0';
        
        // Set initial state
        element.style.opacity = '0';
        element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
        
        // Set transform based on animation type
        switch (animationType) {
            case 'fade-up':
                element.style.transform = 'translateY(30px)';
                break;
            case 'fade-down':
                element.style.transform = 'translateY(-30px)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(30px)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(-30px)';
                break;
            case 'fade-in':
                element.style.transform = 'scale(0.9)';
                break;
            default:
                element.style.transform = 'translateY(20px)';
        }
    }

    handleIntersection(entry) {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animateElement(entry.target);
            this.animatedElements.add(entry.target);
        }
    }

    animateElement(element) {
        if (!Utils.isHTMLElement(element)) return;
        
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0) scale(1)';
        element.classList.add('animate-in');
        
        // Dispatch animation event
        const event = new CustomEvent('elementAnimated', { 
            detail: { element } 
        });
        document.dispatchEvent(event);
    }

    fallbackAnimations() {
        // Simple fallback for older browsers
        const animatedElements = Utils.$$('[data-animate]');
        animatedElements.forEach(element => {
            if (Utils.isHTMLElement(element)) {
                element.style.opacity = '1';
                element.style.transform = 'none';
            }
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.animatedElements.clear();
    }
}