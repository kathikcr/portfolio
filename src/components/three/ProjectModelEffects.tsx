import { motion } from 'framer-motion';
import type { Project } from '../../data/projects';
import styles from '../../sections/ProjectCard.module.css';

type Theme = Project['visualTheme'];

const bleSources: Array<[number, number]> = [[7, 25], [93, 27], [7, 75], [93, 73]];
const networkNodes: Array<[number, number]> = [[12, 50], [32, 27], [50, 50], [70, 27], [88, 50], [70, 73], [32, 73]];

export function ProjectModelEffects({ theme, active }: { theme: Theme; active: boolean }) {
  if (!active) return null;

  if (theme === 'iot-tracking') {
    return (
      <div className={`${styles.modelEffects} ${styles.bleEffects}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {bleSources.map(([x, y], i) => (
            <g key={`${x}-${y}`}>
              <motion.line
                x1={x} y1={y} x2="50" y2="52"
                stroke="#00e5ff" strokeWidth="0.35" strokeDasharray="1.5 2.5"
                animate={{ opacity: [0.16, 0.52, 0.16] }}
                transition={{ duration: 2.2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                r="1.1" fill="#7af5ff" filter="url(#bleGlow)"
                animate={{ cx: [x, 50], cy: [y, 52], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, delay: i * 0.45, repeat: Infinity, ease: 'linear' }}
              />
            </g>
          ))}
          <defs>
            <filter id="bleGlow"><feGaussianBlur stdDeviation="0.8" /></filter>
          </defs>
          <path d="M50 98 L50 61" stroke="#00e5ff" strokeWidth="0.4" strokeDasharray="1.3 2" opacity="0.52" />
          <motion.circle
            cx="50" r="1.2" fill="#7af5ff"
            animate={{ cy: [96, 62], opacity: [0, 1, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeIn' }}
          />
          <motion.circle
            cx="50" cy="60" fill="none" stroke="#00e5ff" strokeWidth="0.45"
            animate={{ r: [2, 8], opacity: [0.8, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeOut' }}
          />
          <circle cx="50" cy="60" r="1.1" fill="#a1fbff" />
        </svg>
      </div>
    );
  }

  if (theme === 'medical') {
    return (
      <div className={`${styles.modelEffects} ${styles.scanEffects}`} aria-hidden="true">
        <motion.span
          className={styles.volumeScan}
          animate={{ y: ['-5%', '105%'], opacity: [0, 0.8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className={styles.scanReticle}
          animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.92, 1.04, 0.92] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  if (theme === 'document') {
    return (
      <div className={`${styles.modelEffects} ${styles.networkEffects}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {networkNodes.slice(0, -1).map(([x, y], i) => {
            const [nextX, nextY] = networkNodes[i + 1];
            return <line key={`edge-${i}`} x1={x} y1={y} x2={nextX} y2={nextY} stroke="#4f8ef7" strokeWidth="0.35" strokeDasharray="1 2" opacity="0.38" />;
          })}
          <line x1="12" y1="50" x2="50" y2="50" stroke="#00e5ff" strokeWidth="0.45" opacity="0.5" />
          <line x1="50" y1="50" x2="88" y2="50" stroke="#00e5ff" strokeWidth="0.45" opacity="0.5" />
          {networkNodes.map(([x, y], i) => (
            <circle key={`node-${i}`} cx={x} cy={y} r={i === 2 ? 1.5 : 0.9} fill={i === 2 ? '#00e5ff' : '#8ab4fa'} opacity="0.72" />
          ))}
          {[0, 1].map((i) => (
            <motion.circle
              key={`packet-${i}`} r="1" fill="#a1fbff"
              animate={{ cx: [12, 50, 88], cy: [50, 50, 50], opacity: [0, 1, 0] }}
              transition={{ duration: 3, delay: i * 1.5, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className={`${styles.modelEffects} ${styles.trafficEffects}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {[30, 50, 70].map((y, i) => (
          <g key={y}>
            <motion.line
              x1="8" y1={y} x2="92" y2={y}
              stroke="#4f8ef7" strokeWidth="0.3" strokeDasharray="1 3"
              animate={{ opacity: [0.12, 0.42, 0.12] }}
              transition={{ duration: 2.4, delay: i * 0.4, repeat: Infinity }}
            />
            <motion.circle
              r="1.1" fill="#00e5ff"
              animate={{ cx: [8, 92], cy: [y, y], opacity: [0, 0.9, 0] }}
              transition={{ duration: 2.8, delay: i * 0.75, repeat: Infinity, ease: 'linear' }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
