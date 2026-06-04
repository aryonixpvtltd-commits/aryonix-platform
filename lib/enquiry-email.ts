import type { EnquiryPayload } from "@/lib/enquiry-validation";

const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";

type EnquiryEmailInput = EnquiryPayload & {
  id: string;
  createdAt: Date;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatSubmittedAt(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  }).format(date);
}

function buildEnquiryText(enquiry: EnquiryEmailInput) {
  const submittedAt = formatSubmittedAt(enquiry.createdAt);

  return [
    "New ARYONIX enquiry received",
    "",
    `Submission ID: ${enquiry.id}`,
    `Submitted: ${submittedAt}`,
    "",
    `Client name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company ?? "Not provided"}`,
    `Budget: ${enquiry.budget ?? "Not provided"}`,
    "",
    "Project brief:",
    enquiry.message
  ].join("\n");
}

function buildEnquiryHtml(enquiry: EnquiryEmailInput) {
  const submittedAt = formatSubmittedAt(enquiry.createdAt);
  const rows = [
    ["Client name", enquiry.name],
    ["Email", enquiry.email],
    ["Company", enquiry.company ?? "Not provided"],
    ["Budget", enquiry.budget ?? "Not provided"],
    ["Submitted", submittedAt],
    ["Submission ID", enquiry.id]
  ];

  return `
    <div style="margin:0;background:#020817;color:#f8fbff;font-family:Inter,Arial,sans-serif;padding:32px;">
      <div style="max-width:640px;margin:0 auto;border:1px solid rgba(38,152,255,.35);border-radius:20px;background:linear-gradient(145deg,rgba(16,28,52,.96),rgba(4,10,24,.98));box-shadow:0 24px 80px rgba(0,102,255,.18);overflow:hidden;">
        <div style="padding:28px 28px 20px;border-bottom:1px solid rgba(255,255,255,.08);">
          <p style="margin:0 0 10px;color:#29b7ff;font-size:12px;letter-spacing:.18em;text-transform:uppercase;">ARYONIX enquiry</p>
          <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;">New project enquiry received</h1>
          <p style="margin:12px 0 0;color:#a7b7d8;font-size:15px;line-height:1.6;">A client submitted the Contact / Start Project form.</p>
        </div>
        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              ${rows
                .map(
                  ([label, value]) => `
                    <tr>
                      <td style="padding:12px 0;color:#7f93bd;font-size:13px;border-bottom:1px solid rgba(255,255,255,.07);">${escapeHtml(label)}</td>
                      <td style="padding:12px 0;color:#ffffff;font-size:14px;border-bottom:1px solid rgba(255,255,255,.07);text-align:right;">${escapeHtml(value)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
          <div style="margin-top:24px;padding:18px;border:1px solid rgba(38,152,255,.22);border-radius:16px;background:rgba(12,24,46,.72);">
            <p style="margin:0 0 10px;color:#29b7ff;font-size:12px;letter-spacing:.14em;text-transform:uppercase;">Project brief</p>
            <p style="margin:0;color:#eef5ff;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(enquiry.message)}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function sendEnquiryNotification(enquiry: EnquiryEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const emailFrom = process.env.EMAIL_FROM;

  if (!apiKey || !adminEmail || !emailFrom) {
    return { ok: false, skipped: true };
  }

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: emailFrom,
      to: [adminEmail],
      reply_to: enquiry.email,
      subject: `New Aryonix enquiry from ${enquiry.name}`,
      text: buildEnquiryText(enquiry),
      html: buildEnquiryHtml(enquiry)
    })
  });

  if (!response.ok) {
    return { ok: false, skipped: false };
  }

  return { ok: true, skipped: false };
}
