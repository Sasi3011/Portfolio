import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

interface Token {
  text: string;
  className: string;
}

function tokenize(code: string, lang: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  const keywords = new Set(["const", "let", "var", "function", "return", "import", "export", "from", "class", "extends"]);
  const keys = new Set(["name", "role", "dsa", "leetcode", "skillrack", "passions", "action"]);

  while (i < code.length) {
    const char = code[i];

    // Whitespace
    if (/\s/.test(char)) {
      let ws = "";
      while (i < code.length && /\s/.test(code[i])) {
        ws += code[i];
        i++;
      }
      tokens.push({ text: ws, className: "" });
      continue;
    }

    // String literals
    if (char === '"' || char === "'" || char === "`") {
      const quote = char;
      let str = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === "\\" && code[i + 1] === quote) {
          str += "\\" + quote;
          i += 2;
        } else {
          str += code[i];
          i++;
        }
      }
      if (i < code.length) {
        str += quote;
        i++;
      }
      tokens.push({ text: str, className: "text-emerald-600" });
      continue;
    }

    // Numbers
    if (/\d/.test(char)) {
      let num = "";
      while (i < code.length && /\d/.test(code[i])) {
        num += code[i];
        i++;
      }
      tokens.push({ text: num, className: "text-amber-700" });
      continue;
    }

    // Punctuation / Brackets
    if (/[{}()[\].,:;!]/.test(char)) {
      tokens.push({ text: char, className: "text-slate-500 font-medium" });
      i++;
      continue;
    }

    // Word (identifier or keyword)
    if (/[a-zA-Z_#]/.test(char)) {
      let word = "";
      while (i < code.length && /[a-zA-Z0-9_/.:#-]/.test(code[i])) {
        word += code[i];
        i++;
      }

      if (lang === "sh") {
        if (word === "#!/bin/bash" || word === "echo") {
          tokens.push({ text: word, className: "text-cyan-600" });
        } else if (word === "Status:" || word === "Role:" || word === "Open" || word === "to" || word === "relocate/remote:") {
          tokens.push({ text: word, className: "text-amber-600" });
        } else if (word === "YES") {
          tokens.push({ text: word, className: "text-emerald-600 font-semibold" });
        } else {
          tokens.push({ text: word, className: "" });
        }
      } else {
        if (keywords.has(word)) {
          tokens.push({ text: word, className: "text-violet-600 font-semibold" });
        } else if (keys.has(word)) {
          tokens.push({ text: word, className: "text-blue-600 font-semibold" });
        } else {
          tokens.push({ text: word, className: "" });
        }
      }
      continue;
    }

    // Default
    tokens.push({ text: char, className: "" });
    i++;
  }

  return tokens;
}

export default function MockIDE() {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "80px 0px" });
  const [activeTab, setActiveTab] = useState(0);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [visibleChars, setVisibleChars] = useState(0);

  const snippets = [
    {
      name: "developer.ts",
      lang: "ts",
      code: `const developer = {
  name: "Sasikiran T.T.",
  role: "Full Stack Builder",
  dsa: { leetcode: "100+", skillrack: "1100+" },
  passions: ["Clean Code", "Design Systems"],
  action: () => "Let's build something epic! 🚀"
};`
    },
    {
      name: "skills.json",
      lang: "json",
      code: `{
  "frontend": ["React", "TypeScript", "Tailwind"],
  "backend": ["Node.js", "Express", "Postgres"],
  "design": ["Figma", "UI/UX", "Prototyping"]
}`
    },
    {
      name: "status.sh",
      lang: "sh",
      code: `#!/bin/bash
echo "DEPLOYMENT COMPLETE"
echo "Status: Active & Searching"
echo "Role: Full Stack / Design Intern"
echo "Open to relocate/remote: YES"`
    }
  ];

  const currentCode = snippets[activeTab].code;

  useEffect(() => {
    if (!inView) return;

    const newTokens = tokenize(currentCode, snippets[activeTab].lang);
    setTokens(newTokens);
    setVisibleChars(0);

    const totalLen = currentCode.length;
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev < totalLen) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [activeTab, currentCode, inView]);

  const renderTokens = () => {
    let charCount = 0;
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (charCount >= visibleChars) break;

      const remaining = visibleChars - charCount;
      const textToRender = token.text.substring(0, remaining);
      charCount += token.text.length;

      elements.push(
        <span key={i} className={token.className}>
          {textToRender}
        </span>
      );
    }
    return elements;
  };

  return (
    <div ref={ref} className="cyber-scanline flex h-[260px] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-primary/20 bg-[#f8fafc]/95 text-left font-mono text-[10px] leading-relaxed shadow-2xl backdrop-blur-sm sm:h-[310px] sm:text-xs">
      {/* OS Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/60 bg-slate-100/90 px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="hidden truncate text-[10px] tracking-wider text-muted-foreground/50 sm:block">
          workspace // portfolio-terminal
        </div>
        <div className="w-8 shrink-0" />
      </div>

      {/* Editor Main Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden w-[88px] flex-col border-r border-slate-200/60 bg-slate-50/80 p-1.5 text-[10px] sm:flex">
          <div className="mb-2 px-1 font-semibold uppercase tracking-wider text-muted-foreground/45">Files</div>
          {snippets.map((s, idx) => (
            <button
              type="button"
              key={s.name}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1 rounded px-1 py-1 text-left transition ${
                activeTab === idx ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-slate-200/50"
              }`}
            >
              <span className="text-primary/70">📄</span>
              <span className="truncate">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Code Frame */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header Tabs */}
          <div className="flex border-b border-slate-200/60 bg-slate-100/60">
            {snippets.map((s, idx) => (
              <button
                type="button"
                key={s.name}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 border-r border-slate-200/60 px-4 py-2 text-[10px] transition sm:text-xs ${
                  activeTab === idx ? "bg-[#f8fafc] text-primary border-t-2 border-t-primary" : "text-muted-foreground hover:bg-slate-200/40"
                }`}
              >
                <span>{s.name}</span>
                {activeTab === idx && <span className="text-[6px] text-primary">●</span>}
              </button>
            ))}
          </div>

          {/* Code Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 scrollbar-thin">
            <div className="flex items-start gap-4">
              <div className="select-none text-right text-muted-foreground/45">
                {currentCode.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="whitespace-pre text-foreground">
                {renderTokens()}
                <span className="terminal-cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
