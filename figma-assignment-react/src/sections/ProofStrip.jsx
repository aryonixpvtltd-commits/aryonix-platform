const proofItems = [
  { value: "45+", label: "brands launched" },
  { value: "3.8x", label: "average growth lift" },
  { value: "12wk", label: "typical launch sprint" }
];

function ProofStrip() {
  return (
    <section className="proof section section--tight" aria-label="Company results">
      <div className="proof__inner container">
        {proofItems.map((item) => (
          <div className="proof__item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProofStrip;
