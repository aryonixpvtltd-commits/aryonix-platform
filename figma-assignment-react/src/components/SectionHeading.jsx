function SectionHeading({ eyebrow, title, align = "left", children }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p className="section-heading__copy">{children}</p>}
    </div>
  );
}

export default SectionHeading;
