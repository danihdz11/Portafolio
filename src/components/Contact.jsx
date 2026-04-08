import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const DEFAULT_POS = { xPct: 50, yPct: 38 };
const EDGE_PAD = 14;

function clampFloatInSection(section, floatEl, px, py, pad = EDGE_PAD) {
  const r = section.getBoundingClientRect();
  const w = floatEl?.offsetWidth ?? 220;
  const h = floatEl?.offsetHeight ?? 76;
  const halfW = w / 2;
  const halfH = h / 2;
  const minX = halfW + pad;
  const maxX = r.width - halfW - pad;
  const minY = halfH + pad;
  const maxY = r.height - halfH - pad;

  let cx = px;
  let cy = py;
  if (maxX >= minX) cx = Math.min(maxX, Math.max(minX, cx));
  else cx = r.width / 2;
  if (maxY >= minY) cy = Math.min(maxY, Math.max(minY, cy));
  else cy = r.height / 2;

  return { xPct: (cx / r.width) * 100, yPct: (cy / r.height) * 100 };
}

export default function Contact() {
  const sectionRef = useRef(null);
  const floatRef = useRef(null);
  const rafRef = useRef(0);
  const posRef = useRef(DEFAULT_POS);

  const applyFloatPosition = useCallback(() => {
    const section = sectionRef.current;
    const floatEl = floatRef.current;
    if (!section) return;
    const r = section.getBoundingClientRect();
    const px = (posRef.current.xPct / 100) * r.width;
    const py = (posRef.current.yPct / 100) * r.height;
    const { xPct, yPct } = clampFloatInSection(section, floatEl, px, py);
    posRef.current = { xPct, yPct };
    section.style.setProperty("--contact-float-x", `${xPct}%`);
    section.style.setProperty("--contact-float-y", `${yPct}%`);
  }, []);

  useEffect(() => {
    applyFloatPosition();
  }, [applyFloatPosition]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    const applyClampedDefault = () => {
      const floatEl = floatRef.current;
      const r = section.getBoundingClientRect();
      const px = (DEFAULT_POS.xPct / 100) * r.width;
      const py = (DEFAULT_POS.yPct / 100) * r.height;
      const next = clampFloatInSection(section, floatEl, px, py);
      posRef.current = next;
      section.style.setProperty("--contact-float-x", `${next.xPct}%`);
      section.style.setProperty("--contact-float-y", `${next.yPct}%`);
    };

    const onMove = (e) => {
      if (!mqHover.matches || mq.matches) return;
      const floatEl = floatRef.current;
      const r = section.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      const { xPct, yPct } = clampFloatInSection(section, floatEl, px, py);
      posRef.current = { xPct, yPct };

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        section.style.setProperty("--contact-float-x", `${xPct}%`);
        section.style.setProperty("--contact-float-y", `${yPct}%`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        applyClampedDefault();
      });
    };

    const onResize = () => {
      applyClampedDefault();
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => {
      requestAnimationFrame(applyClampedDefault);
    });

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="contact-cta" aria-labelledby="contact-cta-heading">
      <div className="contact-cta-inner">
        <h2 id="contact-cta-heading" className="contact-cta-title">
          <span className="contact-cta-line">All you need is</span>
          <span className="contact-cta-line">
            a <span className="contact-cta-em">message</span>
          </span>
          <span className="contact-cta-line contact-cta-line--arrow">
            to work together
            <img
              src="/images/arrow_icon.webp"
              alt=""
              className="contact-cta-title-arrow"
              decoding="async"
            />
          </span>
        </h2>
      </div>

      <div className="contact-cta-float-wrap" aria-hidden>
        <div ref={floatRef} className="contact-cta-float">
          <Link to="/contactme" className="contact-cta-float-btn">
            Send message
          </Link>
        </div>
      </div>
    </section>
  );
}
