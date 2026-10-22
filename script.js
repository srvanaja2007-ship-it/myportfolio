/* ============================================
   VANAJA S R — CUTE PASTEL PORTFOLIO JS
   🍫 Chocolates + 🎵 Music + 🌸 Pastel Vibes
   ============================================ */

// ================================================
// 1. THREE.JS — CUTE PASTEL 3D BACKGROUND
// ================================================
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // transparent

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  // ---- Pastel Color Palette ----
  const palette = [
    new THREE.Color('#f9a8d4'), // pastel pink
    new THREE.Color('#e879f9'), // pink-violet
    new THREE.Color('#fcd34d'), // pastel yellow
    new THREE.Color('#c4b5fd'), // lavender
    new THREE.Color('#fdba74'), // peach
    new THREE.Color('#86efac'), // mint
    new THREE.Color('#f472b6'), // hot pink
    new THREE.Color('#a78bfa'), // violet
    new THREE.Color('#d4956a'), // chocolate light
  ];

  // ---- PASTEL SPARKLE PARTICLES ----
  const PARTICLE_COUNT = 1800;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const pColors   = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 32;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 32;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;

    const c = palette[Math.floor(Math.random() * palette.length)];
    pColors[i * 3]     = c.r;
    pColors[i * 3 + 1] = c.g;
    pColors[i * 3 + 2] = c.b;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(pColors,    3));

  const pMat = new THREE.PointsMaterial({
    size: 0.065,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ---- FLOATING CUTE SHAPES ----
  const floaters = [];

  function addFloater(geo, color, x, y, z, opacity = 0.18) {
    const mat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh._rx = (Math.random() - 0.5) * 0.006;
    mesh._ry = (Math.random() - 0.5) * 0.006;
    mesh._floatAmp  = Math.random() * 0.008 + 0.003;
    mesh._floatOff  = Math.random() * Math.PI * 2;
    scene.add(mesh);
    floaters.push(mesh);
    return mesh;
  }

  // 🎵 Music note-like shapes — Torus (ring)
  addFloater(new THREE.TorusGeometry(0.9, 0.25, 8, 24),   '#f472b6', -6,  3.5, -5, 0.2);
  addFloater(new THREE.TorusGeometry(0.6, 0.18, 8, 24),   '#c4b5fd',  6, -2,  -4, 0.18);
  addFloater(new THREE.TorusGeometry(0.7, 0.2,  8, 24),   '#fdba74',  0,  5,  -6, 0.16);

  // 🍫 Chocolate-like — Box shapes
  addFloater(new THREE.BoxGeometry(1.2, 0.4, 1.2),        '#d4956a',  5,  4,  -7, 0.15);
  addFloater(new THREE.BoxGeometry(0.8, 0.3, 0.8),        '#a0522d', -5, -3,  -5, 0.14);

  // 🌸 Flower-like — Icosahedrons (soft)
  addFloater(new THREE.IcosahedronGeometry(1.0, 1),       '#f9a8d4', -7,  0,  -4, 0.15);
  addFloater(new THREE.IcosahedronGeometry(0.7, 1),       '#e879f9',  7,  1,  -3, 0.14);

  // ✨ Star-like — OctaHedron
  addFloater(new THREE.OctahedronGeometry(0.8, 0),        '#fcd34d', -3, -5,  -5, 0.18);
  addFloater(new THREE.OctahedronGeometry(0.5, 0),        '#c4b5fd',  3, -4,  -4, 0.16);

  // 🎀 Ribbon-like — TorusKnot
  addFloater(new THREE.TorusKnotGeometry(0.5, 0.14, 48, 8), '#f472b6', -6, -1, -6, 0.12);
  addFloater(new THREE.TorusKnotGeometry(0.4, 0.1,  48, 8), '#a78bfa',  6.5, 3, -8, 0.12);

  // ---- BIG SOFT GLOW SPHERES (pastel ambient) ----
  function addGlow(color, x, y, z, r) {
    const geo = new THREE.SphereGeometry(r, 16, 16);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.04 });
    const m   = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    scene.add(m);
    return m;
  }

  const g1 = addGlow('#f9a8d4', -5,  4, -2, 4);
  const g2 = addGlow('#c4b5fd',  6, -3, -3, 3.5);
  const g3 = addGlow('#fdba74',  0, -5, -2, 3);

  // ---- Mouse ----
  let tMouseX = 0, tMouseY = 0, cMouseX = 0, cMouseY = 0;
  document.addEventListener('mousemove', (e) => {
    tMouseX = (e.clientX / window.innerWidth  - 0.5) * 0.55;
    tMouseY = (e.clientY / window.innerHeight - 0.5) * 0.55;
  });

  // ---- Scroll ----
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  // ---- Resize ----
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---- Animation Loop ----
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse follow
    cMouseX += (tMouseX - cMouseX) * 0.04;
    cMouseY += (tMouseY - cMouseY) * 0.04;

    // Particles sparkle drift
    particles.rotation.y  = t * 0.018;
    particles.rotation.x  = Math.sin(t * 0.01) * 0.06;

    // Cute shapes float & spin
    floaters.forEach((f, i) => {
      f.rotation.x += f._rx;
      f.rotation.y += f._ry;
      f.position.y += Math.sin(t * 0.45 + f._floatOff + i * 0.5) * f._floatAmp;
    });

    // Glow pulse
    const gv = (Math.sin(t * 0.7) + 1) * 0.5;
    g1.material.opacity = 0.03 + gv * 0.03;
    g2.material.opacity = 0.02 + Math.sin(t * 0.55 + 1) * 0.015;
    g3.material.opacity = 0.02 + Math.sin(t * 0.85 + 2) * 0.015;

    // Camera parallax
    camera.position.x += (cMouseX - camera.position.x) * 0.05;
    camera.position.y += (-cMouseY - camera.position.y) * 0.05;
    camera.position.z  = 6 - scrollY * 0.0014;

    renderer.render(scene, camera);
  }

  animate();
})();


