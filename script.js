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
