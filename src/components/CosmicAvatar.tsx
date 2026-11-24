import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';

export function CosmicAvatar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const lastPointerMoveRef = useRef<number>(Date.now());

  // Normalized cursor target in [-1, 1]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Tuned biological springs for smooth, understated head & eye inertia
  const eyeSpringConfig = { stiffness: 240, damping: 26, mass: 0.48 };
  const headSpringConfig = { stiffness: 110, damping: 22, mass: 0.95 };

  const smoothEyeX = useSpring(rawX, eyeSpringConfig);
  const smoothEyeY = useSpring(rawY, eyeSpringConfig);
  const smoothHeadX = useSpring(rawX, headSpringConfig);
  const smoothHeadY = useSpring(rawY, headSpringConfig);

  // Subtle 2.5D spherical parallax transforms
  const headTranslateX = useTransform(smoothHeadX, [-1, 1], [-6.5, 6.5]);
  const headTranslateY = useTransform(smoothHeadY, [-1, 1], [-5, 5]);
  const headRotate = useTransform(smoothHeadX, [-1, 1], [-3.5, 3.5]);

  const faceShiftX = useTransform(smoothHeadX, [-1, 1], [-4.5, 4.5]);
  const faceShiftY = useTransform(smoothHeadY, [-1, 1], [-3.5, 3.5]);

  const backHairX = useTransform(smoothHeadX, [-1, 1], [4, -4]);
  const backHairY = useTransform(smoothHeadY, [-1, 1], [2.5, -2.5]);

  const frontHairX = useTransform(smoothHeadX, [-1, 1], [-5.5, 5.5]);
  const frontHairY = useTransform(smoothHeadY, [-1, 1], [-3.8, 3.8]);

  const pupilX = useTransform(smoothEyeX, [-1, 1], [-5.2, 5.2]);
  const pupilY = useTransform(smoothEyeY, [-1, 1], [-3.2, 3.2]);

  const glintX = useTransform(smoothEyeX, [-1, 1], [-5.9, 5.9]);
  const glintY = useTransform(smoothEyeY, [-1, 1], [-3.7, 3.7]);

  // Global cursor tracking relative to avatar center
  useEffect(() => {
    if (prefersReducedMotion || !trackingEnabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.42;

      const maxRadiusX = Math.max(window.innerWidth * 0.45, 320);
      const maxRadiusY = Math.max(window.innerHeight * 0.45, 280);

      const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / maxRadiusX));
      const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / maxRadiusY));

      rawX.set(nx);
      rawY.set(ny);
      lastPointerMoveRef.current = Date.now();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, trackingEnabled, rawX, rawY]);

  // Subtle autonomous idle gaze drift when pointer is idle
  useEffect(() => {
    if (prefersReducedMotion || !trackingEnabled) return;

    const driftInterval = window.setInterval(() => {
      const idleMs = Date.now() - lastPointerMoveRef.current;
      if (idleMs > 4200) {
        const angle = (Date.now() / 2200) % (Math.PI * 2);
        rawX.set(Math.sin(angle) * 0.28);
        rawY.set(Math.cos(angle * 0.7) * 0.16 - 0.05);
      }
    }, 1400);

    return () => window.clearInterval(driftInterval);
  }, [prefersReducedMotion, trackingEnabled, rawX, rawY]);

  // Occasional natural blinking
  useEffect(() => {
    if (prefersReducedMotion) return;
    let blinkTimeout: number;
    let openTimeout: number;
    let doubleBlinkTimeout: number;

    const scheduleBlink = () => {
      const nextDelay = 3000 + Math.random() * 3200;
      blinkTimeout = window.setTimeout(() => {
        setIsBlinking(true);
        openTimeout = window.setTimeout(() => {
          setIsBlinking(false);

          if (Math.random() < 0.18) {
            doubleBlinkTimeout = window.setTimeout(() => {
              setIsBlinking(true);
              window.setTimeout(() => setIsBlinking(false), 120);
            }, 170);
          }

          scheduleBlink();
        }, 130);
      }, nextDelay);
    };

    scheduleBlink();
    return () => {
      window.clearTimeout(blinkTimeout);
      window.clearTimeout(openTimeout);
      window.clearTimeout(doubleBlinkTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        ref={containerRef}
        aria-label="Illustrated portrait of Vaishnavi A"
        className="relative aspect-square w-full max-w-[376px] select-none overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0A0F1C] shadow-2xl shadow-black/50"
      >
        {/* Understated warm studio rim halo */}
        <motion.div
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0.16, 0.24, 0.16],
                }
          }
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-8 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle at 50% 44%, rgba(245, 166, 35, 0.22) 0%, rgba(12, 18, 34, 0) 72%)',
          }}
        />

        <svg
          viewBox="0 0 420 440"
          className="relative z-10 h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dark Navy Backdrop */}
            <radialGradient id="cosmicSky" cx="50%" cy="42%" r="62%">
              <stop offset="0%" stopColor="#141E36" />
              <stop offset="68%" stopColor="#0B1020" />
              <stop offset="100%" stopColor="#07090F" />
            </radialGradient>

            {/* Skin Gradients */}
            <radialGradient id="faceSkin" cx="46%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#DF9F7A" />
              <stop offset="58%" stopColor="#C8835E" />
              <stop offset="100%" stopColor="#A66444" />
            </radialGradient>
            <linearGradient id="neckSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9E5E40" />
              <stop offset="45%" stopColor="#BD7B58" />
              <stop offset="100%" stopColor="#A86949" />
            </linearGradient>

            {/* Cheek Blush */}
            <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D6685C" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#D6685C" stopOpacity="0" />
            </radialGradient>

            {/* Hair Gradients */}
            <linearGradient id="hairMain" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#261D24" />
              <stop offset="55%" stopColor="#171117" />
              <stop offset="100%" stopColor="#0D0A0E" />
            </linearGradient>
            <linearGradient id="hairHighlight" x1="0" y1="0" x2="1" y2="0.6">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.28" />
              <stop offset="45%" stopColor="#463643" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#171117" stopOpacity="0" />
            </linearGradient>

            {/* Iris Gradient */}
            <radialGradient id="irisGrad" cx="45%" cy="42%" r="55%">
              <stop offset="0%" stopColor="#6D412A" />
              <stop offset="55%" stopColor="#3B2014" />
              <stop offset="100%" stopColor="#1B0E09" />
            </radialGradient>

            {/* Jacket / Turtleneck Gradients */}
            <linearGradient id="blazerGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1D2740" />
              <stop offset="60%" stopColor="#121829" />
              <stop offset="100%" stopColor="#0B0F1A" />
            </linearGradient>
            <linearGradient id="turtleneckGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#232E47" />
              <stop offset="100%" stopColor="#131929" />
            </linearGradient>

            {/* Eye Sclera Clip Paths */}
            <clipPath id="leftEyeClip">
              <path d="M149 208 C156 196, 179 196, 187 208 C179 218, 156 218, 149 208 Z" />
            </clipPath>
            <clipPath id="rightEyeClip">
              <path d="M233 208 C241 196, 264 196, 271 208 C264 218, 241 218, 233 208 Z" />
            </clipPath>
          </defs>

          {/* Clean Circular Aperture Frame */}
          <circle
            cx="210"
            cy="215"
            r="184"
            fill="url(#cosmicSky)"
            stroke="#1E293B"
            strokeWidth="1.2"
          />

          {/* Subtle Inner Gold Hairline Ring */}
          <circle
            cx="210"
            cy="215"
            r="172"
            stroke="rgba(245, 166, 35, 0.14)"
            strokeWidth="1"
          />

          {/* Minimal Distant Background Stars (Reduced & Understated) */}
          <g opacity="0.45">
            <circle cx="96" cy="108" r="1" fill="#E2E8F0" />
            <circle cx="328" cy="104" r="1.1" fill="#FBBF24" />
            <circle cx="344" cy="252" r="0.9" fill="#94A3B8" />
          </g>

          {/* LAYER 1: Back Hair */}
          <motion.g style={{ x: backHairX, y: backHairY }}>
            <path
              d="M114 185 C98 232, 95 298, 114 358 C134 366, 286 366, 306 358 C325 298, 322 232, 306 185 C295 128, 260 95, 210 95 C160 95, 125 128, 114 185 Z"
              fill="url(#hairMain)"
            />
            <path
              d="M115 186 C100 232, 97 294, 115 352"
              stroke="rgba(251, 191, 36, 0.2)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M305 186 C320 232, 323 294, 305 352"
              stroke="rgba(148, 163, 184, 0.18)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </motion.g>

          {/* LAYER 2: Gentle Breathing Torso, Shoulders & Blazer */}
          <motion.g
            style={{ originX: '210px', originY: '420px' }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -2.5, 0],
                    scaleY: [1, 1.01, 1],
                  }
            }
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Shoulders & Blazer */}
            <path
              d="M78 440 C82 372, 116 340, 162 328 L258 328 C304 340, 338 372, 342 440 Z"
              fill="url(#blazerGrad)"
              stroke="rgba(148, 163, 184, 0.16)"
              strokeWidth="1"
            />
            {/* Inner Mock-Neck / Turtleneck */}
            <path
              d="M158 326 L176 312 L244 312 L262 326 L248 440 L172 440 Z"
              fill="url(#turtleneckGrad)"
            />
            {/* Tailored Blazer Lapels */}
            <path
              d="M162 328 L184 410 L152 385 Z"
              fill="#1E2942"
              stroke="rgba(251, 191, 36, 0.22)"
              strokeWidth="0.9"
            />
            <path
              d="M258 328 L236 410 L268 385 Z"
              fill="#1E2942"
              stroke="rgba(251, 191, 36, 0.22)"
              strokeWidth="0.9"
            />
            {/* Subtle Gold Chain & Four-Point Starlight Pendant */}
            <path
              d="M174 330 Q210 366 246 330"
              stroke="#D99B38"
              strokeWidth="1.1"
              opacity="0.78"
            />
            <path
              d="M210 347 L212.2 353 L218 355.2 L212.2 357.4 L210 363.4 L207.8 357.4 L202 355.2 L207.8 353 Z"
              fill="#FBBF24"
            />
          </motion.g>

          {/* Neck */}
          <motion.g
            style={{
              x: useTransform(smoothHeadX, [-1, 1], [-1.8, 1.8]),
              y: useTransform(smoothHeadY, [-1, 1], [-1.2, 1.2]),
            }}
          >
            <path
              d="M182 268 L180 326 Q210 338 240 326 L238 268 Z"
              fill="url(#neckSkin)"
            />
            <path
              d="M182 272 Q210 296 238 272 L238 286 Q210 306 182 286 Z"
              fill="rgba(54, 24, 15, 0.28)"
            />
          </motion.g>

          {/* LAYER 3: Subtle Head Rig */}
          <motion.g
            style={{
              x: headTranslateX,
              y: headTranslateY,
              rotate: headRotate,
              originX: '210px',
              originY: '230px',
            }}
          >
            {/* Ears + Warm Gold Earrings */}
            <g>
              <ellipse cx="132" cy="218" rx="10" ry="17" fill="#BA7754" />
              <ellipse cx="133" cy="219" rx="5.5" ry="10" fill="#9E5E3F" opacity="0.6" />
              <circle cx="131" cy="233" r="3.2" fill="#FBBF24" />

              <ellipse cx="288" cy="218" rx="10" ry="17" fill="#BA7754" />
              <ellipse cx="287" cy="219" rx="5.5" ry="10" fill="#9E5E3F" opacity="0.6" />
              <circle cx="289" cy="233" r="3.2" fill="#FBBF24" />
            </g>

            {/* Face Contour */}
            <path
              d="M135 190 C135 135, 168 112, 210 112 C252 112, 285 135, 285 190 C285 245, 252 286, 210 290 C168 286, 135 245, 135 190 Z"
              fill="url(#faceSkin)"
            />

            {/* LAYER 4: Facial Features Parallax Group */}
            <motion.g style={{ x: faceShiftX, y: faceShiftY }}>
              {/* Soft Cheek Warmth */}
              <ellipse cx="160" cy="232" rx="19" ry="11" fill="url(#cheekBlush)" />
              <ellipse cx="260" cy="232" rx="19" ry="11" fill="url(#cheekBlush)" />

              {/* Subtle Golden Bindi */}
              <circle cx="210" cy="181" r="2.2" fill="#FBBF24" opacity="0.92" />

              {/* Eyebrows */}
              <g>
                <path
                  d="M144 191 Q166 181 188 189"
                  stroke="#1B1316"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                />
                <path
                  d="M232 189 Q254 181 276 191"
                  stroke="#1B1316"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                />
              </g>

              {/* LEFT EYE */}
              <g>
                <path
                  d="M149 208 C156 196, 179 196, 187 208 C179 218, 156 218, 149 208 Z"
                  fill="#F8FAFC"
                />
                <g clipPath="url(#leftEyeClip)">
                  <motion.g style={{ x: pupilX, y: pupilY }}>
                    <circle cx="168" cy="208" r="8.6" fill="url(#irisGrad)" />
                    <circle cx="168" cy="208" r="4.3" fill="#0F0806" />
                  </motion.g>
                  <motion.g style={{ x: glintX, y: glintY }}>
                    <circle cx="170.6" cy="205.2" r="2.1" fill="#FFFFFF" opacity="0.95" />
                    <circle cx="165.4" cy="210.4" r="1" fill="#FDE68A" opacity="0.85" />
                  </motion.g>
                  <path
                    d="M147 206 C156 194, 180 194, 189 206 L189 193 L147 193 Z"
                    fill="rgba(45, 22, 16, 0.22)"
                  />
                </g>

                <motion.path
                  d="M147 208 C156 195, 180 195, 189 208 L189 191 L147 191 Z"
                  fill="#C6825D"
                  style={{ originX: '168px', originY: '194px' }}
                  initial={false}
                  animate={{
                    scaleY: isBlinking ? 1.95 : 0.12,
                    opacity: isBlinking ? 1 : 0,
                  }}
                  transition={{ duration: 0.085, ease: 'easeInOut' }}
                />

                <motion.path
                  d="M146 207 C155 195, 180 195, 188 208"
                  stroke="#181115"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  animate={{
                    d: isBlinking
                      ? 'M147 209 C157 215, 179 215, 188 209'
                      : 'M146 207 C155 195, 180 195, 188 208',
                  }}
                  transition={{ duration: 0.085 }}
                />
                <path
                  d="M152 211 C160 217, 177 217, 185 210"
                  stroke="rgba(24, 17, 21, 0.35)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </g>

              {/* RIGHT EYE */}
              <g>
                <path
                  d="M233 208 C241 196, 264 196, 271 208 C264 218, 241 218, 233 208 Z"
                  fill="#F8FAFC"
                />
                <g clipPath="url(#rightEyeClip)">
                  <motion.g style={{ x: pupilX, y: pupilY }}>
                    <circle cx="252" cy="208" r="8.6" fill="url(#irisGrad)" />
                    <circle cx="252" cy="208" r="4.3" fill="#0F0806" />
                  </motion.g>
                  <motion.g style={{ x: glintX, y: glintY }}>
                    <circle cx="254.6" cy="205.2" r="2.1" fill="#FFFFFF" opacity="0.95" />
                    <circle cx="249.4" cy="210.4" r="1" fill="#FDE68A" opacity="0.85" />
                  </motion.g>
                  <path
                    d="M231 206 C240 194, 264 194, 273 206 L273 193 L231 193 Z"
                    fill="rgba(45, 22, 16, 0.22)"
                  />
                </g>

                <motion.path
                  d="M231 208 C240 195, 264 195, 273 208 L273 191 L231 191 Z"
                  fill="#C6825D"
                  style={{ originX: '252px', originY: '194px' }}
                  initial={false}
                  animate={{
                    scaleY: isBlinking ? 1.95 : 0.12,
                    opacity: isBlinking ? 1 : 0,
                  }}
                  transition={{ duration: 0.085, ease: 'easeInOut' }}
                />

                <motion.path
                  d="M232 208 C240 195, 265 195, 274 207"
                  stroke="#181115"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  animate={{
                    d: isBlinking
                      ? 'M232 209 C241 215, 263 215, 273 209'
                      : 'M232 208 C240 195, 265 195, 274 207',
                  }}
                  transition={{ duration: 0.085 }}
                />
                <path
                  d="M235 210 C243 217, 260 217, 268 211"
                  stroke="rgba(24, 17, 21, 0.35)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </g>

              {/* Sculpted Nose */}
              <path
                d="M210 202 L207 232 Q210 237 215 233"
                stroke="#9C5D40"
                strokeWidth="2.1"
                strokeLinecap="round"
              />
              <path
                d="M204 234 Q210 239 216 234"
                stroke="rgba(120, 62, 40, 0.45)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />

              {/* Composed Warm Smile */}
              <g>
                <path
                  d="M190 255 Q201 250 210 253 Q219 250 230 255 Q219 260 210 259 Q201 260 190 255 Z"
                  fill="#9B4847"
                />
                <path
                  d="M192 256 Q210 269 228 256 Q219 263 210 263 Q201 263 192 256 Z"
                  fill="#B85F59"
                />
                <path
                  d="M191 255.5 Q210 261 229 255.5"
                  stroke="#6E2E30"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M204 261 Q210 262.5 216 261"
                  stroke="rgba(255, 224, 212, 0.45)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g>
            </motion.g>

            {/* LAYER 5: Front Swept Hair & Crown */}
            <motion.g style={{ x: frontHairX, y: frontHairY }}>
              <path
                d="M128 196 C125 135, 162 92, 214 92 C266 92, 296 132, 292 196 C285 162, 265 134, 232 128 C210 124, 185 134, 166 154 C146 172, 134 185, 128 196 Z"
                fill="url(#hairMain)"
              />
              <path
                d="M142 146 C132 172, 129 208, 137 242 C123 216, 120 174, 131 142 Z"
                fill="#140F14"
              />
              <path
                d="M266 135 C284 162, 290 202, 282 242 C294 214, 296 170, 279 135 Z"
                fill="#140F14"
              />
              <path
                d="M154 128 Q195 104 246 116"
                stroke="url(#hairHighlight)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </motion.g>
          </motion.g>
        </svg>
      </div>

      {/* Understated Gaze Tracking Toggle */}
      <button
        type="button"
        onClick={() => setTrackingEnabled((prev) => !prev)}
        className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium text-slate-400 transition-colors hover:text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
      >
        {trackingEnabled ? (
          <>
            <Eye className="h-3.5 w-3.5 text-amber-400/80" />
            <span>Pause Gaze Tracking</span>
          </>
        ) : (
          <>
            <EyeOff className="h-3.5 w-3.5 text-slate-500" />
            <span>Resume Gaze Tracking</span>
          </>
        )}
      </button>
    </div>
  );
}
