import { INTERNSHIPS } from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 border-b border-slate-800/70 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-violet-300">
            03. Internship Experience
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            Hands-on internship journey
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
            Practical software engineering experience across AI application modules, front-end
            interfaces, and MERN-stack web development.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {INTERNSHIPS.map((exp) => (
            <article
              key={exp.id}
              className="rounded-xl border border-slate-800/85 bg-[#0C101B]/85 p-6 sm:p-7 transition-colors hover:border-violet-400/35"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-medium text-amber-300">{exp.company}</span>
                    {exp.location && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{exp.location}</span>
                      </>
                    )}
                    <span aria-hidden="true">·</span>
                    <span>Internship</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-slate-50">
                    {exp.role}
                  </h3>
                </div>

                <div className="font-mono text-xs font-medium text-violet-200 tabular-nums shrink-0">
                  {exp.period}
                </div>
              </div>

              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-300">
                {exp.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
