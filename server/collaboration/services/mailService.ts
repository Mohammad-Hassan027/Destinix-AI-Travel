import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

// Verify connection configuration
if (smtpUser && smtpPass) {
  transporter.verify((error) => {
    if (error) {
      console.error("Collaboration Mail SMTP Connection Error:", error.message);
    } else {
      console.log("Collaboration SMTP Server is ready to send invitations");
    }
  });
}

export class MailService {
  static async sendInvitationEmail(toEmail: string, groupName: string, inviterName: string, inviteId: string) {
    if (!smtpUser || !smtpPass) {
      console.log(`[DEMO MODE] Skip sending invitation email to ${toEmail}. Invite ID: ${inviteId}`);
      return;
    }

    const acceptUrl = `${process.env.VITE_APP_URL || "http://localhost:5173"}/groups?invite=${inviteId}`;

    const mailOptions = {
      from: `"Destinix Travel" <${smtpUser}>`,
      to: toEmail,
      subject: `✈️ You're invited to collaborate on "${groupName}" - Destinix`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #4f46e5; text-align: center;">You're Invited! 🎉</h2>
          <p>Hello,</p>
          <p><strong>${inviterName}</strong> has invited you to collaborate on their upcoming trip planning group, <strong>"${groupName}"</strong>, on Destinix AI Travel.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${acceptUrl}" style="background-color: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
              View and Accept Invitation
            </a>
          </div>
          
          <p style="font-size: 13px; color: #666;">If the button doesn't work, you can accept the invitation manually inside your Destinix dashboard under Collaborative Trips.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">&copy; 2026 Destinix Travel. All rights reserved.</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Invitation email successfully sent to ${toEmail}`);
    } catch (error: any) {
      console.error(`Failed to send invitation email to ${toEmail}:`, error.message);
    }
  }
}
