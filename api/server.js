import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Wrong method' });
  }

  try {
    const { name, message, email } = req.body || {};
    const normalizedName = (name || "").trim();
    const normalizedEmail = (email || "").trim();
    const normalizedMessage = (message || "").trim();

    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'dani.hdz.dev@gmail.com',
      subject: 'Someone wants to worj with you!',
      html: `<strong>it works!</strong>
      <strong>${normalizedMessage}</strong>`,
    });


    return res.status(200).json({ data });
  } catch (error) {
    return res.status(502).json({ error });
  }
};

export default handler;