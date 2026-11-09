import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Marquee from "./components/Marquee/Marquee";
import WhatWeDo from "./components/WhatWeDo/WhatWeDo";
import ScrollProgress from "./components/effects/ScrollProgress";
import ParticleBackground from "./components/effects/ParticleBackground";
import CursorGlow from "./components/effects/CursorGlow";
import { Projects } from "./components/Projects/Projects";
import VisitorPathways from "./components/VisitorsPathways/VisitorPathways";

function App() {
  return (
    <>
          <ScrollProgress />
      <ParticleBackground />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee variant="first" />
        <WhatWeDo />
        <Marquee variant="second" />
        <Projects />
        <VisitorPathways />
      </main>
    </>
  );
}
export default App;