import { motion } from 'framer-motion';
import { Reveal, Stagger, staggerItem } from '../components/ui/Reveal';
import styles from './Research.module.css';

const publications = [
  {
    title: 'Fusing Appearance and Vein Morphology Using Dual-Branch Deep Networks for Accurate Medicinal Plant Identification',
    journal: 'Frontiers in Artificial Intelligence',
    volume: 'Vol. 9, April 2026',
    doi: 'https://doi.org/10.3389/frai.2026.1771431',
    status: 'Published Paper',
    description: 'Designed a dual-branch deep neural network integrating macroscopic visual appearance with microscopic leaf vein morphology for resilient botanical classification.',
  },
  {
    title: 'Hyperparameter Tuning Strategies for Robust Machine Learning in Android Malware Detection',
    journal: 'Security and Privacy, Wiley',
    volume: '2025',
    doi: 'https://doi.org/10.1002/spy2.70159',
    status: 'Published Paper',
    description: 'Investigated systematic hyperparameter optimization techniques to improve classification resilience and accuracy across evolving Android malware families.',
  },
];

const researchItems = [
  {
    tag: '3D U-Net',
    description:
      'Volumetric encoder-decoder neural network capturing rich 3D spatial voxel relationships across multi-sequence MRI scans.',
  },
  {
    tag: 'Composite Loss',
    description:
      'Formulation balancing Dice, Focal, and Cross-Entropy loss terms to address extreme class imbalance between tumor sub-regions and healthy tissue.',
  },
  {
    tag: 'SSOA Optimization',
    description:
      'Shepherd-inspired Search Optimization Algorithm — a bio-inspired metaheuristic optimizing composite loss weighting hyperparameters automatically.',
  },
  {
    tag: 'Seg-Grad-CAM',
    description:
      'Gradient-weighted spatial attribution producing visual saliency maps to explain and validate deep learning decisions clinically.',
  },
];

export function Research() {
  return (
    <section id="research" className={`section ${styles.section}`} aria-label="Research">
      <div className={`container ${styles.inner}`}>
        {/* Header */}
        <div className={styles.header}>
          <Reveal>
            <span className="eyebrow">Academic Research &amp; Publications</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={`section-headline ${styles.headline}`}>
              Peer-Reviewed Publications &amp; Experimental AI
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.sub}>
              Theoretical exploration validated through empirical experimentation — spanning explainable medical computer vision, dual-branch deep networks, and metaheuristic optimization.
            </p>
          </Reveal>
        </div>

        {/* Primary Research Spotlight */}
        <div className={styles.mainResearch}>
          <Reveal delay={0.05}>
            <div className={styles.researchCard}>
              <div className={styles.researchMeta}>
                <span className="eyebrow">Primary Research · Medical AI</span>
                <span className={styles.researchYear}>2026 – Present</span>
              </div>
              <h3 className={styles.researchTitle}>
                SSOA-Optimized Composite Loss for Explainable 3D Brain Tumor Segmentation
              </h3>
              <p className={styles.researchDesc}>
                This work addresses two core challenges in volumetric 3D medical segmentation: the sensitivity of composite loss weighting to manual trial-and-error, and the clinical opacity of deep neural networks. By integrating a 3D U-Net with metaheuristic SSOA loss weight tuning and Seg-Grad-CAM visual attribution, the pipeline segments tumor sub-regions with explainable attribution.
              </p>
            </div>
          </Reveal>

          {/* Methodology Breakdown */}
          <Stagger delay={0.1} stagger={0.08} className={styles.methodology}>
            {researchItems.map((item) => (
              <motion.div key={item.tag} className={styles.methodCard} variants={staggerItem}>
                <span className={styles.methodTag}>{item.tag}</span>
                <p className={styles.methodDesc}>{item.description}</p>
              </motion.div>
            ))}
          </Stagger>

          {/* Pipeline Diagram */}
          <Reveal delay={0.15}>
            <div className={styles.pipeline} aria-label="Research pipeline">
              {['MRI Volumetric Input', '3D U-Net', 'Composite Loss', 'SSOA Optimization', 'Seg-Grad-CAM', 'Explainability Map'].map(
                (step, i, arr) => (
                  <div key={step} className={styles.pipelineItem}>
                    <motion.div
                      className={styles.pipelineBox}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {step}
                    </motion.div>
                    {i < arr.length - 1 && (
                      <span className={styles.pipelineArrow} aria-hidden>→</span>
                    )}
                  </div>
                )
              )}
            </div>
          </Reveal>

          {/* Published Papers List */}
          <Reveal delay={0.2}>
            <div className={styles.publicationsSection}>
              <h3 className={styles.pubSectionTitle}>Published Journal Articles</h3>
              <div className={styles.pubGrid}>
                {publications.map((pub) => (
                  <div key={pub.title} className={styles.pubCard}>
                    <div className={styles.pubCardHeader}>
                      <span className={styles.pubBadge}>{pub.status}</span>
                      <span className={styles.pubJournal}>{pub.journal} · {pub.volume}</span>
                    </div>
                    <h4 className={styles.pubTitle}>{pub.title}</h4>
                    <p className={styles.pubDesc}>{pub.description}</p>
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.doiLink}
                    >
                      View Publication via DOI ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