// ================================================
// 2. NAVIGATION
// ================================================
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks   = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(255, 245, 248, 0.98)'
    : 'rgba(255, 245, 248, 0.88)';
  navbar.style.boxShadow = window.scrollY > 60
    ? '0 4px 30px rgba(240,98,146,0.12)'
    : 'none';
  updateActiveNav();
});

hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

function updateActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 90;
  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
      });
    }
  });
}


// ================================================
// 3. SCROLL REVEAL
// ================================================
function initReveal() {
  const targets = document.querySelectorAll(
    '.timeline-card, .skill-category, .project-card, .hobby-card, .sw-card, ' +
    '.about-text-card, .about-details-card, .contact-info, .contact-form, .timeline-item'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(el => obs.observe(el));
}


// ================================================
// 4. SKILL BAR ANIMATION
// ================================================
function initSkillBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((f, i) => {
          setTimeout(() => { f.style.width = f.getAttribute('data-width') + '%'; }, i * 120);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.skill-category').forEach(el => obs.observe(el));
}


// ================================================
// 5. STATIC SUBTITLE (typing effect removed)
// ================================================
// Subtitle is now set directly in HTML — no typing animation


// ================================================
// 6. FLOATING MUSIC NOTES (CSS injected)
// ================================================
function spawnMusicNotes() {
  const notes = ['♪', '♫', '♬', '♩', '🎵', '🎶', '🍫', '🌸', '💕', '✨'];
  const container = document.body;

  function spawn() {
    const note = document.createElement('div');
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    const size = Math.random() * 16 + 12;
    note.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      bottom: -40px;
      font-size: ${size}px;
      opacity: 0;
      z-index: 0;
      pointer-events: none;
      animation: floatUp ${Math.random() * 6 + 7}s ease-in forwards;
      user-select: none;
    `;
    container.appendChild(note);
    setTimeout(() => note.remove(), 14000);
  }

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0%   { opacity: 0;   transform: translateY(0)     rotate(0deg); }
      15%  { opacity: 0.5; }
      85%  { opacity: 0.3; }
      100% { opacity: 0;   transform: translateY(-110vh) rotate(${Math.random() > 0.5 ? '' : '-'}360deg); }
    }
  `;
  document.head.appendChild(style);

  setInterval(spawn, 2200);
}
spawnMusicNotes();


// ================================================
// 7. CONTACT FORM
// ================================================
const form     = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending 💌';
    btn.disabled = true;
    setTimeout(() => {
      statusEl.textContent = '🌸 Message sent! Vanaja will get back to you soon 💕';
      statusEl.style.color = '#2e7d32';
      btn.textContent = 'Send Message 🚀';
      btn.disabled = false;
      form.reset();
      setTimeout(() => { statusEl.textContent = ''; }, 6000);
    }, 1600);
  });
}


// ================================================
// 8. PROFILE IMAGE FALLBACK
// ================================================
const profileImg = document.getElementById('profile-img');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.background = 'linear-gradient(135deg, #f06292, #ce93d8, #ffab76)';
    profileImg.src = '';
  });
}


// ================================================
// 9. SMOOTH ANCHOR SCROLL
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});


// ================================================
// 10. SOFT CURSOR GLOW
// ================================================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(240,98,146,0.07) 0%, rgba(206,147,216,0.04) 40%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  will-change: left, top;
`;
document.body.appendChild(cursorGlow);

let gx = 0, gy = 0, gcx = 0, gcy = 0;
document.addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; });

(function animCursor() {
  gcx += (gx - gcx) * 0.1;
  gcy += (gy - gcy) * 0.1;
  cursorGlow.style.left = gcx + 'px';
  cursorGlow.style.top  = gcy + 'px';
  requestAnimationFrame(animCursor);
})();


// ================================================
// 11. INIT
// ================================================
window.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initSkillBars();
  updateActiveNav();
});
