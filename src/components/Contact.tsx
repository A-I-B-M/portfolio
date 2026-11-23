import { useState, type FormEvent } from 'react';
import { AlertCircle, Check, CheckCircle2, Copy, Mail, Send } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiCodeforces, SiGithub } from 'react-icons/si';
import { siteContent } from '../data/content';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { contact } = siteContent;
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const validate = (draft: FormValues): FormErrors => {
    const next: FormErrors = {};
    if (!draft.name.trim()) {
      next.name = 'Please enter your name.';
    } else if (draft.name.trim().length < 2) {
      next.name = 'Name must be at least 2 characters.';
    }
    if (!draft.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(draft.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!draft.message.trim()) {
      next.message = 'Please include a short message.';
    } else if (draft.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters.';
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (contact.formspreeEndpoint.includes('YOUR_FORMSPREE_ID')) {
      setStatus('error');
      setErrorMessage(
        `The contact form endpoint is not configured yet. Replace YOUR_FORMSPREE_ID in src/data/content.ts or email me directly at ${contact.email}.`,
      );
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(contact.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setValues({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(
          `Something went wrong sending your message. Please try again or email ${contact.email} directly.`,
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        `Unable to reach the form service right now. You can email me directly at ${contact.email}.`,
      );
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: mailto link is always right next to it
    }
  };

  const socialItems = [
    { label: 'GitHub', handle: '@amdadul', href: contact.socials.github, icon: SiGithub },
    { label: 'LinkedIn', handle: 'in/amdadul', href: contact.socials.linkedin, icon: FaLinkedinIn },
    {
      label: 'Codeforces',
      handle: 'amdadul',
      href: contact.socials.codeforces,
      icon: SiCodeforces,
    },
  ];

  const inputBaseClass =
    'w-full rounded-xl border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)] transition-colors focus:border-[var(--accent)] focus:outline-none';

  return (
    <Section id="contact" ariaLabelledBy="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title={contact.heading}
        description={contact.description}
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Direct Info & Socials */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Card className="p-6">
            <p className="text-xs font-semibold tracking-wider text-[var(--fg-subtle)] uppercase">
              Direct Email
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="link-underline inline-flex items-center gap-2.5 truncate font-display text-base font-semibold text-[var(--fg)]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span className="truncate">{contact.email}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2.5 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </Card>

          <Card className="flex-1 p-6" hoverLift={false}>
            <p className="text-xs font-semibold tracking-wider text-[var(--fg-subtle)] uppercase">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              {socialItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/60 px-4 py-3 text-sm transition-all duration-200 hover:border-[var(--accent)]/40 hover:bg-[var(--surface-elevated)]"
                    >
                      <span className="inline-flex items-center gap-3 font-medium text-[var(--fg)]">
                        <Icon className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                        {item.label}
                      </span>
                      <span className="text-xs text-[var(--fg-subtle)]">{item.handle}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        {/* Formspree Contact Form */}
        <Card className="p-6 sm:p-8 lg:col-span-7" hoverLift={false}>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-semibold tracking-wide text-[var(--fg-muted)] uppercase"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`${inputBaseClass} ${
                    errors.name ? 'border-rose-500/70' : 'border-[var(--border-subtle)]'
                  }`}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-rose-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-semibold tracking-wide text-[var(--fg-muted)] uppercase"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`${inputBaseClass} ${
                    errors.email ? 'border-rose-500/70' : 'border-[var(--border-subtle)]'
                  }`}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-rose-500">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-xs font-semibold tracking-wide text-[var(--fg-muted)] uppercase"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={values.message}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, message: e.target.value }));
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                placeholder="Tell me about your project, role, or idea..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${inputBaseClass} resize-y ${
                  errors.message ? 'border-rose-500/70' : 'border-[var(--border-subtle)]'
                }`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs text-rose-500">
                  {errors.message}
                </p>
              )}
            </div>

            {status === 'success' && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-emerald-700 dark:text-emerald-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Thanks for reaching out! Your message has been sent successfully.</span>
              </div>
            )}

            {status === 'error' && errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-sm text-rose-700 dark:text-rose-300"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-1">
              <p className="text-xs text-[var(--fg-subtle)]">
                Powered by Formspree · No spam, ever.
              </p>
              <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
}
