// Navigation Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Testimonial Slider
const testimonialSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.testimonial-card'),
    dots: document.querySelectorAll('.dot'),
    prevBtn: document.querySelector('.prev-btn'),
    nextBtn: document.querySelector('.next-btn'),
    
    init: function() {
        // Hide all slides except the first one
        this.hideAllSlides();
        this.slides[0].style.display = 'block';
        this.dots[0].classList.add('active');
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add event listeners to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start auto sliding
        this.startAutoSlide();
    },
    
    hideAllSlides: function() {
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
    },
    
    prevSlide: function() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.updateSlider();
    },
    
    nextSlide: function() {
        this.currentSlide++;
        if (this.currentSlide >= this.slides.length) {
            this.currentSlide = 0;
        }
        this.updateSlider();
    },
    
    goToSlide: function(index) {
        this.currentSlide = index;
        this.updateSlider();
    },
    
    updateSlider: function() {
        this.hideAllSlides();
        this.slides[this.currentSlide].style.display = 'block';
        this.dots[this.currentSlide].classList.add('active');
        this.resetAutoSlide();
    },
    
    startAutoSlide: function() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    },
    
    resetAutoSlide: function() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
};

// Initialize testimonial slider
if (document.querySelector('.testimonial-slider')) {
    testimonialSlider.init();
}

// Intersection Observer for scroll animations
const animateElements = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    observer.observe(element);
    
    // Set initial animation delay based on data attribute
    const delay = element.getAttribute('data-aos-delay');
    if (delay) {
        element.style.transitionDelay = `${delay}ms`;
    }
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add entry animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('aos-animate');
    }
});

// Hover effect for feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.1)';
        icon.style.boxShadow = '0 0 25px var(--neon-blue)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'scale(1)';
        icon.style.boxShadow = '0 0 15px var(--neon-blue-glow)';
    });
});

// Preload images
function preloadImages() {
    const productImage = new Image();
    productImage.src = '../images/swiftcharge-product.png';
    
    const detailImage = new Image();
    detailImage.src = '../images/swiftcharge-detail.png';
}

// Call preload function
window.addEventListener('load', preloadImages);

// Language switching functionality
let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update active state of language buttons
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[lang], key);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((p, c) => p && p[c], obj);
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    setLanguage('en');
    
    // Add click handlers to language switcher buttons
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });
    
    // ... existing DOMContentLoaded code ...
}); 