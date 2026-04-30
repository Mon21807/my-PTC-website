// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('PTC Gallery Page Initializing...');
    
    // Remove preloader
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
    
    // Gallery Data
    const galleryImages = [
        {
            src: 'Images/Image 1.JPG',
            title: 'Conflict Resolution Training',
            description: 'Participants engaged in role-playing exercises during conflict resolution training session',
            category: 'training'
        },
        {
            src: 'Images/Image 2.JPG',
            title: 'Annual Peace Conference',
            description: '2023 Annual Peace Conference participants and speakers gathering',
            category: 'events'
        },
        {
            src: 'Images/Image 3.JPG',
            title: 'Community Dialogue Session',
            description: 'Interfaith dialogue session promoting community harmony and understanding',
            category: 'community'
        },
        {
            src: 'Images/Image 4.JPG',
            title: 'DELPAP Graduation',
            description: 'Celebration ceremony for DELPAP program graduates Batch 2022',
            category: 'training'
        },
        {
            src: 'Images/Image 5.JPG',
            title: 'Leadership Workshop',
            description: 'Youth leadership training workshop session with interactive activities',
            category: 'workshops'
        },
        {
            src: 'Images/Image 6.JPG',
            title: 'Peace Tree Planting',
            description: 'Symbolic tree planting ceremony for peace and environmental protection',
            category: 'community'
        },
        {
            src: 'Images/Annual-Peace.JPG',
            title: 'Annual Peace Training',
            description: 'October peace training sessions with participants from across Nigeria',
            category: 'training'
        },
        {
            src: 'Images/Church Leaders Workshop.JPG',
            title: 'Church Leaders Workshop',
            description: 'Interdenominational workshop for church leaders on peace building',
            category: 'workshops'
        },
        {
            src: 'Images/DELPAP Program.JPG',
            title: 'DELPAP Program Session',
            description: 'Development Education Leadership and Peace Awareness Program',
            category: 'training'
        },
        {
            src: 'Images/PeTCAAN Activities.jpg',
            title: 'PeTCAAN Activities',
            description: 'Peace Training Centre Alumni Association Nigeria activities',
            category: 'events'
        },
        {
            src: 'Images/Community Dialogues.jpg',
            title: 'Community Dialogues',
            description: 'Facilitating inclusive community discussions for conflict resolution',
            category: 'community'
        },
        {
            src: 'Images/Research & Advocacy.JPG',
            title: 'Research & Advocacy',
            description: 'Conducting research and advocacy for peace building policies',
            category: 'events'
        }
    ];
    
    // Gallery Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length && galleryItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button with animation
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.transform = 'translateY(0)';
                });
                this.classList.add('active');
                this.style.transform = 'translateY(-2px)';
                
                // Filter items with animation
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    setTimeout(() => {
                        if (filter === 'all' || category === filter) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }, index * 50);
                });
            });
        });
    }
    
    // Lightbox Functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    const lightbox = document.querySelector('.lightbox-modal');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxCategory = document.querySelector('.lightbox-category');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    
    if (lightbox && viewBtns.length) {
        // Open lightbox when clicking view button
        viewBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentImageIndex = index;
                updateLightbox();
                openLightbox();
            });
        });
        
        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // Close on backdrop click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navigation
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightbox();
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateLightbox();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
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
            if (lightboxCategory) lightboxCategory.textContent = image.category.charAt(0).toUpperCase() + image.category.slice(1);
            
            // Add loading animation
            lightboxImage.style.opacity = '0';
            setTimeout(() => {
                lightboxImage.style.opacity = '1';
            }, 300);
        }
        
        function openLightbox() {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Load More Button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more images
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<span>Load More Photos</span><i class="fas fa-plus"></i>';
                this.disabled = false;
                
                // Show a notification
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.innerHTML = '<i class="fas fa-check-circle"></i> More photos loaded!';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--primary);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: var(--shadow-lg);
                    z-index: 1000;
                    animation: slideInRight 0.3s ease;
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 3000);
            }, 1500);
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
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalIcon = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalIcon;
                    submitBtn.style.background = '';
                    this.reset();
                }, 1500);
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image hover animations
    const galleryImgs = document.querySelectorAll('.gallery-img');
    galleryImgs.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .gallery-item {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
    
    console.log('PTC Gallery Page Initialized Successfully');
});