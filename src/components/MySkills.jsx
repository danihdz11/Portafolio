import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./MySkills.css";

const PER_PAGE = 6;
const ROTATE_MS = 3000;

const HOME_TECH = [
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

function chunkItems(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

const EASE = [0.22, 1, 0.36, 1];

const MySkills = () => {
  const pages = useMemo(() => chunkItems(HOME_TECH, PER_PAGE), []);
  const reduceMotion = useReducedMotion();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (pages.length <= 1) return undefined;

    let id;
    const start = () => {
      if (id !== undefined) clearInterval(id);
      id = window.setInterval(() => {
        setActivePage((p) => (p + 1) % pages.length);
      }, ROTATE_MS);
    };
    const stop = () => {
      if (id !== undefined) {
        clearInterval(id);
        id = undefined;
      }
    };

    start();
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pages.length]);

  const batch = pages[activePage] ?? [];

  return (
    <section className="my-skills" aria-labelledby="my-skills-heading">
      <div className="my-skills__shell">
        <div className="my-skills__intro">
          <h2 id="my-skills-heading" className="my-skills__title">
            What I do
          </h2>
          <p className="my-skills__lead">
          I design and build systems that combine backend development, APIs, and data processing to create efficient and scalable real-world applications.
          </p>
        </div>

        <div className="my-skills__stage">
          <div className="my-skills__rail my-skills__rail--left" aria-hidden="true">
            <span className="my-skills__rail-label">Skills</span>
          </div>

          <div className="my-skills__carousel">
            <div
              className="my-skills__viewport"
              role="region"
              aria-roledescription="carousel"
              aria-label={`Technologies. Showing page ${activePage + 1} of ${pages.length}. Updates every ${ROTATE_MS / 1000} seconds.`}
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activePage}
                  className="my-skills__page"
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.48,
                    ease: EASE,
                  }}
                >
                  <ul className="my-skills__grid">
                    {batch.map((item) => (
                      <li key={item.file} className="my-skills__cell">
                        <div className="my-skills__card">
                          <img
                            className="my-skills__logo"
                            src={`/images/tech_logos/${item.file}`}
                            alt=""
                            width={72}
                            height={72}
                            decoding="async"
                          />
                          <span className="my-skills__name">{item.name.toUpperCase()}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="my-skills__rail my-skills__rail--right" aria-hidden="true">
            {pages.map((_, i) => (
              <span
                key={i}
                className="my-skills__marker"
                data-active={i === activePage ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySkills;
