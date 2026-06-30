// Wait for the DOM window to fully load its structures
document.addEventListener("DOMContentLoaded", function() {
    
    // Select the main homepage call-to-action buttons
    const whatsappChatBtn = document.querySelector(".btn-secondary");
    const exploreServicesBtn = document.querySelector(".btn-primary");

    // Target Phone Numbers (Stanaland Primary Hotlines from flyer)
    const primaryPhone = "256761023983"; 

    // Action 1: Quick Chat WhatsApp Redirection
    if(whatsappChatBtn) {
        whatsappChatBtn.addEventListener("click", function(event) {
            event.preventDefault(); // Stop default hyperlink jumps
            
            const standardGreeting = encodeURIComponent("Hello Stanaland Tour and Travel! I visited your website and I would like to inquire about your services.");
            const whatsappURL = `https://wa.me{primaryPhone}?text=${standardGreeting}`;
            
            window.open(whatsappURL, '_blank'); // Open safely in a separate tab
        });
    }

    // Action 2: Dynamic smooth scroll routing for explorer button
    if(exploreServicesBtn) {
        exploreServicesBtn.addEventListener("click", function(event) {
            event.preventDefault();
            const previewSection = document.querySelector(".services-preview");
            
            if(previewSection) {
                previewSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});

// =============================================================
// NEW ADDITION: Dynamic listener for Contact Page submission
// =============================================================
const contactForm = document.getElementById('contactPageForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const targetPhone = "256761023983";
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        const encodedMsg = `Hello Stanaland Tour and Travel,%0A%0A` +
                           `I have submitted a message via your website Contact Form:%0A` +
                           `• *Name:* ${encodeURIComponent(name)}%0A` +
                           `• *Email:* ${encodeURIComponent(email)}%0A` +
                           `• *Message:* ${encodeURIComponent(message)}`;

        window.open(`https://wa.me{targetPhone}?text=${encodedMsg}`, '_blank');
    });
}
