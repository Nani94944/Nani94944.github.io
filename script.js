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



/* ── 8. OFFICE PHOTO CAROUSEL ── */
(function () {

  /* ═══════════════════════════════════════════════════════
     OFFICE PHOTOS — update these paths to your real images
     Put photos in the same folder as index.html
     Example: 'office1.jpg', 'office2.jpg', etc.
  ══════════════════════════════════════════════════════ */
var officePhotos = [
    { src: 'IMG_2956.jpeg',  caption: 'Our workspace at Infinite Computer Solutions' },
    { src: 'IMG_2957.jpeg',  caption: 'Team collaboration sessions' },
    { src: 'IMG_4744.jpeg',  caption: 'Hackathon & innovation days' },
    { src: 'IMG_4791.jpeg',  caption: 'Sprint planning & stand-ups' },
    { src: 'IMG_4821.jpeg',  caption: 'Celebrating project milestones 🎉' },
    { src: 'IMG_4832.jpeg',  caption: 'Pair programming & code reviews' },
    { src: 'IMG_5433.png',  caption: 'Tech talk sessions' },
    { src: 'IMG_5434.jpeg',  caption: 'Team lunch & culture moments' },
    { src: 'IMG_5435.jpeg',  caption: 'Client demo day' },
    { src: 'IMG_5436.jpeg', caption: 'BrassRing squad' },
    { src: 'IMG_5437.jpeg', caption: 'Onboarding & training' },
    { src: 'IMG_5776.jpeg', caption: 'Friday fun & team activities' },
  ];

  var current = 0;
  var slides  = [];
  var dots    = [];
  var stage   = document.getElementById('carouselStage');
  if (!stage) return; 
  var overlay = document.getElementById('carouselOverlay');
  var counter = document.getElementById('carouselCounter');
  var dotsWrap = document.getElementById('carouselDots');

  /* Build slides */
  officePhotos.forEach(function (photo, i) {
    var slide = document.createElement('div');
    slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');

    /* Try to load image; if it fails show a placeholder */
    var img = new Image();
    img.onload = function () {
      slide.innerHTML =
        '<img src="' + photo.src + '" alt="' + photo.caption + '" />' +
        '<div class="slide-caption">' + photo.caption + '</div>';
    };
    img.onerror = function () {
      slide.innerHTML =
        '<div class="slide-placeholder">' +
          '<div class="ph-icon">🏢</div>' +
          '<div class="ph-label">Photo ' + (i + 1) + '</div>' +
          '<div>' + photo.caption + '</div>' +
          '<div style="font-size:0.7rem;margin-top:6px;opacity:0.5">Add ' + photo.src + ' to your project folder</div>' +
        '</div>';
    };
    img.src = photo.src;

    /* Default placeholder until load resolves */
    slide.innerHTML =
      '<div class="slide-placeholder">' +
        '<div class="ph-icon">🏢</div>' +
        '<div class="ph-label">Photo ' + (i + 1) + '</div>' +
        '<div>' + photo.caption + '</div>' +
        '<div style="font-size:0.7rem;margin-top:6px;opacity:0.5">Add ' + photo.src + ' to your project folder</div>' +
      '</div>';

    stage.insertBefore(slide, document.getElementById('prevBtn'));
    slides.push(slide);

    /* Dot */
    var dot = document.createElement('button');
    dot.className = 'c-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
    dots.push(dot);
  });

  function goTo(n) {
    if (slides.length === 0) return;
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + slides.length;
  }

  document.getElementById('prevBtn').addEventListener('click', function () { goTo(current - 1); });
  document.getElementById('nextBtn').addEventListener('click', function () { goTo(current + 1); });

  /* Open */
  document.getElementById('openCarouselBtn').addEventListener('click', function () {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    goTo(0);
  });

  /* Close */
  function closeCarousel() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('closeCarouselBtn').addEventListener('click', closeCarousel);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeCarousel();
  });

  /* Keyboard */
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'Escape')     closeCarousel();
  });

  /* Auto-advance every 4s when open */
  var autoTimer;
  var observer = new MutationObserver(function () {
    if (overlay.classList.contains('open')) {
      autoTimer = setInterval(function () { goTo(current + 1); }, 4000);
    } else {
      clearInterval(autoTimer);
    }
  });
  observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });

  /* Update counter on load */
  if (slides.length > 0) {
    counter.textContent = '1 / ' + slides.length;
  }

})();

/* ── 9. CONTACT FORM WITH EMAILJS ── */
(function () {
  const EMAILJS_PUBLIC_KEY  = 'mEv6pZF9C1hUc27L6';
  const EMAILJS_SERVICE_ID  = 'service_jug13zd';
  const EMAILJS_TEMPLATE_ID = 'template_jpooewj';

  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form       = document.getElementById('contactForm');
  const note       = document.getElementById('formNote');
  const sendBtn    = document.getElementById('sendEmailBtn');
  const waBtn      = document.getElementById('sendWhatsAppBtn');

  if (!form) return;

  /* ── Email Submit ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    note.textContent = '';
    note.className   = 'form-note';

    sendBtn.disabled = true;
    sendBtn.innerHTML = '<span class="spinner"></span> Sending…';

    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        note.textContent = '✅ Message sent! I\'ll reply within 24 hours.';
        note.className   = 'form-note success';
        note.style.color = '#2d9648';
        form.reset();
      } else {
        throw new Error('EmailJS not loaded');
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      note.textContent = '❌ Oops! Something went wrong. Try WhatsApp instead.';
      note.className   = 'form-note error';
      note.style.color = '#e53e3e';
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Email';
    }
  });

  /* ── WhatsApp Button ── */
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const name    = document.getElementById('fname').value.trim();
      const email   = document.getElementById('femail').value.trim();
      const subject = document.getElementById('fsubject').value.trim();
      const message = document.getElementById('fmessage').value.trim();

      if (!name || !message) {
        note.textContent = '⚠️ Please fill in at least your name and message before sending on WhatsApp.';
        note.className   = 'form-note error';
        note.style.color = '#e53e3e';
        return;
      }

      const waText = encodeURIComponent(
        `Hi Anvesh! 👋\n\n` +
        `*Name:* ${name}\n` +
        (email   ? `*Email:* ${email}\n`   : '') +
        (subject ? `*Subject:* ${subject}\n` : '') +
        `\n*Message:*\n${message}`
      );

      const PHONE = '919121232760';
      window.open(`https://wa.me/${PHONE}?text=${waText}`, '_blank');
    });
  }
})();

