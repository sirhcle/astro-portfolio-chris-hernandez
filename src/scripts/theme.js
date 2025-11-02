/*!
 * Sirhcle Apps - Theme Management
 * Dark/Light theme toggle with localStorage persistence
 */

import { Utils } from './utils.js';

export class ThemeManager {
    constructor() {
        this.storageKey = 'sirhcle-theme';
        this.themeButton = Utils.$('#theme-switcher');
        this.savedTheme = this.getStoredTheme() || 'dark';
        
        this.init();
    }

    init() {
        this.applyTheme(this.savedTheme);
        this.bindEvents();
    }

    getStoredTheme() {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (error) {
            console.warn('LocalStorage not available for theme storage', error);
            return null;
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeColor(theme);
        this.updateButtonState();
    }

    updateThemeColor(theme) {
        const themeColorMeta = Utils.$('meta[name="theme-color"]');
        if (themeColorMeta) {
            const color = theme === 'dark' ? '#64ffda' : '#0066cc';
            themeColorMeta.setAttribute('content', color);
        }
    }

    updateButtonState() {
        if (!this.themeButton) return;
        
        const isDark = this.getCurrentTheme() === 'dark';
        this.themeButton.setAttribute('aria-pressed', isDark.toString());
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    toggleTheme() {
        const current = this.getCurrentTheme();
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        this.applyTheme(newTheme);
        this.storeTheme(newTheme);
        this.addToggleAnimation();
    }

    storeTheme(theme) {
        try {
            localStorage.setItem(this.storageKey, theme);
        } catch (error) {
            console.warn('Failed to store theme preference', error);
        }
    }

    addToggleAnimation() {
        if (!this.themeButton || !Utils.isHTMLElement(this.themeButton)) return;
        
        this.themeButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            if (Utils.isHTMLElement(this.themeButton)) {
                this.themeButton.style.transform = '';
            }
        }, 150);
    }

    bindEvents() {
        if (this.themeButton) {
            Utils.on(this.themeButton, 'click', () => this.toggleTheme());
        }
    }
}