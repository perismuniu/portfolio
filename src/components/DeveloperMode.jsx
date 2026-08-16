import { useState, useRef, useEffect, useCallback } from "react";
import {
  personalInfo,
  skills,
  projects,
  systemStats,
  asciiAvatar,
  contactInfo,
} from "../data/content";

const COMMANDS = {
  help: {
    description: "Show available commands",
    execute: () => {
      return Object.entries(COMMANDS)
        .map(([cmd, { description }]) => `  ${cmd.padEnd(20)} ${description}`)
        .join("\n");
    },
  },
  about: {
    description: "Display personal info and ASCII avatar",
    execute: () => {
      return `${asciiAvatar}\n  Name:     ${personalInfo.name}\n  Role:     ${personalInfo.title}\n  Location: ${personalInfo.location}\n  Languages: ${personalInfo.languages.join(", ")}\n  Bio:      ${personalInfo.bio}`;
    },
  },
  skills: {
    description: "List technical skills by category",
    execute: () => {
      return Object.entries(skills)
        .map(
          ([category, items]) =>
            `  ${category}:\n    → ${items.join(", ")}`
        )
        .join("\n\n");
    },
  },
  projects: {
    description: "Show portfolio projects",
    execute: () => {
      return projects
        .map(
          (p, i) =>
            `  [${i + 1}] ${p.name}\n      ${p.description}\n      Tech: ${p.tech.join(", ")}${p.live ? `\n      Live: ${p.live}` : ""}${p.github ? `\n      GitHub: ${p.github}` : ""}`
        )
        .join("\n\n");
    },
  },
  contact: {
    description: "Show contact information",
    execute: () => {
      return `  Email:    ${contactInfo.email}\n  LinkedIn: ${contactInfo.linkedin}\n  GitHub:   ${contactInfo.github}`;
    },
  },
  neofetch: {
    description: "Display system stats",
    execute: () => {
      const stats = Object.entries(systemStats);
      const maxKey = Math.max(...stats.map(([k]) => k.length));
      return stats
        .map(([key, value]) => `  ${key.padEnd(maxKey + 2)} ${value}`)
        .join("\n");
    },
  },
  clear: {
    description: "Clear the terminal",
    execute: () => "__CLEAR__",
  },
};

const WELCOME = `Welcome to ${personalInfo.name}'s terminal.
Type 'help' to see available commands.\n`;

export default function DeveloperMode() {
  const [history, setHistory] = useState([
    { type: "output", text: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "input", text: `$ ${cmd}` }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    const [command] = trimmed.split(" ");

    if (COMMANDS[command]) {
      const output = COMMANDS[command].execute();
      if (output === "__CLEAR__") {
        setHistory([]);
      } else {
        setHistory([...newHistory, { type: "output", text: output }]);
      }
    } else {
      setHistory([
        ...newHistory,
        {
          type: "error",
          text: `Command not found: ${command}. Type 'help' for available commands.`,
        },
      ]);
    }

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="developer-mode" onClick={() => inputRef.current?.focus()}>
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">codelord@portfolio ~ %</span>
        </div>
        <div className="terminal-body" ref={bodyRef}>
          {history.map((entry, i) => (
            <div key={i} className={`terminal-line ${entry.type}`}>
              <pre>{entry.text}</pre>
            </div>
          ))}
          <div className="terminal-input-line">
            <span className="prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
