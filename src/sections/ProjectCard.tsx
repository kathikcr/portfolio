import { lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Project } from '../data/projects';
import { ProjectSchematic } from '../components/schematics/ProjectSchematic';
import { ProjectModelEffects } from '../components/three/ProjectModelEffects';
import styles from './ProjectCard.module.css';

const ModelViewer = lazy(() => import('../components/three/ModelViewer').then((module) => ({ default: module.ModelViewer })));

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
  activeModelId: string | null;
  onSelectModel: (projectId: string | null) => void;
}

export function ProjectCard({ project, index: _index, reversed = false, activeModelId, onSelectModel }: ProjectCardProps) {
  const activeVisual = activeModelId === project.id ? 'model' : 'blueprint';
  const visualRef = useRef<HTMLDivElement>(null);
  const visualInView = useInView(visualRef, { margin: '140px 0px', amount: 0.01 });

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
      <div className={styles.visualSide} ref={visualRef}>
        <div className={styles.visualTabs} role="tablist" aria-label={`${project.shortTitle} visual views`}>
          {project.model && (
            <button
              className={`${styles.visualTab} ${activeVisual === 'model' ? styles.activeVisualTab : ''}`}
              id={`model-tab-${project.id}`}
              type="button"
              role="tab"
              aria-selected={activeVisual === 'model'}
              aria-controls={`model-panel-${project.id}`}
              onClick={() => onSelectModel(project.id)}
            >
              3D Model
            </button>
          )}
          <button
            className={`${styles.visualTab} ${activeVisual === 'blueprint' ? styles.activeVisualTab : ''}`}
            id={`blueprint-tab-${project.id}`}
            type="button"
            role="tab"
            aria-selected={activeVisual === 'blueprint'}
            aria-controls={`blueprint-panel-${project.id}`}
            onClick={() => onSelectModel(null)}
          >
            Blueprint
          </button>
          {activeVisual === 'model' && <span className={styles.visualHint}>DRAG TO INSPECT</span>}
          {activeVisual === 'blueprint' && <span className={styles.visualHint}>PROJECT ARCHITECTURE</span>}
        </div>

        {project.model && activeVisual === 'model' && (
          <div className={styles.modelPanel} id={`model-panel-${project.id}`} role="tabpanel" aria-labelledby={`model-tab-${project.id}`}>
            <div className={styles.modelViewport}>
              <Suspense fallback={<div className={styles.viewerLoading}>Loading 3D viewer…</div>}>
                <ModelViewer
                  src={project.model}
                  enableControls
                  cameraPosition={[0, 0.4, 4.2]}
                  fov={42}
                />
              </Suspense>
            </div>
            <ProjectModelEffects theme={project.visualTheme} active={visualInView} />
          </div>
        )}
        {activeVisual === 'blueprint' && <motion.div
          className={styles.canvasWrap}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          id={`blueprint-panel-${project.id}`}
          role="tabpanel"
          aria-labelledby={`blueprint-tab-${project.id}`}
        >
          <ProjectSchematic theme={project.visualTheme} title={project.title} active={visualInView} />
        </motion.div>}

        <PipelineSteps steps={project.architecture} />
      </div>
    </article>
  );
}
