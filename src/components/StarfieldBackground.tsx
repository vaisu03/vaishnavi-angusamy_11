import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  depth: number;
  warm: boolean;
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pointerX = 0;
    let pointerY = 0;

    const stars: Star[] = [];
    const starCount = Math.min(68, Math.floor((width * height) / 24000));

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.05 + 0.3,
          baseAlpha: Math.random() * 0.28 + 0.1,
          twinkleSpeed: Math.random() * 0.001 + 0.0003,
          phase: Math.random() * Math.PI * 2,
          depth: Math.random() * 0.45 + 0.15,
          warm: Math.random() > 0.82,
        });
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / width - 0.5) * 18;
      pointerY = (e.clientY / height - 0.5) * 18;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = prefersReducedMotion
          ? 0
          : Math.sin(time * star.twinkleSpeed + star.phase) * 0.22;
        const alpha = Math.max(0.08, Math.min(0.85, star.baseAlpha + twinkle));
        const px = star.x - pointerX * star.depth;
        const py = star.y - pointerY * star.depth;

        ctx.beginPath();
        ctx.arc(px, py, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.warm
          ? `rgba(251, 191, 36, ${alpha})`
          : `rgba(226, 232, 240, ${alpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(0);
    } else {
      animationFrameId = window.requestAnimationFrame(render);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle deep-space ambient radial gradients */}
      <div
        className="absolute -top-48 left-1/4 h-[540px] w-[540px] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 166, 35, 0.12) 0%, rgba(14, 18, 29, 0) 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/6 h-[620px] w-[620px] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, rgba(7, 9, 15, 0) 72%)',
        }}
      />
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
