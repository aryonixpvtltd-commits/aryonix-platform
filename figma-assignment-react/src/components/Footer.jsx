const footerGroups = [
  {
    title: "Studio",
    links: ["About", "Method", "Careers"]
  },
  {
    title: "Services",
    links: ["Strategy", "Design", "Growth"]
  },
  {
    title: "Social",
    links: ["LinkedIn", "Instagram", "Dribbble"]
  }
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <a className="brand footer__brand" href="#top" aria-label="Quo home">
          <span className="brand__mark" aria-hidden="true">q</span>
          <span className="brand__name">quo.</span>
        </a>

        <div className="footer__links">
          {footerGroups.map((group) => (
            <div className="footer__group" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <a href="#top" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
