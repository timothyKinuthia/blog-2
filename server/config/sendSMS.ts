import twilio, { Twilio } from "twilio";

const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
const client = new Twilio(accountSid, authToken);
const serviceID = `${process.env.TWILIO_SERVICE_ID}`;

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

export const smsOTP = async (to: string, channel: string) => {
  try {
    const data = await client.verify.services(serviceID).verifications.create({
      to,
      channel
    })

    return data;
  } catch (err) {
    console.log(err)
  }
}

