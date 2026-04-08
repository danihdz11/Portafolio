import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../pages/Projects";
import "./MainProjects.css";

const FEATURED = PROJECTS.slice(0, 5);

export default function MainProjects() {
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onRowMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <section className="main-projects" aria-labelledby="main-projects-heading">
      <div className="main-projects-inner">
        <h2 id="main-projects-heading" className="main-projects-title">
          <img
            src="/images/arrow_icon.webp"
            alt=""
            className="main-projects-title-arrow"
            decoding="async"
          />
          Main Projects
        </h2>

        <ul className="main-projects-list">
          {FEATURED.map((project) => {
            return (
              <li key={project.id} className="main-projects-item">
                <div
                  className="main-projects-row"
                  onMouseEnter={() => setActive(project)}
                  onMouseMove={onRowMove}
                  onMouseLeave={() => setActive(null)}
                >
                  <img
                    src="/images/text_mark_icon.webp"
                    alt=""
                    className="main-projects-mark-icon"
                    decoding="async"
                  />

                  <div className="main-projects-copy">
                    <span className="main-projects-name">{project.title}</span>
                    <span className="main-projects-sep"> — </span>
                    <span className="main-projects-sub">{project.subtitle}</span>
                  </div>

                  <Link to="/projects" className="main-projects-cta">
                    See proyect
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="main-projects-footer">
          <Link to="/projects" className="main-projects-all">
            All Projects
          </Link>
        </div>
      </div>

      {active ? (
        <div
          className="main-projects-preview"
          style={{ left: pos.x, top: pos.y }}
          aria-hidden
        >
          <div className="main-projects-preview-card">
            <div className="main-projects-preview-media">
              {active.imageSrc ? (
                <img
                  src={active.imageSrc}
                  alt=""
                  className="main-projects-preview-img"
                  width={320}
                  height={400}
                  decoding="async"
                />
              ) : (
                <div
                  className="main-projects-preview-fallback"
                  style={{ background: active.imageGradient ?? "#1a1a1c" }}
                />
              )}
            </div>
            <div className="main-projects-preview-bar">
              <span className="main-projects-preview-title">{active.title}</span>
              <span className="main-projects-preview-chip">
                {(active.tags && active.tags[0]) || active.subtitle}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
