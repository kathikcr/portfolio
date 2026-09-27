import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { modelCredits } from '../../data/credits';
import styles from './Footer.module.css';

function CreditsModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="3D model credits"
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>3D Model Credits</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close credits"
          >
            ✕
          </button>
        </div>
        <ul className={styles.creditList} role="list">
          {modelCredits.map((credit) => (
            <li key={credit.fileName} className={styles.creditItem}>
              <div className={styles.creditName}>{credit.modelName}</div>
              <div className={styles.creditMeta}>
                <span className={styles.creditCreator}>by {credit.creator}</span>
                {credit.sourceUrl !== '#' && (
                  <a
                    href={credit.sourceUrl}
                    className={styles.creditLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source ↗
                  </a>
                )}
                <a
                  href={credit.licenseUrl !== '#' ? credit.licenseUrl : undefined}
                  className={styles.creditLicense}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {credit.license}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.creditsNote}>
          ⚠ Some credits are marked as unknown. Update{' '}
          <code>src/data/credits.ts</code> with correct attribution before
          publishing.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Footer() {
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Karthik C R. Built with React, Three.js &amp; Framer Motion.
        </p>
        <button
          className={styles.creditsBtn}
          onClick={() => setCreditsOpen(true)}
          aria-label="View 3D model credits"
        >
          Credits
        </button>
      </div>

      <AnimatePresence>
        {creditsOpen && (
          <CreditsModal onClose={() => setCreditsOpen(false)} />
        )}
      </AnimatePresence>
    </footer>
  );
}
