import { useEffect, useRef } from "react";
import { personalInfo, skills, projects } from "../data/content";
import { PaletteIcon, GearIcon, DatabaseIcon, WrenchIcon, FileCodeIcon } from "./Icons";
import { AnimatedGridDots, AnimatedWave, AnimatedRings } from "./AnimatedVectors";

const skillIcons = {
  Frontend: PaletteIcon,
  Backend: GearIcon,
  Database: DatabaseIcon,
  "DevOps & Tools": WrenchIcon,
  Languages: FileCodeIcon,
};

function useAnimateOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useAnimateOnScroll();
  return (
    <div
      ref={ref}
      className={`animate-target ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function RecruiterMode() {
  return (
    <div className="recruiter-mode">
      {/* Hero */}
      <section className="rec-hero">
        <div className="rec-hero-bg">
          <div className="rec-hero-orb rec-hero-orb-1" />
          <div className="rec-hero-orb rec-hero-orb-2" />
          <div className="rec-hero-orb rec-hero-orb-3" />
          <div className="rec-hero-grid" />
        </div>
        <div className="rec-hero-content">
          <AnimatedSection className="rec-hero-text">
            <div className="rec-status-badge">
              <span className="rec-status-dot" />
              Open to opportunities
            </div>
            <h1 className="rec-name">
              {personalInfo.name}
            </h1>
            <h2 className="rec-title">{personalInfo.elevatorPitch}</h2>
            <p className="rec-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {personalInfo.location}
            </p>
          </AnimatedSection>
          <AnimatedSection className="rec-hero-avatar-wrap" delay={200}>
            <div className="rec-avatar-ring">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="rec-avatar"
              />
            </div>
            <AnimatedRings />
          </AnimatedSection>
        </div>
        <AnimatedSection className="rec-ctas" delay={400}>
          <a href={`mailto:${personalInfo.email}`} className="rec-btn primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Contact Me
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="rec-btn outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="rec-btn outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </AnimatedSection>
        <AnimatedWave />
      </section>

      {/* Stats */}
      <section className="rec-stats-section">
        <div className="rec-stats">
          <AnimatedSection className="rec-stat-card" delay={0}>
            <div className="rec-stat-number">1+</div>
            <div className="rec-stat-label">Projects Shipped</div>
          </AnimatedSection>
          <AnimatedSection className="rec-stat-card" delay={100}>
            <div className="rec-stat-number">6+</div>
            <div className="rec-stat-label">Technologies</div>
          </AnimatedSection>
          <AnimatedSection className="rec-stat-card" delay={200}>
            <div className="rec-stat-number">ALX</div>
            <div className="rec-stat-label">Certified SE</div>
          </AnimatedSection>
          <AnimatedSection className="rec-stat-card" delay={300}>
            <div className="rec-stat-number">2</div>
            <div className="rec-stat-label">Languages</div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills */}
      <section className="rec-section rec-skills-section">
        <AnimatedSection>
          <div className="rec-section-header">
            <span className="rec-section-tag">Expertise</span>
            <h3 className="rec-section-title">Skills & Technologies</h3>
            <p className="rec-section-subtitle">Technologies I work with to build modern web applications</p>
          </div>
        </AnimatedSection>
        <div className="rec-skills-grid">
          {Object.entries(skills).map(([category, items], catIdx) => {
            const Icon = skillIcons[category] || PaletteIcon;
            return (
              <AnimatedSection
                key={category}
                className="rec-skill-category"
                delay={catIdx * 100}
              >
                <div className="rec-skill-icon">
                  <Icon size={24} />
                </div>
                <h4 className="rec-skill-label">{category}</h4>
                <div className="rec-skill-badges">
                  {items.map((skill) => (
                    <span key={skill} className="rec-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section className="rec-section rec-projects-section">
        <AnimatedSection>
          <div className="rec-section-header">
            <span className="rec-section-tag">Portfolio</span>
            <h3 className="rec-section-title">Featured Projects</h3>
            <p className="rec-section-subtitle">A selection of projects I've built and contributed to</p>
          </div>
        </AnimatedSection>
        <div className="rec-projects">
          {projects.map((project, idx) => (
            <AnimatedSection key={project.name} className="rec-project-card" delay={idx * 150}>
              <div className="rec-project-top">
                <div className="rec-project-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="rec-project-links">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="rec-project-link" title="Live Demo">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="rec-project-link" title="Source Code">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <h4 className="rec-project-name">{project.name}</h4>
              <p className="rec-project-desc">{project.description}</p>
              <div className="rec-project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="rec-badge small">
                    {t}
                  </span>
                ))}
              </div>
              <ul className="rec-project-highlights">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="rec-section rec-about-section">
        <AnimatedSection>
          <div className="rec-about-card">
            <div className="rec-about-left">
              <span className="rec-section-tag">About</span>
              <h3 className="rec-section-title" style={{ marginTop: "0.5rem" }}>
                A bit about me
              </h3>
            </div>
            <div className="rec-about-right">
              <p className="rec-about-text">{personalInfo.bio}</p>
              <div className="rec-about-details">
                <div className="rec-about-detail">
                  <span className="rec-about-detail-label">Education</span>
                  <span className="rec-about-detail-value">ALX Software Engineering</span>
                </div>
                <div className="rec-about-detail">
                  <span className="rec-about-detail-label">Languages</span>
                  <span className="rec-about-detail-value">English, French</span>
                </div>
                <div className="rec-about-detail">
                  <span className="rec-about-detail-label">Focus</span>
                  <span className="rec-about-detail-value">Full-Stack Web Development</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="rec-section rec-cta-section">
        <AnimatedSection>
          <div className="rec-cta-card">
            <h3 className="rec-cta-title">Let's work together</h3>
            <p className="rec-cta-text">
              I'm actively looking for junior developer opportunities and open-source collaborations.
            </p>
            <div className="rec-cta-buttons">
              <a href={`mailto:${personalInfo.email}`} className="rec-btn primary large">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Get in Touch
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="rec-btn outline large">
                View GitHub
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
