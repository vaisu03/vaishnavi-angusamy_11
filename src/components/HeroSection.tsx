import { ArrowRight, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_FACTS, PROFILE } from '../data/portfolioData';
import { CosmicAvatar } from './CosmicAvatar';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="top" className="relative z-10 border-b border-slate-800/70">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Unboxed Headline Kicker */}
            <p className="mb-3 text-xs font-medium tracking-wide text-violet-300">
              {PROFILE.headline}
            </p>

            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-[3.5rem]">
              {PROFILE.name}
            </h1>

            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-slate-300 sm:text-[17px]">
              <p>{PROFILE.introParagraph1}</p>
              <p className="text-slate-400">{PROFILE.introParagraph2}</p>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#07090F] transition-colors duration-150 hover:bg-amber-300 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700/80 bg-[#0E121D] px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors duration-150 hover:border-violet-400/60 hover:bg-slate-800/70 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-amber-400" />
                <span>View Resume</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Illustrated Cosmic Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <CosmicAvatar />
          </motion.div>
        </div>

        {/* Full-Width 4-Column Factual Resume Strip Below Hero Split */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-slate-800/80 pt-10 lg:grid-cols-4">
          {HERO_FACTS.map((fact) => (
            <div key={fact.label} className="space-y-1">
              <div className="font-mono text-2xl font-semibold tracking-tight text-slate-50 tabular-nums sm:text-3xl">
                {fact.value}
              </div>
              <div className="text-sm font-medium text-amber-300">{fact.label}</div>
              <p className="text-xs leading-relaxed text-slate-400">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
