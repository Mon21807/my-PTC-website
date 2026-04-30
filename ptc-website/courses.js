// Courses Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('PTC Courses Page Initializing...');
    
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
    
    // 2. ANIMATE ELEMENTS ON SCROLL
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, parseInt(delay));
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // 3. ENHANCED CARD HOVER EFFECTS FOR ALL WEEKS
    const enhancedCards = document.querySelectorAll('.enhanced-card, .topic-category, .method-card');
    enhancedCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // Add subtle scale effect for single card weeks
            if (card.closest('.week-courses:has(.course-card:only-child)')) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('hovered')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
                
                // Reset scale for single card weeks
                if (card.closest('.week-courses:has(.course-card:only-child)')) {
                    card.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    });
    
    // 4. WEEK NUMBER ANIMATIONS
    const weekNumbers = document.querySelectorAll('.week-number, .phase-number');
    weekNumbers.forEach((number, index) => {
        // Add hover effect
        number.addEventListener('mouseenter', () => {
            number.style.transform = 'scale(1.1) rotate(5deg)';
            number.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        });
        
        number.addEventListener('mouseleave', () => {
            number.style.transform = 'scale(1) rotate(0deg)';
            number.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        // Add subtle pulse for all week numbers
        if (number.classList.contains('week-number')) {
            number.style.animation = 'subtlePulse 3s infinite';
        }
    });
    
    // Add pulse animation for week numbers
    const style = document.createElement('style');
    style.textContent = `
        @keyframes subtlePulse {
            0%, 100% {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            50% {
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 5. COURSE BADGE ANIMATIONS
    const courseBadges = document.querySelectorAll('.course-badge');
    courseBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateX(-50%) scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateX(-50%) scale(1)';
        });
    });
    
    // 6. SMOOTH SCROLLING FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 7. BACK TO TOP BUTTON
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
    
    // 8. NEWSLETTER FORM
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our training updates!');
                this.reset();
            }
        });
    }
    
    // 9. PHASE CARD ANIMATIONS
    const phaseCards = document.querySelectorAll('.phase-card');
    phaseCards.forEach(card => {
        const number = card.querySelector('.phase-number');
        if (number) {
            card.addEventListener('mouseenter', () => {
                number.style.transform = 'scale(1.1) rotate(5deg)';
                number.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                number.style.transform = 'scale(1) rotate(0deg)';
                number.style.boxShadow = '0 5px 15px rgba(26, 86, 219, 0.3)';
            });
        }
    });
    
    // 10. INITIALIZE ALL ELEMENTS WITH INITIAL STATES
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // 11. HIGHLIGHT CURRENT WEEK ON HOVER
    const weekContainers = document.querySelectorAll('.enhanced-week');
    weekContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            const weekNumber = container.querySelector('.week-number');
            if (weekNumber) {
                weekNumber.style.transform = 'scale(1.15)';
            }
        });
        
        container.addEventListener('mouseleave', () => {
            const weekNumber = container.querySelector('.week-number');
            if (weekNumber) {
                weekNumber.style.transform = 'scale(1)';
            }
        });
    });
    
    console.log('PTC Courses Page Initialized Successfully');
});