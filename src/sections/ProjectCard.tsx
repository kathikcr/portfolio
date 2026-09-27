import { motion } from 'framer-motion';
import type { Project } from '../data/projects';
import { ProjectSchematic } from '../components/schematics/ProjectSchematic';
import styles from './ProjectCard.module.css';

/* ── Architecture pipeline visual ──────────────────────── */
function PipelineSteps({ steps }: { steps: string[] }) {
  return (
    <div className={styles.pipeline} aria-label="Architecture pipeline">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          className={styles.pipelineStep}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.04 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.pipelineNum}>{String(i + 1).padStart(2, '0')}</span>
          <span className={styles.pipelineLabel}>{step}</span>
          {i < steps.length - 1 && <span className={styles.pipelineArrow} aria-hidden>↓</span>}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Main ProjectCard ───────────────────────────────────── */
interface ProjectCardProps {
  project: Project;
  index: number;
  reversed?: boolean;
}

export function ProjectCard({ project, index: _index, reversed = false }: ProjectCardProps) {
  return (
    <article
      id={`project-${project.id}`}
      className={`${styles.card} ${reversed ? styles.reversed : ''}`}
      aria-label={project.title}
    >
      {/* Text side */}
      <div className={styles.textSide}>
        <motion.div
          className={styles.meta}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">{project.category}</span>
          <span className={styles.year}>{project.year}</span>
        </motion.div>

        <motion.h3
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className={styles.section}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          <p className={styles.sectionLabel}>The Problem</p>
          <p className={styles.sectionBody}>{project.problem}</p>
        </motion.div>

        <motion.div
          className={styles.section}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <p className={styles.sectionLabel}>The Approach</p>
          <p className={styles.sectionBody}>{project.approach}</p>
        </motion.div>

        <motion.div
          className={styles.techRow}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          {project.technologies.map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.36 }}
        >
          {project.github ? (
            <a href={project.github} className={styles.actionLink} target="_blank" rel="noopener noreferrer">
              GitHub Repository →
            </a>
          ) : (
            <span className={styles.actionPlaceholder}>Research in Progress</span>
          )}
          {project.demo && (
            <a href={project.demo} className={styles.actionLink} target="_blank" rel="noopener noreferrer">
              Live Demo →
            </a>
          )}
        </motion.div>
      </div>

      {/* Visual side - Dynamic Interactive Blueprint */}
      <div className={styles.visualSide}>
        <motion.div
          className={styles.canvasWrap}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <ProjectSchematic theme={project.visualTheme} title={project.title} />
        </motion.div>

        <PipelineSteps steps={project.architecture} />
      </div>
    </article>
  );
}
