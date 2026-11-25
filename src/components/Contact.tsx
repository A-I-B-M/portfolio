import { useState, type FormEvent } from 'react';
import { AlertCircle, Check, CheckCircle2, Copy, Mail, Send } from 'lucide-react';
import { siteContent } from '../data/content';
import { CodeforcesIcon, GitHubIcon, LinkedInIcon } from './ui/BrandIcons';
import { Button } from './ui/Button';
import { Section } from './ui/Section';

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
      next.message = 'Please write a short message.';
    } else if (draft.message.trim().length < 10) {
      next.message = 'Message must be at least 10 characters.';
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const useFormspree = !contact.formspreeEndpoint.includes('YOUR_FORMSPREE_ID');
    const endpoint = useFormspree ? contact.formspreeEndpoint : contact.formSubmitEndpoint;

    setStatus('submitting');
    setErrorMessage('');

    const payload = useFormspree
      ? {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }
      : {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: `Portfolio message from ${values.name.trim()}`,
          _replyto: values.email.trim(),
          _template: 'table',
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setValues({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(
          `Message could not be sent right now. Please try again or email ${contact.email} directly.`,
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Could not reach the mail service. You can open a pre-filled draft in your email app below.',
      );
    }
  };

  const mailtoFallbackHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    values.name.trim() ? `Portfolio message from ${values.name.trim()}` : 'Portfolio inquiry',
  )}&body=${encodeURIComponent(
    `From: ${values.name.trim()} (${values.email.trim()})\n\n${values.message.trim()}`,
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // mailto link remains directly clickable
    }
  };

  const socialItems = [
    { label: 'GitHub', handle: '@A-I-B-M', href: contact.socials.github, icon: GitHubIcon },
    { label: 'LinkedIn', handle: 'in/amdadul09', href: contact.socials.linkedin, icon: LinkedInIcon },
    {
      label: 'Codeforces',
      handle: 'amdadul_',
      href: contact.socials.codeforces,
      icon: CodeforcesIcon,
    },
  ];

  const inputBaseClass =
    'w-full rounded-[6px] border bg-[var(--bg)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none';

  return (
    <Section id="contact" ariaLabelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Left direct info column */}
        <div className="lg:col-span-5">
          <p className="type-meta mb-3 text-[var(--text-muted)]">05 / CONTACT</p>
          <h2 id="contact-heading" className="type-h2 text-[var(--text-primary)]">
            {contact.heading}
          </h2>
          <p className="type-body mt-4 max-w-[44ch] text-[var(--text-secondary)]">
            {contact.description}
          </p>

          <div className="mt-8 border-y border-[var(--border)] py-4">
            <p className="type-meta text-[var(--text-muted)]">Email</p>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-w-0 items-center gap-2 font-display text-[15px] font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span className="truncate">{contact.email}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="type-meta inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-[6px] border border-[var(--border)] px-2.5 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
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
          </div>

          <ul className="mt-6 space-y-2.5">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-[6px] py-1.5 text-[14px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    <span className="inline-flex items-center gap-2.5 font-medium">
                      <Icon className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                      {item.label}
                    </span>
                    <span className="type-meta text-[var(--text-muted)]">{item.handle}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right form container */}
        <div className="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 lg:col-span-7">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="type-meta mb-2 block text-[var(--text-secondary)]"
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
                    errors.name ? 'border-rose-500/70' : 'border-[var(--border)]'
                  }`}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-[12px] text-rose-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="type-meta mb-2 block text-[var(--text-secondary)]"
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
                    errors.email ? 'border-rose-500/70' : 'border-[var(--border)]'
                  }`}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-[12px] text-rose-500">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="type-meta mb-2 block text-[var(--text-secondary)]"
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
                placeholder="Tell me about the role or project."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${inputBaseClass} resize-y ${
                  errors.message ? 'border-rose-500/70' : 'border-[var(--border)]'
                }`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-[12px] text-rose-500">
                  {errors.message}
                </p>
              )}
            </div>

            {status === 'success' && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-[6px] border border-[var(--accent-border)] bg-[var(--accent-subtle)] p-3.5 text-[14px] text-[var(--text-primary)]"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                  aria-hidden="true"
                />
                <span>Message sent. I will get back to you soon.</span>
              </div>
            )}

            {status === 'error' && errorMessage && (
              <div
                role="alert"
                className="flex flex-col gap-2 rounded-[6px] border border-rose-500/35 bg-rose-500/10 p-3.5 text-[14px] text-rose-700 dark:text-rose-300"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
                <a
                  href={mailtoFallbackHref}
                  className="ml-6 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium underline underline-offset-4 hover:opacity-80"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Open pre-filled draft in email app
                </a>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p className="type-meta text-[var(--text-muted)]">
                Sent directly to {contact.email}
              </p>
              <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
