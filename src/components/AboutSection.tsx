import { ArrowUpRight } from 'lucide-react';
import { ABOUT_FOCUS, PROFILE } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export function AboutSection({ onOpenResume }: AboutSectionProps) {
  return (
    <section id="about" className="relative z-10 border-b border-slate-800/70 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-violet-300">01. About</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Building practical web and AI applications.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-300">
              I am {PROFILE.name}, a Master of Computer Applications (MCA) graduate from Ethiraj
              College for Women, Chennai, with a Bachelor’s degree in Computer Science from
              Alagappa Government Arts College, Karaikudi.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
              Through internships at Aadhavan Consultancy LLP, IBM SkillBuild, and Zaalima
              Development Pvt. Ltd., I have gained hands-on experience in full-stack web
              development, responsive front-end interfaces, and AI-powered application modules.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span>{PROFILE.headline}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1 font-medium text-amber-300 transition-colors hover:text-amber-200 cursor-pointer"
              >
                <span>Open Printable Resume</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Focus Areas */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-800/80 rounded-xl border border-slate-800/80 bg-[#0C101B]/80">
              {ABOUT_FOCUS.map((item) => (
                <div key={item.index} className="p-6 sm:p-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs font-medium text-amber-400 tabular-nums">
                      {item.index}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-100">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
