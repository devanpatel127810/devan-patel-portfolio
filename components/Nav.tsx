import { profile } from "@/lib/data";

export default function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <a className="brand" href="#top">
        <span className="name">{profile.name}</span>
        <span className="where">Austin, TX</span>
      </a>
      <div className="links">
        <a href="#garage">Garage</a>
        <a href="#cafe">Café</a>
        <a href="#kitchen">Kitchen</a>
        <a href="#courts">Courts</a>
        <a href="#contact">Contact</a>
        <a className="resume-btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Résumé
        </a>
      </div>
    </nav>
  );
}
