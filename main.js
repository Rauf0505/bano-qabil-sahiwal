// ==========================================
// BANO QABIL - NAVBAR FUNCTIONALITY
// ==========================================

// ==========================================
// HAMBURGER MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open on mobile
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// ==========================================
// MOBILE DROPDOWN TOGGLE
// ==========================================
const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');

mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const arrow = btn.querySelector('span');
        
        // Close other dropdowns
        mobileDropdownBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                const otherContent = otherBtn.nextElementSibling;
                const otherArrow = otherBtn.querySelector('span');
                
                if (otherContent) {
                    otherContent.classList.add('hidden');
                }
                if (otherArrow) {
                    otherArrow.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Toggle current dropdown
        if (content) {
            content.classList.toggle('hidden');
        }
        
        // Rotate arrow
        if (arrow) {
            if (content && content.classList.contains('hidden')) {
                arrow.style.transform = 'rotate(0deg)';
            } else {
                arrow.style.transform = 'rotate(180deg)';
            }
        }
    });
});

// ==========================================
// CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
// ==========================================
document.addEventListener('click', (e) => {
    if (hamburger && navMenu) {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// ==========================================
// HANDLE WINDOW RESIZE
// ==========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (hamburger && navMenu) {
            if (window.innerWidth >= 768) {
                // Desktop: Reset mobile menu
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Close all mobile dropdowns
                const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-content');
                const arrows = document.querySelectorAll('.mobile-dropdown-btn span');
                
                mobileDropdowns.forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
                
                arrows.forEach(arrow => {
                    arrow.style.transform = 'rotate(0deg)';
                });
            }
        }
    }, 100);
});

// ==========================================
// ESC KEY TO CLOSE MENU
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
    }
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after clicking internal link
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                    document.body.style.overflow = 'auto';
                }
            }
        }
    });
});

// ==========================================
// CONSOLE LOG - INITIALIZATION
// ==========================================
console.log('✅ Bano Qabil Navigation Loaded');
console.log('📱 Viewport: ' + window.innerWidth + 'px × ' + window.innerHeight + 'px');

if (window.innerWidth < 640) {
    console.log('📱 Device: Mobile (Small)');
} else if (window.innerWidth < 768) {
    console.log('📱 Device: Mobile (Medium)');
} else if (window.innerWidth < 1024) {
    console.log('📱 Device: Tablet');
} else {
    console.log('💻 Device: Desktop');
}

// DESKTOP DROPDOWNS + MOBILE DROPDOWNS
const navItems = document.querySelectorAll(".nav-item");

// For mobile: open dropdown on click
navItems.forEach(item => {
    const link = item.querySelector(".nav-link");
    const dropdown = item.querySelector(".dropdown");

    if (!dropdown) return;

    link.addEventListener("click", e => {
        // Only activate this behavior on mobile
        if (window.innerWidth >= 1024) return;

        e.preventDefault();
        dropdown.classList.toggle("hidden");
        link.querySelector(".arrow").classList.toggle("rotate-180");
    });
});


// CLICK OUTSIDE TO CLOSE DROPDOWNS (Desktop)
document.addEventListener("click", e => {
    navItems.forEach(item => {
        const dropdown = item.querySelector(".dropdown");
        const link = item.querySelector(".nav-link");

        if (!dropdown) return;

        if (!item.contains(e.target) && window.innerWidth >= 1024) {
            dropdown.classList.add("hidden");
            if (link.querySelector(".arrow")) {
                link.querySelector(".arrow").classList.remove("rotate-180");
            }
        }
    });
});


// HANDLE WINDOW RESIZE (Reset states)
window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
        navMenu.classList.remove("hidden");
    } else {
        navMenu.classList.add("hidden");
    }
});


navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    
    if (dropdown) {
        link.addEventListener('click', (e) => {
            // Only prevent default on mobile
            if (window.innerWidth <= 968) {
                e.preventDefault();
                item.classList.toggle('active');
                
                // Close other dropdowns
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    }
});

/* HERO SLIDER LOGIC */
const slides = document.querySelectorAll(".slide");
let slideIndex = 0;

function showNextSlide() {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
}

setInterval(showNextSlide, 5000);


/* NEWS TICKER PAUSE ON HOVER */
const newsBar = document.querySelector(".news-bar");
const newsTrack = document.querySelector(".news-track");

newsBar.addEventListener("mouseenter", () => {
    newsTrack.style.animationPlayState = "paused";
});

newsBar.addEventListener("mouseleave", () => {
    newsTrack.style.animationPlayState = "running";
});
