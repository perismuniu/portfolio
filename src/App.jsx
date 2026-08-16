import { useState } from "react";
import Navbar from "./components/Navbar";
import Gateway from "./components/Gateway";
import DeveloperMode from "./components/DeveloperMode";
import RecruiterMode from "./components/RecruiterMode";
import PageBackground from "./components/PageBackground";
import "./index.css";

export default function App() {
  const [mode, setMode] = useState("gateway");

  return (
    <div className={`app ${mode}`}>
      <PageBackground mode={mode} />
      {mode !== "gateway" && <Navbar mode={mode} setMode={setMode} />}
      <main className={`main-content ${mode === "gateway" ? "no-nav" : ""}`}>
        {mode === "gateway" && <Gateway setMode={setMode} />}
        {mode === "developer" && <DeveloperMode />}
        {mode === "recruiter" && <RecruiterMode />}
      </main>
    </div>
  );
}
