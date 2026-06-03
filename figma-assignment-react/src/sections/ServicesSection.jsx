import SectionHeading from "../components/SectionHeading.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { services } from "../assets/services.js";

function ServicesSection() {
  return (
    <section className="services section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading eyebrow="What we can offer" title="What we can offer you!" align="center">
          Strategy, design, and growth support arranged into focused services that
          stay useful after launch day.
        </SectionHeading>

        <div className="services__grid">
          {services.map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
