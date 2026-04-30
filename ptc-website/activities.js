// Activities Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('PTC Activities Page Initializing...');
    
    // 1. PRELOADER REMOVAL
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 2000);
    
    // 2. HAMBURGER MENU FIX
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    function toggleMobileMenu() {
        if (mobileMenu.classList.contains('active')) {
            // Close menu
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Change icon to bars
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        } else {
            // Open menu
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Change icon to times
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
    }
    
    // Hamburger button click
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !hamburgerBtn.contains(e.target)) {
                toggleMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }
    
    // 3. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just # or #!
            if (href === '#' || href === '#!') return;
            
            // Check if it's an internal anchor link
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 4. BACK TO TOP BUTTON
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
    
    // 5. NEWSLETTER FORM
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }
    
    // 6. CARD HOVER EFFECTS
    const cards = document.querySelectorAll('.activity-card, .impact-stat, .timeline-content');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
    
    // 7. SCROLL ANIMATIONS
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('animated');
                }, parseInt(delay));
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // 8. ANIMATED COUNTERS
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 1500;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Start counters when in view
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const impactSection = document.querySelector('.impact-stats-section');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
    
    // 9. TESTIMONIALS SLIDER
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlideInterval();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlideInterval();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSlideInterval();
            });
        });
        
        // Auto slide testimonials
        slideInterval = setInterval(nextSlide, 4000);
        
        function resetSlideInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4000);
        }
    }
    
    // 10. TAG ANIMATIONS
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 11. BUBBLE ANIMATIONS
    function createDynamicBubbles() {
        const heroShapes = document.querySelector('.hero-shapes');
        if (!heroShapes) return;
        
        // Add dynamic bubbles
        for (let i = 0; i < 3; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'shape dynamic-bubble';
            
            // Random properties
            const size = Math.random() * 80 + 40;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.top = `110%`;
            bubble.style.opacity = Math.random() * 0.15 + 0.05;
            
            // Gradient background
            const hue = Math.random() * 60 + 200;
            bubble.style.background = `radial-gradient(circle, 
                hsla(${hue}, 80%, 70%, ${Math.random() * 0.2 + 0.1}),
                hsla(${hue + 20}, 80%, 50%, ${Math.random() * 0.1 + 0.05})
            )`;
            
            // Fast animation
            const duration = Math.random() * 4 + 3;
            bubble.style.animation = `floatUltraFast ${duration}s linear forwards`;
            
            heroShapes.appendChild(bubble);
            
            // Remove bubble after animation completes
            setTimeout(() => {
                if (bubble.parentNode === heroShapes) {
                    bubble.remove();
                }
            }, duration * 1000);
        }
    }
    
    // Create dynamic bubbles
    setInterval(createDynamicBubbles, 2000);
    setTimeout(createDynamicBubbles, 1000);
    
    console.log('PTC Activities Page Initialized Successfully');
});