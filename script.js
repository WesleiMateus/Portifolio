'use strict';

gsap.registerPlugin(ScrollTrigger);


const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function initCursor() {
  const cursor   = $('#cursor');
  const follower = $('#cursorFollower');

  if (!cursor || !follower) return;

  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.05,
      ease: 'none',
    });

    gsap.to(follower, {
      x: mouseX,
      y: mouseY,
      duration: 0.18,
      ease: 'power2.out',
    });
  });

  const hoverTargets = $$('a, button, .skill-card, .cert-item, .project-card, .contact-link');

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });


  document.addEventListener('mouseleave', () => {
    gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
  });
}


function initNavbar() {
  const navbar  = $('#navbar');
  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  const mobileLinks = $$('.mobile-link');

  if (!navbar) return;


  ScrollTrigger.create({
    start: 'top -60px',
    onEnter:     () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  });


  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }


  gsap.from(navbar, {
    yPercent: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2,
  });
}

function initHero() {
  const heroEls = $$('[data-anim="hero"]');
  if (!heroEls.length) return;

  const tl = gsap.timeline({ delay: 0.4 });

  tl.to('.hero-tag', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    from: { y: 24 },
  });

  gsap.set('.hero-tag', { y: 24 });

  tl.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
  }, '-=0.4');

  gsap.set('.hero-title', { y: 40 });

  tl.to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.5');

  gsap.set('.hero-subtitle', { y: 24 });

  tl.to('.hero-badges', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.4');

  gsap.set('.hero-badges', { y: 20 });

  tl.to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.4');

  gsap.set('.hero-cta', { y: 20 });

  tl.to('.hero-scroll-hint', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.2');
}

function initScrollAnimations() {


  $$('[data-anim="card"]').forEach((card, i) => {
    gsap.set(card, { y: 40 });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          delay: (i % 3) * 0.08,
        });
      },
      once: true,
    });
  });


  $$('[data-anim="cert"]').forEach((item, i) => {
    gsap.set(item, { x: -30 });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: 'power3.out',
          delay: i * 0.07,
        });
      },
      once: true,
    });
  });


  const contactBox = $('[data-anim="contact"]');
  if (contactBox) {
    gsap.set(contactBox, { y: 50, scale: 0.97 });

    ScrollTrigger.create({
      trigger: contactBox,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(contactBox, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
      once: true,
    });
  }

  $$('.section-header').forEach((header) => {
    ScrollTrigger.create({
      trigger: header,
      start: 'top 88%',
      onEnter: () => {
        gsap.from(header.children, {
          opacity: 0,
          y: 20,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
        });
      },
      once: true,
    });
  });
}

function initSmoothScroll() {
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = $(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = $('#navbar')?.offsetHeight || 60;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      gsap.to(window, {
        scrollTo: targetTop,
        duration: 1,
        ease: 'power3.inOut',
      });
    });
  });
}

function initParallax() {
  const glow = $('.hero-glow');
  if (!glow) return;

  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,
    onUpdate: (self) => {
      gsap.set(glow, {
        yPercent: self.progress * 40,
        opacity: 1 - self.progress * 0.7,
      });
    },
  });
}

function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  $$('.skill-card, .project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      gsap.to(card, {
        rotateX: -dy * 5,
        rotateY:  dx * 5,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    });
  });
}

function initBadgeAnimations() {
  $$('.hero-badges .badge').forEach((badge, i) => {
    badge.addEventListener('mouseenter', () => {
      gsap.to(badge, {
        scale: 1.08,
        duration: 0.2,
        ease: 'back.out(2)',
      });
    });

    badge.addEventListener('mouseleave', () => {
      gsap.to(badge, {
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    });
  });
}

function initPageLoad() {
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
  });
}

function patchScrollTo() {
  if (typeof gsap.plugins?.scrollTo === 'undefined') {
    // Fallback: native smooth scroll (already set in CSS html{scroll-behavior:smooth})
    $$('a[href^="#"]').forEach((link) => {
      link.removeEventListener('click', link._gsapClick);
    });
  }
}

function init() {
  initPageLoad();
  initCursor();
  initNavbar();
  initHero();
  initScrollAnimations();
  initParallax();
  initCardTilt();
  initBadgeAnimations();
  patchScrollTo();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
