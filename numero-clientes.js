document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const duration = parseInt(counter.getAttribute('data-duration'), 10);
        const toValue = parseInt(counter.getAttribute('data-to-value'), 10);
        const fromValue = parseInt(counter.getAttribute('data-from-value'), 10);
        let start = null;

        function animateCounter(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const current = Math.min(fromValue + Math.floor((progress / duration) * (toValue - fromValue)), toValue);
            counter.textContent = current;
            if (progress < duration) {
                requestAnimationFrame(animateCounter);
            } else {
                counter.textContent = toValue;
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 1.0 });

        observer.observe(counter);
    });
});