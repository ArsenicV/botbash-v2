import { gsap } from "gsap";

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const title = item.querySelector('.faq-title');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.plus');

    gsap.set(content, { height: 0, opacity: 0 });

    title.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        if (isActive) {
            // Close the accordion item
            gsap.to(content, { height: 0, opacity: 0, duration: 0.5, ease: "power2.inOut" });
        } else {
            // Open the accordion item
            gsap.to(content, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" });
        }

        // Toggle active state
        item.classList.toggle('active');
        gsap.to(icon, { rotate: isActive ? 0 : 45, duration: 0.3, ease: "power2.out" });
    });

    // Scroll-triggered animation for the entire FAQ section
    gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: item,
            start: "top 90%", 
            toggleActions: "play none none reverse"
        }
    });
});
