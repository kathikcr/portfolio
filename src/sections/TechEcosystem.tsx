import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techCategories } from '../data/content';
import { Reveal } from '../components/ui/Reveal';
import styles from './TechEcosystem.module.css';

export function TechEcosystem() {
  const [activeId, setActiveId] = useState<string>(techCategories[0].id);
  const active = techCategories.find((c) => c.id === activeId) ?? techCategories[0];

  return (
    <section id="skills" className={`section ${styles.section}`} aria-label="Technical skills">
      <div className={`container ${styles.inner}`}>
        {/* Section Header */}
        <div className={styles.header}>
          <Reveal>
            <span className="eyebrow">Technical Ecosystem</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={`section-headline ${styles.headline}`}>
              Core Domains &amp; Technologies
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.sub}>
              Explore specialized capabilities, frameworks, languages, and low-level architectures across four engineering layers.
            </p>
          </Reveal>
        </div>

        {/* Main Grid: Left Categories + Right Domain Specification */}
        <div className={styles.body}>
          {/* Left: Interactive Category Selector */}
          <div className={styles.categoriesNav} role="tablist" aria-label="Technology domains">
            {techCategories.map((cat, i) => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  className={`${styles.catBtn} ${isActive ? styles.catActive : ''}`}
                  onClick={() => setActiveId(cat.id)}
                  type="button"
                >
                  <div className={styles.catLeft}>
                    <span className={styles.catIndex}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.catLabel}>{cat.label}</span>
                  </div>
                  <div className={styles.catRight}>
                    <span className={styles.catPillCount}>{cat.technologies.length}</span>
                    <span className={styles.catArrow} aria-hidden="true">→</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Rich Specification Card */}
          <div className={styles.detailCard} id={`panel-${active.id}`} role="tabpanel" aria-labelledby={`tab-${active.id}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className={styles.cardContent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Domain Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.headerTop}>
                    <span className={styles.specBadge}>Specialization</span>
                    <span className={styles.techCount}>{active.technologies.length} Core Technologies</span>
                  </div>
                  <h3 className={styles.domainTitle}>{active.label}</h3>
                  <p className={styles.domainDesc}>{active.description}</p>
                </div>

                {/* Core Architecture Highlights */}
                {active.highlights && active.highlights.length > 0 && (
                  <div className={styles.highlightsSection}>
                    <h4 className={styles.sectionHeading}>Engineering Focus &amp; Architectures</h4>
                    <div className={styles.highlightsGrid}>
                      {active.highlights.map((hl, idx) => (
                        <div key={idx} className={styles.highlightItem}>
                          <span className={styles.highlightIcon}>⚡</span>
                          <span className={styles.highlightText}>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Grid */}
                <div className={styles.techSection}>
                  <h4 className={styles.sectionHeading}>Technologies, Frameworks &amp; Tools</h4>
                  <div className={styles.tagsGrid}>
                    {active.technologies.map((tech, idx) => (
                      <motion.div
                        key={tech}
                        className={styles.tagItem}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.03, duration: 0.2 }}
                      >
                        <span className={styles.tagDot} />
                        <span className={styles.tagName}>{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
