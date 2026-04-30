        // About Page Specific JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            console.log('PTC About Page Initializing...');
            
            // Remove preloader
            setTimeout(() => {
                document.querySelector('.preloader').style.opacity = '0';
                document.querySelector('.preloader').style.visibility = 'hidden';
                setTimeout(() => {
                    document.querySelector('.preloader').style.display = 'none';
                }, 500);
            }, 2000);
            
            // Mobile Menu Toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('fa-bars');
                        icon.classList.toggle('fa-times');
                    }
                });
                
                // Close mobile menu when clicking links
                document.querySelectorAll('.mobile-nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.remove('active');
                        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    });
                });
            }
            
            // Achievement Counter Animation
            function animateAchievementCounters() {
                const counters = document.querySelectorAll('.achievement-number');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                });
            }
            
            // Start counters when in view
            const achievementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateAchievementCounters();
                        achievementObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            const achievementSection = document.querySelector('.achievement-section');
            if (achievementSection) {
                achievementObserver.observe(achievementSection);
            }
            
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Back to top button
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
            
            // Newsletter form
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;
                    
                    if (email) {
                        alert('Thank you for subscribing to our newsletter!');
                        this.reset();
                    }
                });
            }
            
            // Card hover effects
            const cards = document.querySelectorAll('.mv-card, .timeline-content, .team-card, .partner-logo');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                });
            });
            
            // Parallax effect for hero shapes
            document.addEventListener('mousemove', (e) => {
                const shapes = document.querySelectorAll('.shape');
                
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.5;
                    const x = (window.innerWidth - e.pageX * speed) / 100;
                    const y = (window.innerHeight - e.pageY * speed) / 100;
                    
                    shape.style.transform = `translateX(${x}px) translateY(${y}px) translateY(-1000px) rotate(${index * 72}deg)`;
                });
            });
            
            console.log('PTC About Page Initialized Successfully');
        });