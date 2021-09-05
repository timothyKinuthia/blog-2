import nodemailer from "nodemailer";

const sendEmail = (to: string, url: string, txt: string) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Blog App",
    html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%">
            <h2 style="text-align: center; text-transform: uppercase; color: teal;">Welcome to my blog app</h2>
            <p>Congratulation you are one step away from using my blog. Click the button below to validate your email address.</p>
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">
            ${txt}
            </a>
            <p>
            If the button doesn't work for any reason, you can also click the link below:</p>
            <div>${url}</div>
        </div>`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      //console.log(info)
    }
  });
};

export default sendEmail;
