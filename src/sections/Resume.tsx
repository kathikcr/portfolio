import { Reveal } from '../components/ui/Reveal';
import { contactLinks } from '../data/content';
import styles from './Resume.module.css';

export function Resume() {
  const highlights = [
    { label: 'Education', value: 'Integrated M.Tech in Software Engineering (Expected June 2027)' },
    { label: 'Institution', value: 'Vellore Institute of Technology, Chennai · CGPA: 8.86' },
    { label: 'Key Domains', value: 'Systems & Backend, High-Concurrency Java, Agentic AI, Medical Computer Vision' },
    { label: 'Languages', value: 'Java, Python, C++, C, SQL, JavaScript, TypeScript' },
  ];

  const experiences = [
    {
      role: 'Project Intern',
      org: 'Anna University Chennai',
      period: 'Aug 2025 – Sep 2025',
      points: [
        'Engineered an offline inference pipeline for real-time crop disease detection at 97% accuracy in low-connectivity settings.',
        'Cut inference latency and memory footprint by 30% through model optimization and system-level tuning.',
      ],
    },
    {
      role: 'Deep Learning Research Intern',
      org: 'CCPS – VIT Chennai',
      period: 'Jun 2025 – Aug 2025',
      points: [
        'Designed and evaluated dual-branch neural network pipelines using structured experimentation and ablation testing.',
        'Streamlined training batching and pipeline efficiency, cutting experimentation cycle time by 18%.',
      ],
    },
  ];

  return (
    <section id="resume" className={`section ${styles.section}`} aria-label="Resume">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <Reveal>
            <span className="eyebrow">Resume &amp; Credentials</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={`section-headline ${styles.headline}`}>
              Academic Background &amp; Experience
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.sub}>
              A comprehensive summary of my engineering trajectory, industry internships, published research, and technical proficiencies.
            </p>
          </Reveal>
        </div>

        {/* Resume Preview Card */}
        <Reveal delay={0.2}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.candidateInfo}>
                <h3 className={styles.candidateName}>Karthik C R</h3>
                <span className={styles.candidateRole}>MTech Integrated Software Engineer · Systems &amp; AI</span>
              </div>
              <span className={styles.pdfBadge}>PDF DOCUMENT</span>
            </div>

            {/* Core Credentials Grid */}
            <div className={styles.grid}>
              {highlights.map((item) => (
                <div key={item.label} className={styles.gridItem}>
                  <span className={styles.gridLabel}>{item.label}</span>
                  <span className={styles.gridValue}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Experience timeline */}
            <div className={styles.experienceBlock}>
              <span className={styles.experienceTitle}>Industry &amp; Research Experience</span>
              <div className={styles.expList}>
                {experiences.map((exp) => (
                  <div key={exp.role} className={styles.expItem}>
                    <div className={styles.expHeader}>
                      <span className={styles.expRole}>{exp.role} · <strong className={styles.expOrg}>{exp.org}</strong></span>
                      <span className={styles.expPeriod}>{exp.period}</span>
                    </div>
                    <ul className={styles.expPoints}>
                      {exp.points.map((pt, idx) => (
                        <li key={idx} className={styles.expPoint}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={styles.cardFooter}>
              <a
                href={contactLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
                aria-label="View full resume PDF in a new tab"
              >
                View Full Resume ↗
              </a>
              <a
                href={contactLinks.resume}
                download="CR_Karthik_Resume.pdf"
                className={styles.downloadBtn}
                aria-label="Download resume PDF"
              >
                Download PDF ↓
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
