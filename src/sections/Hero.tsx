import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { contactLinks } from '../data/content';
import styles from './Hero.module.css';

/* ── Scroll indicator ────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className={styles.scrollIndicator}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      aria-hidden="true"
    >
      <span className={styles.scrollLabel}>Scroll</span>
      <motion.span
        className={styles.scrollDot}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

/* ── Hero section ────────────────────────────────────── */
export function Hero() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const domainPills = [
    { label: '3D Medical AI & Segmentation', tag: 'Deep Learning' },
    { label: 'High-Concurrency TCP Sockets', tag: 'Systems & Networking' },
    { label: 'Agentic B2B RFP Automation', tag: 'CrewAI & Gen AI' },
    { label: 'Sub-Meter BLE RSSI Tracking', tag: 'Embedded & IoT' },
  ];

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      {/* Background ambient lighting */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.gridPattern} aria-hidden="true" />

      {/* Main hero container */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Status badge */}
          <motion.div
            className={styles.statusBadge}
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <span className={styles.statusDot} />
            <span className={styles.statusText}>MTech Integrated · Software Engineering · VIT Chennai</span>
          </motion.div>

          {/* Headline */}
          <h1 className={styles.headline}>
            <motion.span
              className={styles.headlineLine}
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Hi, I'm
            </motion.span>
            <motion.span
              className={`${styles.headlineLine} ${styles.headlineName}`}
              custom={0.45}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Karthik C R.
            </motion.span>
          </h1>

          {/* Role subtitle */}
          <motion.p
            className={styles.roles}
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Software Engineer&nbsp;&nbsp;·&nbsp;&nbsp;Systems &amp; Backend&nbsp;&nbsp;·&nbsp;&nbsp;AI/ML&nbsp;&nbsp;·&nbsp;&nbsp;IoT
          </motion.p>

          {/* Narrative statement */}
          <motion.p
            className={styles.statement}
            custom={0.75}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Engineering robust systems from the ground up — from high-concurrency Java socket servers
            and autonomous CrewAI workflows to 3D deep learning pipelines and real-time embedded hardware.
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            className={styles.actions}
            custom={0.9}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <a
              href="#projects"
              className={styles.primaryCta}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#projects');
                if (target) {
                  const navOffset = 84;
                  const pos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
            >
              Explore Selected Work
            </a>
            <a
              href={contactLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeCta}
            >
              View Resume ↗
            </a>
            <a
              href="#contact"
              className={styles.secondaryCta}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contact');
                if (target) {
                  const navOffset = 84;
                  const pos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right side interactive telemetry cards */}
        <motion.div
          className={styles.telemetrySide}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div className={styles.telemetryHeader}>
            <span className={styles.telemetryTag}>CORE CAPABILITIES</span>
            <span className={styles.telemetryPulse} />
          </div>

          <div className={styles.pillList}>
            {domainPills.map((pill, i) => (
              <motion.div
                key={pill.label}
                className={styles.domainPill}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.pillTag}>{pill.tag}</span>
                <span className={styles.pillLabel}>{pill.label}</span>
              </motion.div>
            ))}
          </div>

          <div className={styles.telemetryFooter}>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>2</span>
              <span className={styles.metricLbl}>Published Papers</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>8.86</span>
              <span className={styles.metricLbl}>CGPA · M.Tech</span>
            </div>
          </div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
