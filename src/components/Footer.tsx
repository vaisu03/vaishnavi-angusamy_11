import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const FOOTER_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="no-print relative z-10 border-t border-slate-800/80 bg-[#07090F]/90 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <div className="font-display text-base font-semibold text-slate-100">
            {PROFILE.name}
          </div>
          <p className="mt-1 text-xs text-slate-400">
            © {new Date().getFullYear()} {PROFILE.name}. Crafted with precision and purpose.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.id);
              }}
              className="text-xs font-medium text-slate-400 transition-colors hover:text-amber-300 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex min-h-[38px] items-center gap-1.5 self-start rounded-lg border border-slate-800 bg-[#0C101B] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-amber-300 md:self-auto whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
