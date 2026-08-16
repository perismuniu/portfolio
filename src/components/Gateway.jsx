import { personalInfo } from "../data/content";
import { TerminalIcon, BriefcaseIcon } from "./Icons";

export default function Gateway({ setMode }) {
  return (
    <div className="gateway">
      <div className="gateway-content">
        <h1 className="gateway-title">
          Hi, I'm <span className="highlight">{personalInfo.name}</span>
        </h1>
        <p className="gateway-subtitle">{personalInfo.elevatorPitch}</p>
        <div className="gateway-cards">
          <button
            className="gateway-card developer-card"
            onClick={() => setMode("developer")}
          >
            <div className="card-icon">
              <TerminalIcon size={32} />
            </div>
            <h2>Developer Mode</h2>
            <p>Interactive terminal experience. Type commands, explore code, dive into architecture.</p>
            <span className="card-cta">Enter Terminal →</span>
          </button>
          <button
            className="gateway-card recruiter-card"
            onClick={() => setMode("recruiter")}
          >
            <div className="card-icon">
              <BriefcaseIcon size={32} />
            </div>
            <h2>Recruiter Mode</h2>
            <p>Clean dashboard with skills, projects, and impact. Quick overview for hiring decisions.</p>
            <span className="card-cta">View Dashboard →</span>
          </button>
        </div>
        <a href="/Mawuena_Kossi_Baboh_Full_Stack_Developer_CV.pdf" download className="gateway-cv-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>
      </div>
      <div className="gateway-footer">
        <p>ALX Software Engineering Student • Greater Accra, Ghana</p>
      </div>
    </div>
  );
}
