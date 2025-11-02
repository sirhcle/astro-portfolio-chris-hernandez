/*!
 * Sirhcle Apps - Utility Functions
 * Common utilities for DOM manipulation and validation
 */

export const Utils = {
    /**
     * Safe querySelector with error handling
     */
    $(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return null;
        }
    },

    /**
     * Safe querySelectorAll with error handling
     */
    $$(selector, context = document) {
        try {
            return Array.from(context.querySelectorAll(selector));
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return [];
        }
    },

    /**
     * Check if element is HTML element with proper typing
     */
    isHTMLElement(element) {
        return element instanceof HTMLElement;
    },

    /**
     * Add event listener with error handling
     */
    on(element, event, handler, options = {}) {
        if (!element || typeof handler !== 'function') return;
        
        try {
            element.addEventListener(event, handler, options);
        } catch (error) {
            console.warn(`Failed to add event listener for ${event}`, error);
        }
    },

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Debounce function execution
     */
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    }
};