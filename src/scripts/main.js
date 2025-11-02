/*!
 * Sirhcle Apps - Main Application
 * Orchestrates all modules and handles page initialization
 */

import { Utils } from './utils.js';
import { ThemeManager } from './theme.js';
import { NavigationManager } from './navigation.js';
import { AnimationManager } from './animations.js';
import { FormManager } from './forms.js';
import { ModalManager } from './modal.js';

class SirhclePortfolio {
    constructor() {
        this.managers = new Map();
        this.isInitialized = false;
        
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    Utils.on(document, 'DOMContentLoaded', resolve);
                });
            }

            // Initialize managers
            this.managers.set('theme', new ThemeManager());
            this.managers.set('navigation', new NavigationManager());
            this.managers.set('form', new FormManager());
            this.managers.set('modal', new ModalManager());
            
            // Initialize animations after a short delay
            setTimeout(() => {
                this.managers.set('animation', new AnimationManager());
            }, 1200);

            // Global event listeners
            this.setupGlobalEvents();
            
            this.isInitialized = true;
            
            // Dispatch ready event
            this.dispatchReadyEvent();
            
            console.log('🚀 Sirhcle Apps Portfolio initialized successfully!');
            
        } catch (error) {
            console.error('Failed to initialize portfolio:', error);
        }
    }

    setupGlobalEvents() {
        // Performance monitoring
        if ('performance' in window && performance.getEntriesByType) {
            Utils.on(window, 'load', () => {
                setTimeout(() => this.measurePerformance(), 1000);
            });
        }

        // Error handling
        Utils.on(window, 'error', (e) => this.handleGlobalError(e));
        Utils.on(window, 'unhandledrejection', (e) => this.handleUnhandledRejection(e));
    }

    measurePerformance() {
        try {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            const metrics = {
                domContentLoaded: Math.round(navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0),
                loadComplete: Math.round(navigation?.loadEventEnd - navigation?.loadEventStart || 0),
                firstPaint: Math.round(paint.find(p => p.name === 'first-paint')?.startTime || 0),
                firstContentfulPaint: Math.round(paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0)
            };

            console.log('📊 Performance Metrics:', metrics);
        } catch (error) {
            console.warn('Performance measurement failed:', error);
        }
    }

    handleGlobalError(error) {
        console.error('Global error:', error);
        
        // Track error if analytics available
        if (typeof gtag === 'function') {
            gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
    }

    handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        
        if (typeof gtag === 'function') {
            gtag('event', 'exception', {
                description: `Unhandled Promise: ${event.reason}`,
                fatal: false
            });
        }
    }

    dispatchReadyEvent() {
        const event = new CustomEvent('sirhcleready', {
            detail: {
                version: '1.0.0',
                timestamp: Date.now(),
                managers: Array.from(this.managers.keys())
            }
        });
        document.dispatchEvent(event);
    }

    // Public API
    getManager(name) {
        return this.managers.get(name);
    }

    isReady() {
        return this.isInitialized;
    }
}

// Initialize application
new SirhclePortfolio();

// Export for debugging
window.SirhclePortfolio = SirhclePortfolio;