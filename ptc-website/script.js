// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PTC Website Initializing...');
    
    // Remove preloader after 2 seconds
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

    // Smooth scrolling for anchor links
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

    // Animated counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Gallery filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length && galleryItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Lightbox functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    const lightbox = document.querySelector('.lightbox-modal');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    
    if (lightbox && viewBtns.length) {
        // Gallery images data
        const galleryImages = [
            {
                src: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b5d70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
                title: 'Conflict Resolution Training',
                description: 'Participants engaged in role-playing exercises during a conflict resolution training session.'
            },
            {
                src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
                title: 'Annual Peace Conference',
                description: '2023 Annual Peace Conference participants and speakers.'
            },
            {
                src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
                title: 'Community Dialogue Session',
                description: 'Interfaith dialogue session promoting community harmony.'
            },
            {
                src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
                title: 'DELPAP Graduation',
                description: 'Celebration ceremony for DELPAP program graduates.'
            },
            {
                src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
                title: 'Leadership Workshop',
                description: 'Youth leadership training workshop session.'
            },
            {
                src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
                title: 'Peace Tree Planting',
                description: 'Symbolic tree planting ceremony for peace.'
            }
        ];
        
        let currentImageIndex = 0;
        
        viewBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentImageIndex = index;
                updateLightbox();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateLightbox();
            }
        });
        
        function updateLightbox() {
            const image = galleryImages[currentImageIndex];
            if (lightboxImage) lightboxImage.src = image.src;
            if (lightboxTitle) lightboxTitle.textContent = image.title;
            if (lightboxDescription) lightboxDescription.textContent = image.description;
        }
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            contactForm.reset();
            
            // Show success message
            if (formSuccess) {
                formSuccess.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }

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

    // Navigation active state on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.id;
            }
        });
        
        // Update desktop nav
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Update mobile nav
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // Add hover effects for cards
    const cards = document.querySelectorAll('.about-card, .identity-card, .value-card, .activity-card, .course-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

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

    // ===== BOARD MEETINGS SLIDER (MOVED INSIDE) =====
    const boardSlides = document.querySelectorAll('.board-slide');
    const boardPrevBtn = document.querySelector('.board-slider-prev');
    const boardNextBtn = document.querySelector('.board-slider-next');
    const boardDots = document.querySelectorAll('.board-dot');
    let currentBoardSlide = 0;
    let boardInterval;

    console.log('Board Slides found:', boardSlides.length); // Debug log

    function showBoardSlide(index) {
        if (!boardSlides.length) return;
        
        boardSlides.forEach(slide => slide.classList.remove('active'));
        boardDots.forEach(dot => dot.classList.remove('active'));
        
        currentBoardSlide = (index + boardSlides.length) % boardSlides.length;
        
        boardSlides[currentBoardSlide].classList.add('active');
        if (boardDots[currentBoardSlide]) {
            boardDots[currentBoardSlide].classList.add('active');
        }
    }

    function nextBoardSlide() {
        showBoardSlide(currentBoardSlide + 1);
        resetBoardInterval();
    }

    function prevBoardSlide() {
        showBoardSlide(currentBoardSlide - 1);
        resetBoardInterval();
    }

    function resetBoardInterval() {
        if (boardInterval) clearInterval(boardInterval);
        boardInterval = setInterval(nextBoardSlide, 5000);
    }

    if (boardPrevBtn && boardNextBtn && boardSlides.length) {
        boardPrevBtn.addEventListener('click', prevBoardSlide);
        boardNextBtn.addEventListener('click', nextBoardSlide);
        
        boardDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showBoardSlide(index);
                resetBoardInterval();
            });
        });
        
        // Start auto-slide
        boardInterval = setInterval(nextBoardSlide, 5000);
        
        // Pause on hover
        const sliderContainer = document.querySelector('.board-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                if (boardInterval) clearInterval(boardInterval);
            });
            sliderContainer.addEventListener('mouseleave', () => {
                boardInterval = setInterval(nextBoardSlide, 5000);
            });
        }
    }

    console.log('PTC Website Initialized Successfully');
});