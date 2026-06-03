function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article className="service-card">
      <span className="service-card__icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </article>
  );
}

export default ServiceCard;
