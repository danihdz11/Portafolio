import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./ContactMe.css";

const GOOGLE_MAPS_EMBED_SRC =
    "https://www.google.com/maps?q=Guadalajara%2C%20Jalisco%2C%20M%C3%A9xico&output=embed";

const EASE_OUT = [0.22, 1, 0.36, 1];

const contactFadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.68, ease: EASE_OUT },
    },
};

const contactLayoutStagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.22, delayChildren: 0.18 },
    },
};

const contactColumn = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.72, ease: EASE_OUT },
    },
};

const contactListStagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.14, delayChildren: 0.32 },
    },
};

const contactInfoItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, ease: EASE_OUT },
    },
};

export default function ContactMe() {
    const reduceMotion = useReducedMotion();
    const [errors, setErrors] = useState({});
    const [statusMessage, setStatusMessage] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setStatusMessage("");
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const nextErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) nextErrors.name = "Name is required.";
        if (!form.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!emailRegex.test(form.email.trim())) {
            nextErrors.email = "Please enter a valid email.";
        }
        if (!form.message.trim()) nextErrors.message = "Message is required.";

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setStatusMessage("");
            return;
        }

        try {
            const data = await fetch("api/server", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    message: form.message.trim(),
                }),
            });
            const res = await data.json();
            if (!data.ok) {
                setStatusMessage(res?.message || "No se pudo enviar el mensaje.");
                return;
            }

            setStatusMessage("Mensaje enviado");
            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            setErrors({});
        } catch (error) {
            setStatusMessage("No se pudo enviar el mensaje.");
        }
    };

    const inViewProps = reduceMotion
        ? {}
        : {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, amount: 0.22 },
          };

    const listMotionProps = reduceMotion
        ? {}
        : {
              initial: "hidden",
              animate: "visible",
              variants: contactListStagger,
          };

    return (
        <div className="contact-page">
            <motion.div
                className="contact-layout"
                variants={reduceMotion ? undefined : contactLayoutStagger}
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
            >
                <motion.aside
                    className="contact-sidebar"
                    aria-label="Información de contacto"
                    variants={reduceMotion ? undefined : contactColumn}
                >
                    <div className="contact-profile-card">
                        <motion.div
                            className="contact-profile-top"
                            variants={reduceMotion ? undefined : contactFadeUp}
                            initial={reduceMotion ? false : "hidden"}
                            animate={reduceMotion ? undefined : "visible"}
                        >
                            <div className="contact-avatar-wrap">
                                <img
                                    src="/images/me.webp"
                                    alt=""
                                    className="contact-avatar"
                                    width={120}
                                    height={120}
                                    decoding="async"
                                />
                            </div>
                            <h2 className="contact-name">Daniel Hernández</h2>
                            <p className="contact-role">Developer</p>
                        </motion.div>
                        <motion.ul
                            className="contact-info-list"
                            {...listMotionProps}
                        >
                            <motion.li
                                className="contact-info-item"
                                variants={reduceMotion ? undefined : contactInfoItem}
                            >
                                <span className="contact-info-icon" aria-hidden>
                                    <img
                                        src="/images/mail.webp"
                                        alt=""
                                        width={20}
                                        height={20}
                                        decoding="async"
                                    />
                                </span>
                                <div className="contact-info-text">
                                    <span className="contact-info-label">Email</span>
                                    <span className="contact-info-value">
                                        dani.hdz.dev@gmail.com
                                    </span>
                                </div>
                            </motion.li>
                            <motion.li
                                className="contact-info-item"
                                variants={reduceMotion ? undefined : contactInfoItem}
                            >
                                <span className="contact-info-icon" aria-hidden>
                                    <img
                                        src="/images/telephone.webp"
                                        alt=""
                                        width={20}
                                        height={20}
                                        decoding="async"
                                    />
                                </span>
                                <div className="contact-info-text">
                                    <span className="contact-info-label">Phone</span>
                                    <span className="contact-info-value">
                                        +52 3312714517
                                    </span>
                                </div>
                            </motion.li>
                            <motion.li
                                className="contact-info-item"
                                variants={reduceMotion ? undefined : contactInfoItem}
                            >
                                <span className="contact-info-icon" aria-hidden>
                                    <img
                                        src="/images/calendar.webp"
                                        alt=""
                                        width={20}
                                        height={20}
                                        decoding="async"
                                    />
                                </span>
                                <div className="contact-info-text">
                                    <span className="contact-info-label">Birthday</span>
                                    <span className="contact-info-value">13-09-2005</span>
                                </div>
                            </motion.li>
                            <motion.li
                                className="contact-info-item"
                                variants={reduceMotion ? undefined : contactInfoItem}
                            >
                                <span className="contact-info-icon" aria-hidden>
                                    <img
                                        src="/images/location.webp"
                                        alt=""
                                        width={20}
                                        height={20}
                                        decoding="async"
                                    />
                                </span>
                                <div className="contact-info-text">
                                    <span className="contact-info-label">Location</span>
                                    <span className="contact-info-value">
                                        Guadalajara, México
                                    </span>
                                </div>
                            </motion.li>
                        </motion.ul>
                        <motion.div
                            className="contact-sidebar-social"
                            variants={reduceMotion ? undefined : contactFadeUp}
                            initial={reduceMotion ? false : "hidden"}
                            animate={reduceMotion ? undefined : "visible"}
                        >
                            <a
                                href="https://github.com/danihdz11"
                                className="contact-sidebar-social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/images/github_logo.webp"
                                    alt=""
                                    width={22}
                                    height={22}
                                    decoding="async"
                                />
                                <span className="visually-hidden">GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/daniel-hernandez-gutierrez/"
                                className="contact-sidebar-social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/images/linkedin_logo.webp"
                                    alt=""
                                    width={22}
                                    height={22}
                                    decoding="async"
                                />
                                <span className="visually-hidden">LinkedIn</span>
                            </a>
                        </motion.div>
                    </div>
                </motion.aside>

                <motion.main className="contact-main" variants={reduceMotion ? undefined : contactColumn}>
                    <header className="contact-main-header">
                        <h1 className="contact-page-title">Contact</h1>
                    </header>

                    <motion.div
                        className="contact-map-wrap"
                        variants={reduceMotion ? undefined : contactFadeUp}
                        {...inViewProps}
                    >
                        <iframe
                            title="Ubicación"
                            className="contact-map-iframe"
                            src={GOOGLE_MAPS_EMBED_SRC}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>

                    <motion.section
                        className="contact-form-section"
                        aria-labelledby="contact-form-heading"
                        variants={reduceMotion ? undefined : contactFadeUp}
                        {...inViewProps}
                    >
                        <h2 id="contact-form-heading" className="contact-form-title">
                            Contact Form
                        </h2>
                        <div className="contact-form-grid">
                            <div className="contact-form-row">
                                <label className="contact-field">
                                    <span className="visually-hidden">Full name</span>
                                    <input
                                        name="name"
                                        type="text"
                                        className="contact-input"
                                        placeholder="Full name"
                                        value={form.name}
                                        onChange={handleOnChange}
                                        autoComplete="name"
                                        required
                                        aria-invalid={Boolean(errors.name)}
                                    />
                                    {errors.name ? <small>{errors.name}</small> : null}
                                </label>
                                <label className="contact-field">
                                    <span className="visually-hidden">Email address</span>
                                    <input
                                        name="email"
                                        type="email"
                                        className="contact-input"
                                        placeholder="Email address"
                                        value={form.email}
                                        onChange={handleOnChange}
                                        autoComplete="email"
                                        required
                                        aria-invalid={Boolean(errors.email)}
                                    />
                                    {errors.email ? <small>{errors.email}</small> : null}
                                </label>
                            </div>
                            <label className="contact-field contact-field--full">
                                <span className="visually-hidden">Your Message</span>
                                <textarea
                                    name="message"
                                    className="contact-textarea"
                                    rows={6}
                                    placeholder="Your Message"
                                    value={form.message}
                                    onChange={handleOnChange}
                                    required
                                    aria-invalid={Boolean(errors.message)}
                                />
                                {errors.message ? <small>{errors.message}</small> : null}
                            </label>
                        </div>
                        <div className="contact-form-footer">
                            {statusMessage ? <small>{statusMessage}</small> : null}
                            <motion.button
                                type="button"
                                onClick={handleSendEmail}
                                className="contact-submit"
                                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                            >
                                <svg
                                    className="contact-submit-icon"
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <path d="M22 2 15 22 11 13 2 9 22 2z" />
                                </svg>
                                Send Message
                            </motion.button>
                        </div>
                    </motion.section>
                </motion.main>
            </motion.div>
        </div>
    );
}
