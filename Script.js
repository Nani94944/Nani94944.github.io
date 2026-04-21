/* ═══════════════════════════════════════════
   JANGAM ANVESH — PORTFOLIO SCRIPT
   ═══════════════════════════════════════════ */

'use strict';

/* ── 1. NAVBAR: sticky shrink + active link ── */
(function () {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Shrink navbar
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Highlight active nav link based on scroll position
    let currentId = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ── 2. MOBILE NAV TOGGLE ── */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();


/* ── 3. TYPING ANIMATION ── */
(function () {
  const el    = document.getElementById('typed-text');
  const texts = [
    '.NET & Angular Developer',
    'Full Stack Engineer',
    'ASP.NET Core Specialist',
    'React & AngularJS Developer',
  ];
  let tIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = texts[tIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
      }
    }

    setTimeout(type, deleting ? 45 : 90);
  }

  setTimeout(type, 600);
})();


/* ── 4. SCROLL REVEAL (Intersection Observer) ── */
(function () {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();


/* ── 5. SKILL BARS ANIMATION ── */
(function () {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width  = target.getAttribute('data-w') || '0';
        // Slight stagger based on position in parent
        const delay  = Array.from(target.closest('.skill-list').children)
                            .indexOf(target.closest('li')) * 120;
        setTimeout(() => { target.style.width = width + '%'; }, delay);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();


/* ── 6. CONTACT FORM DEMO SUBMIT ── */
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !message) {
      note.textContent = 'Please fill in all required fields.';
      note.style.color = '#e53e3e';
      return;
    }

    // Simulate send
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      note.textContent = '✓ Message sent! I\'ll get back to you soon.';
      note.style.color = '#2d9648';
      form.reset();
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      setTimeout(() => { note.textContent = ''; }, 5000);
    }, 1200);
  });
})();


/* ── 7. SMOOTH BACK-TO-TOP on logo click ── */
(function () {
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
