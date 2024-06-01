import Project from "../components/ui/Project";
import CTA from "../components/ui/CTA";
import Skills from "../components/ui/Skills";
import Hero from "../components/ui/Hero";
import Contact from "../components/ui/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <CTA />
      <Skills />
      <Project />
      <Contact />
    </>
  );
}
