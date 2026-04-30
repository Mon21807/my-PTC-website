/**
 * PTC Contact Page JavaScript - Full Complete Version
 * Includes: Preloader, Mobile Menu, Contact Form, FAQ, Newsletter, and UI Effects
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('PTC Contact Page Initializing...');
    
    // ==========================================
    // 1. PRELOADER
    // ==========================================
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
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
        
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn.querySelector('i')) {
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
    
    // ==========================================
    // 3. FIXED WORKING CONTACT FORM
    // ==========================================
    const quickForm = document.getElementById('quickContactForm');
    const statusDiv = document.getElementById('form-status');
    
    if (quickForm) {
        quickForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submission started...');
            
            const formData = new FormData(quickForm);
            
            // Show sending status
            if (statusDiv) {
                statusDiv.style.display = 'block';
                statusDiv.style.backgroundColor = '#e3f2fd';
                statusDiv.style.color = '#1a56db';
                statusDiv.innerHTML = '📧 Sending your message... Please wait.';
            }

            try {
                // Change URL if necessary to match your folder structure
                const response = await fetch('http://localhost/ptc-website/mail.php', {
                    method: 'POST',
                    body: formData
                });
                
                // We get the raw text first to avoid JSON parsing errors if PHP crashes
                const responseText = await response.text();
                console.log('Server Raw Response:', responseText);
                
                let result;
                try {
                    result = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('JSON Parse Error:', parseError);
                    throw new Error('Server returned an invalid response. The email might have sent, but the response was broken.');
                }
                
                if (result.success === true) {
                    // SUCCESS
                    if (statusDiv) {
                        statusDiv.style.backgroundColor = '#d4edda';
                        statusDiv.style.color = '#155724';
                        statusDiv.innerHTML = '✅ ' + result.message;
                    }
                    quickForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        if (statusDiv) statusDiv.style.display = 'none';
                    }, 5000);
                } else {
                    // SERVER-SIDE ERROR (e.g., PHPMailer failed)
                    if (statusDiv) {
                        statusDiv.style.backgroundColor = '#f8d7da';
                        statusDiv.style.color = '#721c24';
                        statusDiv.innerHTML = '❌ ' + (result.message || 'Something went wrong.');
                    }
                }
            } catch (error) {
                // NETWORK ERROR OR JS CRASH
                console.error('Submit Error:', error);
                if (statusDiv) {
                    statusDiv.style.backgroundColor = '#f8d7da';
                    statusDiv.style.color = '#721c24';
                    statusDiv.innerHTML = '❌ Error: ' + error.message;
                }
            }
        });
    }
    
    // ==========================================
    // 4. FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });
    
    // ==========================================
    // 5. BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
    
    // ==========================================
    // 6. NEWSLETTER FORM
    // ==========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalContent = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }
        });
    }
    
    // ==========================================
    // 7. CARD HOVER EFFECTS
    // ==========================================
    const cards = document.querySelectorAll('.mv-card, .department-card, .contact-method-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    console.log('PTC Contact Page Fully Initialized.');
});