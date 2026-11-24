import { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import {
  ACADEMIC_PROJECTS,
  CERTIFICATIONS,
  EDUCATION,
  INTERNSHIPS,
  PROFILE,
  SKILL_GROUPS,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-[#0B0F1A] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="no-print sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-800 bg-[#0B0F1A]/95 px-6 py-4 backdrop-blur-md">
          <h2 id="resume-modal-title" className="font-display text-lg font-semibold text-slate-50">
            Resume — {PROFILE.name}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-semibold text-[#07090F] hover:bg-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#0E121D] text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="space-y-7 p-6 sm:p-8 text-slate-200">
          <div className="border-b border-slate-800 pb-5">
            <h3 className="font-display text-2xl font-bold text-slate-50">{PROFILE.name}</h3>
            <p className="mt-1 text-sm font-medium text-violet-300">{PROFILE.headline}</p>
            <p className="mt-2 text-xs text-slate-400">
              {PROFILE.email} · {PROFILE.phone} · GitHub: {PROFILE.github} · LinkedIn:{' '}
              {PROFILE.linkedin}
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Internship Experience
            </h4>
            <div className="mt-3 space-y-5">
              {INTERNSHIPS.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-semibold text-slate-100">
                      {exp.role} — <span className="text-slate-300">{exp.company}</span>
                      {exp.location ? <span className="text-slate-400">, {exp.location}</span> : ''}
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs leading-relaxed text-slate-300">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Academic Projects
            </h4>
            <div className="mt-3 space-y-4">
              {ACADEMIC_PROJECTS.map((proj) => (
                <div key={proj.id}>
                  <div className="text-sm font-semibold text-slate-100">
                    {proj.title}{' '}
                    <span className="font-normal text-xs text-slate-400">
                      ({proj.technologies.join(', ')})
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Technical Skills
            </h4>
            <div className="mt-3 space-y-1.5 text-xs text-slate-300">
              {SKILL_GROUPS.map((group) => (
                <p key={group.id}>
                  <span className="font-semibold text-slate-100">{group.title}: </span>
                  {group.items.join(', ')}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h4 className="font-display text-xs font-semibold tracking-wider text-amber-300 uppercase">
                Education
              </h4>
              <div className="mt-3 space-y-3 text-xs">
                {EDUCATION.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-semibold text-slate-100">{edu.degree}</div>
                    <div className="text-slate-400">
                      {edu.institution} · {edu.period} · CGPA: {edu.cgpa}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display text-xs font-semibold tracking-wider text-amber-300 uppercase">
                Certifications
              </h4>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.id}>
                    • {cert.name}
                    {cert.issuer ? ` – ${cert.issuer}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
