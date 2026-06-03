import Button from "../components/Button.jsx";

function NewsletterSection() {
  return (
    <section className="newsletter" id="contact" aria-labelledby="newsletter-title">
      <div className="newsletter__inner container">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2 id="newsletter-title">Subscribe to our newsletter</h2>
        </div>

        <form className="newsletter__form" aria-label="Newsletter signup">
          <label htmlFor="email">Email address</label>
          <div className="newsletter__control">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <Button>Subscribe</Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewsletterSection;
