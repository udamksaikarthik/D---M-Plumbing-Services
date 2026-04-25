/* =====================================================
   D & M Plumbing Services — Interactivity
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Mobile navigation burger ----- */
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('mobileNav');

  function openMobileNav() {
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.contains('is-open') ? closeMobileNav() : openMobileNav();
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeMobileNav();
    });
  }

  /* ----- Auto year in footer ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Scroll reveal for cards & sections -----
     IntersectionObserver, no libraries.
  */
  const revealTargets = document.querySelectorAll(
    '.service-card, .review-card, .about__stat-card, .about__quote, .areas__list li, .contact-method'
  );
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 40, 300)}ms`;
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    // Fallback: just show everything
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ----- Smooth nav highlighting on scroll -----
     Lightweight: tracks which section is in view and underlines its link
  */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.style.color = href === `#${id}` ? 'var(--copper-deep)' : '';
          });
        }
      });
    }, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(s => navIO.observe(s));
  }

  /* ----- Contact form handling -----
     Front-end only. Builds a mailto/tel fallback so the form actually
     does something useful even before a backend (Formspree / Netlify
     Forms) is wired up.
  */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const postcode = (data.get('postcode') || '').toString().trim();
      const jobType = (data.get('jobType') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      // Basic validation
      if (!name || !phone || !jobType) {
        showFormFeedback('Please fill in your name, phone, and job type so we can call you back.', 'error');
        return;
      }

      // Build a useful pre-filled email body for the business owner.
      // Replace this address with the customer's real email once provided.
      const subject = encodeURIComponent(`Website enquiry — ${jobType}`);
      const body = encodeURIComponent(
        `New enquiry from the website:\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Postcode: ${postcode || 'not given'}\n` +
        `Job type: ${jobType}\n\n` +
        `Details:\n${message || '(none)'}\n`
      );

      // Currently routes via mailto. When a backend is added, swap this
      // for a fetch() call to Formspree / Netlify Forms / your own API.
      const mailto = `mailto:hello@dmplumbing.co.uk?subject=${subject}&body=${body}`;

      showFormFeedback(
        `Thanks ${name.split(' ')[0]} — opening your email app to send the details. If nothing happens, just call 07939 845541.`,
        'success'
      );

      // Try to launch their mail client
      window.location.href = mailto;

      form.reset();
    });
  }

  /* ----- Helper: show inline form feedback ----- */
  function showFormFeedback(message, type) {
    let el = form.querySelector('.form-feedback');
    if (!el) {
      el = document.createElement('div');
      el.className = 'form-feedback';
      el.style.cssText = `
        margin-top: 0.5rem;
        padding: 0.85rem 1rem;
        border-radius: 10px;
        font-size: 0.88rem;
        line-height: 1.45;
        font-weight: 500;
      `;
      form.appendChild(el);
    }
    el.textContent = message;
    if (type === 'success') {
      el.style.background = 'rgba(197, 118, 61, 0.12)';
      el.style.color = '#8a4a1e';
      el.style.border = '1px solid rgba(197, 118, 61, 0.3)';
    } else {
      el.style.background = 'rgba(220, 53, 69, 0.08)';
      el.style.color = '#a72030';
      el.style.border = '1px solid rgba(220, 53, 69, 0.25)';
    }
  }

  /* ----- Card tap/click colour state (iOS Safari compatible) ----- */
  document.querySelectorAll('.service-card, .review-card').forEach(card => {
    card.addEventListener('click', function () {
      const alreadySelected = this.classList.contains('is-selected');
      const grid = this.closest('.services__grid, .reviews__grid');
      if (grid) {
        grid.querySelectorAll('.service-card, .review-card')
          .forEach(c => c.classList.remove('is-selected'));
      }
      if (!alreadySelected) this.classList.add('is-selected');
    });
  });

  /* ----- Subtle hero parallax on scroll (desktop only) ----- */
  const visual = document.querySelector('.hero__visual');
  if (visual && window.matchMedia('(min-width: 920px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < 800) {
            visual.style.transform = `translateY(${y * 0.08}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

});
