export interface TechCategory {
  id: string;
  label: string;
  technologies: string[];
  description: string;
  highlights: string[];
}

export const techCategories: TechCategory[] = [
  {
    id: 'ai-ml',
    label: 'AI / Machine Learning',
    description: 'Deep learning architectures, medical computer vision, loss optimization, and neural pipelines.',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'Computer Vision', '3D U-Net', 'Seg-Grad-CAM', 'SSOA'],
    highlights: ['Explainable Medical AI (Seg-Grad-CAM)', 'Meta-Heuristic Loss Optimization (SSOA)', 'Deep CNNs & 3D Volumetric Segmentation'],
  },
  {
    id: 'software',
    label: 'Software Engineering',
    description: 'Robust object-oriented architectures, algorithmic optimization, and modular systems.',
    technologies: ['Java', 'C', 'C++', 'Python', 'Data Structures', 'Algorithms', 'OOP Design Patterns', 'Clean Architecture', 'Git'],
    highlights: ['High-Performance Algorithms', 'Concurrency & Memory Management', 'Enterprise Architectural Patterns'],
  },
  {
    id: 'backend',
    label: 'Backend & Systems',
    description: 'Concurrent socket servers, Spring Boot services, backpressure control, and distributed networking.',
    technologies: ['Java', 'Spring Boot', 'REST APIs', 'TCP/IP Sockets', 'ThreadPoolExecutor', 'JUnit', 'Apache JMeter', 'SQL'],
    highlights: ['High-Concurrency TCP Sockets (10k VU)', 'Dynamic Backpressure Control (CallerRunsPolicy)', 'Low-Latency ThreadPool Systems'],
  },
  {
    id: 'genai',
    label: 'Agentic AI & NLP',
    description: 'Autonomous multi-agent architectures, sentence embeddings, OCR extraction, and document intelligence.',
    technologies: ['CrewAI', 'Agentic Workflows', 'Prompt Engineering', 'RAG Pipelines', 'Sentence-Transformers', 'NLP / OCR', 'Claude / Codex'],
    highlights: ['Multi-Agent Proposal Generation (CrewAI)', 'Semantic SKU & Spec Extraction', 'Automated Enterprise Document Parsing'],
  },
  {
    id: 'iot',
    label: 'IoT / Embedded Systems',
    description: 'Hardware firmware, Bluetooth Low Energy protocols, RF signal filtering, and real-time edge telemetry.',
    technologies: ['ESP32', 'C++', 'BLE 4.2 / 5.0', 'Wi-Fi / HTTP', 'PlatformIO', 'RSSI Outlier Suppression', 'Indoor Localization'],
    highlights: ['Real-Time RSSI Signal Filtering', 'Low-Latency Edge-to-Cloud Telemetry (200ms)', 'Resource-Constrained Embedded C++'],
  },
  {
    id: 'web',
    label: 'Mobile & Web Development',
    description: 'Modern full-stack web applications, reactive frontends, and cross-platform mobile apps.',
    technologies: ['Flutter', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Vite', 'Three.js / WebGL'],
    highlights: ['Interactive 3D Web Experiences', 'Cross-Platform Flutter Apps', 'High-Performance Reactive UIs'],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Explore', description: 'Analyze problem spaces, mathematical formulations, and engineering constraints before implementation.' },
  { number: '02', title: 'Architect', description: 'Design modular layer boundaries, concurrency models, data flows, and failure modes.' },
  { number: '03', title: 'Prototype', description: 'Construct minimal high-fidelity proofs of concept to validate key algorithmic assumptions.' },
  { number: '04', title: 'Engineer', description: 'Develop production-grade systems emphasizing strict correctness, type-safety, and test coverage.' },
  { number: '05', title: 'Benchmark', description: 'Profile execution time, network latency, loss convergence, and hardware efficiency.' },
  { number: '06', title: 'Refine', description: 'Iterate based on empirical telemetry and benchmark results to push system performance.' },
];

export const contactLinks = {
  name: 'Karthik C R',
  phone: '(+91) 9061074944',
  phoneHref: 'tel:+919061074944',
  email: 'crkarthik2004@gmail.com',
  emailHref: 'mailto:crkarthik2004@gmail.com',
  github: 'https://github.com/kathikcr',
  linkedin: 'https://www.linkedin.com/in/karthik-cr-714b30277/',
  resume: '/resume/CR_Karthik_Resume.pdf',
};

export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

