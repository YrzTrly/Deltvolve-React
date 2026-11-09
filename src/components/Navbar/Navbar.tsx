import logo from "../../assets/images/logo.png";
import { useActiveSection } from "../../hooks";
import "./Navbar.css";

interface NavLink {
  label: string;
  sectionId: string;
  isCta?: boolean; 
}

const NAV_LINKS: NavLink[] = [
  { label: "About", sectionId: "what-we-do" },
  { label: "Built by Us", sectionId: "projects" },
  { label: "Get Involved", sectionId: "visitor-pathways" },
  { label: "Contact Us", sectionId: "final_cta", isCta: true },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.sectionId);

function Navbar() {
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav className="navbar">
      <a href="#top" className="navbar__brand">
        <img className="navbar__logo" src={logo} alt="DeltVolve logo" />
        <p className="navbar__name">DeltVolve</p>
      </a>

      <ul className="navbar__links">
        {NAV_LINKS.map(({ label, sectionId, isCta }) => {
          const classes = [
            "navbar__link",
            isCta ? "navbar__link--cta" : "",
            activeId === sectionId ? "is-active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={sectionId}>
              <a href={`#${sectionId}`} className={classes}>
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;