import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Layers, X } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ACADEMIC_PROJECTS,
  INTERNSHIP_SHOWCASE,
  PROFILE,
  type ShowcaseItem,
} from '../data/portfolioData';

type ShowcaseFilter = 'all' | 'academic' | 'internship';

const ALL_ITEMS: ShowcaseItem[] = [...ACADEMIC_PROJECTS, ...INTERNSHIP_SHOWCASE];

const FILTER_TABS: { id: ShowcaseFilter; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'academic', label: 'Academic Projects' },
  { id: 'internship', label: 'Internship Showcase' },
];

function ShowcaseImage({
  src,
  alt,
  title,
  className = '',
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#131A2D] via-[#0C101C] to-[#07090F] p-6 text-center ${className}`}
      >
        <Layers className="h-8 w-8 text-amber-400/80" />
        <span className="mt-2 font-display text-sm font-medium text-slate-200">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<ShowcaseFilter>('all');
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowRight') {
        const idx = ALL_ITEMS.findIndex((p) => p.id === selectedItem.id);
        setSelectedItem(ALL_ITEMS[(idx + 1) % ALL_ITEMS.length]);
      } else if (e.key === 'ArrowLeft') {
        const idx = ALL_ITEMS.findIndex((p) => p.id === selectedItem.id);
        setSelectedItem(ALL_ITEMS[(idx - 1 + ALL_ITEMS.length) % ALL_ITEMS.length]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const navigateItem = (direction: 1 | -1) => {
    if (!selectedItem) return;
    const idx = ALL_ITEMS.findIndex((p) => p.id === selectedItem.id);
    const nextIdx = (idx + direction + ALL_ITEMS.length) % ALL_ITEMS.length;
    setSelectedItem(ALL_ITEMS[nextIdx]);
  };

  const showAcademic = filter === 'all' || filter === 'academic';
  const showInternship = filter === 'all' || filter === 'internship';

  return (
    <section id="projects" className="relative z-10 border-b border-slate-800/70 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-violet-300">
              04. Projects & Internship Work
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Academic projects & internship showcase
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects and internship showcase"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#0C101B] p-1"
          >
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-[#07090F] font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SUBSECTION A: ACADEMIC PROJECTS */}
        {showAcademic && (
          <div className="mt-10">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800/80 pb-3">
              <h3 className="font-display text-xl font-semibold text-slate-100">
                Academic Projects
              </h3>
              <span className="text-xs text-slate-400">
                Conceptual illustrations · Click any card for full details
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {ACADEMIC_PROJECTS.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-800/85 bg-[#0C101B]/90 transition-colors duration-200 hover:border-amber-400/45"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedItem(project)}
                    aria-label={`View details for ${project.title}`}
                    className="relative block aspect-video w-full overflow-hidden bg-[#07090F] text-left cursor-pointer"
                  >
                    <ShowcaseImage
                      src={project.image}
                      alt={project.imageAlt}
                      title={project.title}
                      className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090F]/70 via-transparent to-transparent"
                    />
                  </button>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-medium text-amber-300">Academic Project</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span>Conceptual Illustration</span>
                      </div>
                      <h4 className="mt-2 font-display text-xl font-semibold text-slate-50">
                        {project.title}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-violet-200">
                        {project.subtitle}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {project.description}
                      </p>

                      <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-slate-400">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                      <span className="text-xs text-slate-300">
                        {project.technologies.join(' · ')}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedItem(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 transition-colors hover:text-amber-200 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Project Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* SUBSECTION B: INTERNSHIP WORK SHOWCASE */}
        {showInternship && (
          <div className={showAcademic ? 'mt-14' : 'mt-10'}>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800/80 pb-3">
              <h3 className="font-display text-xl font-semibold text-slate-100">
                Internship Work Showcase
              </h3>
              <span className="text-xs text-slate-400">
                Modules & applications built during internships · Conceptual illustrations
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {INTERNSHIP_SHOWCASE.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-800/85 bg-[#0C101B]/90 transition-colors duration-200 hover:border-violet-400/50"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    aria-label={`View details for ${item.title}`}
                    className="relative block aspect-video w-full overflow-hidden bg-[#07090F] text-left cursor-pointer"
                  >
                    <ShowcaseImage
                      src={item.image}
                      alt={item.imageAlt}
                      title={item.title}
                      className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090F]/70 via-transparent to-transparent"
                    />
                  </button>

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-medium text-violet-300">Internship Work</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span>Conceptual Illustration</span>
                      </div>
                      <h4 className="mt-2 font-display text-lg font-semibold text-slate-50">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs font-medium text-amber-300">{item.context}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                      <span className="text-xs text-slate-400">
                        {item.technologies.join(' · ')}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 transition-colors hover:text-amber-200 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Detail Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="showcase-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-[#0B0F1A] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-800 bg-[#0B0F1A]/95 px-5 py-4 backdrop-blur-md sm:px-7">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-medium text-amber-300">
                  {selectedItem.kind === 'academic' ? 'Academic Project' : 'Internship Work'}
                </span>
                <span aria-hidden="true">·</span>
                <span>Conceptual Illustration</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateItem(-1)}
                  aria-label="Previous item"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#0E121D] text-slate-300 hover:border-slate-700 hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateItem(1)}
                  aria-label="Next item"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#0E121D] text-slate-300 hover:border-slate-700 hover:text-white cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close modal"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#0E121D] text-slate-300 hover:border-amber-400/50 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="aspect-video w-full overflow-hidden border-b border-slate-800 bg-[#07090F]">
              <ShowcaseImage
                src={selectedItem.image}
                alt={selectedItem.imageAlt}
                title={selectedItem.title}
              />
            </div>

            <div className="p-6 sm:p-8">
              <h3
                id="showcase-modal-title"
                className="font-display text-2xl font-bold text-slate-50 sm:text-3xl"
              >
                {selectedItem.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-violet-300">
                {selectedItem.kind === 'academic'
                  ? selectedItem.subtitle
                  : `${selectedItem.context} (${selectedItem.period})`}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {selectedItem.description}
              </p>

              {selectedItem.kind === 'academic' && (
                <div className="mt-5 rounded-xl border border-slate-800 bg-[#07090F]/80 p-5">
                  <h4 className="font-display text-sm font-semibold text-slate-100">
                    Key Implementation Details
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {selectedItem.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-slate-300">
                  <span className="font-medium text-slate-400">Technologies: </span>
                  {selectedItem.technologies.join(' · ')}
                </div>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 text-xs font-semibold text-[#07090F] hover:bg-amber-300 whitespace-nowrap shrink-0"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
