import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import "./AboutMe.css";

/** Edit this line to your own motto — shown in the quote box under “Who I am”. */
const PERSONAL_MOTTO = "Going on when you feel like you can't anymore is what makes you different from everyone else. - Rocky Balboa";

/**
 * Certificates: place images in public/images/certifications/
 * issuer: organization or platform that issued it
 * year: when you earned it (string or number, shown as-is)
 */
const CERTIFICATIONS = [
  {
    id: "cert-1",
    title: "ONE Tech Fundation G8 - Data Science",
    issuer: "Alura LATAM + Oracle",
    year: "2025",
    imageSrc: "/images/certifications/alura_certification.webp",
    href: "https://app.aluracursos.com/program/certificate/16613b1a-852f-4175-bd52-10ebe7840ec7?lang",
  },
  {
    id: "cert-2",
    title: "Python TOTAL - Programador Avanzado en 16 días",
    issuer: "Udemy",
    year: "2023",
    imageSrc: "/images/certifications/pyhton_certification.webp",
    href: "https://www.udemy.com/certificate/UC-100b0ee9-a25e-409a-a69f-497007ddf63d/",
  },
  {
    id: "cert-3",
    title: "SQL TOTAL - Domina Bases de Datos de 0 a Avanzado en 12 Días",
    issuer: "Udemy",
    year: "2024",
    imageSrc: "/images/certifications/sql_certification.webp",
    href: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-0536ffbe-0dcd-4a5f-8342-4bd818e0d2ea.pdf",
  },
  {
    id: "cert-4",
    title: "TEC Embassador Porgram",
    issuer: "Instituto Tecnológico y de Estudios Superiores de Monterrey",
    year: "2024",
    imageSrc: "/images/certifications/embassador_certification.webp",
    href: "https://github.com/danihdz11/Portafolio/blob/main/public/images/certifications/embassador_certification.webp",
  },
  {
    id: "cert-5",
    title: "1st place at Tec de Monterrey’s Expo Ingenierías (physical prototype category)",
    issuer: "Instituto Tecnológico y de Estudios Superiores de Monterrey",
    year: "2025",
    imageSrc: "/images/certificate.png",
    href: "https://github.com/danihdz11/Portafolio/blob/main/public/docs/Certificate_Expo_TEC.pdf",
  },
];

const TECH_STACK = [
  { name: "React", file: "react_logo.webp" },
  { name: "Python", file: "python_logo.webp" },
  { name: "Node.js", file: "nodejs_logo.webp" },
  { name: "Git", file: "git_logo.webp" },
  { name: "C++", file: "c_plus_plus_logo.webp" },
  { name: "Html", file: "html_logo.webp" },
  { name: "CSS", file: "css_logo.webp" },
  { name: "JavaScript", file: "javascript_logo.webp" },
  { name: "MongoDB", file: "mongodb_logo.webp" },
  { name: "MySQL", file: "mysql_logo.webp" },
  { name: "SQL", file: "sql_logo.webp" },
  { name: "OpenCV", file: "opencv_logo.webp" },
  { name: "Shopify", file: "shopify_logo.webp" },
  { name: "Sendpulse", file: "sendpulse_logo.webp" },
];

/** Shortest distance between item indices on a circular list (for scale styling). */
function ringDistance(itemA, itemB, n) {
  if (n <= 1) return 0;
  const d = Math.abs(itemA - itemB);
  return Math.min(d, n - d);
}

const AUTOPLAY_DELAY_MS = 3000;

const EASE_OUT = [0.22, 1, 0.36, 1];

const aboutFadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: EASE_OUT },
  },
};

const aboutStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const aboutCertStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const aboutCertItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

const SPRING = { type: "spring", stiffness: 280, damping: 32, mass: 0.62 };
const INSTANT = { duration: 0 };

