import { ArrowRight } from "lucide-react";
import Button from "../components/Button.jsx";

function AboutSection() {
  return (
    <section className="about section" id="work" aria-labelledby="about-title">
      <div className="about__grid container">
        <div className="about__content">
          <p className="eyebrow">Better than the status quo</p>
          <h2 id="about-title">Someone asked for better. We built the path there.</h2>
          <p>
            From first positioning workshops to polished campaign pages, our process
            brings strategy and execution into the same room.
          </p>
        </div>

        <div className="feature-photo feature-photo--large">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=82"
            alt="Creative team collaborating around a table"
          />
        </div>

        <article className="case-card">
          <div className="case-card__image">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=620&q=82"
              alt="Team reviewing a growth dashboard"
              loading="lazy"
            />
          </div>
          <div className="case-card__content">
            <p className="eyebrow">Featured case</p>
            <h3>See how we can help you grow.</h3>
            <p>
              A complete launch sprint for a B2B team that needed clearer messaging,
              faster pages, and a sales-ready brand system.
            </p>
            <Button href="#contact" variant="text">
              Talk to us
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AboutSection;
