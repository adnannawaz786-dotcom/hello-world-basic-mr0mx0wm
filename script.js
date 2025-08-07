// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const helloButton = document.getElementById('helloButton');
    const greeting = document.getElementById('greeting');
    const timeDisplay = document.getElementById('timeDisplay');
    
    // Array of different greetings
    const greetings = [
        'Hello, World! 🌍',
        'Welcome! 👋',
        'Greetings! ✨',
        'Hi there! 😊',
        'Hello, Universe! 🚀',
        'Good to see you! 💫'
    ];
    
    let currentGreetingIndex = 0;
    
    // Function to update the greeting
    function updateGreeting() {
        try {
            // Add fade out effect
            greeting.style.opacity = '0';
            greeting.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                // Update text
                greeting.textContent = greetings[currentGreetingIndex];
                currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
                
                // Add fade in effect
                greeting.style.opacity = '1';
                greeting.style.transform = 'translateY(0)';
            }, 200);
            
        } catch (error) {
            console.error('Error updating greeting:', error);
            greeting.textContent = 'Hello, World!';
        }
    }
    
    // Function to update current time
    function updateTime() {
        try {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
            
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            if (timeDisplay) {
                timeDisplay.innerHTML = `
                    <div class="time">${timeString}</div>
                    <div class="date">${dateString}</div>
                `;
            }
        } catch (error) {
            console.error('Error updating time:', error);
        }
    }
    
    // Function to create floating particles
    function createParticle() {
        try {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.opacity = Math.random();
            particle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        } catch (error) {
            console.error('Error creating particle:', error);
        }
    }
    
    // Function to add button click animation
    function addButtonAnimation(button) {
        try {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        } catch (error) {
            console.error('Error adding button animation:', error);
        }
    }
    
    // Event listener for the hello button
    if (helloButton) {
        helloButton.addEventListener('click', function(e) {
            e.preventDefault();
            updateGreeting();
            addButtonAnimation(this);
            createParticle();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        // Add keyboard support
        helloButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Initialize time display and update every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Create particles periodically
    setInterval(createParticle, 3000);
    
    // Add smooth scroll behavior for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add focus management for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add window resize handler for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Trigger any responsive adjustments if needed
            console.log('Window resized, responsive adjustments applied');
        }, 250);
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
            }, 0);
        });
    }
    
    // Error handling for uncaught errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Graceful degradation - ensure basic functionality still works
        if (greeting && !greeting.textContent) {
            greeting.textContent = 'Hello, World!';
        }
    });
    
    console.log('Hello World app initialized successfully! 🎉');
});