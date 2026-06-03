function TestimonialCard({ testimonial }) {
  return (
    <article className="testimonial-card">
      <p>&ldquo;{testimonial.quote}&rdquo;</p>
      <footer>
        <img src={testimonial.src} alt={testimonial.name} loading="lazy" />
        <div>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.title}</span>
        </div>
      </footer>
    </article>
  );
}

export default TestimonialCard;
