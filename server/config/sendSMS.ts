import { Twilio } from "twilio";

const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
const client = new Twilio(accountSid, authToken);

export const sendSms = async (to: string, body: string, txt: string) => {
  try {
    const message = await client.messages.create({
      body: `Blog app ${txt} - ${body}`,
      from,
      to,
    });
    console.log(message.sid);
  } catch (err) {
    console.log(err);
  }
};
