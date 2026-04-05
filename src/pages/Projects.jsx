import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./Projects.css";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "webdev", label: "Web development" },
  { id: "iot", label: "IoT & embedded" },
  { id: "desktop", label: "Desktop & CLI" },
  { id: "data", label: "Data science" },
  { id: "vision", label: "Computer vision" },
];

const PROJECTS = [
  {
    id: "facial-recognition",
    title: "Face Recognition Attendance System",
    subtitle: "Computer vision · Python",
    description: "This project uses facial recognition to register employee attendance through a webcam. It compares each captured face against a database of employee images and records the entry time when a match is found. Employee photos are loaded from an Employees folder, converted to RGB, and encoded for recognition. When the script runs, it opens the webcam, matches live frames to registered encodings, displays the employee name on success, and appends employee name and entry time to register.csv (created automatically if it does not exist, with rows in the form employee_name, entry_time). If no registered face matches, the system reports that no employee was matched. Dependencies include dlib (with CMake for builds), face_recognition, OpenCV (cv2), and NumPy, alongside Python’s os and datetime for file paths and timestamps.",
    tags: ["Python", "OpenCV", "face_recognition", "dlib", "NumPy"],
    categories: ["vision"],
    repoUrl: "https://github.com/danihdz11/Face-Recognition",
    imageSrc: "/images/facial_recognition.jpg",
    imageGradient: "linear-gradient(145deg, #312e81 0%, #1e1b4b 50%, #0f172a 100%)",
  },
  {
    id: "smart-mirror",
    title: "Smart Mirror",
    subtitle: "IoT · Computer vision · Full stack",
    description:
      "An IoT smart mirror built with a Raspberry Pi and two-way glass: live overlays (time, weather, news), OpenCV-based face recognition for personalized content, and a modular stack with external APIs and React UIs.",
    tags: ["Raspberry Pi", "IoT", "OpenCV", "React", "Node.js", "APIs"],
    categories: ["iot", "webdev"],
    repoUrl: "https://github.com/danihdz11/Smart-Mirror",
    imageSrc: "/images/smart_mirror.png",
    imageGradient: "linear-gradient(145deg, #134e4a 0%, #0f766e 45%, #0f172a 100%)",
    richModal: {
      paragraphsBeforeList: [
        "The Smart Mirror is an interactive IoT device that projects useful digital information onto a two-way mirror so everyday data fits naturally into the user’s routine.",
        "Hardware combines a Raspberry Pi, internal monitor, and two-way mirror to overlay real-time content—time, weather, news, and notifications—on the reflective surface. OpenCV and computer-vision models add face recognition so the system can identify the user and tailor what is shown, with a path toward access control, assistants, or home automation.",
        "On the software side, a modular architecture pulls data from external APIs and presents it through React-based interfaces and custom dashboards.",
      ],
      listIntro: "The work is intentionally interdisciplinary, spanning:",
      listItems: [
        "Embedded systems",
        "Computer vision",
        "Full-stack development",
        "API integration",
        "User-centered interface design",
      ],
      paragraphsAfterList: [
        "Overall it demonstrates solid software and electronics skills with a focus on practical, user-centered innovation.",
      ],
      highlight:
        "1st place at Tec de Monterrey’s Expo Ingenierías (physical prototype category), recognizing the project’s impact, creativity, and execution.",
      certificateSrc: "/images/certificate.png",
      certificateAlt: "Expo Ingenierías first place certificate, physical prototype category",
    },
  },
  {
    id: "hotel-system",
    title: "Hotel Management System",
    subtitle: "Object-oriented programming · C++",
    description:
      "A C++ command-line simulation of a small hotel: room types (junior, suite, deluxe) modeled with inheritance and polymorphism, encapsulated state, and menus for check-in, charges, and occupancy reporting.",
    tags: ["C++", "OOP", "Inheritance", "Polymorphism", "CLI"],
    categories: ["desktop"],
    repoUrl: "https://github.com/danihdz11/Hotel-Management-System",
    imageSrc: "/images/hotel_system.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
    richModal: {
      paragraphsBeforeList: [
        "This project is a C++ hotel management simulation built to showcase core object-oriented ideas: inheritance across room types, encapsulation of room and hotel data, and polymorphic behavior when presenting room information.",
        "Users interact through a text-based, menu-driven interface that dispatches operations and handles input in a structured loop.",
      ],
      listIntro: "Highlights:",
      listItems: [
        "Class hierarchy with inheritance for junior, suite, and deluxe rooms",
        "Polymorphic display of room details",
        "Encapsulated attributes for rooms and hotel-level settings",
        "Check-in: assign a guest and mark the room occupied",
        "Check-out: release the room and reset its state",
        "Add charges: post extra fees to a room’s account",
        "Occupancy report: list every room as occupied or available",
        "Dynamic menu for navigation and input handling",
      ],
      paragraphsAfterList: [],
    },
  },
  {
    id: "Virtual-Assistant",
    title: "Virtual Assistant",
    subtitle: "Python · Speech recognition · TTS",
    description:
      "A Python voice assistant: speech-to-text and text-to-speech, plus integrations for Wikipedia, YouTube, Google search, Yahoo Finance, jokes, date/time, and opening sites—configurable for Spanish and English.",
    tags: ["Python", "SpeechRecognition", "pyttsx3", "pywhatkit", "yfinance"],
    categories: ["desktop"],
    repoUrl: "https://github.com/danihdz11/Virtual-Assitant",
    imageSrc: "/images/virtual_assistant.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
    richModal: {
      paragraphsBeforeList: [
        "This project is a Python virtual assistant that listens for spoken commands and answers aloud using text-to-speech. It ties together voice I/O with small automations so you can search the web, play media, check facts, and run everyday utilities without typing.",
        "Typical flows include Wikipedia lookups, YouTube playback, Google search, stock prices through Yahoo Finance, jokes, date and time, and opening websites or apps. You run the script, wait for the prompt, then speak naturally (e.g., Open YouTube, What day is it today?, Search Wikipedia for [topic], Play [song name]).",
      ],
      listIntro: "Highlights:",
      listItems: [
        "Voice recognition for hands-free commands",
        "TTS responses via pyttsx3",
        "YouTube, Google, and Wikipedia integration (pywhatkit / wikipedia)",
        "Stock data with yfinance; jokes with pyjokes",
        "Bilingual support: configurable Spanish / English voice IDs in code",
        "Extend behavior by editing the pedir_cosas() function",
      ],
      paragraphsAfterList: [
        "Stack (pip): pyttsx3, SpeechRecognition, pywhatkit, yfinance, pyjokes, wikipedia.",
      ],
    },
  },
  {
    id: "Hospital-System",
    title: "Hospital Application",
    subtitle: "Python · PySide6 · Desktop GUI",
    description:
      "A Python desktop hospital manager built with PySide6 (Qt6): patient registration, severity-based priority queue, role-specific views for clerks, doctors, and patients, plus PDF invoices emailed with ReportLab and smtplib.",
    tags: ["Python", "PySide6", "Qt6", "ReportLab", "Pillow"],
    categories: ["desktop"],
    repoUrl: "https://github.com/danihdz11/Hospital-App",
    imageSrc: "/images/hospital.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
    richModal: {
      paragraphsBeforeList: [
        "This project is a hospital management application in Python and PySide6 (Qt6) for registering patients, ordering care by severity, and issuing invoices. Clerks, doctors, and patients each interact through tailored screens so front-desk intake, clinical flow, and basic transparency for people waiting all stay in sync.",
        "The design centers on a priority queue: severity drives order, doctors dequeue the next case to treat, and patients can see who is ahead. Every registration can produce a PDF invoice and send it by email, with custom backgrounds and icons to keep the GUI approachable.",
      ],
      listIntro: "Highlights:",
      listItems: [
        "Clerk workflow: capture name, age, condition severity, and gender",
        "Priority queue ranked by severity",
        "Doctor tools: view and serve the next patient in line",
        "Patient view: see who is next in the queue",
        "ReportLab PDF invoices; smtplib email delivery with attachments",
        "Pillow for image assets; polished UI chrome",
      ],
      paragraphsAfterList: [
        "Stack: Python, PySide6 (Qt6), Pillow, ReportLab, smtplib.",
      ],
    },
  },
  {
    id: "Restaurant-payment-system",
    title: "Restaurant Payment System",
    subtitle: "Python · tkinter · Desktop GUI",
    description:
      "A tkinter desktop app for restaurant checkout: browse food, drinks, and desserts, pick quantities, run totals, view and save receipts, use a built-in calculator, and reset for the next order.",
    tags: ["Python", "tkinter", "GUI"],
    categories: ["desktop"],
    repoUrl: "https://github.com/danihdz11/Restaurant-Payment-System",
    imageSrc: "/images/restaurant_system.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
    richModal: {
      paragraphsBeforeList: [
        "This project is a graphical restaurant payment system written in Python with tkinter. Customers (or staff) pick items from a structured menu, adjust quantities, and see running totals before confirming a sale.",
        "The flow covers browsing categories, interactive selection with checkbuttons and quantity fields, optional manual math with an embedded calculator, on-screen receipt preview, saving receipts for records, and a full reset to start a new order.",
      ],
      listIntro: "Highlights:",
      listItems: [
        "Menu sections for food, beverages, and desserts",
        "Checkbuttons and quantity inputs for item selection",
        "Built-in calculator for manual calculations",
        "Detailed receipt preview with line items and costs",
        "Save receipts to disk for record-keeping",
        "Reset clears selections and inputs for a new session",
      ],
      paragraphsAfterList: [],
    },
  },
  {
    id: "ranch-depot",
    title: "Ranch Depot",
    subtitle: "Shopify · E-commerce · Conversational commerce",
    description:
      "A western-style Shopify store (boots, hats, jeans, horse gear) with a conversion-focused layout plus a SendPulse chatbot wired to the product catalog via a custom API—natural-language shopping on channels like WhatsApp with images, details, and buy links.",
    tags: ["Shopify", "SendPulse", "WhatsApp", "API", "E-commerce"],
    categories: ["ecommerce", "webdev"],
    repoUrl: "https://ranchdepot.com/",
    repoLinkLabel: "See page",
    imageSrc: "/images/ranchdepot_web.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
    richModal: {
      paragraphsBeforeList: [
        "Ranch Depot is a Shopify e-commerce experience built around cowboy culture: boots, hats, denim, and horse products. The storefront is structured for clear navigation and conversion, with visuals and layout tuned to turn visitors into buyers.",
        "The main differentiator is conversational automation: a SendPulse chatbot connects through a custom API to the live Shopify catalog. Users can talk in natural language from channels such as WhatsApp, search by attributes like size or product type, and get instant replies with images, key facts, and direct purchase links.",
        "Together, the site is more than a classic online shop—it pairs traditional e-commerce with a real-time conversational layer that makes browsing and buying faster and more accessible.",
      ],
      listIntro: "Highlights:",
      listItems: [
        "Shopify-based catalog and checkout for western lifestyle products",
        "SendPulse bot integrated with the store via a custom API",
        "Natural-language product discovery (e.g., size, category) on WhatsApp and similar channels",
        "Rich answers with product images, descriptions, and deep links to buy",
        "Blends standard e-commerce with intelligent, channel-native sales support",
      ],
      paragraphsAfterList: [],
      bottomImageSrc: "/images/ranchdepot_web_2.png",
      bottomImageAlt: "ranch example web",
    },
  },
  {
    id: "game",
    title: "Virtual Matching Game",
    subtitle: "Memory game · Sports theme · 6×6 grid",
    description:
      "A sports-themed memory game on a 6×6 grid: flip cards to find pairs, randomized layouts, a simple start flow with Play, and a win screen when every match is cleared.",
    tags: ["Game", "Memory", "UI"],
    categories: ["desktop"],
    repoUrl: "https://github.com/danihdz11/Matching-Game",
    imageSrc: "/images/matching_game.jpg",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
    richModal: {
      paragraphsBeforeList: [
        "A virtual memory game with a sports theme: players work through a 6×6 board of face-down cards, flipping two at a time to find matching images. Randomized deals keep sessions varied and reward focus, pattern recall, and quick visual scanning.",
        "Launch by running the script, choose Play on the opening screen, then click cards to reveal them. When every pair is matched, the game celebrates with a victory message so you know the round is complete.",
      ],
      listIntro: "Highlights:",
      listItems: [
        "6×6 grid with randomized sports-themed card art",
        "Straightforward interface and flip-to-match gameplay",
        "Start screen with a Play control to begin a round",
        "Victory feedback once all pairs are matched",
      ],
      paragraphsAfterList: [],
      bottomImageSrc: "/images/playing_mg.png",
      bottomImageAlt: "Virtual Matching Game gameplay",
    },
  },
  {
    id: "data-science",
    title: "Alura TelecomX Challenge",
    subtitle: "Data science · Churn analysis · EDA",
    description:
      "Telecom X customer churn study in Python: EDA, data cleaning and visualization in Colab to find cancellation drivers, risk patterns, and foundations for retention strategy and future predictive modeling.",
    tags: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib", "Google Colab"],
    categories: ["data"],
    repoUrl: "https://github.com/danihdz11/Alura-TelecomX",
    imageSrc: "/images/telecom.png",
    imageGradient: "linear-gradient(145deg, #4c1d95 0%, #5b21b6 40%, #0f172a 100%)",
    richModal: {
      paragraphsBeforeList: [
        "This notebook analyzes Telecom X customer records to understand churn: exploratory analysis, structured cleaning, and visual storytelling that highlights patterns useful for keeping subscribers.",
        "The focus is on variables tied to service cancellations—mapping risk profiles, informing retention decisions, and preparing a solid feature set for a possible predictive model down the line.",
      ],
      listIntro: "Highlights:",
      listItems: [
        "Objectives: flag churn drivers, guide retention strategy, support future modeling",
        "Stack: Python 3, Pandas, NumPy, Seaborn, Matplotlib, Google Colab",
        "Cleaning: expanded nested JSON, dropped incomplete or inconsistent rows (NaN, empty strings), encoded categorical fields",
        "Engineered Cuentas_Diarias and TotalServices",
        "EDA: churn distribution; contract type, services bundle, and payment method",
        "Compared numeric signals (tenure, MonthlyCharges, etc.) for retained vs churned customers",
        "Correlation matrix and review of key relationships",
      ],
      paragraphsAfterList: [],
    },
  },
];

