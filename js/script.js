const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
const hasGsap = typeof window.gsap !== 'undefined';
const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';

const setupGalleryMarquee = () => {
  const marquee = document.querySelector('.gallery-marquee');
  const track = document.querySelector('.gallery-track');

  if (!marquee || !track || track.dataset.marqueeReady === 'true') return null;

  const originalCards = Array.from(track.children);

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);

    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('tabindex', '-1');
    track.appendChild(clone);
  });

  track.dataset.marqueeReady = 'true';

  return {
    marquee,
    track,
    originalCount: originalCards.length
  };
};

const galleryMarquee = setupGalleryMarquee();

galleryMarquee?.marquee.classList.add('css-marquee');

if (hasGsap && !prefersReducedMotion) {
  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.85
  });

  const heroTimeline = gsap.timeline({ delay: 0.12 });

  heroTimeline
    .from('.site-header', { y: -24, autoAlpha: 0, duration: 0.7 })
    .from('.hero-copy h1', { y: 34, autoAlpha: 0 }, '-=0.25')
    .from('.hero-copy p', { y: 24, autoAlpha: 0 }, '-=0.5')
    .from('.hero-actions .btn', { y: 20, autoAlpha: 0, stagger: 0.09 }, '-=0.45')
    .from('.hero-visual img', {
      x: 70,
      y: 18,
      rotate: -2,
      scale: 0.97,
      autoAlpha: 0,
      duration: 1
    }, '-=0.75');

  if (hasScrollTrigger) {
    gsap.utils.toArray('.reveal:not(.hero-copy):not(.hero-visual)').forEach((element) => {
      const animatedChildren = element.matches('.service-suite-grid, .gallery-track, .service-process')
        ? element.children
        : element;

      gsap.fromTo(animatedChildren, {
        y: 36,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        stagger: element.children?.length > 1 ? 0.08 : 0,
        scrollTrigger: {
          trigger: element,
          start: 'top 82%',
          once: true
        }
      });
    });

    gsap.to('.hero-visual img', {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.eco-graphic-new img', {
      yPercent: -8,
      rotate: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-section-new',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  const liftTargets = document.querySelectorAll('.service-suite-card, .gallery-card, .about-block-new, .service-item-new, .footer-socials a');

  liftTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      gsap.to(target, { y: -6, duration: 0.28, ease: 'power2.out' });
    });

    target.addEventListener('mouseleave', () => {
      gsap.to(target, { y: 0, duration: 0.28, ease: 'power2.out' });
    });
  });
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const sections = document.querySelectorAll('main section[id]');
const menuLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= top && scrollPosition < top + height) {
      menuLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

const lightbox = document.querySelector('#image-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxTitle = document.querySelector('#lightbox-title');
const lightboxTriggers = document.querySelectorAll('[data-lightbox-src]');
const lightboxCloseButtons = document.querySelectorAll('.lightbox-close, .lightbox-backdrop');

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;

  const finishClose = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
    lightboxImage.setAttribute('alt', '');
  };

  if (hasGsap && !prefersReducedMotion) {
    gsap.to('.lightbox-dialog', { y: 18, scale: 0.98, autoAlpha: 0, duration: 0.22, ease: 'power2.in' });
    gsap.to('.lightbox-backdrop', { autoAlpha: 0, duration: 0.22, onComplete: finishClose });
    return;
  }

  finishClose();
};

const openLightbox = (trigger) => {
  if (!lightbox || !lightboxImage || !lightboxTitle) return;

  const src = trigger.getAttribute('data-lightbox-src');
  const title = trigger.getAttribute('data-lightbox-title') || 'Print de site';
  const image = trigger.querySelector('img');

  if (!src) return;

  lightboxImage.setAttribute('src', src);
  lightboxImage.setAttribute('alt', image?.getAttribute('alt') || title);
  lightboxTitle.textContent = title;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');

  if (hasGsap && !prefersReducedMotion) {
    gsap.fromTo('.lightbox-backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24 });
    gsap.fromTo('.lightbox-dialog', {
      y: 22,
      scale: 0.98,
      autoAlpha: 0
    }, {
      y: 0,
      scale: 1,
      autoAlpha: 1,
      duration: 0.34,
      ease: 'power3.out'
    });
  }

  const closeButton = lightbox.querySelector('.lightbox-close');
  closeButton?.focus();
};

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openLightbox(trigger));
});

lightboxCloseButtons.forEach((button) => {
  button.addEventListener('click', closeLightbox);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('open')) {
    closeLightbox();
  }
});

const contactForm = document.querySelector('#contact-form');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const message = String(formData.get('message') || '').trim();

  const subject = `Contato via Site - ${name || 'Kantrol'}`;
  const body = [
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Telefone/WhatsApp: ${phone || 'Não informado'}`,
    '',
    'Mensagem:',
    message
  ].join('\n');

  window.location.href = `mailto:operacoes@kantrol.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
