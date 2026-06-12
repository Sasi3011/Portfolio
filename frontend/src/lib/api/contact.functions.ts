import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerConfig } from "../config.server";

// ─── Zod schema ──────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export interface ContactResponse {
  success: boolean;
  id?: string;
  timestamp?: string;
  error?: string;
}

// ─── Email HTML template ──────────────────────────────────────────────────────
function buildEmailHtml(payload: ContactPayload, id: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message</title>
  <style>
    body { background: #0d1117; color: #e6edf3; font-family: 'JetBrains Mono', 'Fira Code', monospace; margin: 0; padding: 0; }
    .container { max-width: 640px; margin: 40px auto; background: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
    .header { background: #1c2129; border-bottom: 1px solid #30363d; padding: 20px 28px; display: flex; align-items: center; gap: 12px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot-red { background: #ff5f57; }
    .dot-yellow { background: #febc2e; }
    .dot-green { background: #28c840; }
    .title { margin-left: 8px; font-size: 13px; color: #8b949e; letter-spacing: 0.05em; }
    .method { background: #2d6a4f; color: #52d68a; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; }
    .url { color: #79c0ff; font-size: 12px; margin-left: 8px; }
    .status { background: #1f4024; color: #3fb950; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; margin-left: auto; }
    .body { padding: 24px 28px; }
    .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #8b949e; margin-bottom: 12px; }
    .json-block { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 16px 20px; font-size: 13px; line-height: 1.7; }
    .key { color: #79c0ff; }
    .string { color: #a5d6ff; }
    .colon { color: #8b949e; }
    .brace { color: #e6edf3; }
    .footer { background: #1c2129; border-top: 1px solid #30363d; padding: 14px 28px; font-size: 11px; color: #8b949e; display: flex; justify-content: space-between; }
    .id { font-family: monospace; color: #8b949e; font-size: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span class="title">contact.ts — New API Request</span>
      <span class="status">200 OK</span>
    </div>
    <div class="body">
      <div class="section-label">POST /api/contact — Response Body</div>
      <div class="json-block">
        <span class="brace">{</span><br/>
        &nbsp;&nbsp;<span class="key">"name"</span><span class="colon">:</span> <span class="string">"${payload.name}"</span>,<br/>
        &nbsp;&nbsp;<span class="key">"email"</span><span class="colon">:</span> <span class="string">"${payload.email}"</span>,<br/>
        &nbsp;&nbsp;<span class="key">"subject"</span><span class="colon">:</span> <span class="string">"${payload.subject}"</span>,<br/>
        &nbsp;&nbsp;<span class="key">"message"</span><span class="colon">:</span> <span class="string">"${payload.message.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"</span>,<br/>
        &nbsp;&nbsp;<span class="key">"id"</span><span class="colon">:</span> <span class="string">"${id}"</span><br/>
        <span class="brace">}</span>
      </div>
    </div>
    <div class="footer">
      <span>sasikiran.dev/api/contact</span>
      <span class="id">req-id: ${id.slice(0, 8)}</span>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ─── Server Function ──────────────────────────────────────────────────────────
export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<ContactResponse> => {
    const config = getServerConfig();

    // ── 1. Validate environment ──────────────────────────────────────────────
    if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
      console.error("[contact] Missing Supabase env vars");
      return { success: false, error: "Server configuration error" };
    }
    if (!config.resendApiKey) {
      console.error("[contact] Missing RESEND_API_KEY env var");
      return { success: false, error: "Email service configuration error" };
    }

    // ── 2. Insert into Supabase via REST API (no SDK needed, works in CF Workers) ─
    const insertUrl = `${config.supabaseUrl}/rest/v1/contact_messages`;
    const dbRes = await fetch(insertUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: config.supabaseServiceRoleKey,
        Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
    });

    if (!dbRes.ok) {
      const errText = await dbRes.text();
      console.error("[contact] Supabase insert failed:", errText);
      return { success: false, error: "Failed to save message" };
    }

    const [inserted] = (await dbRes.json()) as Array<{ id: string; created_at: string }>;
    const id = inserted?.id ?? crypto.randomUUID();
    const timestamp = inserted?.created_at ?? new Date().toISOString();

    // ── 3. Send email via Resend REST API (no Node.js SDK needed) ────────────
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [config.notificationEmail],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject}`,
        html: buildEmailHtml(data, id),
        text: `New contact message from ${data.name} <${data.email}>\n\nSubject: ${data.subject}\n\nMessage:\n${data.message}\n\nMessage ID: ${id}`,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      // Email failure is non-fatal — message is already saved to DB
      console.error("[contact] Resend email failed:", errText);
    }

    return { success: true, id, timestamp };
  });