function TechCarousel() {
  const n = TECH_STACK.length;
  const slides = useMemo(() => [...TECH_STACK, ...TECH_STACK, ...TECH_STACK], []);

  const viewportRef = useRef(null);
  const skipCompleteRef = useRef(false);
  const pendingBoundaryRef = useRef(null);

  const [physical, setPhysical] = useState(n);
  const [layout, setLayout] = useState({ vw: 0, step: 0, sw: 0 });
  const [transition, setTransition] = useState(SPRING);
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp || n === 0) return undefined;

    const measure = () => {
      const track = vp.querySelector(".about-tech-carousel-track");
      const cells = vp.querySelectorAll(".about-tech-carousel-slot");
      const midCell = cells[n];
      if (!midCell || !track) return;
      const sw = midCell.getBoundingClientRect().width;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || "0") || 0;
      const step = sw + gap;
      setLayout({
        vw: vp.clientWidth,
        step,
        sw,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [n]);

  const x =
    layout.vw > 0 && layout.step > 0
      ? layout.vw / 2 - (physical * layout.step + layout.sw / 2)
      : 0;

  const centerItemIndex = physical % n;

  const onTrackAnimationComplete = useCallback(() => {
    if (skipCompleteRef.current) {
      skipCompleteRef.current = false;
      return;
    }
    const pending = pendingBoundaryRef.current;
    if (pending === "wrap-next") {
      pendingBoundaryRef.current = null;
      skipCompleteRef.current = true;
      setTransition(INSTANT);
      setPhysical(n);
      requestAnimationFrame(() => setTransition(SPRING));
      return;
    }
    if (pending === "wrap-prev") {
      pendingBoundaryRef.current = null;
      skipCompleteRef.current = true;
      setTransition(INSTANT);
      setPhysical(2 * n - 1);
      requestAnimationFrame(() => setTransition(SPRING));
    }
  }, [n]);

  const goNext = useCallback(() => {
    setPhysical((p) => {
      if (p < 2 * n - 1) return p + 1;
      if (p === 2 * n - 1) {
        pendingBoundaryRef.current = "wrap-next";
        return 2 * n;
      }
      return p;
    });
  }, [n]);

  const goPrev = useCallback(() => {
    setPhysical((p) => {
      if (p > n) return p - 1;
      if (p === n) {
        pendingBoundaryRef.current = "wrap-prev";
        return n - 1;
      }
      return p;
    });
  }, [n]);

  useEffect(() => {
    if (n <= 1 || paused) return undefined;
    const id = window.setInterval(() => {
      goNext();
    }, AUTOPLAY_DELAY_MS);
    return () => window.clearInterval(id);
  }, [n, paused, goNext]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [goPrev, goNext]
  );

  const onPanEnd = useCallback(
    (_e, info) => {
      const { velocity, offset } = info;
      if (velocity.x < -200 || offset.x < -48) goNext();
      else if (velocity.x > 200 || offset.x > 48) goPrev();
    },
    [goNext, goPrev]
  );

  const current = TECH_STACK[centerItemIndex];

  return (
    <div
      className="about-tech-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Technologies"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <p className="visually-hidden">
        {current
          ? `Focused technology: ${current.name}. Use arrow keys, swipe, or buttons. Autoplay advances every few seconds.`
          : null}
      </p>
      <button
        type="button"
        className="about-tech-carousel-nav about-tech-carousel-nav--prev"
        onClick={goPrev}
        aria-label="Previous technology"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <motion.div
        ref={viewportRef}
        className="about-tech-carousel-viewport"
        onPanEnd={onPanEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.ul
          className="about-tech-carousel-track"
          initial={false}
          animate={{ x }}
          transition={transition}
          onAnimationComplete={onTrackAnimationComplete}
          style={{ willChange: "transform" }}
        >
          {slides.map((item, idx) => {
            const itemIdx = idx % n;
            const dist = ringDistance(itemIdx, centerItemIndex, n);
            const isCenter = dist === 0;
            const offStep = Math.min(dist, 2);

            return (
              <li
                key={`${idx}-${item.name}-${item.file}`}
                className={`about-tech-carousel-slot${isCenter ? " about-tech-carousel-slot--center" : ""}`}
                aria-current={isCenter ? "true" : undefined}
              >
                <div className={`about-tech-carousel-card about-tech-carousel-card--off-${offStep}`}>
                  <div className="about-tech-carousel-logo-shell">
                    <img
                      src={`/images/tech_logos/${item.file}`}
                      alt=""
                      className="about-tech-carousel-logo"
                      width={160}
                      height={160}
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                  <span className="about-tech-carousel-name">{item.name}</span>
                </div>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>

      <button
        type="button"
        className="about-tech-carousel-nav about-tech-carousel-nav--next"
        onClick={goNext}
        aria-label="Next technology"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}

const AboutMe = () => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.add("about-page-body");
    return () => document.body.classList.remove("about-page-body");
  }, []);

  const inViewProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.22 },
      };

  return (
    <div className="about-page">
      <motion.header
        className="about-header"
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        <h1 className="about-hero-title">
          <span className="about-hero-title-muted">THIS IS </span>
          <span className="about-hero-title-accent">ME</span>
        </h1>
      </motion.header>

      <motion.section
        className="about-intro"
        aria-labelledby="about-who-heading"
        variants={reduceMotion ? undefined : aboutStagger}
        {...inViewProps}
      >
        <motion.div className="about-intro-media" variants={reduceMotion ? undefined : aboutFadeUp}>
          <div className="about-photo-wrap">
            <img
              src="/images/me.jpeg"
              alt="Daniel Hernández"
              className="about-photo"
              width={400}
              height={480}
              decoding="async"
            />
          </div>
        </motion.div>
        <motion.div className="about-intro-copy" variants={reduceMotion ? undefined : aboutFadeUp}>
          <h2 id="about-who-heading" className="about-section-title">
            Who I am
          </h2>
          <div className="about-prose">
            <p>
              I&apos;m Daniel, a fourth-semester student in Computer Technologies Engineering at
              Tecnológico de Monterrey, Guadalajara campus. I focus on developing technology solutions
              that solve real-world problems by combining software development, data analysis, and
              digital product building.
            </p>
            <p>
              I have worked on projects ranging from data analysis applications to interactive
              systems, using tools such as Python and web development technologies. In every project, I
              aim to go beyond academic requirements by building end-to-end functional solutions with
              a clear practical purpose.
            </p>
            <p>
              One of my main interests is understanding how to turn an idea into a real product, making
              technical and design decisions that create meaningful impact. I&apos;m not only
              interested in writing code, but also in developing the judgment needed to build systems
              that are useful, scalable, and well-designed.
            </p>
          </div>
          <blockquote className="about-quote">
            <span className="about-quote-accent" aria-hidden="true" />
            <p className="about-quote-text">&ldquo;{PERSONAL_MOTTO}&rdquo;</p>
          </blockquote>
        </motion.div>
      </motion.section>

      <div className="about-tech-bleed">
        <motion.section
          className="about-tech"
          aria-labelledby="about-tech-heading"
          variants={reduceMotion ? undefined : aboutStagger}
          {...inViewProps}
        >
          <motion.h2
            id="about-tech-heading"
            className="about-tech-heading"
            variants={reduceMotion ? undefined : aboutFadeUp}
          >
            <span className="about-tech-heading-badge">Stack &amp; tools</span>
            <span className="about-tech-heading-title">
              <span className="about-tech-heading-muted">Technologies I </span>
              <span className="about-tech-heading-accent">use</span>
            </span>
          </motion.h2>
          <motion.div variants={reduceMotion ? undefined : aboutFadeUp}>
            <TechCarousel />
          </motion.div>
        </motion.section>
      </div>

      <div className="about-mid-bleed">
        <div className="about-mid-inner">
          <section className="about-certs" aria-labelledby="about-certs-heading">
            <motion.h2
              id="about-certs-heading"
              className="about-certs-heading"
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.25 }}
              variants={reduceMotion ? undefined : aboutFadeUp}
            >
              <span className="about-certs-badge">Credentials</span>
              <span className="about-certs-title-line">
                <span className="about-tech-heading-accent about-certs-title-accent">Certifications</span>
                <span className="about-tech-heading-muted"> &amp; courses</span>
              </span>
            </motion.h2>
            <motion.ul
              className="about-cert-grid"
              variants={reduceMotion ? undefined : aboutCertStagger}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.12 }}
            >
              {CERTIFICATIONS.map((cert) => (
                <motion.li key={cert.id} variants={reduceMotion ? undefined : aboutCertItem}>
                  <article className="about-cert-card">
                    <div className="about-cert-media">
                      {cert.imageSrc ? (
                        <img
                          src={cert.imageSrc}
                          alt={cert.title}
                          className="about-cert-img"
                          width={640}
                          height={480}
                          decoding="async"
                        />
                      ) : (
                        <div className="about-cert-media-placeholder" aria-hidden="true">
                          {(cert.title.trim().match(/[A-Za-z0-9]/)?.[0] ?? "?").toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="about-cert-text">
                      <h3 className="about-cert-title">{cert.title}</h3>
                      {cert.issuer ? (
                        <p className="about-cert-issuer">{cert.issuer}</p>
                      ) : null}
                      {cert.year != null && cert.year !== "" ? (
                        <p className="about-cert-year">{cert.year}</p>
                      ) : null}
                    </div>
                    {cert.href ? (
                      <a
                        href={cert.href}
                        className="about-cert-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        See certificate
                      </a>
                    ) : null}
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        </div>
      </div>

      <motion.footer
        className="about-cta"
        variants={reduceMotion ? undefined : aboutStagger}
        {...inViewProps}
      >
        <motion.h2 className="about-cta-heading" variants={reduceMotion ? undefined : aboutFadeUp}>
          What&apos;s next?
        </motion.h2>
        <motion.p className="about-cta-lead" variants={reduceMotion ? undefined : aboutFadeUp}>
          See what I&apos;ve built or get in touch—I&apos;d love to hear from you.
        </motion.p>
        <motion.div className="about-cta-actions" variants={reduceMotion ? undefined : aboutFadeUp}>
          <Link className="about-cta-btn about-cta-btn--primary" to="/contactme">
            Contact Me
          </Link>
          <Link className="about-cta-btn about-cta-btn--secondary" to="/projects">
            Projects
          </Link>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default AboutMe;
