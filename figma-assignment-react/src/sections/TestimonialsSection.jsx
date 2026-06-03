import SectionHeading from "../components/SectionHeading.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import { testimonials } from "../assets/people.js";

function TestimonialsSection() {
  return (
    <section className="testimonials section" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHeading eyebrow="Client stories" title="What our customers say about us">
          Teams choose us when they need practical clarity, thoughtful design, and
          steady execution from idea to launch.
        </SectionHeading>

        <div className="testimonials__grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} key={testimonial.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
