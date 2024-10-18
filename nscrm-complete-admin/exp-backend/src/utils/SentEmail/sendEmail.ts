import { EMAIL_FROM, EMAIL_REPLY_TO } from "../../constants";
import transporter from "./emailController";

const sendEmail = async ({
  to,
  subject,
  text,
  htmlContent,
}: {
  to: string;
  subject: string;
  text: string;
  htmlContent: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      replyTo: EMAIL_REPLY_TO || EMAIL_FROM,
      subject,
      text,
      html: htmlContent,
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
