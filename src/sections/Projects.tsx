import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { Reveal } from '../components/ui/Reveal';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <section id="projects" className={`section ${styles.section}`} aria-label="Projects">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <Reveal>
            <span className="eyebrow">Selected Work</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={`section-headline ${styles.headline}`}>
              Things I've built.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.sub}>
              Each project is a case study — scroll through to explore the
              problem, approach and architecture.
            </p>
          </Reveal>
        </div>

        <div className={styles.list}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
