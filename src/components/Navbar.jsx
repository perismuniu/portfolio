import { personalInfo } from "../data/content";
import { TerminalIcon, BriefcaseIcon } from "./Icons";

export default function Navbar({ mode, setMode }) {
  return (
    <nav className={`navbar ${mode}`}>
      <div className="nav-brand">
        <span className="nav-logo">&lt;CK /&gt;</span>
        <span className="nav-name">{personalInfo.name}</span>
      </div>
      <div className="nav-toggle">
        <button
          className={`toggle-btn ${mode === "gateway" ? "active" : ""}`}
          onClick={() => setMode("gateway")}
        >
          Home
        </button>
        <button
          className={`toggle-btn ${mode === "developer" ? "active" : ""}`}
          onClick={() => setMode("developer")}
        >
          <TerminalIcon size={15} />
          Developer
        </button>
        <button
          className={`toggle-btn ${mode === "recruiter" ? "active" : ""}`}
          onClick={() => setMode("recruiter")}
        >
          <BriefcaseIcon size={15} />
          Recruiter
        </button>
      </div>
    </nav>
  );
}
