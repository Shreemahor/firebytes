/* ===================================================================
   FIREBYTES AI BOOTCAMP - INTERACTIVE SCRIPT
   - Ember particle background
   - Email waitlist interest capture (localStorage persistence)
   - Real-time terminal system metrics
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initWaitlistForm();
  initSystemMetrics();
});

/* 1. Subtle Floating Fire Ember Particles */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(38, Math.floor(window.innerWidth / 35));
  const particles = [];

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.45 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.fadeSpeed = Math.random() * 0.003 + 0.002;
      // Flame color palette: gold, amber, orange
      const colors = ['255, 107, 39', '255, 160, 40', '255, 60, 20', '255, 200, 70'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= this.fadeSpeed;

      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Ember());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* 2. Waitlist / Notification Form Handling */
function initWaitlistForm() {
  const form = document.getElementById('waitlistForm');
  const input = document.getElementById('emailInput');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !input || !feedback) return;

  // Check if previously subscribed
  const savedEmail = localStorage.getItem('firebytes_interest_email');
  if (savedEmail) {
    input.value = savedEmail;
    feedback.textContent = `✓ You're already registered for updates (${savedEmail})`;
    feedback.className = 'form-feedback success';
    if (submitBtn) {
      submitBtn.innerHTML = 'Subscribed ✓';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.className = 'form-feedback error';
      input.focus();
      return;
    }

    // Save state
    localStorage.setItem('firebytes_interest_email', email);
    feedback.textContent = '✓ You are on the priority list! We will notify you when applications open.';
    feedback.className = 'form-feedback success';

    if (submitBtn) {
      submitBtn.innerHTML = 'Subscribed ✓';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';
    }
  });
}

/* 3. System Metrics / Terminal Timestamp */
function initSystemMetrics() {
  const termTime = document.getElementById('termTimestamp');
  if (termTime) {
    const now = new Date();
    termTime.textContent = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  }
}
