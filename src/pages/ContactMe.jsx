import { useState } from "react";
import "./ContactMe.css";

const GOOGLE_MAPS_EMBED_SRC = "https://www.google.com/maps?q=Guadalajara%2C%20Jalisco%2C%20M%C3%A9xico&output=embed";

export default function ContactMe() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSendEmail = async (e) => {
        e.preventDefault();
        const data = await fetch('api/server', {
            method: "POST",
            headers: {},
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                message: form.message,
            }),
        });
        const res = await data.json();
        console.log(res);
    }

    return (
        <div className="contact-page">
            <div className="contact-layout">
                <aside className="contact-sidebar" aria-label="Información de contacto">
                    <div className="contact-profile-card">
                        <div className="contact-avatar-wrap">
                            <img
                                src="/images/me.jpeg"
                                alt=""
                                className="contact-avatar"
                                width={120}
                                height={120}
                                decoding="async"
                            />
                        </div>
                        <h2 className="contact-name">Daniel Hernández</h2>
                        <p className="contact-role">Developer</p>
                        <ul className="contact-info-list">
                            <li className="contact-info-item">
                                <span className="contact-info-icon" aria-hidden>
                                    <img src="/images/mail.png" alt="" width={20} height={20} decoding="async" />
                                </span>
                                <div className="contact-info-text">
                                    <span className="contact-info-label">Email</span>
                                    <span className="contact-info-value">dani.hdz.dev@gmail.com</span>
                                </div>
                            </li>
                            <li className="contact-info-item">
                                <span className="contact-info-icon" aria-hidden>
                                    <img src="/images/telephone.png" alt="" width={20} height={20} decoding="async" />
                                </span>
                                <div className="contact-info-text">
                                    <span className="contact-info-label">Phone</span>
                                    <span className="contact-info-value">+52 3312714517</span>
                                </div>
                            </li>
                            <li className="contact-info-item">
                                <span className="contact-info-icon" aria-hidden>
                                    <img src="/images/calendar.png" alt="" width={20} height={20} decoding="async" />
                                </span>
                                <div className="contact-info-text">
                                    <span className="contact-info-label">Birthday</span>
                                    <span className="contact-info-value">13-09-2005</span>
                                </div>
                            </li>
                            <li className="contact-info-item">
                                <span className="contact-info-icon" aria-hidden>
                                    <img src="/images/location.png" alt="" width={20} height={20} decoding="async" />
                                </span>
                                <div className="contact-info-text">
                                    <span className="contact-info-label">Location</span>
                                    <span className="contact-info-value">Guadalajara, México</span>
                                </div>
                            </li>
                        </ul>
                        <div className="contact-sidebar-social">
                            <a
                                href="https://github.com/danihdz11"
                                className="contact-sidebar-social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/images/github_logo.png" alt="" width={22} height={22} decoding="async" />
                                <span className="visually-hidden">GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/daniel-hernandez-gutierrez/"
                                className="contact-sidebar-social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/images/linkedin_logo.png" alt="" width={22} height={22} decoding="async" />
                                <span className="visually-hidden">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </aside>

                <main className="contact-main">
                    <header className="contact-main-header">
                        <h1 className="contact-page-title">Contact</h1>
                    </header>

                    <div className="contact-map-wrap">
                        <iframe
                            title="Ubicación"
                            className="contact-map-iframe"
                            src={GOOGLE_MAPS_EMBED_SRC}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <section className="contact-form-section" aria-labelledby="contact-form-heading">
                        <h2 id="contact-form-heading" className="contact-form-title">Contact Form</h2>
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
                                    />
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
                                    />
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
                                />
                            </label>
                        </div>
                        <div className="contact-form-footer">
                            <button
                                type="button"
                                onClick={handleSendEmail}
                                className="contact-submit"
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
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
