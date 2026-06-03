import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./sections/Hero.jsx";
import ProofStrip from "./sections/ProofStrip.jsx";
import AboutSection from "./sections/AboutSection.jsx";
import ServicesSection from "./sections/ServicesSection.jsx";
import TestimonialsSection from "./sections/TestimonialsSection.jsx";
import NewsletterSection from "./sections/NewsletterSection.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
