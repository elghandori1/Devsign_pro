import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

let lastRequestTime = 0;

export async function POST(request: Request) {
  try {
    const { email, projectType, message, company, formTime } = await request.json();

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

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    if (!projectType) {
      return NextResponse.json({ success: false, error: "Project type is required" }, { status: 400 });
    }

    if (!message || String(message).trim().length < 10) {
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
      replyTo: email,
      subject: `New Project: ${projectType}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project:</strong> ${projectType}</p>
        <p><strong>Message: </strong>${String(message).replace(/\n/g, "<br />")}</p>
      `,
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