export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  year: string;
  description: string;
  problem: string;
  approach: string;
  architecture: string[];
  technologies: string[];
  results: string;
  github: string | null;
  demo: string | null;
  model: string | null;
  visualTheme: 'medical' | 'document' | 'iot-tracking' | 'systems';
}

export const projects: Project[] = [
  {
    id: 'brain-tumor-segmentation',
    title: 'SSOA-Optimized Composite Loss for Explainable 3D Brain Tumor Segmentation',
    shortTitle: 'Brain Tumor Segmentation',
    category: 'AI / Medical Imaging',
    year: '2026 – Present',
    description:
      'A medical AI research project combining 3D deep learning, metaheuristic loss optimization via Shepherd-inspired Search (SSOA), and Seg-Grad-CAM visual attribution for explainable brain tumor segmentation.',
    problem:
      'Standard loss functions for 3D volumetric segmentation struggle with severe class imbalance across heterogeneous tumor sub-regions. Manual tuning of composite loss weights is inefficient and non-optimal.',
    approach:
      'A 3D U-Net is trained with a composite loss whose hyperparameters are autonomously optimized via the SSOA metaheuristic algorithm. Seg-Grad-CAM computes gradient-based heatmaps to explain spatial model attention.',
    architecture: [
      'MRI Volumetric Data',
      '3D U-Net Encoder',
      'Composite Loss Formulation',
      'SSOA Weight Optimization',
      'Tumor Mask Segmentation',
      'Seg-Grad-CAM Attribution',
      'Clinical Explainability Map',
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'Keras', 'SSOA', 'Seg-Grad-CAM', '3D U-Net'],
    results: 'Primary research in progress — experimental evaluation and manuscript in preparation.',
    github: null,
    demo: null,
    model: '/models/scene.glb',
    visualTheme: 'medical',
  },
  {
    id: 'rfp-response',
    title: 'Automated B2B RFP Response System using Agentic AI and NLP',
    shortTitle: 'Agentic RFP Automation',
    category: 'Agentic AI / NLP',
    year: '2025',
    description:
      'An end-to-end intelligent data pipeline built using CrewAI multi-agent workflows that automates RFP PDF processing, OCR text extraction, semantic SKU matching, and compliant proposal generation.',
    problem:
      'Manual enterprise RFP responses are labor-intensive, error-prone, and slow. Teams face bottlenecks reviewing complex technical specifications and ensuring strict tender compliance.',
    approach:
      'Engineered an agentic multi-stage pipeline using CrewAI. Specialised agents handle PDF/OCR ingestion, spec extraction, semantic SKU matching via sentence embeddings, and LLM-driven proposal drafting with rule-based validation.',
    architecture: [
      'Tender PDF Ingestion',
      'OCR & Spec Extraction',
      'Semantic SKU Matching',
      'Sentence-Transformers',
      'CrewAI Agent Workflow',
      'LLM Proposal Generation',
      'Rule-Based Compliance',
      'Enterprise Proposal PDF',
    ],
    technologies: ['CrewAI', 'Python', 'Sentence-Transformers', 'Agentic AI', 'OCR', 'NLP', 'Prompt Engineering', 'Claude / Codex'],
    results: 'Cut enterprise proposal turnaround time by 60–80% with verified rule-based tender compliance.',
    github: 'https://github.com/kathikcr/rfp-automation.git',
    demo: null,
    model: '/models/knowledge_network.glb',
    visualTheme: 'document',
  },
  {
    id: 'indoor-vehicle-tracking',
    title: 'Indoor Vehicle Tracking System (BLE-Based IoT Pipeline)',
    shortTitle: 'Indoor Vehicle Tracking',
    category: 'IoT / Embedded Systems',
    year: '2025',
    description:
      'An ESP32-based indoor positioning and telemetry pipeline using Bluetooth Low Energy (BLE), RSSI outlier suppression, and edge-to-cloud streaming in GPS-denied environments.',
    problem:
      'GPS signals fail completely indoors. Warehouses and manufacturing floors require sub-meter vehicle localization resilient to multipath RF interference on resource-constrained hardware.',
    approach:
      'Built in C++ on ESP32 microcontrollers. Deployed signal filtering and RSSI outlier suppression algorithms, feeding a trilateration engine and streaming low-latency telemetry over Wi-Fi/HTTP.',
    architecture: [
      'BLE Transmitter Beacons',
      'ESP32 Anchor Receivers',
      'RSSI Outlier Suppression',
      'Distance Estimation',
      '2D Trilateration Engine',
      'Wi-Fi / HTTP Bridge',
      'Real-Time Cloud Telemetry',
    ],
    technologies: ['C++', 'ESP32', 'BLE 4.2/5.0', 'RSSI Filtering', 'Trilateration', 'Wi-Fi / HTTP', 'PlatformIO'],
    results: 'Cut mean positioning error by 40% under multipath interference; achieved 200ms processing latency with 99%+ reliable transmission.',
    github: 'https://github.com/kathikcr/indoor_vehicle_tracker_project.git',
    demo: null,
    model: '/models/cyberpunk_car.glb',
    visualTheme: 'iot-tracking',
  },
  {
    id: 'multithreaded-tcp-server',
    title: 'Scalable Multithreaded TCP Server (Java)',
    shortTitle: 'Scalable TCP Server',
    category: 'Systems / Networking',
    year: '2025',
    description:
      'A high-performance concurrent TCP server in Java utilizing a custom ThreadPoolExecutor with bounded work queues and dynamic backpressure control to sustain heavy concurrent traffic.',
    problem:
      'Unbounded thread creation under traffic spikes causes thread exhaustion, severe context switching overhead, and out-of-memory crashes on production network services.',
    approach:
      'Constructed a bounded-queue worker pool using Java ThreadPoolExecutor paired with CallerRunsPolicy backpressure to gracefully shed load and preserve server stability under extreme concurrency.',
    architecture: [
      'Concurrent TCP Clients',
      'Non-Blocking ServerSocket',
      'ThreadPoolExecutor Pool',
      'Bounded Task Queue',
      'CallerRunsPolicy Backpressure',
      'Worker Thread Handlers',
      'Asynchronous Response Pipeline',
    ],
    technologies: ['Java', 'TCP/IP Sockets', 'ThreadPoolExecutor', 'CallerRunsPolicy', 'Concurrency', 'JUnit', 'Apache JMeter'],
    results: 'Benchmarked and validated with up to 10,000 concurrent virtual users via Apache JMeter with 0 thread exhaustion crashes.',
    github: 'https://github.com/kathikcr/Scalable-TCP-Server.git',
    demo: null,
    model: '/models/network_server_rack.glb',
    visualTheme: 'systems',
  },
];
