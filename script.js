// script.js
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const toggle = document.querySelector('.mobile-menu-toggle');
  
  navMenu.classList.toggle('active');
  toggle.classList.toggle('active');
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.remove('active');
    toggle.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const navMenu = document.querySelector('.nav-menu');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  
  if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    toggle.classList.remove('active');
  }
});

// Typing Animation
document.addEventListener("DOMContentLoaded", () => {
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  if (typedTextSpan && cursorSpan) {
    const textArray = [
      "Software Engineer",
      "Full-Stack Developer", 
      "Creative Problem Solver",
      "Tech Enthusiast",
      "Digital Artist"
    ];

    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 1100);
      }
    }

    setTimeout(type, newTextDelay + 250);
  }
});

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .card, .project-card, .goal-card, .skill-item').forEach(el => {
  observer.observe(el);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('#skills');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 500);
      });
    }
  });
}, { threshold: 0.5 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});
// Handle form submission
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('.contact-form');
            const submitBtn = document.querySelector('.submit-btn');
            
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('_replyto'),
                    subject: formData.get('_subject'),
                    message: formData.get('message')
                };
                
                // Update button state
                submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                try {
                    const response = await fetch('https://formspree.io/f/xjkoajdp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    
                    if (response.ok) {
                        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                        form.reset();
                        
                        // Reset button after 3 seconds
                        setTimeout(() => {
                            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                            submitBtn.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
                            submitBtn.disabled = false;
                        }, 3000);
                    } else {
                        throw new Error('Failed to send message');
                    }
                } catch (error) {
                    submitBtn.innerHTML = '<span>Error - Try Again</span><i class="fas fa-exclamation-triangle"></i>';
                    submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                        submitBtn.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        });
// Add floating animation to project showcase image
const showcaseImg = document.querySelector('.showcase-img');
if (showcaseImg) {
  setInterval(() => {
    showcaseImg.style.transform = `translateY(${Math.sin(Date.now() * 0.002) * 10}px)`;
  }, 16);
}

// Parallax effect for background sections
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  document.querySelectorAll('.education, .goals').forEach(section => {
    const rate = scrolled * -0.5;
    section.style.transform = `translateY(${rate}px)`;
  });
});

// Random particle movement
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'dynamic-particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 5000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// Theme toggle functionality (bonus feature)
function createThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  
  document.body.appendChild(themeToggle);
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-theme')) {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

// Initialize theme toggle
createThemeToggle();

// Add ripple effect to buttons
document.querySelectorAll('.btn, .submit-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = counter.innerText === '∞' ? '∞' : parseInt(counter.innerText);
    
    if (target !== '∞') {
      let current = 0;
      const increment = target / 30;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.innerText = Math.ceil(current) + '+';
          setTimeout(updateCounter, 50);
        } else {
          counter.innerText = target + '+';
        }
      };
      
      updateCounter();
    }
  });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// Add loading screen
window.addEventListener('load', () => {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">
        <span class="highlight">TechnoHuda</span>
      </div>
      <div class="loader-bar">
        <div class="loader-progress"></div>
      </div>
    </div>
  `;
  
  document.body.appendChild(loader);
  
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, 2000);
});

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function createTrail() {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = mouseX + 'px';
  trail.style.top = mouseY + 'px';
  
  document.body.appendChild(trail);
  
  setTimeout(() => {
    trail.remove();
  }, 1000);
}

setInterval(createTrail, 100);

// Add easter egg - Konami code
let konamiCode = [];
const sequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);
  
  if (konamiCode.length > sequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === sequence.join(',')) {
    activateEasterEgg();
    konamiCode = [];
  }
});

function activateEasterEgg() {
  document.body.style.animation = 'rainbow 2s ease-in-out';
  
  const message = document.createElement('div');
  message.className = 'easter-egg';
  message.innerHTML = '🎉 You found the secret! Welcome to the matrix! 🎉';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
    document.body.style.animation = '';
  }, 3000);
}