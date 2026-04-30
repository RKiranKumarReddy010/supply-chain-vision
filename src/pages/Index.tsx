import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <CaseStudies />
      <Testimonial />
      <CTA />
      <Connect />
      <Footer />
    </main>
  );
};

export default Index;
