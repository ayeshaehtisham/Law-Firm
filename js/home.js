document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('#stats-section .number');
    let animationStarted = false;

    // Function to run the counting animation
    function startCounterAnimation() {
        if (animationStarted) return;
        animationStarted = true;

        counters.forEach(counter => {
            // Retrieve target number and suffix from HTML data attributes
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || ''; 
            const duration = 2000; // 2 seconds total animation time
            let start = 0;

            // Add the class to trigger the CSS fade-in transition
            counter.classList.add('animated');

            const updateCounter = () => {
                // Calculate increment needed for a smooth 60fps animation over 2000ms
                const increment = target / (duration / 16); 
                
                if (start < target) {
                    // Calculate the value of the next step
                    const nextStart = start + increment;

                    if (nextStart >= target) {
                        // If the next step overshoots, set directly to the target value
                        counter.innerText = target + suffix;
                    } else {
                        // Continue counting
                        start = nextStart;
                        // Use Math.ceil to round up, ensuring the counter moves visually
                        counter.innerText = Math.ceil(start) + suffix; 
                        setTimeout(updateCounter, 16); // Loop every ~16ms
                    }
                } else {
                    // Safety net: ensure the counter is set to the final value
                    counter.innerText = target + suffix; 
                }
            };
            
            updateCounter();
        });
    }

    // Set up the Intersection Observer to watch when the stats section enters the viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Check if the target element (statsSection) is intersecting (visible)
            if (entry.isIntersecting) {
                startCounterAnimation();
                // Stop observing once the animation has started to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options: Trigger when 10% of the element is visible
        threshold: 0.1 
    });

    // Start observing the stats section element
    if (statsSection) {
        observer.observe(statsSection);
    }
});