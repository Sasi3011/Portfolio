import { useEffect, useState } from "react";
import { Award, Download, ExternalLink, FileWarning, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CERT_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp"] as const;

function isPdf(src: string) {
  return src.toLowerCase().endsWith(".pdf");
}

function isImage(src: string) {
  return /\.(png|jpe?g|webp|gif)$/i.test(src);
}

function hasExtension(src: string) {
  return /\.(pdf|jpe?g|png|webp)$/i.test(src);
}

async function fileExists(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (!res.ok) return false;
    const contentType = res.headers.get("content-type") ?? "";
    return /pdf|image|octet-stream/i.test(contentType);
  } catch {
    return false;
  }
}

export async function resolveCertificateSrc(base: string): Promise<string | null> {
  if (hasExtension(base)) {
    return (await fileExists(base)) ? base : null;
  }

  for (const ext of CERT_EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (await fileExists(candidate)) return candidate;
  }

  return null;
}

function expectedFileHint(src: string) {
  return hasExtension(src) ? src : CERT_EXTENSIONS.map((ext) => `${src}${ext}`).join(" or ");
}

function CertificateMedia({
  resolvedSrc,
  title,
  className = "",
}: {
  resolvedSrc: string;
  title: string;
  className?: string;
}) {
  if (isPdf(resolvedSrc)) {
    return (
      <iframe
        title={`${title} certificate`}
        src={resolvedSrc}
        className={`h-full min-h-0 w-full bg-white ${className}`}
      />
    );
  }

  if (isImage(resolvedSrc)) {
    return (
      <img
        src={resolvedSrc}
        alt={`${title} certificate`}
        className={`h-full w-full object-contain bg-white ${className}`}
      />
    );
  }

  return (
    <iframe
      title={`${title} certificate`}
      src={resolvedSrc}
      className={`h-full min-h-0 w-full bg-white ${className}`}
    />
  );
}

interface CertificateDisplayProps {
  title: string;
  org: string;
  src: string;
  accent: string;
  accentAlt: string;
  index: string;
  orientation?: "portrait" | "landscape";
  size?: "default" | "sm";
}

export function CertificateDisplay({
  title,
  org,
  src,
  accent,
  accentAlt,
  index,
  orientation = "portrait",
  size = "default",
}: CertificateDisplayProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    resolveCertificateSrc(src).then((found) => {
      if (cancelled) return;
      setResolvedSrc(found);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const isLandscape = orientation === "landscape";
  const isSmall = size === "sm";

  const aspectClass = isLandscape
    ? isSmall
      ? "aspect-[16/10]"
      : "aspect-[16/9]"
    : isSmall
      ? "aspect-[3/4]"
      : "aspect-[3/4] sm:aspect-[4/5]";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] ${
        isSmall ? "mx-auto w-full max-w-sm sm:max-w-md" : "w-full"
      }`}
    >
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accentAlt})` }}
      />

      <div
        className={`flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/90 ${
          isSmall ? "px-3 py-2" : "px-4 py-3"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div
            className={`grid shrink-0 place-items-center rounded-lg border ${isSmall ? "h-7 w-7" : "h-8 w-8"}`}
            style={{ borderColor: `${accent}30`, backgroundColor: `${accent}10`, color: accent }}
          >
            <Award className={isSmall ? "h-3.5 w-3.5" : "h-4 w-4"} />
          </div>
          <div className="min-w-0">
            <p className={`truncate font-semibold text-slate-900 ${isSmall ? "text-[11px]" : "text-xs"}`}>{title}</p>
            <p className={`truncate text-slate-500 ${isSmall ? "text-[10px]" : "text-[11px]"}`}>{org}</p>
          </div>
        </div>
        <span
          className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest"
          style={{ color: accent }}
        >
          {index}
        </span>
      </div>

      <div
        className={`relative overflow-hidden bg-slate-100 ${aspectClass}`}
        style={{
          background: `linear-gradient(145deg, ${accent}10 0%, ${accentAlt}08 40%, #f8fafc 100%)`,
        }}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute rounded-full blur-3xl ${isSmall ? "-left-6 -top-6 h-24 w-24" : "-left-8 -top-8 h-32 w-32"}`}
          style={{ backgroundColor: `${accent}25` }}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute rounded-full blur-3xl ${isSmall ? "-bottom-8 -right-4 h-28 w-28" : "-bottom-10 -right-6 h-36 w-36"}`}
          style={{ backgroundColor: `${accentAlt}20` }}
        />

        <div className={`relative z-10 flex h-full items-center justify-center ${isSmall ? "p-3" : "p-4 sm:p-5"}`}>
          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-10">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
              <p className="mt-3 text-xs text-slate-500">Loading certificate…</p>
            </div>
          ) : !resolvedSrc ? (
            <div className="flex max-w-xs flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
              <FileWarning className="mb-2.5 h-8 w-8 text-amber-500" />
              <p className="text-sm font-medium text-slate-800">Certificate not added yet</p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                Add{" "}
                <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[10px]">
                  {expectedFileHint(src)}
                </code>{" "}
                to <code className="font-mono">public/certificates/</code>
              </p>
            </div>
          ) : (
            <div className="h-full w-full overflow-hidden rounded-xl border border-white/80 bg-white shadow-lg">
              <CertificateMedia resolvedSrc={resolvedSrc} title={title} />
            </div>
          )}
        </div>
      </div>

      {resolvedSrc && (
        <div className={`flex flex-wrap gap-2 border-t border-slate-100 bg-white ${isSmall ? "px-3 py-2" : "px-4 py-3"}`}>
          <a
            href={resolvedSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open
          </a>
          <a
            href={resolvedSrc}
            download
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
        </div>
      )}
    </div>
  );
}

interface CertificateViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  org: string;
  src: string;
}

export default function CertificateViewer({ open, onOpenChange, title, org, src }: CertificateViewerProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoading(true);
    setResolvedSrc(null);

    resolveCertificateSrc(src).then((found) => {
      if (cancelled) return;
      setResolvedSrc(found);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [open, src]);

  const expectedFiles = expectedFileHint(src);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setResolvedSrc(null);
          setLoading(true);
        }
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-4xl overflow-hidden border-slate-200 bg-white p-0 sm:rounded-2xl">
        <DialogHeader className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <DialogTitle className="text-left text-base font-semibold text-slate-900 sm:text-lg">
            {title}
          </DialogTitle>
          <DialogDescription className="text-left text-sm text-slate-500">{org}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[calc(92vh-8rem)] overflow-auto bg-slate-50 p-4 sm:p-6">
          {loading ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-3 text-sm text-slate-500">Loading certificate…</p>
            </div>
          ) : !resolvedSrc ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
              <FileWarning className="mb-3 h-10 w-10 text-amber-500" />
              <p className="text-sm font-medium text-slate-800">Certificate file not found</p>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
                Add your certificate as{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px]">{expectedFiles}</code>{" "}
                inside <code className="font-mono">public/certificates/</code>.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <CertificateMedia
                resolvedSrc={resolvedSrc}
                title={title}
                className="min-h-[280px] max-h-[70vh] rounded-xl"
              />
            </div>
          )}
        </div>

        {resolvedSrc && (
          <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-4 sm:px-6">
            <a
              href={resolvedSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </a>
            <a
              href={resolvedSrc}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
