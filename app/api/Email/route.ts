import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

let lastRequestTime = 0;

export async function POST(request: Request) {
  try {
    const { email, projectType, message, company, formTime } = await request.json();
    const normalizedEmail = String(email ?? "").trim();
    const normalizedProjectType = String(projectType ?? "").trim();
    const normalizedMessage = String(message ?? "").trim();

    if (company) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!formTime || Date.now() - formTime < 3000) {
      return NextResponse.json(
        { success: false, error: "Form submitted too quickly" },
        { status: 400 },
      );
    }

    if (Date.now() - lastRequestTime < 5000) {
      return NextResponse.json(
        { success: false, error: "Too many requests, slow down" },
        { status: 429 },
      );
    }
    lastRequestTime = Date.now();

    const emailRegex = /^[A-Za-z](?!.*\.\.)[A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!normalizedEmail || normalizedEmail.length > 254 || !emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    const allowedProjectTypes = new Set([
      "seo",
      "website",
      "ecommerce",
      "dashboard",
      "collaboration",
      "other",
    ]);

    if (!allowedProjectTypes.has(normalizedProjectType)) {
      return NextResponse.json({ success: false, error: "Project type is required" }, { status: 400 });
    }

    if (normalizedMessage.length < 10 || normalizedMessage.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters" },
        { status: 400 },
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { success: false, error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: normalizedEmail,
      subject: `New Project: ${normalizedProjectType}`,
      text: [
        "New Contact Message",
        `Email: ${normalizedEmail}`,
        `Project: ${normalizedProjectType}`,
        "",
        normalizedMessage,
      ].join("\n"),
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
