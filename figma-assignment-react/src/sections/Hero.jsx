import { ArrowUpRight } from "lucide-react";
import AvatarStack from "../components/AvatarStack.jsx";
import Button from "../components/Button.jsx";

function Hero() {
  return (
    <section className="hero section" id="top" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__ornament hero__ornament--left" aria-hidden="true" />
        <div className="hero__ornament hero__ornament--right" aria-hidden="true" />

        <p className="hero__kicker">Thinkers. Doers. Builders.</p>
        <h1 id="hero-title">
          The thinkers and doers changing the status Quo with you.
        </h1>
        <p className="hero__copy">
          We partner with ambitious teams to shape sharper brands, smarter websites,
          and launch systems that turn attention into measurable growth.
        </p>

        <div className="hero__actions" aria-label="Hero actions">
          <Button href="#services">
            See services
            <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
          <Button href="#work" variant="secondary">
            View work
          </Button>
        </div>

        <AvatarStack />
      </div>
    </section>
  );
}

export default Hero;
