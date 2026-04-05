import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "academico", label: "Academic" },
  { id: "otros", label: "Other" },
];

const PROJECTS = [
  {
    id: "facial-recognition",
    title: "Facial Recognition",
    subtitle: "Web development",
    categories: ["web"],
    demoUrl: "/",
    repoUrl: "https://github.com",
    imageSrc: "/images/facial_recognition.jpg",
    imageGradient: "linear-gradient(145deg, #312e81 0%, #1e1b4b 50%, #0f172a 100%)",
  },
  {
    id: "placeholder-api",
    title: "REST API",
    subtitle: "Backend development",
    categories: ["academico", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com",
    imageSrc: null,
    imageGradient: "linear-gradient(145deg, #134e4a 0%, #0f766e 45%, #0f172a 100%)",
  },
  {
    id: "ui-kit",
    title: "UI Kit",
    subtitle: "Web design",
    categories: ["web", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com",
    imageSrc: null,
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
  },
];

function DemoLink({ demoUrl, className, children }) {
  if (demoUrl.startsWith("/") && !demoUrl.startsWith("//")) {
    return (
      <Link className={className} to={demoUrl}>
        {children}
      </Link>
    );
  }
  return (
    <a
      className={className}
      href={demoUrl}
      target={demoUrl !== "#" ? "_blank" : undefined}
      rel={demoUrl !== "#" ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.body.classList.add("projects-page-body");
    return () => document.body.classList.remove("projects-page-body");
  }, []);

  const visible = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(filter));
  }, [filter]);

  return (
    <div className="projects-page">
      <header className="projects-header">
        <div className="projects-header-text">
          <p className="projects-hero-badge">PORTFOLIO SHOWCASE</p>
          <h1 className="projects-hero-title">
            <span className="projects-hero-title-muted">My Featured </span>
            <span className="projects-hero-title-accent">Projects</span>
          </h1>
          <p className="projects-lead">
            A curation of engineering solutions focused on high-performance architecture, clean
            aesthetics, and kinetic user experiences.
          </p>
        </div>
        <Link className="projects-back" to="/">
          ← Back to home
        </Link>
      </header>

      <div className="projects-filters" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={`projects-filter${filter === id ? " projects-filter--active" : ""}`}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="projects-grid">
        {visible.map((project) => (
          <li key={project.id} className="projects-card-wrap">
            <article className="projects-card">
              <DemoLink demoUrl={project.demoUrl} className="projects-card-thumb-link">
                <div
                  className="projects-card-media"
                  style={
                    project.imageSrc
                      ? undefined
                      : { background: project.imageGradient ?? "#1a1a1c" }
                  }
                >
                  {project.imageSrc ? (
                    <img
                      src={project.imageSrc}
                      alt=""
                      className="projects-card-img"
                      width={640}
                      height={480}
                      decoding="async"
                    />
                  ) : (
                    <span className="projects-card-media-placeholder" aria-hidden>
                      {project.title}
                    </span>
                  )}
                </div>
              </DemoLink>

              <div className="projects-card-meta">
                <h2 className="projects-card-title">
                  <DemoLink demoUrl={project.demoUrl} className="projects-card-title-link">
                    {project.title}
                  </DemoLink>
                </h2>
                <p className="projects-card-subtitle">{project.subtitle}</p>
                <p className="projects-card-links">
                  <DemoLink demoUrl={project.demoUrl} className="projects-card-inline-link">
                    Demo
                  </DemoLink>
                  <span className="projects-card-links-sep" aria-hidden>
                    ·
                  </span>
                  <a
                    className="projects-card-inline-link"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="projects-empty">No projects in this category yet.</p>
      )}

      <footer className="projects-cta">
        <p className="projects-cta-text">Want to collaborate on something new?</p>
        <Link className="projects-cta-link" to="/contactme">
          Get in touch
        </Link>
      </footer>
    </div>
  );
}
