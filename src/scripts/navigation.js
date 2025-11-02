/*!
 * Sirhcle Apps - Navigation Management
 * Mobile menu, smooth scrolling, and navigation states
 */

import { Utils } from './utils.js';

export class NavigationManager {
    constructor() {
        this.navToggle = Utils.$('#navToggle');
        this.navMenu = Utils.$('#navMenu');
        this.navLinks = Utils.$$('.nav-link');
        this.backToTop = Utils.$('#backToTop');
        
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupSmoothScrolling();
        this.setupBackToTop();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle) {
            Utils.on(this.navToggle, 'click', () => this.toggleMobileMenu());
        }

        // Navigation links
        this.navLinks.forEach(link => {
            Utils.on(link, 'click', (e) => this.handleNavClick(e, link));
        });

        // Close menu on outside click
        Utils.on(document, 'click', (e) => this.handleOutsideClick(e));

        // Close menu on escape key
        Utils.on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
                this.navToggle?.focus();
            }
        });
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        if (!this.navMenu || !this.navToggle) return;
        
        this.isMenuOpen = true;
        this.navMenu.classList.add('active');
        this.navToggle.classList.add('active');
        this.navToggle.setAttribute('aria-expanded', 'true');
    }

    closeMobileMenu() {
        if (!this.navMenu || !this.navToggle) return;
        
        this.isMenuOpen = false;
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
    }

    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        
        if (href?.startsWith('#')) {
            e.preventDefault();
            this.scrollToSection(href);
            
            if (this.isMenuOpen) {
                this.closeMobileMenu();
            }
        }
    }

    scrollToSection(sectionId) {
        const targetSection = Utils.$(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Update URL without triggering scroll
            if (history.pushState) {
                history.pushState(null, null, sectionId);
            }
        }
    }

    handleOutsideClick(e) {
        if (!this.isMenuOpen) return;
        
        const navbar = Utils.$('.navbar');
        const isClickInsideNav = navbar?.contains(e.target);
        if (!isClickInsideNav) {
            this.closeMobileMenu();
        }
    }

    setupSmoothScrolling() {
        const smoothScrollLinks = Utils.$$('a[href^="#"]:not(.nav-link)');
        
        smoothScrollLinks.forEach(link => {
            Utils.on(link, 'click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });
    }

    setupBackToTop() {
        if (!this.backToTop) return;

        const toggleButton = Utils.debounce(() => {
            const shouldShow = window.pageYOffset > 300;
            
            if (Utils.isHTMLElement(this.backToTop)) {
                if (shouldShow) {
                    this.backToTop.style.display = 'flex';
                    this.backToTop.setAttribute('aria-hidden', 'false');
                } else {
                    this.backToTop.style.display = 'none';
                    this.backToTop.setAttribute('aria-hidden', 'true');
                }
            }
        }, 100);

        Utils.on(window, 'scroll', toggleButton);

        Utils.on(this.backToTop, 'click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}