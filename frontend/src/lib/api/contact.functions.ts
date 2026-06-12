import { z } from "zod";

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



// ─── Client API Function ──────────────────────────────────────────────────────────
export const submitContact = async (data: ContactPayload): Promise<ContactResponse> => {
  try {
    // 1. Validate payload on client before sending
    contactSchema.parse(data);

    // 2. Send to backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://portfolio-lemon-rho-58.vercel.app";
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || "Failed to send message" };
    }

    const result = await response.json();
    return { success: true, id: result.id, timestamp: result.timestamp };
  } catch (error) {
    console.error("[contact] Submission failed:", error);
    return { success: false, error: "Validation or network error occurred" };
  }
};
