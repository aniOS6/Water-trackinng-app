const nodemailer = require("nodemailer");

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

const sendOrderEmail = async (
  to,
  orderId
) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Order Confirmed",
    html: `
      <h1>Order Confirmed</h1>
      <p>Your order #${orderId} has been placed successfully.</p>
      <p>Payment Method: Cash on Delivery</p>
    `,
  });
};

module.exports = sendOrderEmail;