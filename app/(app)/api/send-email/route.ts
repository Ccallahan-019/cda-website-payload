import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import validateContactForm from "@/utils/validateContactForm";
import sanitizeHtml from "sanitize-html";
import csrf from "csrf";
import { applyRateLimit } from "@/utils/rateLimiter";


const tokens = new csrf();

export async function POST(req: Request) {
    const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
    const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
    const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
    const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

    try {
        await applyRateLimit(req);

        const {name, email, phone, message, csrfToken} = await req.json();

        if (!tokens.verify(process.env.CSRF_SECRET!, csrfToken)) {
            return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
        }

        const cleanData = {
            name: sanitizeHtml(name),
            email: sanitizeHtml(email),
            phone: sanitizeHtml(phone),
            message: sanitizeHtml(message),
            csrfToken
        };

        const validation = validateContactForm(cleanData);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.errors }, { status: 400 });
        }
        

        // Configure your email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: SMTP_SERVER_HOST,
            port: 587,
            secure: true,
            auth: {
              user: SMTP_SERVER_USERNAME,
              pass: SMTP_SERVER_PASSWORD,
            },
          });

        await transporter.sendMail({
            from: cleanData.email,
            to: SITE_MAIL_RECIEVER,
            subject: `New Contact Form Submission from ${cleanData.name}`,
            text: `Name: ${cleanData.name}\nEmail: ${cleanData.email}\nPhone: ${cleanData.phone}\n\nMessage:\n${cleanData.message}` 
        });

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error sending email:", error);

        if (error.message === "Too many requests, please try again later.") {
            return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
        }

        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
