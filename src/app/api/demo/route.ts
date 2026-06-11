import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

// Branded HTML auto-reply email template
function getAutoReplyHTML(userEmail: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#030712; font-family:'Calibri','Calibri Light','Carlito','Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#030712; min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%;">

          <!-- Header / Logo -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#9333EA,#c084fc); border-radius:12px; width:48px; height:48px; text-align:center; vertical-align:middle;">
                    <span style="font-size:24px; color:#ffffff;">&#9889;</span>
                  </td>
                  <td style="padding-left:12px;">
                    <span style="font-size:22px; font-weight:700; color:#ffffff; letter-spacing:-0.5px; font-family:'Calibri','Calibri Light','Carlito','Helvetica Neue',Arial,sans-serif;">Massa<span style="color:#c084fc;">Pro</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background-color:#0f1129; border:1px solid rgba(147,51,234,0.15); border-radius:16px; padding:40px 36px;">

              <!-- Greeting -->
              <h1 style="margin:0 0 8px 0; font-size:26px; font-weight:700; color:#ffffff; line-height:1.3;">
                Thank You for Reaching Out!
              </h1>

              <p style="margin:0 0 24px 0; font-size:14px; color:#9333EA; letter-spacing:1px; text-transform:uppercase; font-weight:600;">
                We Received Your Demo Request
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="height:1px; background:linear-gradient(90deg,transparent,rgba(147,51,234,0.3),transparent);"></td>
                </tr>
              </table>

              <!-- Body -->
              <p style="margin:0 0 16px 0; font-size:16px; color:#e2e8f0; line-height:1.7;">
                Hi there,
              </p>

              <p style="margin:0 0 16px 0; font-size:16px; color:#e2e8f0; line-height:1.7;">
                Thank you for your interest in <strong style="color:#c084fc;">MassaPro</strong> — the Agentic AI platform that transforms your entire trader lifecycle, from first click to funded account.
              </p>

              <p style="margin:0 0 16px 0; font-size:16px; color:#e2e8f0; line-height:1.7;">
                We have received your demo request and our team is already reviewing your inquiry. One of our specialists will be in touch with you shortly to schedule your personalized walkthrough.
              </p>

              <!-- Highlight Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                <tr>
                  <td style="background:rgba(147,51,234,0.08); border:1px solid rgba(147,51,234,0.15); border-radius:12px; padding:20px 24px;">
                    <p style="margin:0 0 8px 0; font-size:13px; color:#9333EA; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">What to Expect</p>
                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                      <tr>
                        <td style="padding:6px 0; color:#94a3b8; font-size:15px;">
                          <span style="color:#9333EA; margin-right:8px;">&#10003;</span> Personalized platform walkthrough
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; color:#94a3b8; font-size:15px;">
                          <span style="color:#9333EA; margin-right:8px;">&#10003;</span> Live agentic AI demonstration
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; color:#94a3b8; font-size:15px;">
                          <span style="color:#9333EA; margin-right:8px;">&#10003;</span> Custom ROI analysis for your business
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; color:#94a3b8; font-size:15px;">
                          <span style="color:#9333EA; margin-right:8px;">&#10003;</span> No commitment required
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 0 0; font-size:16px; color:#e2e8f0; line-height:1.7;">
                We look forward to showing you how MassaPro can scale your revenue without scaling your overhead.
              </p>

            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:32px 36px 0 36px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:top;">
                    <div style="width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,#9333EA,#c084fc); text-align:center; line-height:44px; font-size:18px; color:#ffffff; font-weight:600;">M</div>
                  </td>
                  <td style="padding-left:14px; vertical-align:top;">
                    <p style="margin:0 0 2px 0; font-size:16px; font-weight:600; color:#ffffff;">Marisa Blake</p>
                    <p style="margin:0 0 2px 0; font-size:14px; color:#c084fc;">MassaPro AI Specialist</p>
                    <p style="margin:0; font-size:13px; color:#64748b;">finance@massapro.com</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:36px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="height:1px; background:linear-gradient(90deg,transparent,rgba(147,51,234,0.2),transparent);"></td>
                </tr>
              </table>
              <p style="margin:0 0 4px 0; font-size:12px; color:#475569;">
                &copy; 2026 MassaPro &middot; All Rights Reserved
              </p>
              <p style="margin:0; font-size:12px; color:#475569;">
                <a href="https://massapro.com" style="color:#9333EA; text-decoration:none;">massapro.com</a>
                &middot;
                <a href="mailto:hello@massapro.com" style="color:#9333EA; text-decoration:none;">hello@massapro.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // 1. Send notification to finance@massapro.com
    await resend.emails.send({
      from: "MassaPro Demo <onboarding@resend.dev>",
      to: ["finance@massapro.com"],
      subject: `New Demo Request from ${email}`,
      html: `
        <div style="font-family:'Calibri','Calibri Light','Carlito','Helvetica Neue',Arial,sans-serif; background:#0f1129; color:#e2e8f0; padding:32px; border-radius:12px; max-width:500px; margin:0 auto;">
          <h2 style="color:#9333EA; margin-top:0;">New Demo Request</h2>
          <p style="font-size:16px;">A new demo request has been submitted:</p>
          <table style="background:rgba(147,51,234,0.08); border:1px solid rgba(147,51,234,0.15); border-radius:8px; padding:16px; width:100%; margin:16px 0;">
            <tr><td style="padding:8px 12px; color:#94a3b8;">Email:</td><td style="padding:8px 12px; color:#ffffff; font-weight:600;">${email}</td></tr>
            <tr><td style="padding:8px 12px; color:#94a3b8;">Date:</td><td style="padding:8px 12px; color:#ffffff;">${new Date().toLocaleString()}</td></tr>
            <tr><td style="padding:8px 12px; color:#94a3b8;">Source:</td><td style="padding:8px 12px; color:#ffffff;">finance-massapro.vercel.app</td></tr>
          </table>
          <p style="color:#64748b; font-size:14px;">Follow up within 24 hours to schedule the demo.</p>
        </div>
      `,
    });

    // 2. Send branded auto-reply to the user
    await resend.emails.send({
      from: "Marisa Blake at MassaPro <onboarding@resend.dev>",
      to: [email],
      subject: "Thank You — Your MassaPro Demo Request Has Been Received",
      html: getAutoReplyHTML(email),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
