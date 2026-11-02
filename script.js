// =========================================================================
// PWA: SERVICE WORKER REGISTRATION (runs on every page that loads this file)
// =========================================================================
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js")
            .then(function () { console.log("Service Worker registered"); })
            .catch(function (err) { console.error("Service Worker registration failed:", err); });
    });
}

// =========================================================================
// PWA: "INSTALL APP" BUTTON (appears only when the browser allows install)
// =========================================================================
let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (document.body) {
        showInstallButton();
    } else {
        document.addEventListener("DOMContentLoaded", showInstallButton);
    }
});

window.addEventListener("appinstalled", function () {
    deferredInstallPrompt = null;
    const btn = document.getElementById("pwa-install-btn");
    if (btn) btn.remove();
});

function showInstallButton() {
    if (!deferredInstallPrompt || document.getElementById("pwa-install-btn")) return;

    const btn = document.createElement("button");
    btn.id = "pwa-install-btn";
    btn.type = "button";
    btn.textContent = "Install App";
    btn.style.cssText =
        "position:fixed;bottom:20px;right:20px;z-index:100000;" +
        "background:#cca43b;color:#0d2c1d;border:none;padding:12px 22px;" +
        "border-radius:30px;font-weight:700;font-size:14px;cursor:pointer;" +
        "box-shadow:0 4px 12px rgba(0,0,0,0.3);";

    btn.addEventListener("click", async function () {
        if (!deferredInstallPrompt) return;
        deferredInstallPrompt.prompt();
        await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        btn.remove();
    });

    document.body.appendChild(btn);
}

// =========================================================================
// GLOBAL PROCESSOR: Controls Home, Contact, Hotels, Fleet, & Safari Pages
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {

    // Core Business Hotline (Standardized International Formatting)
    const businessPhone = "256705629568";

    function openWhatsApp(message) {
        const url = "https://wa.me/" + businessPhone + "?text=" + encodeURIComponent(message);
        window.open(url, "_blank", "noopener");
    }

    // ---- MODULE 1: AUTOMATED BACKGROUND HERO SLIDESHOW ----
    function startHeroSlideshow() {
        const slides = document.querySelectorAll(".hero-slider .slide");
        if (slides.length === 0) return; // Safely bypass if on a different page

        let currentSlideIndex = 0;

        setInterval(function () {
            slides[currentSlideIndex].classList.remove("active");
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add("active");
        }, 4000);
    }

    startHeroSlideshow();


    // ---- MODULE 2: DYNAMIC GRID LISTENER (Hotels, Services, Safaris) ----
    document.addEventListener("click", function (event) {
        const button = event.target && event.target.closest ? event.target.closest(".btn-hotel-book") : null;
        if (!button) return;

        event.preventDefault(); // Stop fallback jumps

        const parentCard = button.closest(".hotel-card, .safari-card, .service-feature-card");
        let itemName = "";

        if (parentCard) {
            const headingElement = parentCard.querySelector("h3");
            if (headingElement) itemName = headingElement.textContent.trim();
        }

        let message;
        if (parentCard && parentCard.classList.contains("hotel-card")) {
            message = "Hello Stanaland Tour and Travel,\n\nI am browsing your website and I would like to inquire about booking a stay at: *" +
                (itemName || "a premium hotel room") + "*.";
        } else if (parentCard && parentCard.classList.contains("safari-card")) {
            message = "Hello Stanaland Tour and Travel,\n\nI am browsing your website and I would like to inquire about the safari package: *" +
                (itemName || "a safari package") + "*.";
        } else if (parentCard && parentCard.classList.contains("service-feature-card")) {
            message = "Hello Stanaland Tour and Travel,\n\nI am browsing your website and I would like to inquire about your service: *" +
                (itemName || "your services") + "*.";
        } else {
            message = "Hello Stanaland Tour and Travel! I visited your website and I would like to inquire about your services.";
        }

        openWhatsApp(message);
    });


    // ---- MODULE 3: CONTACT US PAGE ENQUIRY FORM PROCESSOR ----
    const contactForm = document.getElementById("contactPageForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Terminate standard page reload loops

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            openWhatsApp(
                "Hello Stanaland Tour and Travel,\n\n" +
                "I have submitted a message via your website Contact Form:\n" +
                "• *Name:* " + name + "\n" +
                "• *Email:* " + email + "\n" +
                "• *Message:* " + message
            );
        });
    }


    // ---- MODULE 4: HOMEPAGE ACTIONS ----
    const whatsappChatBtn = document.querySelector(".btn-secondary");
    const exploreServicesBtn = document.querySelector(".btn-primary");

    if (whatsappChatBtn) {
        whatsappChatBtn.addEventListener("click", function (event) {
            event.preventDefault();
            openWhatsApp("Hello Stanaland Tour and Travel! I visited your website and I would like to inquire about your services.");
        });
    }

    if (exploreServicesBtn) {
        exploreServicesBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const previewSection = document.querySelector(".services-preview, .services-preview-panel");
            if (previewSection) {
                previewSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }


    // ---- MODULE 5: DYNAMIC NAVIGATION ACTIVE STATE ----
    (function initNavigation() {
        var navLinks = document.querySelectorAll('nav a');
        if (navLinks.length === 0) navLinks = document.querySelectorAll('.nav-menu a');
        if (navLinks.length === 0) return;

        function setActive() {
            var path = window.location.pathname;
            var currentPage = path.split('/').pop() || 'index.html';
            if (currentPage === '' || currentPage === '/') currentPage = 'index.html';
            if (currentPage.indexOf('hotels-') === 0 || currentPage === 'hotels.html') {
                currentPage = 'hotels.html';
            }
            navLinks.forEach(function (link) {
                var href = link.getAttribute('href') || '';
                var linkPage = href.split('/').pop().split('#')[0];
                if (linkPage === '' || linkPage === '/') linkPage = 'index.html';
                if (linkPage.indexOf('hotels-') === 0 || linkPage === 'hotels.html') {
                    linkPage = 'hotels.html';
                }
                if (linkPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setActive);
        } else {
            setActive();
        }
    })();


    // ---- MODULE 6: BACK BUTTON FOR MOBILE PWA ----
    (function initBackButton() {
        var path = window.location.pathname;
        var file = path.split('/').pop() || 'index.html';
        if (file === '' || file === 'index.html') return;
        if (file === 'hotels-uganda.html' || file === 'hotels-rwanda.html') return;
        
        var logoDiv = document.querySelector('.logo');
        if (!logoDiv) return;
        if (document.getElementById('back-btn')) return;
        
        var backBtn = document.createElement('button');
        backBtn.id = 'back-btn';
        backBtn.type = 'button';
        backBtn.setAttribute('aria-label', 'Go back');
        backBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cca43b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>';
        backBtn.style.cssText = 'background: transparent; border: none; width: 44px; height: 44px; cursor: pointer; display: none; align-items: center; justify-content: center; margin-right: 8px; padding: 0; flex-shrink: 0;';
        
        backBtn.addEventListener('click', function() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
        
        logoDiv.insertBefore(backBtn, logoDiv.firstChild);
        
        function toggleBackButton() {
            var isMobile = window.matchMedia('(max-width: 768px)').matches;
            var isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
            if (isMobile || isStandalone) {
                backBtn.style.display = 'flex';
            } else {
                backBtn.style.display = 'none';
            }
        }
        
        toggleBackButton();
        window.addEventListener('resize', toggleBackButton);
    })();
});