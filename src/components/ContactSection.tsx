import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, Mail, Phone, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (value: string, field: 'email' | 'phone') => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject.trim() || `Portfolio Inquiry from ${name.trim() || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Hi ${PROFILE.name},\n\n${message.trim()}\n\nBest,\n${name.trim()} (${email.trim()})`
  )}`;

  return (
    <section id="contact" className="relative z-10 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Direct Channels */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-violet-300">07. Contact</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Get in touch with {PROFILE.name}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
              Open to Full-Stack Development, Front-End Engineering, and AI Application
              Development opportunities. Feel free to reach out directly via email, phone, or the
              contact form.
            </p>

            {/* Direct Contact Block */}
            <div className="mt-8 space-y-4 rounded-xl border border-slate-800/85 bg-[#0C101B]/85 p-6">
              <div>
                <div className="text-xs text-slate-400">Email</div>
                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-mono text-sm font-medium text-slate-100 hover:text-amber-300"
                  >
                    {PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.email, 'email')}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 bg-[#07090F] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-500 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-4">
                <div className="text-xs text-slate-400">Phone</div>
                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2 font-mono text-sm font-medium text-slate-100 hover:text-amber-300 tabular-nums"
                  >
                    <Phone className="h-3.5 w-3.5 text-amber-400" />
                    <span>{PROFILE.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.phone, 'phone')}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 bg-[#07090F] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-500 cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 border-t border-slate-800/80 pt-4 text-xs font-medium">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-amber-300"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-amber-300"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-800/85 bg-[#0C101B]/90 p-6 sm:p-8">
              {submitted ? (
                <div className="py-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-slate-50">
                    Message prepared for {PROFILE.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Thank you, <span className="font-medium text-slate-100">{name}</span>. You can
                    open your email client below to send your message directly to{' '}
                    <span className="font-mono text-amber-300">{PROFILE.email}</span>.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#07090F] hover:bg-amber-300"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-500 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-2 w-full rounded-lg border border-slate-800 bg-[#07090F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-lg border border-slate-800 bg-[#07090F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300">
                      Subject (Optional)
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Full-Stack / AI Developer Inquiry"
                      className="mt-2 w-full rounded-lg border border-slate-800 bg-[#07090F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="mt-2 w-full rounded-lg border border-slate-800 bg-[#07090F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none resize-y"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-rose-400">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-end gap-4 pt-1">
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#07090F] transition-colors hover:bg-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
