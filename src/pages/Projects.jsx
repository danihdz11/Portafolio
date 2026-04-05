import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
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
    description:
      "A web app that showcases facial detection and recognition flows with a clean UI. Integrates client-side views with services for processing and displaying results in real time.",
    tags: ["React", "Vite", "Python", "OpenCV"],
    categories: ["web"],
    demoUrl: "/",
    repoUrl: "https://github.com/danihdz11/Face-Recognition",
    imageSrc: "/images/facial_recognition.jpg",
    imageGradient: "linear-gradient(145deg, #312e81 0%, #1e1b4b 50%, #0f172a 100%)",
  },
  {
    id: "smart-mirror",
    title: "Smart Mirror",
    subtitle: "Full Stack Development",
    description:
      "REST API with CRUD routes, validation, and structured error handling—built as hands-on practice in backend architecture and software construction.",
    tags: ["Node.js", "Express", "REST", "JavaScript"],
    categories: ["academico", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com/danihdz11/Smart-Mirror",
    imageSrc: "/images/smart_mirror.png",
    imageGradient: "linear-gradient(145deg, #134e4a 0%, #0f766e 45%, #0f172a 100%)",
  },
  {
    id: "hotel-system",
    title: "Hotel Management System",
    subtitle: "POO",
    description:
      "A compact set of reusable components and shared style tokens so interfaces stay consistent across pages and experiments.",
    tags: ["React", "CSS", "Design systems"],
    categories: ["web", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com/danihdz11/Hotel-Management-System",
    imageSrc: "/images/hotel_system.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
  },
  {
    id: "Virtual-Assistant",
    title: "Virtual Assistant",
    subtitle: "Web Development",
    description:
      "A compact set of reusable components and shared style tokens so interfaces stay consistent across pages and experiments.",
    tags: ["React", "CSS", "Design systems"],
    categories: ["web", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com/danihdz11/Virtual-Assitant",
    imageSrc: "/images/virtual_assistant.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
  },
  {
    id: "Hospital-System",
    title: "Hospital System",
    subtitle: "Web Development",
    description:
      "A compact set of reusable components and shared style tokens so interfaces stay consistent across pages and experiments.",
    tags: ["React", "CSS", "Design systems"],
    categories: ["web", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com/danihdz11/Hospital-App",
    imageSrc: "/images/hospital.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
  },
  {
    id: "Restaurant-payment-system",
    title: "Restaurant Payment System",
    subtitle: "Web Development",
    description:
      "A compact set of reusable components and shared style tokens so interfaces stay consistent across pages and experiments.",
    tags: ["React", "CSS", "Design systems"],
    categories: ["web", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com/danihdz11/Restaurant-Payment-System",
    imageSrc: "/images/restaurant_system.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
  },
  {
    id: "ranch-depot",
    title: "Ranch Depot Website",
    subtitle: "Web Development",
    description:
      "A compact set of reusable components and shared style tokens so interfaces stay consistent across pages and experiments.",
    tags: ["React", "CSS", "Design systems"],
    categories: ["web", "otros"],
    demoUrl: "#",
    repoUrl: "https://ranchdepot.com/",
    imageSrc: "/images/ranchdepot_web.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
  },
  {
    id: "game",
    title: "Matching Game",
    subtitle: "Web Development",
    description:
      "A compact set of reusable components and shared style tokens so interfaces stay consistent across pages and experiments.",
    tags: ["React", "CSS", "Design systems"],
    categories: ["web", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com/danihdz11/Matching-Game",
    imageSrc: "/images/matching_game.jpg",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
  },
  {
    id: "data-science",
    title: "Alura TelecomX Challenge",
    subtitle: "Web Development",
    description:
      "A compact set of reusable components and shared style tokens so interfaces stay consistent across pages and experiments.",
    tags: ["React", "CSS", "Design systems"],
    categories: ["web", "otros"],
    demoUrl: "#",
    repoUrl: "https://github.com/danihdz11/Alura-TelecomX",
    imageSrc: "/images/telecom.png",
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
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    document.body.classList.add("projects-page-body");
    return () => document.body.classList.remove("projects-page-body");
  }, []);

  useEffect(() => {
    if (!modalProject) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setModalProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalProject]);

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
        <Link className="projects-cta-btn projects-cta-btn--primary projects-back" to="/">
          Back to home
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
              <div className="projects-card-thumb">
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
                  <div className="projects-card-overlay">
                    <button
                      type="button"
                      className="projects-card-view-more"
                      aria-label={`View more: ${project.title}`}
                      onClick={() => setModalProject(project)}
                    >
                      <img
                        src="/images/view.png"
                        alt=""
                        className="projects-card-view-icon"
                        width={20}
                        height={20}
                        decoding="async"
                      />
                      View more
                    </button>
                  </div>
                </div>
              </div>

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
        <h2 className="projects-cta-heading">Want to talk shop?</h2>
        <p className="projects-cta-lead">
          I&apos;m always open to discussing architectural patterns, new tech stacks, or potential
          collaborations.
        </p>
        <div className="projects-cta-actions">
          <Link className="projects-cta-btn projects-cta-btn--primary" to="/contactme">
            Get In Touch
          </Link>
          <a
            className="projects-cta-btn projects-cta-btn--secondary"
            href="/docs/Daniel_Hernandez_Gutierrez_CV_2026.pdf"
            download
          >
            Download Resume
          </a>
        </div>
      </footer>

      {modalProject &&
        createPortal(
          <div
            className="projects-modal-backdrop"
            role="presentation"
            onClick={() => setModalProject(null)}
          >
            <div
              className="projects-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="projects-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="projects-modal-close"
                onClick={() => setModalProject(null)}
                aria-label="Close"
              >
                ×
              </button>
              <p className="projects-modal-eyebrow">{modalProject.subtitle}</p>
              <h2 id="projects-modal-title" className="projects-modal-title">
                {modalProject.title}
              </h2>
              <p className="projects-modal-description">{modalProject.description}</p>
              <h3 className="projects-modal-section-label">Technologies</h3>
              <ul className="projects-modal-tags">
                {modalProject.tags.map((tag) => (
                  <li key={tag} className="projects-modal-tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                className="projects-modal-github"
                href={modalProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View repository on GitHub
              </a>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
