import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env"), quiet: true });

const app = express();
const PORT = Number(process.env.MAIL_SERVER_PORT || 8787);

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      ok: false,
      message: "Invalid request format. Please submit the form again.",
    });
  }

  return next(error);
});

function toSafeText(value) {
  return String(value || "").trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || "true").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    const error = new Error("Email service is not configured. Set SMTP_USER and SMTP_PASS in .env.");
    error.code = "SMTP_CONFIG_MISSING";
    throw error;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user, pass },
  });
}

function withTimeout(promise, milliseconds, message) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      const error = new Error(message);
      error.code = "EMAIL_SEND_TIMEOUT";
      reject(error);
    }, milliseconds);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const name = toSafeText(req.body?.name);
    const email = toSafeText(req.body?.email);
    const organization = toSafeText(req.body?.organization) || "Not provided";
    const query = toSafeText(req.body?.query);

    if (!name || !email || !query) {
      return res.status(400).json({ ok: false, message: "Missing required fields." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, message: "Invalid email address." });
    }

    const transporter = getTransporter();
    const adminEmail = process.env.CONTACT_ADMIN_EMAIL || "contact@semicom-consultancy.com";
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
    const htmlName = escapeHtml(name);
    const htmlEmail = escapeHtml(email);
    const htmlOrganization = escapeHtml(organization);
    const htmlQuery = escapeHtml(query).replaceAll("\n", "<br/>");

    await withTimeout(transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      replyTo: email,
      subject: "New Contact Form Submission",
      text: [
        "New Contact Form Submission",
        "",
        `Full Name: ${name}`,
        `Email Address: ${email}`,
        `Organization: ${organization}`,
        "",
        "Your Query:",
        query,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17324d;max-width:640px;margin:0 auto;border:1px solid #d7e4f2;border-radius:10px;overflow:hidden;">
          <div style="background:#0b3358;color:#fff;padding:18px 24px;">
            <h2 style="margin:0;font-size:22px;">New Contact Form Submission</h2>
          </div>
          <div style="padding:22px 24px;background:#ffffff;">
            <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;font-weight:700;width:160px;border-bottom:1px solid #eef3f8;">Full Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #eef3f8;">${htmlName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;border-bottom:1px solid #eef3f8;">Email Address</td>
                <td style="padding:10px 0;border-bottom:1px solid #eef3f8;"><a href="mailto:${htmlEmail}" style="color:#0b5cab;">${htmlEmail}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;border-bottom:1px solid #eef3f8;">Organization</td>
                <td style="padding:10px 0;border-bottom:1px solid #eef3f8;">${htmlOrganization}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;vertical-align:top;">Your Query</td>
                <td style="padding:10px 0;">${htmlQuery}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    }), 20000, "Email delivery timed out. Please try again shortly.");

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact mail send failed:", error);

    if (error?.code === "SMTP_CONFIG_MISSING") {
      return res.status(503).json({
        ok: false,
        message: "Email service is not configured. Please set SMTP_PASS in .env and restart the mail server.",
      });
    }

    if (error?.code === "EMAIL_SEND_TIMEOUT") {
      return res.status(504).json({
        ok: false,
        message: "Email delivery timed out. Please try again shortly.",
      });
    }

    return res.status(502).json({
      ok: false,
      message: "Email delivery failed. Please verify the SMTP username and password.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Mail server running on http://localhost:${PORT}`);
});
