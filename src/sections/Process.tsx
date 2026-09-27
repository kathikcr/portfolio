import { motion } from 'framer-motion';
import { processSteps } from '../data/content';
import { Reveal } from '../components/ui/Reveal';
import styles from './Process.module.css';

export function Process() {
  return (
    <section id="process" className={`section ${styles.section}`} aria-label="How I build">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <Reveal>
            <span className="eyebrow">How I Build</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={`section-headline ${styles.headline}`}>
              Deliberate by design.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.sub}>
              Engineering is a discipline of tradeoffs. Here's how I approach them.
            </p>
          </Reveal>
        </div>

        <div className={styles.steps}>
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={styles.stepNum}>{step.number}</span>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
              {i < processSteps.length - 1 && (
                <span className={styles.connector} aria-hidden />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
