// common.js - FIX FOR ALL PAGES
console.log("🔄 Loading common.js for hamburger fix");

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM Loaded on page: " + document.title);
    
    // ========== HAMBURGER FIX ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        console.log("✅ Found hamburger elements");
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            console.log("🍔 Hamburger clicked!");
            mobileMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    document.body.style.overflow = 'hidden';
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                console.log("📱 Mobile link clicked, closing menu");
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        });
    } else {
        console.log("❌ Could not find hamburger elements!");
        console.log("Mobile Menu Button:", mobileMenuBtn);
        console.log("Mobile Menu:", mobileMenu);
    }
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
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
    
    // ========== PRELOADER ==========
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }
    
    console.log("✅ Common.js loaded successfully!");
});