/**
 * HARISH - Full Stack Python Developer Portfolio
 * JavaScript Interactive Features:
 * - 3D Cube Drag & Hover Interaction
 * - Typewriter Hero Role Effect
 * - ScrollSpy & Sticky Navbar
 * - Mobile Navigation Toggle
 * - One-Click Clipboard Copy with Toast
 * - Skill Bar Intersection Animation
 * - Interactive Contact Form Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ==========================================================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('mobile-active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking any nav item
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // ==========================================================================
  // 2. STICKY NAVBAR SCROLL EFFECT
  // ==========================================================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // 3. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItems.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNavigation);

  // ==========================================================================
  // 4. TYPEWRITER EFFECT IN HERO SECTION
  // ==========================================================================
  const typeTextElement = document.getElementById('typing-text');
  const words = [
    'Aspiring Full Stack Python Developer',
    'Django & REST API Specialist',
    'PostgreSQL & Database Architect',
    'Interactive & Responsive Web Builder',
    'Problem Solver & Creative Thinker'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function typeEffect() {
    if (!typeTextElement) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typeTextElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typeTextElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 95;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // ==========================================================================
  // 5. INTERACTIVE 3D CUBE (DRAG TO ROTATE & PAUSE ON HOVER)
  // ==========================================================================
  const cubeWrapper = document.getElementById('cubeWrapper');
  const cube = document.getElementById('cube3D');

  if (cube && cubeWrapper) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotX = -15;
    let currentRotY = 25;
    let manualRotation = false;

    // Pause CSS animation on mouse enter or touch start
    cubeWrapper.addEventListener('mouseenter', () => {
      if (!manualRotation) {
        cube.style.animationPlayState = 'paused';
      }
    });

    cubeWrapper.addEventListener('mouseleave', () => {
      if (!isDragging && !manualRotation) {
        cube.style.animationPlayState = 'running';
      }
    });

    // Mouse Drag events
    cubeWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      manualRotation = true;
      cube.style.animation = 'none'; // switch to manual transform
      startX = e.clientX;
      startY = e.clientY;
      cube.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      currentRotY += deltaX * 0.5;
      currentRotX -= deltaY * 0.5;

      cube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;

      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        cube.style.cursor = 'grab';
      }
    });

    // Touch events for mobile/tablet drag
    cubeWrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        manualRotation = true;
        cube.style.animation = 'none';
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;

      currentRotY += deltaX * 0.5;
      currentRotX -= deltaY * 0.5;

      cube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;

      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Double click to restore continuous CSS auto-rotation
    cubeWrapper.addEventListener('dblclick', () => {
      manualRotation = false;
      cube.style.transform = '';
      cube.style.animation = 'rotate3D 18s infinite linear';
      showToast('Continuous 3D Auto-Rotation Resumed!');
    });
  }

  // ==========================================================================
  // 6. ONE-CLICK CLIPBOARD COPY WITH TOAST NOTIFICATION
  // ==========================================================================
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  const copyableItems = document.querySelectorAll('[data-copy]');
  copyableItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = item.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      }
    });
  });

  // ==========================================================================
  // 7. SKILL PROGRESS BAR ANIMATION ON SCROLL
  // ==========================================================================
  const skillFills = document.querySelectorAll('.skill-fill');
  if ('IntersectionObserver' in window && skillFills.length > 0) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillFills.forEach(fill => {
            const width = fill.getAttribute('data-width') || '80%';
            fill.style.width = width;
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
  } else {
    // Fallback: instantly fill
    skillFills.forEach(fill => {
      fill.style.width = fill.getAttribute('data-width') || '80%';
    });
  }

  // ==========================================================================
  // 8. CONTACT FORM SUBMISSION FEEDBACK
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName')?.value || 'Friend';
      showToast(`Thank you ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

  // ==========================================================================
  // 9. STAT COUNTER ANIMATION
  // ==========================================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target') || '0', 10);
            const suffix = stat.getAttribute('data-suffix') || '';
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              stat.textContent = current + suffix;
            }, 30);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      statsObserver.observe(aboutSection);
    }
  }
});
