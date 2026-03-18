/* Saikala Medicals - Custom JS */

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Sticky Navbar Logic
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.querySelector('#scrollTop');

window.addEventListener('scroll', () => {
    // Add shadow and reduce padding on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'shadow-lg');
        navbar.classList.remove('py-3');
    } else {
        navbar.classList.remove('py-2', 'shadow-lg');
        navbar.classList.add('py-3');
    }

    // Show/Hide Scroll to Top Button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('d-none');
        scrollTopBtn.classList.add('animate-slide-up');
    } else {
        scrollTopBtn.classList.add('d-none');
    }
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Scroll to Top Functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// WhatsApp Integration
function openWhatsApp() {
    const phoneNumber = "919876543210"; // Replace with actual business number
    const message = encodeURIComponent("Hello Saikala Medicals, I would like to enquire about some medicines.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Add simple form submission simulation
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = subscribeForm.querySelector('input');
        const btn = subscribeForm.querySelector('button');
        
        if (emailInput.value) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.classList.replace('btn-primary', 'btn-success');
                emailInput.value = '';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-success', 'btn-primary');
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        }
    });
}

// Product Filtering Logic
const productTabs = document.querySelectorAll('.product-tabs .nav-link');
const productItems = document.querySelectorAll('.product-item');

productTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        productTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');

        const filter = this.textContent.toLowerCase().trim();

        productItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
                item.classList.add('animate-scale-up');
            } else {
                const category = filter.replace(' ', '-');
                if (item.classList.contains(category)) {
                    item.style.display = 'block';
                    item.classList.add('animate-scale-up');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate-scale-up');
                }
            }
        });
        
        // Re-refresh AOS to handle visibility changes
        AOS.refresh();
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
