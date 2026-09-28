import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactLinks } from '../data/content';
import { Reveal } from '../components/ui/Reveal';
import styles from './Contact.module.css';

/* Contact form */
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus('sending');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactLinks.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          _replyto: formData.get('email'),
          message: formData.get('message'),
          _subject: 'New message from your portfolio',
          _honey: formData.get('_honey'),
        }),
      });
      const result = await response.json() as { success?: boolean | string };
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('Submission was not accepted');
      }
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        className={styles.successMsg}
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <p>Thanks — your message has been sent. I will get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <>
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.honeypot} type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="contact-name" className={styles.label}>Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            className={styles.input}
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="contact-email" className={styles.label}>Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            className={styles.input}
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className={styles.formField}>
        <label htmlFor="contact-message" className={styles.label}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          className={`${styles.input} ${styles.textarea}`}
          placeholder="What would you like to build or discuss?"
          rows={5}
          required
        />
      </div>
      <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message →'}
      </button>
      <p className={styles.privacyNote}>
        Messages are delivered to Karthik by FormSubmit. The service may keep submissions for up to 30 days; please don’t include sensitive information.
      </p>
    </form>
      {status === 'error' && (
        <p className={styles.formStatus} role="alert">
          Your message could not be sent. Please try again or email me directly at{' '}
          <a href={contactLinks.emailHref}>{contactLinks.email}</a>.
        </p>
      )}
    </>
  );
}

/* Main Contact section */
export function Contact() {
  const directLinks = [
    { label: 'Email', href: contactLinks.emailHref, display: contactLinks.email },
    { label: 'Phone', href: contactLinks.phoneHref, display: contactLinks.phone },
    { label: 'LinkedIn', href: contactLinks.linkedin, display: 'linkedin.com/in/karthik-cr' },
    { label: 'GitHub', href: contactLinks.github, display: 'github.com/kathikcr' },
  ];

  return (
    <section id="contact" className={`section ${styles.section}`} aria-label="Contact">
      {/* Background ambient gradient glow */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Left: headline + links */}
        <div className={styles.textSide}>
          <Reveal>
            <span className="eyebrow">Get In Touch</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={`section-headline ${styles.headline}`}>
              Let's engineer together.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.sub}>
              Available for software engineering roles, high-concurrency backend development, and deep learning research collaborations.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className={styles.links}>
              {directLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.contactLink}
                  target={link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                >
                  <span className={styles.contactLinkLabel}>{link.label}</span>
                  <span className={styles.contactLinkDisplay}>{link.display} ↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.15} direction="left" className={styles.formSide}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
