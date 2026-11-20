import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Work } from "@/components/site/work";
import { About, Contact, Footer, Recognition, Research } from "@/components/site/sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Research />
        <Recognition />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