function ProjectModalDescription({ project }) {
  if (project.richModal) {
    const r = project.richModal;
    return (
      <div className="projects-modal-description-group">
        {r.paragraphsBeforeList.map((text, i) => (
          <p key={i} className="projects-modal-description">
            {text}
          </p>
        ))}
        <p className="projects-modal-description">{r.listIntro}</p>
        <ul className="projects-modal-description-list">
          {r.listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {r.paragraphsAfterList.map((text, i) => (
          <p key={i} className="projects-modal-description">
            {text}
          </p>
        ))}
        {r.highlight ? (
          <p className="projects-modal-highlight">{r.highlight}</p>
        ) : null}
        {r.bottomImageSrc || r.certificateSrc ? (
          <img
            className="projects-modal-certificate"
            src={r.bottomImageSrc ?? r.certificateSrc}
            alt={r.bottomImageAlt ?? r.certificateAlt ?? ""}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
    );
  }
  return <p className="projects-modal-description">{project.description}</p>;
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

      <div className="projects-filters" role="tablist" aria-label="Filter projects by type">
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
                <h2 className="projects-card-title">{project.title}</h2>
                <p className="projects-card-subtitle">{project.subtitle}</p>
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
              <ProjectModalDescription project={modalProject} />
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
                {!modalProject.repoLinkLabel ? (
                  <img
                    className="projects-modal-github-icon"
                    src="/images/github_black_logo.png"
                    alt=""
                    decoding="async"
                    aria-hidden
                  />
                ) : null}
                {modalProject.repoLinkLabel ?? "View repository on GitHub"}
              </a>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
