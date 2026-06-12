import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Plus,
  ChevronDown,
  Lock,
  Code2,
  Wifi,
  AlertCircle,
  CheckCircle2,
  Loader2,
  X,
  Copy,
  Check,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { EMAIL, PHONE, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants/social";

// ─── Schema ───────────────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "At least 2 chars").max(100),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "At least 3 chars").max(200),
  message: z.string().min(10, "At least 10 chars").max(5000),
});
type FormData = z.infer<typeof schema>;

// ─── Static default headers ───────────────────────────────────────────────────
const DEFAULT_HEADERS = [
  { key: "Content-Type", value: "application/json", enabled: true },
  { key: "Accept", value: "application/json", enabled: true },
  { key: "User-Agent", value: "Portfolio-ContactForm/1.0", enabled: true },
  { key: "X-Requested-With", value: "XMLHttpRequest", enabled: false },
];

// ─── JsonRow: a single editable JSON field ────────────────────────────────────
interface JsonRowProps {
  fieldKey: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  isLast?: boolean;
  multiline?: boolean;
  placeholder?: string;
}

function JsonRow({
  fieldKey,
  value,
  onChange,
  onBlur,
  error,
  isLast,
  multiline,
  placeholder,
}: JsonRowProps) {
  const inputCls =
    "flex-1 min-w-[50px] bg-transparent text-[#24292f] caret-[#0550ae] outline-none placeholder:text-[#8c959f] border-none focus:ring-0 font-mono text-base leading-8 resize-none";

  return (
    <div className="flex items-start gap-0 font-mono text-base leading-8">
      <span className="select-none text-[#57606a]">&nbsp;&nbsp;</span>
      <span className="shrink-0 text-[#0550ae]">"{fieldKey}"</span>
      <span className="shrink-0 text-[#57606a]">:&nbsp;</span>
      <span className="shrink-0 text-[#0a3069]">"</span>
      
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
            onChange(e.target.value);
          }}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={1}
          className={`${inputCls} min-h-[32px] overflow-hidden`}
        />
      ) : (
        <input
          type={fieldKey === "email" ? "email" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputCls}
        />
      )}
      <span className="shrink-0 text-[#0a3069]">"</span>
      {!isLast && <span className="shrink-0 text-[#57606a]">,</span>}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="shrink-0 ml-4 flex items-center gap-1.5 text-[13px] text-rose-500 pointer-events-none select-none"
          >
            <span className="text-[#8c959f]">//</span>
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Response success panel ───────────────────────────────────────────────────
function ResponsePanel({
  id,
  timestamp,
  onClose,
}: {
  id: string;
  timestamp: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(
    {
      status: 200,
      message: "Message received! I'll reply within 24h 🚀",
      id,
      timestamp,
    },
    null,
    2,
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(json).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className="overflow-hidden rounded-xl border border-[#1a7f37]/40 bg-[#ffffff]"
    >
      {/* toolbar */}
      <div className="flex items-center gap-3 border-b border-[#d0d7de] bg-[#f6f8fa] px-4 py-2">
        <span className="flex items-center gap-1.5 rounded-md bg-[#dafbe1] px-2.5 py-0.5 font-mono text-xs font-bold text-[#1a7f37]">
          <CheckCircle2 className="h-3 w-3" />
          200 OK
        </span>
        <span className="font-mono text-[11px] text-[#57606a]">
          application/json
        </span>
        <span className="font-mono text-[11px] text-[#57606a]">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md border border-[#d0d7de] px-2 py-1 font-mono text-[11px] text-[#57606a] transition hover:text-[#24292f] bg-white"
          >
            {copied ? (
              <Check className="h-3 w-3 text-[#1a7f37]" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#d0d7de] bg-white p-1 text-[#57606a] transition hover:text-[#24292f]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {/* body */}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
        {json.split("\n").map((line, i) => {
          const m = line.match(/^(\s*)"(\w+)":/);
          if (m) {
            const rest = line.slice(m[0].length);
            return (
              <span key={i}>
                {m[1]}
                <span className="text-[#0550ae]">"{m[2]}"</span>
                <span className="text-[#57606a]">:</span>
                <span className="text-[#0a3069]">{rest}</span>
                {"\n"}
              </span>
            );
          }
          return (
            <span key={i} className="text-[#24292f]">
              {line + "\n"}
            </span>
          );
        })}
      </pre>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
type Tab = "headers" | "body" | "auth";

export default function Contact() {
  const [activeTab, setActiveTab] = useState<Tab>("body");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseData, setResponseData] = useState<{
    id: string;
    timestamp: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [elapsed, setElapsed] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Clear errors when clicking anywhere (except the submit button)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button[type="submit"]')) return;
      
      if (Object.keys(errors).length > 0) {
        clearErrors();
      }
    };
    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, [errors, clearErrors]);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setResponseData(null);
    setErrorMsg("");
    const start = Date.now();
    let tick = 0;
    timerRef.current = setInterval(() => {
      tick += 50;
      setElapsed(tick);
    }, 50);

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const res = await response.json();

      clearInterval(timerRef.current!);
      setElapsed(Date.now() - start);
      if (res.success && res.id && res.timestamp) {
        setStatus("success");
        setResponseData({ id: res.id, timestamp: res.timestamp });
        reset();
      } else {
        setStatus("error");
        setErrorMsg(res.error ?? "Unknown error");
      }
    } catch (err) {
      clearInterval(timerRef.current!);
      setElapsed(Date.now() - start);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Network error");
    }
  };

  const tabs: { id: Tab; label: string; Icon: typeof Code2 }[] = [
    { id: "headers", label: "Headers", Icon: Code2 },
    { id: "body", label: "Body", Icon: Wifi },
    { id: "auth", label: "Auth", Icon: Lock },
  ];

  return (
    <Section id="contact" className="justify-start pt-24 md:pt-32">
      <SectionTitle line1="LET'S" line2="CONNECT" align="left" />

      <p className="-mt-6 mb-10 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-[15px]">
        Open to freelancing, internships, and full-time roles. Drop a request —
        I'll respond within 24 hours.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full overflow-hidden rounded-2xl border border-[#d0d7de] bg-[#ffffff] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5"
      >
        {/* ══ Window chrome ══════════════════════════════════════════════════ */}
        <div className="flex items-center gap-2 border-b border-[#d0d7de] bg-[#f6f8fa] px-5 py-3">
          <span className="h-3 w-3 rounded-full border border-rose-300 bg-rose-400" />
          <span className="h-3 w-3 rounded-full border border-amber-300 bg-amber-400" />
          <span className="h-3 w-3 rounded-full border border-emerald-300 bg-emerald-400" />
          <span className="ml-3 font-mono text-[11px] tracking-widest text-[#57606a]">
            POSTMAN — portfolio.api
          </span>
          <AnimatePresence>
            {elapsed !== null && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-auto font-mono text-[11px] text-[#57606a]"
              >
                {elapsed} ms
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* ══ Request bar ════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-3 border-b border-[#d0d7de] bg-[#ffffff] px-4 py-3">
          {/* Method */}
          <div className="flex shrink-0 items-center gap-1 rounded-md bg-[#dafbe1] px-3 py-1.5 border border-[#1a7f37]/20">
            <span className="font-mono text-[13px] font-bold text-[#1a7f37]">
              POST
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-[#1a7f37]" />
          </div>

          {/* URL */}
          <div className="flex flex-1 items-center gap-1 overflow-hidden rounded-lg border border-[#d0d7de] bg-[#f6f8fa] px-3 py-2">
            <span className="hidden shrink-0 font-mono text-[12px] text-[#57606a] sm:block">
              https://
            </span>
            <span className="shrink-0 font-mono text-[12px] text-[#24292f]">
              sasikiran.dev
            </span>
            <span className="shrink-0 font-mono text-[12px] text-[#57606a]">
              /api/
            </span>
            <span className="shrink-0 font-mono text-[12px] font-bold text-[#0550ae]">
              contact
            </span>
          </div>

          {/* Send */}
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#1a7f37] px-4 py-2 font-mono text-[13px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="hidden sm:block">
              {status === "loading" ? "Sending…" : "Send"}
            </span>
          </motion.button>
        </div>

        {/* ══ Tab bar ═════════════════════════════════════════════════════════ */}
        <div className="flex items-center border-b border-[#d0d7de] bg-[#f6f8fa]">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`relative flex items-center gap-2 border-b-2 px-5 py-3 font-mono text-[12px] font-medium transition-colors ${
                activeTab === id
                  ? "border-[#1a7f37] text-[#24292f] bg-white"
                  : "border-transparent text-[#57606a] hover:text-[#24292f]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {id === "body" && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#1a7f37]" />
              )}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 px-4">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#57606a]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1a7f37] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1a7f37]" />
              </span>
              LIVE
            </span>
          </div>
        </div>

        {/* ══ Tab panels ══════════════════════════════════════════════════════ */}
        <div className="h-[440px] sm:h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* HEADERS */}
          {activeTab === "headers" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-[32px_1fr_1fr] border-b border-[#e5e8ec] px-4 py-2">
                <span />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#57606a]">
                  Key
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#57606a]">
                  Value
                </span>
              </div>
              {DEFAULT_HEADERS.map((h, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[32px_1fr_1fr] border-b border-[#e5e8ec] px-4 py-2.5 transition-colors hover:bg-[#f6f8fa] ${!h.enabled ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={h.enabled}
                      readOnly
                      className="h-3.5 w-3.5 accent-[#1a7f37]"
                    />
                  </div>
                  <span className="font-mono text-[12px] text-[#0550ae]">
                    {h.key}
                  </span>
                  <span className="font-mono text-[12px] text-[#0a3069]">
                    {h.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 px-4 py-3 opacity-50">
                <Plus className="h-3.5 w-3.5 text-[#57606a]" />
                <span className="font-mono text-[12px] text-[#57606a]">
                  Add header
                </span>
              </div>
            </motion.div>
          )}

          {/* BODY */}
          {activeTab === "body" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-5 pb-8"
            >
              {/* Body type selector */}
              <div className="mb-4 flex items-center gap-4">
                {["raw", "form-data", "binary"].map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-1.5 font-mono text-[12px]"
                  >
                    <input
                      type="radio"
                      name="bodyType"
                      checked={t === "raw"}
                      readOnly
                      className="accent-[#1a7f37]"
                    />
                    <span className={t === "raw" ? "text-[#24292f]" : "text-[#57606a]"}>
                      {t}
                    </span>
                  </label>
                ))}
                <div className="ml-auto flex items-center gap-1 rounded-md border border-[#d0d7de] px-2.5 py-1 bg-[#f6f8fa]">
                  <span className="font-mono text-[11px] font-bold text-[#1a7f37]">
                    JSON
                  </span>
                  <ChevronDown className="h-3 w-3 text-[#57606a]" />
                </div>
              </div>

              {/* JSON editor card */}
              <div className="rounded-xl border border-[#d0d7de] bg-[#ffffff] shadow-sm">
                {/* Editor toolbar */}
                <div className="flex items-center gap-2 border-b border-[#e5e8ec] px-4 py-2 bg-[#f6f8fa] rounded-t-xl">
                  <span className="font-mono text-[10px] text-[#57606a]">
                    contact.json
                  </span>
                  <div className="ml-auto flex gap-1.5">
                    <div className="h-2 w-2 rounded-sm bg-[#d0d7de]" />
                    <div className="h-2 w-2 rounded-sm bg-[#d0d7de]" />
                    <div className="h-2 w-2 rounded-sm bg-[#d0d7de]" />
                  </div>
                </div>

                {/* Code area with line numbers */}
                <div className="flex px-4 pt-4 pb-8">
                  {/* Line numbers */}
                  <div className="mr-4 flex shrink-0 flex-col items-end font-mono text-base leading-8 text-[#8c959f] select-none">
                    {Array.from({ length: 6 }, (_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>

                  {/* Fields */}
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-base leading-8 text-[#24292f]">{"{"}</div>

                    <Controller
                      control={control}
                      name="name"
                      defaultValue=""
                      render={({ field }) => (
                        <JsonRow
                          fieldKey="name"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={errors.name?.message}
                          placeholder="Your full name"
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="email"
                      defaultValue=""
                      render={({ field }) => (
                        <JsonRow
                          fieldKey="email"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={errors.email?.message}
                          placeholder="your@email.com"
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="subject"
                      defaultValue=""
                      render={({ field }) => (
                        <JsonRow
                          fieldKey="subject"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={errors.subject?.message}
                          placeholder="What's this about?"
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="message"
                      defaultValue=""
                      render={({ field }) => (
                        <JsonRow
                          fieldKey="message"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={errors.message?.message}
                          placeholder="Write your message here…"
                          multiline
                          isLast
                        />
                      )}
                    />

                    <div className="font-mono text-base leading-8 text-[#24292f]">{"}"}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AUTH */}
          {activeTab === "auth" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[12px] text-[#57606a]">
                  Auth Type:
                </span>
                <div className="flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#1a7f37]" />
                  <span className="font-mono text-[12px] text-[#24292f]">
                    Bearer Token
                  </span>
                  <ChevronDown className="h-3 w-3 text-[#57606a]" />
                </div>
              </div>
              <div className="rounded-xl border border-[#d0d7de] bg-[#ffffff] p-5 shadow-sm">
                <div className="grid grid-cols-[90px_1fr] gap-4 font-mono text-sm leading-7">
                  <span className="text-[#57606a]">Token</span>
                  <span className="text-[#0a3069]">
                    YOUR_HEART{" "}
                    <span className="not-italic">💙</span>
                  </span>
                </div>
              </div>
              <p className="mt-4 font-mono text-[11px] text-[#8c959f]">
                {"// No authentication required. Just reach out!"}
              </p>
            </motion.div>
          )}
        </div>

        {/* ══ Response panel ══════════════════════════════════════════════════ */}
        <AnimatePresence>
          {(status === "success" || status === "error") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-t border-[#d0d7de] p-4 bg-[#f6f8fa]"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#57606a]">
                  Response
                </span>
                <div className="flex-1 border-t border-[#d0d7de]" />
              </div>

              {status === "success" && responseData && (
                <ResponsePanel
                  id={responseData.id}
                  timestamp={responseData.timestamp}
                  onClose={() => {
                    setStatus("idle");
                    setResponseData(null);
                    setElapsed(null);
                  }}
                />
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-rose-200 bg-rose-50 p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-md bg-rose-100 px-2.5 py-0.5 font-mono text-xs font-bold text-rose-600">
                      <AlertCircle className="h-3 w-3" />
                      500 Error
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setElapsed(null);
                      }}
                      className="ml-auto text-rose-400 hover:text-rose-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <pre className="mt-3 overflow-x-auto font-mono text-xs text-rose-600">
                    {JSON.stringify({ error: errorMsg, status: 500 }, null, 2)}
                  </pre>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ Status bar ══════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[#d0d7de] bg-[#f6f8fa] px-5 py-2.5">
          <span className="font-mono text-[11px] text-[#1a7f37]">
            sasikiran@portfolio
          </span>
          <span className="text-[#8c959f]">›</span>
          <span className="font-mono text-[11px] text-[#0550ae]">
            ~/contact
          </span>
          <span className="text-[#8c959f]">›</span>
          <span className="font-mono text-[11px] text-[#57606a]">
            {status === "loading"
              ? "⏳ awaiting response…"
              : status === "success"
                ? "✅ 200 OK — message saved & email sent"
                : status === "error"
                  ? "❌ request failed"
                  : "📡 ready to send_"}
          </span>
        </div>

        {/* ══ Contact Details Footer ══════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between border-t border-[#d0d7de] bg-[#ffffff] px-5 py-3 font-mono text-[11px] sm:text-xs text-[#57606a] gap-3">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#24292f]">Email:</span>
              <a href={`mailto:${EMAIL}`} className="text-[#0550ae] hover:underline transition-colors">{EMAIL}</a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#24292f]">Phone:</span>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-[#0550ae] hover:underline transition-colors">{PHONE}</a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#24292f]">GitHub:</span>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-[#0550ae] hover:underline transition-colors">@Sasi3011</a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#24292f]">LinkedIn:</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-[#0550ae] hover:underline transition-colors">in/sasikiran</a>
            </div>
          </div>
        </div>
      </form>

      {/* SQL migration helper (collapsed by default) */}
      <details className="mt-8 w-full">
        <summary className="cursor-pointer font-mono text-[11px] text-[#8c959f] transition hover:text-[#57606a]">
          📋 Supabase SQL — run once to create the table
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-[#d0d7de] bg-[#ffffff] p-4 font-mono text-[11px] leading-relaxed text-[#57606a] shadow-sm">
          {`CREATE TABLE contact_messages (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT         NOT NULL,
  email       TEXT         NOT NULL,
  subject     TEXT         NOT NULL,
  message     TEXT         NOT NULL,
  ip_address  TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);`}
        </pre>
      </details>
    </Section>
  );
}
