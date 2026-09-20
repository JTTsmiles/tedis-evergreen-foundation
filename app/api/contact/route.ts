import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

const notificationEmail =
  process.env.CONTACT_NOTIFICATION_EMAIL ||
  "info@tedisevergreenfoundation.org.ng";

const fromEmail =
  process.env.CONTACT_FROM_EMAIL ||
  "TEDIS Website <website@tedisevergreenfoundation.org.ng>";

function cleanText(value: unknown, maximumLength: number) {
  return String(value ?? "").trim().slice(0, maximumLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseSecretKey) {
      return NextResponse.json(
        { error: "The contact service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 180).toLowerCase();
    const organisation = cleanText(body.organisation, 180);
    const subject = cleanText(body.subject, 180);
    const message = cleanText(body.message, 5000);
    const website = cleanText(body.website, 250);

    // Silently accept automated submissions caught by the hidden field.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseSecretKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { error: databaseError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        organisation: organisation || null,
        subject,
        message,
        is_read: false,
      });

    if (databaseError) {
      return NextResponse.json(
        { error: "Your message could not be saved. Please try again." },
        { status: 500 }
      );
    }

    let notificationSent = false;

    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [notificationEmail],
          reply_to: email,
          subject: `New website message: ${subject}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#14382d;line-height:1.6">
              <h2 style="margin-bottom:20px">New TEDIS website message</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr>
                  <td style="padding:8px 0;font-weight:700;width:150px">Name</td>
                  <td style="padding:8px 0">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-weight:700">Email</td>
                  <td style="padding:8px 0">${escapeHtml(email)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-weight:700">Organisation</td>
                  <td style="padding:8px 0">${escapeHtml(
                    organisation || "Not provided"
                  )}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-weight:700">Subject</td>
                  <td style="padding:8px 0">${escapeHtml(subject)}</td>
                </tr>
              </table>
              <div style="margin-top:24px;padding:20px;background:#f3f7f5;border-radius:12px">
                <strong>Message</strong>
                <p style="white-space:pre-wrap;margin-bottom:0">${escapeHtml(
                  message
                )}</p>
              </div>
              <p style="margin-top:22px;font-size:13px;color:#65716c">
                This message is also available in the TEDIS administrator dashboard.
              </p>
            </div>
          `,
        }),
      });

      notificationSent = emailResponse.ok;

      if (!emailResponse.ok) {
        console.error(
          "Contact notification email failed:",
          await emailResponse.text()
        );
      }
    }

    return NextResponse.json({
      success: true,
      notification_sent: notificationSent,
    });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      { error: "Your message could not be sent. Please try again." },
      { status: 500 }
    );
  }
}
