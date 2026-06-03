import Button from "./Button.jsx";

const navItems = ["Work", "Services", "Reviews", "Contact"];

function Header() {
  return (
    <header className="site-header">
      <nav className="site-header__inner container" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Quo home">
          <span className="brand__mark" aria-hidden="true">q</span>
          <span className="brand__name">quo.</span>
        </a>

        <ul className="site-nav" aria-label="Main menu">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>

        <Button href="#contact" variant="ghost">
          Start now
        </Button>
      </nav>
    </header>
  );
}

export default Header;
