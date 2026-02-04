import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export async function POST(request: Request) {
    try {
        const body: ContactFormData = await request.json();
        const { name, email, phone, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Send email using Resend
        const { error } = await resend.emails.send({
            from: "Averroez Contact Form <onboarding@resend.dev>",
            to: ["averroeztech@outlook.com"],
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #f6e05e; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ""}
          </div>
          
          <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #f6e05e; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a365d;">Message:</h3>
            <p style="white-space: pre-wrap; color: #4a5568;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          
          <p style="color: #718096; font-size: 12px;">
            This email was sent from the Averroez website contact form.
          </p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Failed to send email" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
