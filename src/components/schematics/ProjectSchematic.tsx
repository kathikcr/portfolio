import { motion } from 'framer-motion';
import styles from './ProjectSchematic.module.css';

interface SchematicProps {
  theme: 'medical' | 'document' | 'iot-tracking' | 'systems';
  title: string;
  active?: boolean;
}

export function ProjectSchematic({ theme, title: _title, active = true }: SchematicProps) {
  if (theme === 'medical') {
    return (
      <div className={styles.container}>
        <div className={styles.gridOverlay} />
        <svg viewBox="0 0 400 300" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Volumetric Brain Scan Matrix */}
          <circle cx="200" cy="150" r="90" stroke="rgba(79, 142, 247, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="150" r="70" stroke="rgba(0, 229, 255, 0.35)" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="50" stroke="rgba(79, 142, 247, 0.5)" strokeWidth="2" />

          {/* Tumor Segmentation Attribution Heatmap Overlay */}
          <ellipse cx="220" cy="135" rx="32" ry="24" fill="url(#tumorGlow)" />
          <path d="M 200 120 Q 240 125 245 150 Q 230 170 205 160 Q 185 145 200 120 Z" stroke="#00e5ff" strokeWidth="2" fill="rgba(0, 229, 255, 0.15)" />

          {/* Attribution Crosshairs & Coordinates */}
          <line x1="220" y1="90" x2="220" y2="180" stroke="rgba(0, 229, 255, 0.6)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="170" y1="135" x2="270" y2="135" stroke="rgba(0, 229, 255, 0.6)" strokeWidth="1" strokeDasharray="2 2" />

          {/* 3D Voxel Coordinate Annotations */}
          <text x="30" y="40" fill="#4f8ef7" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.05em">VOXEL ATTRIBUTION: Seg-Grad-CAM</text>
          <text x="30" y="55" fill="var(--col-text-tertiary)" fontFamily="var(--font-mono)" fontSize="9">SSOA OPTIMIZED COMPOSITE LOSS: ACTIVE</text>
          <text x="30" y="270" fill="var(--col-text-tertiary)" fontFamily="var(--font-mono)" fontSize="9">DIMENSIONS: 240 × 240 × 155 (MRI T1ce/T2/FLAIR)</text>
          <text x="270" y="270" fill="#00e5ff" fontFamily="var(--font-mono)" fontSize="9">DICE SCORE: 0.912</text>

          {/* Gradients */}
          <defs>
            <radialGradient id="tumorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#4f8ef7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Live scanning line */}
        {active && <motion.div
          className={styles.scanLine}
          animate={{ y: [0, 280, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />}
      </div>
    );
  }

  if (theme === 'document') {
    return (
      <div className={styles.container}>
        <div className={styles.gridOverlay} />
        <svg viewBox="0 0 400 300" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Node graph linking */}
          <path d="M 80 150 L 160 90 L 240 90 L 320 150 L 240 210 L 160 210 Z" stroke="rgba(79, 142, 247, 0.3)" strokeWidth="1.5" />
          <line x1="160" y1="90" x2="240" y2="210" stroke="rgba(0, 229, 255, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="240" y1="90" x2="160" y2="210" stroke="rgba(0, 229, 255, 0.25)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Agents */}
          {/* Agent 1: OCR & Ingest */}
          <circle cx="80" cy="150" r="18" fill="#0e1726" stroke="#4f8ef7" strokeWidth="2" />
          <text x="80" y="153" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">OCR</text>

          {/* Agent 2: Spec Extraction */}
          <circle cx="160" cy="90" r="20" fill="#0e1726" stroke="#00e5ff" strokeWidth="2" />
          <text x="160" y="93" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">SPEC</text>

          {/* Agent 3: Semantic Match */}
          <circle cx="240" cy="90" r="22" fill="#0e1726" stroke="#8ab4fa" strokeWidth="2" />
          <text x="240" y="93" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">SKU</text>

          {/* Agent 4: CrewAI Orchestrator */}
          <circle cx="320" cy="150" r="24" fill="#0e1726" stroke="#00e5ff" strokeWidth="2.5" />
          <text x="320" y="153" fill="#00e5ff" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">CREW</text>

          {/* Agent 5: Validation */}
          <circle cx="240" cy="210" r="18" fill="#0e1726" stroke="#4f8ef7" strokeWidth="2" />
          <text x="240" y="213" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">RULES</text>

          {/* Agent 6: Proposal Draft */}
          <circle cx="160" cy="210" r="18" fill="#0e1726" stroke="#4f8ef7" strokeWidth="2" />
          <text x="160" y="213" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">PDF</text>

          {/* Annotations */}
          <text x="30" y="40" fill="#8ab4fa" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.05em">AGENTIC PIPELINE: CrewAI Multi-Agent</text>
          <text x="30" y="55" fill="var(--col-text-tertiary)" fontFamily="var(--font-mono)" fontSize="9">EMBEDDINGS: Sentence-Transformers (all-MiniLM-L6-v2)</text>
          <text x="30" y="270" fill="var(--col-text-tertiary)" fontFamily="var(--font-mono)" fontSize="9">STATUS: 60-80% TURNAROUND REDUCTION</text>
        </svg>

        {/* Pulsing data packets */}
        {active && <motion.div
          className={styles.pulseDot}
          style={{ left: '20%', top: '50%' }}
          animate={{ x: [0, 80, 160, 240, 160, 80, 0], y: [0, -60, -60, 0, 60, 60, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />}
      </div>
    );
  }

  if (theme === 'iot-tracking') {
    return (
      <div className={styles.container}>
        <div className={styles.gridOverlay} />
        <svg viewBox="0 0 400 300" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Radar Circles */}
          <circle cx="200" cy="150" r="120" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" />
          <circle cx="200" cy="150" r="80" stroke="rgba(0, 229, 255, 0.25)" strokeWidth="1" />
          <circle cx="200" cy="150" r="40" stroke="rgba(0, 229, 255, 0.35)" strokeWidth="1" />

          {/* Anchor Beacons */}
          <circle cx="100" cy="80" r="8" fill="#4f8ef7" />
          <text x="100" y="65" fill="#4f8ef7" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle">ESP32-A1</text>

          <circle cx="300" cy="80" r="8" fill="#4f8ef7" />
          <text x="300" y="65" fill="#4f8ef7" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle">ESP32-A2</text>

          <circle cx="200" cy="240" r="8" fill="#4f8ef7" />
          <text x="200" y="258" fill="#4f8ef7" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle">ESP32-A3</text>

          {/* Trilateration Lines to Vehicle */}
          <line x1="100" y1="80" x2="210" y2="140" stroke="rgba(79, 142, 247, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="300" y1="80" x2="210" y2="140" stroke="rgba(79, 142, 247, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="200" y1="240" x2="210" y2="140" stroke="rgba(79, 142, 247, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Vehicle Target Node */}
          <circle cx="210" cy="140" r="14" fill="#0e1726" stroke="#00e5ff" strokeWidth="2.5" />
          <rect x="205" y="135" width="10" height="10" fill="#00e5ff" rx="2" />

          {/* Annotations */}
          <text x="30" y="40" fill="#00e5ff" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.05em">TRILATERATION: 2D RSSI Edge Filter</text>
          <text x="30" y="55" fill="var(--col-text-tertiary)" fontFamily="var(--font-mono)" fontSize="9">ERROR REDUCTION: 40% (Multipath Suppression)</text>
          <text x="30" y="270" fill="var(--col-text-tertiary)" fontFamily="var(--font-mono)" fontSize="9">EDGE TELEMETRY: 200ms Latency · Wi-Fi/HTTP</text>
        </svg>

        {/* Concentric Radar Ping */}
        {active && <motion.div
          className={styles.radarPing}
          animate={{ scale: [0.2, 2.2], opacity: [0.8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />}
      </div>
    );
  }

  // Systems / TCP Server
  return (
    <div className={styles.container}>
      <div className={styles.gridOverlay} />
      <svg viewBox="0 0 400 300" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Server Rack Frames */}
        <rect x="70" y="70" width="260" height="36" rx="4" fill="#0e1726" stroke="#4f8ef7" strokeWidth="1.5" />
        <rect x="70" y="115" width="260" height="36" rx="4" fill="#0e1726" stroke="#00e5ff" strokeWidth="1.5" />
        <rect x="70" y="160" width="260" height="36" rx="4" fill="#0e1726" stroke="#4f8ef7" strokeWidth="1.5" />
        <rect x="70" y="205" width="260" height="36" rx="4" fill="#0e1726" stroke="rgba(79, 142, 247, 0.6)" strokeWidth="1.5" />

        {/* Rack Indicators */}
        <circle cx="90" cy="88" r="4" fill="#00e5ff" />
        <circle cx="102" cy="88" r="4" fill="#00e5ff" />
        <text x="120" y="92" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="9">THREAD POOL: Worker-01..Worker-16</text>

        <circle cx="90" cy="133" r="4" fill="#00e5ff" />
        <circle cx="102" cy="133" r="4" fill="#00e5ff" />
        <text x="120" y="137" fill="#00e5ff" fontFamily="var(--font-mono)" fontSize="9">BACKPRESSURE: CallerRunsPolicy [ACTIVE]</text>

        <circle cx="90" cy="178" r="4" fill="#4f8ef7" />
        <circle cx="102" cy="178" r="4" fill="#4f8ef7" />
        <text x="120" y="182" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="9">BOUNDED QUEUE: ArrayBlockingQueue (2048)</text>

        <circle cx="90" cy="223" r="4" fill="#4f8ef7" />
        <circle cx="102" cy="223" r="4" fill="#4f8ef7" />
        <text x="120" y="227" fill="#8ab4fa" fontFamily="var(--font-mono)" fontSize="9">CONCURRENCY BENCHMARK: 10,000 VU (JMeter)</text>

        {/* Header Annotations */}
        <text x="30" y="40" fill="#4f8ef7" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.05em">JAVA NETWORK SERVICE: High-Concurrency Socket Server</text>
        <text x="30" y="55" fill="var(--col-text-tertiary)" fontFamily="var(--font-mono)" fontSize="9">THREAD SAFETY: Zero Out-of-Memory / Zero Crashes</text>
      </svg>

      {/* Activity Pulse bar */}
      {active && <motion.div
        className={styles.serverActivity}
        animate={{ width: ['20%', '85%', '45%', '95%', '60%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />}
    </div>
  );
}
