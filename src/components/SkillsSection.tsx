import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_GROUPS, type SkillGroup } from '../data/portfolioData';

type SkillFilter = 'all' | SkillGroup['category'];

const FILTER_OPTIONS: { id: SkillFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'languages', label: 'Languages' },
  { id: 'web', label: 'Web' },
  { id: 'databases', label: 'Databases' },
  { id: 'tools', label: 'Tools' },
  { id: 'concepts', label: 'Concepts' },
];

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('all');

  const visibleGroups =
    activeFilter === 'all'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((group) => group.category === activeFilter);

  return (
    <section id="skills" className="relative z-10 border-b border-slate-800/70 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-violet-300">02. Technical Skills</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Languages, web stack & core concepts
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter technical skills by category"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#0C101B] p-1"
          >
            {FILTER_OPTIONS.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
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

        <div
          className={`mt-10 grid grid-cols-1 gap-6 ${
            visibleGroups.length === 1
              ? 'max-w-2xl'
              : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {visibleGroups.map((group, idx) => (
            <motion.div
              key={group.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-slate-800/85 bg-[#0C101B]/85 p-6 transition-colors hover:border-violet-400/35"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-slate-800/80 pb-3.5">
                <h3 className="font-display text-lg font-semibold text-slate-100">
                  {group.title}
                </h3>
                <span className="font-mono text-xs text-amber-400 tabular-nums">
                  0{idx + 1}
                </span>
              </div>

              <ul className="mt-4 divide-y divide-slate-800/60">
                {group.items.map((skillName) => (
                  <li
                    key={skillName}
                    className="flex items-center justify-between py-2.5 text-sm text-slate-200 first:pt-0 last:pb-0"
                  >
                    <span>{skillName}</span>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-violet-300/70"
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
