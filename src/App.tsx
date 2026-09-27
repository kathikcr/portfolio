import './index.css';
import { Nav } from './components/ui/Nav';
import { Footer } from './components/ui/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { TechEcosystem } from './sections/TechEcosystem';
import { Projects } from './sections/Projects';
import { Research } from './sections/Research';
import { Process } from './sections/Process';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';

function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <TechEcosystem />
        <Projects />
        <Research />
        <Process />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
