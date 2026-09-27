import { motion } from 'framer-motion';
import { Reveal } from '../components/ui/Reveal';
import styles from './About.module.css';

const stackLayers = [
  {
    level: 'L3 · Application & AI',
    title: 'Autonomous Multi-Agent AI & Computer Vision',
    description: '3D U-Net medical segmentation, CrewAI multi-agent proposal workflows, sentence-transformer semantic matching, and explainable AI (Seg-Grad-CAM).',
    badge: 'PyTorch / CrewAI / CV',
    color: '#8ab4fa',
  },
  {
    level: 'L2 · Systems & Backend',
    title: 'High-Concurrency Distributed Servers',
    description: 'Multithreaded TCP servers, ThreadPoolExecutor with CallerRunsPolicy backpressure, socket-level networking, and Spring Boot REST microservices.',
    badge: 'Java / Sockets / JMeter',
    color: '#4f8ef7',
  },
  {
    level: 'L1 · Edge & Hardware',
    title: 'Embedded Firmware & IoT Telemetry',
    description: 'ESP32 microcontrollers, BLE beacon RSSI outlier suppression, trilateration algorithms, and low-latency Wi-Fi telemetry pipelines.',
    badge: 'ESP32 / BLE / C++',
    color: '#00e5ff',
  },
];

export function About() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-label="About Karthik">
      <div className={`container ${styles.inner}`}>
        {/* Left: text */}
        <div className={styles.text}>
          <Reveal>
            <span className="eyebrow">Engineering Philosophy</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className={`section-headline ${styles.headline}`}>
              I engineer across layers.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className={styles.body}>
              From deep learning models and multi-agent AI systems to high-concurrency Java socket servers,
              from embedded microcontrollers to real-time wireless positioning — my work connects algorithms
              with robust systems execution.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className={styles.body}>
              I am an Integrated M.Tech Software Engineering student at Vellore Institute of Technology, Chennai,
              passionate about solving complex computational challenges through clean code, mathematical rigor, and production-ready architectures.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className={styles.principles}>
              <div className={styles.principleItem}>
                <span className={styles.principleNum}>01</span>
                <div>
                  <h4 className={styles.principleTitle}>Algorithmic Rigor</h4>
                  <p className={styles.principleDesc}>Strong theoretical foundations in optimization, composite loss formulation, and spatial signal processing.</p>
                </div>
              </div>
              <div className={styles.principleItem}>
                <span className={styles.principleNum}>02</span>
                <div>
                  <h4 className={styles.principleTitle}>End-to-End Ownership</h4>
                  <p className={styles.principleDesc}>Architecting from bare-metal firmware up to concurrent backend servers and intelligent multi-agent pipelines.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Interactive Full-Stack Layer Architecture */}
        <div className={styles.architectureSide}>
          <div className={styles.archHeader}>
            <span className={styles.archTag}>SYSTEM ARCHITECTURE STACK</span>
            <span className={styles.archStatus}>FULL VERTICAL INTEGRATION</span>
          </div>

          <div className={styles.layerCards}>
            {stackLayers.map((layer, i) => (
              <motion.div
                key={layer.level}
                className={styles.layerCard}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.layerCardTop}>
                  <span className={styles.layerCardLevel} style={{ color: layer.color }}>
                    {layer.level}
                  </span>
                  <span className={styles.layerBadge}>{layer.badge}</span>
                </div>
                <h3 className={styles.layerCardTitle}>{layer.title}</h3>
                <p className={styles.layerCardDesc}>{layer.description}</p>
              </motion.div>
            ))}
          </div>

          <div className={styles.archFooter}>
            <div className={styles.statusIndicator}>
              <span className={styles.activeDot} />
              <span className={styles.statusLabel}>Hardware · High-Concurrency Systems · AI Pipeline</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
