import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const app = express();

// Allow requests from your frontend (local or production)
app.use(cors({ origin: '*' }));
app.use(express.json());

// Validation schema matching frontend
const contactSchema = z.object({
  name: z.string().min(2, "At least 2 chars").max(100),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "At least 3 chars").max(200),
  message: z.string().min(10, "At least 10 chars").max(5000),
});

app.post('/api/contact', async (req, res) => {
  try {
    const data = contactSchema.parse(req.body.data || req.body);

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ success: false, error: 'Database config missing' });
    }

    // 1. Insert into Supabase
    const insertUrl = `${supabaseUrl}/rest/v1/contact_messages`;
    const dbRes = await fetch(insertUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
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
      const err = await dbRes.text();
      console.error("Supabase Error:", err);
      return res.status(500).json({ success: false, error: 'Failed to save message to database' });
    }

    const dbData = await dbRes.json();
    const inserted = Array.isArray(dbData) ? dbData[0] : dbData;
    const id = inserted?.id || require('crypto').randomUUID();
    const timestamp = inserted?.created_at || new Date().toISOString();

    // 2. Send email via Resend
    if (resendKey) {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Message from Portfolio</h2>
          <p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
          <hr />
          <p style="color: #666; font-size: 12px;">Message ID: ${id}</p>
        </div>
      `;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["sasikiran.tt3011@gmail.com"],
          reply_to: data.email,
          subject: `[Portfolio] ${data.subject}`,
          html: emailHtml,
        }),
      });
      
      if (!emailRes.ok) {
         console.error("Resend error:", await emailRes.text());
      }
    }

    return res.status(200).json({ success: true, id, timestamp });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    console.error("API Error:", error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running on Vercel!' });
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="background: #0d1117; color: #e6edf3; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center;">
        <div>
          <h2>🚀 Sasi Portfolio Backend API</h2>
          <p style="color: #3fb950;">Status: Online & Running Perfectly!</p>
          <p style="color: #8b949e;">API is ready to accept contact form submissions.</p>
        </div>
      </body>
    </html>
  `);
});

// Start local server if not running on Vercel
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
