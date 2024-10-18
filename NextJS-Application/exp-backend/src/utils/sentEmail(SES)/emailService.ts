import { ses } from "../../config";
import { sendEmailParams } from "../../types/emailTypes/emailTypes";
import * as templates from "./templates";

export const sendEmail = async (emailType: string, params: sendEmailParams) => {
  const emailContent = templates[emailType](params);

  const emailParams = {
    Source: "your-verified-email@example.com",
    Destination: {
      ToAddresses: [params.email],
    },
    Message: {
      Subject: {
        Data: emailContent.subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: emailContent.body,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    await ses.sendEmail(emailParams).promise();
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email.");
  }
};
