// =========================================================================
// GLOBAL PROCESSOR: Controls Home, Contact, Hotels, Fleet, & Safari Pages
// =========================================================================
document.addEventListener("DOMContentLoaded", function() {
    
    // Core Business Hotline (Standardized International Formatting)
    const businessPhone = "256705629568"; 

    // ---- MODULE 1: AUTOMATED BACKGROUND HERO SLIDESHOW (Fixed Activation) ----
    function startHeroSlideshow() {
        const slides = document.querySelectorAll('.hero-slider .slide');
        if (slides.length === 0) return; // Safely bypass if on a different page

        let currentSlideIndex = 0;

        setInterval(function() {
            // Remove active visibility from the current image slide layer
            slides[currentSlideIndex].classList.remove('active');

            // Loop mathematically back to zero after reaching the last image slide
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;

            // Add visibility to the next image slide layer
            slides[currentSlideIndex].classList.add('active');
        }, 4000); // Transitions exactly every 4 seconds
    }

    // Fire the slideshow loop engine securely inside the DOM listener load window
    startHeroSlideshow();


    // ---- MODULE 2: DYNAMIC GRID LISTENER (Hotels, Services, Safaris) ----
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('btn-hotel-book')) {
            event.preventDefault(); // Stop fallback jumps
            
            const parentCard = event.target.closest('.hotel-card');
            let hotelName = "a premium hotel room";
            
            if (parentCard) {
                const headingElement = parentCard.querySelector('h3');
                if (headingElement) {
                    hotelName = headingElement.textContent.trim();
                }
            }

            const textMessage = `Hello Stanaland Tour and Travel,%0A%0AI am browsing your website and I would like to inquire about booking a stay at: *${encodeURIComponent(hotelName)}*.`;
            const secureWhatsAppUrl = "https://wa.me/" + businessPhone + "?text=" + textMessage;
            
            window.open(secureWhatsAppUrl, '_blank');
        }
    });


    // ---- MODULE 3: CONTACT US PAGE ENQUIRY FORM PROCESSOR ----
    const contactForm = document.getElementById('contactPageForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Terminate standard page reload loops

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            const encodedMsg = `Hello Stanaland Tour and Travel,%0A%0A` +
                               `I have submitted a message via your website Contact Form:%0A` +
                               `• *Name:* ${encodeURIComponent(name)}%0A` +
                               `• *Email:* ${encodeURIComponent(email)}%0A` +
                               `• *Message:* ${encodeURIComponent(message)}`;

            const finalUrl = "https://wa.me/" + businessPhone + "?text=" + encodedMsg;
            window.open(finalUrl, '_blank');
        });
    }


    // ---- MODULE 4: HOMEPAGE ACTIONS ----
    const whatsappChatBtn = document.querySelector(".btn-secondary");
    const exploreServicesBtn = document.querySelector(".btn-primary");

    if(whatsappChatBtn) {
        whatsappChatBtn.addEventListener("click", function(event) {
            event.preventDefault();
            const standardGreeting = encodeURIComponent("Hello Stanaland Tour and Travel! I visited your website and I would like to inquire about your services.");
            const homepageUrl = "https://wa.me/" + businessPhone + "?text=" + standardGreeting;
            window.open(homepageUrl, '_blank');
        });
    }

    if(exploreServicesBtn) {
        exploreServicesBtn.addEventListener("click", function(event) {
            event.preventDefault();
            const previewSection = document.querySelector(".services-preview, .services-preview-panel");
            if(previewSection) {
                previewSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});
