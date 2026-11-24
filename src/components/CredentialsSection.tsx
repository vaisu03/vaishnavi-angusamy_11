import { Award, GraduationCap } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../data/portfolioData';

export function CredentialsSection() {
  return (
    <>
      {/* 05. EDUCATION SECTION */}
      <section id="education" className="relative z-10 border-b border-slate-800/70 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-violet-300">05. Education</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Academic qualifications
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {EDUCATION.map((edu) => (
              <article
                key={edu.id}
                className="flex flex-col justify-between rounded-xl border border-slate-800/85 bg-[#0C101B]/85 p-6 sm:p-7 transition-colors hover:border-violet-400/35"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#07090F] text-amber-300 shrink-0">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-violet-200 tabular-nums">
                      {edu.period}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-slate-50">
                    {edu.degree}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-slate-300">{edu.institution}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs">
                  <span className="text-slate-400">Academic Grade</span>
                  <span className="font-mono font-semibold text-amber-300 tabular-nums">
                    CGPA: {edu.cgpa}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06. CERTIFICATIONS SECTION */}
      <section
        id="certifications"
        className="relative z-10 border-b border-slate-800/70 py-16 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-violet-300">
              06. Certifications
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Completed certifications
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((cert) => (
              <article
                key={cert.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-800/85 bg-[#0C101B]/85 p-5 sm:p-6 transition-colors hover:border-amber-400/35"
              >
                <div>
                  <h3 className="font-display text-base font-semibold text-slate-100">
                    {cert.name}
                  </h3>
                  {cert.issuer && (
                    <p className="mt-1.5 text-xs font-medium text-violet-300">{cert.issuer}</p>
                  )}
                </div>
                <Award className="mt-0.5 h-4 w-4 text-amber-400 shrink-0" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
