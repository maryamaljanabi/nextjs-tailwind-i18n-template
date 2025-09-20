import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { EmailTemplate } from "@/lib/emails/contact-email";

// Add your Resend API key in .env file
const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = emailSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    const { data, error } = await resend.emails.send({
      from: `Form Submission <${process.env.RESEND_FROM_EMAIL}>`, // Update this with your verified domain in Resend or use onboarding@resend.dev if it's for testing purposes
      to: process.env.RESEND_TO_EMAIL || "", // Update this with your email address
      subject: `${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: EmailTemplate({ name, email, subject, message }),
    });

    if (error) {
      console.error("Email sending failed:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
