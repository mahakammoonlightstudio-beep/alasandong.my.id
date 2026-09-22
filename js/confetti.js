/**
 * Confetti Module — ledakan konfeti ringan tanpa dependensi.
 * Canvas sekali pakai per ledakan, auto-hapus saat selesai.
 * Menghormati prefers-reduced-motion / setting animasi.
 *
 * API: Confetti.burst({ x, y, count })
 */
const Confetti = (() => {
  'use strict';

  const COLORS = ['#147a4e', '#3ecf8e', '#6aa9ff', '#f0a63a', '#e11d64', '#ffd43b'];

  function motionOff() {
    if (document.documentElement.classList.contains('reduce-motion')) return true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return false;
  }

  function burst(opts = {}) {
    if (motionOff()) return;

    const count = opts.count || 90;
    const originX = opts.x != null ? opts.x : window.innerWidth / 2;
    const originY = opts.y != null ? opts.y : window.innerHeight / 3;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2000;';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const parts = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 4 + Math.random() * 7;
      parts.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
        vy: Math.sin(angle) * speed - (2 + Math.random() * 3),
        size: 6 + Math.random() * 7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.4,
        life: 0,
        ttl: 90 + Math.random() * 40,
        shape: Math.random() < 0.5 ? 'rect' : 'circle'
      });
    }

    const gravity = 0.22;
    const drag = 0.99;
    let raf;

    function frame() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let alive = false;
      parts.forEach(p => {
        if (p.life > p.ttl) return;
        alive = true;
        p.life++;
        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        const alpha = Math.max(0, 1 - p.life / p.ttl);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      if (alive) {
        raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
        canvas.remove();
      }
    }
    frame();
  }

  return { burst };
})();

window.Confetti = Confetti;
