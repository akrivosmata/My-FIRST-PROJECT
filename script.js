// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  cursorFollower.style.left = e.clientX + 'px';
  cursorFollower.style.top = e.clientY + 'px';
});

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- PRELOADER ANIMATION ---
const tlPreload = gsap.timeline();

tlPreload.to('.preloader-progress', {
  width: '100%',
  duration: 1.5,
  ease: 'power3.inOut'
})
.to('.preloader-text', {
  opacity: 0,
  y: -20,
  duration: 0.5,
}, '-=0.2')
.to('.preloader', {
  y: '-100%',
  duration: 0.8,
  ease: 'power4.inOut',
  onComplete: initAnimations // start main animations after preload
});

// Infinite Ticker
const tickerTrack = document.querySelector('.ticker-track');
const tickerContent = document.querySelector('.ticker-content');
// Clone it a few times for smooth infinite scroll
tickerTrack.appendChild(tickerContent.cloneNode(true));
tickerTrack.appendChild(tickerContent.cloneNode(true));

gsap.to(tickerTrack, {
  xPercent: -50,
  ease: "none",
  duration: 20,
  repeat: -1
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active Link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links .nav-item');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 250) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Form Submission handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const span = btn.querySelector('span');
  const originalText = span.textContent;
  
  // Update button state
  span.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  btn.style.pointerEvents = 'none';

  // Get form values
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;

  // Create form data to match the exact Google Form entry IDs
  const formData = new FormData();
  formData.append('entry.1627223111', name);
  formData.append('entry.1049218461', email);
  formData.append('entry.1049144900', subject);
  formData.append('entry.1047557160', message);

  // Submit via fetch
  fetch('https://docs.google.com/forms/d/e/1FAIpQLScKCTXDhJoPLlDkmeogQjX3VzhLb7dJDgg0NTMpuh85KxIWzw/formResponse', {
    method: 'POST',
    body: formData,
    mode: 'no-cors' // Required to prevent CORS errors on form submission
  }).then(() => {
    // Show success state
    btn.style.background = '#4caf82';
    btn.style.color = '#fff';
    btn.style.borderColor = '#4caf82';
    span.textContent = 'Message Sent';
    form.reset();
    
    // Show Confirmation Popup
    const popup = document.getElementById('confirmationPopup');
    if (popup) {
      popup.classList.add('active');
    }
    
    // Reset button after 4 seconds
    setTimeout(() => {
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      span.textContent = originalText;
    }, 4000);
  }).catch((error) => {
    console.error('Submission Failed', error);
    span.textContent = 'Error. Try Again.';
    btn.style.background = '#e74c3c';
    btn.style.color = '#fff';
    btn.style.borderColor = '#e74c3c';
    
    setTimeout(() => {
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      span.textContent = originalText;
    }, 4000);
  });
});

// Popup Close Logic
const closePopupBtn = document.getElementById('closePopupBtn');
const popupOverlay = document.getElementById('confirmationPopup');

if (closePopupBtn && popupOverlay) {
  closePopupBtn.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
  });

  // Also close on clicking outside the modal
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove('active');
    }
  });
}

// --- MAIN GSAP ANIMATIONS ---
function initAnimations() {

  // Hero Animations
  gsap.to('.hero-glow.glow-top', {
    y: 100, x: 50, scale: 1.2, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });
  
  gsap.fromTo('.reveal-text', 
    { y: 150, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
  );

  gsap.to('.hero-divider', { width: '150px', duration: 1, delay: 0.5, ease: 'power3.out' });

  gsap.to('.gsap-fade-up', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.6
  });

  // Global Section Titles
  gsap.utils.toArray('.gs-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.gs-line').forEach(line => {
    gsap.from(line, {
      scrollTrigger: { trigger: line, start: 'top 85%' },
      width: 0, duration: 1, ease: 'power3.out'
    });
  });

  // About Section
  gsap.from('.gs-text p', {
    scrollTrigger: { trigger: '.gs-text', start: 'top 80%' },
    y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out'
  });

  // Numbers Counter
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        const target = +counter.getAttribute('data-target');
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power2.out',
        });
      },
      once: true
    });
  });

  gsap.from('.stat-box', {
    scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
    y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
  });

  // Philosophy Parallax Box
  gsap.from('.about-philosophy', {
    scrollTrigger: { trigger: '.about-philosophy', start: 'top 85%' },
    y: 50, opacity: 0, duration: 1.2, ease: 'power3.out'
  });

  // Expertise Grid
  gsap.from('.expertise-card', {
    scrollTrigger: { trigger: '.expertise-grid', start: 'top 80%' },
    y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out'
  });

  // Projects Reveal
  gsap.utils.toArray('.gs-proj-reveal').forEach(proj => {
    gsap.from(proj, {
      scrollTrigger: { trigger: proj, start: 'top 85%' },
      y: 50, opacity: 0, duration: 1, ease: 'power3.out'
    });
  });

  // Insights
  gsap.from('.market-bar', {
    scrollTrigger: { trigger: '.market-bar', start: 'top 90%' },
    opacity: 0, y: 30, duration: 1
  });

  gsap.from('.insight-featured', {
    scrollTrigger: { trigger: '.insights-grid', start: 'top 80%' },
    x: -40, opacity: 0, duration: 1, ease: 'power3.out'
  });

  gsap.from('.insight-item', {
    scrollTrigger: { trigger: '.insight-list', start: 'top 80%' },
    x: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
  });

  // Contact
  gsap.from('.contact-info', {
    scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    y: 40, opacity: 0, duration: 1
  });

  gsap.from('.contact-form-side', {
    scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    y: 60, opacity: 0, duration: 1, delay: 0.2
  });
}
