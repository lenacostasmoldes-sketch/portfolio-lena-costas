/* =====================================================
   LENA COSTAS · Portfolio Script
   ===================================================== */

(function () {

  /* ── NAV: scroll + hamburger ── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Cerrar menú al hacer click en un enlace
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /* ── NAV: resaltar sección activa ── */
  const sections = document.querySelectorAll('section[id]');

  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observerNav.observe(s));

  /* ── FADE-UP: animación de entrada ── */
  const animElements = document.querySelectorAll(
    '.stat-card, .exp-card, .timeline-item, .skills-pill-list li, .contact-card, .sobre-text p, .hero-badges .badge'
  );

  animElements.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  });

  const observerFade = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerFade.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach(el => observerFade.observe(el));

  /* ── BARRAS DE IDIOMA: animar al entrar en viewport ── */
  const langFills = document.querySelectorAll('.lang-fill');
  langFills.forEach(fill => {
    const finalWidth = fill.style.width;
    fill.style.width = '0%';

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => { fill.style.width = finalWidth; }, 200);
        obs.disconnect();
      }
    }, { threshold: 0.5 });

    obs.observe(fill);
  });

  /* ── AÑO EN FOOTER (por si se usa) ── */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
