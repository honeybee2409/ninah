// script.js (Vanilla)

// DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if (nav.style.display === 'block') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'block';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target) && window.innerWidth < 720) {
        nav.style.display = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // collapse mobile nav if open
        if (window.innerWidth < 720 && nav && nav.style.display === 'block') {
          nav.style.display = 'none';
          if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // CTA glitch: attach data-text and hover/focus triggers
  document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.setAttribute('data-text', btn.textContent.trim());
    btn.addEventListener('mouseenter', () => btn.classList.add('glitch'));
    btn.addEventListener('mouseleave', () => btn.classList.remove('glitch'));
    btn.addEventListener('focus', () => btn.classList.add('glitch'));
    btn.addEventListener('blur', () => btn.classList.remove('glitch'));
  });

  // Periodic glitch pulse
  (function periodicGlitch() {
    const ct = document.querySelectorAll('.cta-btn');
    if (!ct.length) return;
    const idx = Math.floor(Math.random() * ct.length);
    const el = ct[idx];
    el.classList.add('glitch');
    setTimeout(() => el.classList.remove('glitch'), 800 + Math.random() * 700);
    setTimeout(periodicGlitch, 2500 + Math.random() * 6000);
  })();

  // Video placeholders: lazy embed
  document.querySelectorAll('.video-placeholder').forEach(ph => {
    ph.addEventListener('click', function () {
      const vid = ph.getAttribute('data-video') || '';
      if (!vid) {
        ph.innerHTML = '<div style="padding:1rem;text-align:center;color:var(--neon)"><strong>Vídeo de demonstração</strong><br><small>Adicione um ID do YouTube em data-video para carregar um vídeo real.</small></div>';
        return;
      }
      const iframe = document.createElement('iframe');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.src = `https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1`;
      ph.innerHTML = '';
      ph.appendChild(iframe);
    });
  });

  // Accessibility: close nav with Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (nav && window.innerWidth < 720) {
        nav.style.display = 'none';
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
