import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__grid-bg" aria-hidden />

      <div className="hero__inner">
        <div className="hero__photo-bg" aria-hidden>
          <img
            className="hero__photo hero__photo--layer"
            src="/images/me_2.webp"
            alt=""
            width={780}
            height={1020}
            decoding="async"
          />
        </div>

        <div className="hero__availability-wrap">
          <p className="hero__availability" role="status">
            <img
              className="hero__availability-mark"
              src="/images/green_mark.webp"
              alt=""
              width={22}
              height={22}
              decoding="async"
            />
            <span className="hero__availability-label">Available to work</span>
          </p>
        </div>

        <nav className="hero__nav" aria-label="Section shortcuts">
          <Link to="/projects" className="hero__nav-link">
            Works
          </Link>
          <a
            className="hero__nav-link"
            href="/docs/Daniel_Hernandez_Gutierrez_CV_2026.pdf"
            download="Daniel_Hernandez_Gutierrez_CV_2026.pdf"
          >
            Resume
          </a>
        </nav>

        <div className="hero__left">
          <h1 id="hero-heading" className="hero__title">
            <span className="hero__title-line hero__title-line--plain">It&apos;s me</span>
            <span className="hero__title-line hero__title-line--accent">Daniel</span>
          </h1>

          <p className="hero__lead">
          Hi there! I’m a Computer Science student with a strong interest in Artificial Intelligence and data analysis. I enjoy building solutions that solve real-world problems.
          </p>

          <dl className="hero__stats">
            <div className="hero__stat">
              <dt className="visually-hidden">Projects</dt>
              <dd>
                <span className="hero__stat-value">15+</span>
                <span className="hero__stat-label">Projects shipped</span>
              </dd>
            </div>
            <div className="hero__stat">
              <dt className="visually-hidden">Technologies</dt>
              <dd>
                <span className="hero__stat-value">100+</span>
                <span className="hero__stat-label">Commits &amp; iterations</span>
              </dd>
            </div>
            <div className="hero__stat">
              <dt className="visually-hidden">Experience</dt>
              <dd>
                <span className="hero__stat-value">3+</span>
                <span className="hero__stat-label">Years building</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <Link to="/contactme" className="hero__cta-pill">
            <img
              className="hero__cta-icon"
              src="/images/white_calendar.webp"
              alt=""
              width={22}
              height={22}
              decoding="async"
            />
            Schedule a call
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
