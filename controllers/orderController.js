// 

const db = require("../config/db");
const sendOrderEmail =
  require("../services/emailService");

exports.placeOrder = async (req, res) => {
  const {
    user_id,
    name,
    email,
    phone,
    address,
    payment_method,
    total,
    items,
  } = req.body;

  const sql = `
    INSERT INTO orders
    (
      user_id,
      customer_name,
      customer_email,
      phone,
      address,
      payment_method,
      total_amount,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      name,
      email,
      phone,
      address,
      payment_method,
      total,
      "Pending",
    ],
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      const orderId = result.insertId;

      // save order items
      if (items && items.length > 0) {
        items.forEach((item) => {
          db.query(
            `
            INSERT INTO order_items
            (
              order_id,
              product_id,
              quantity,
              price
            )
            VALUES (?, ?, ?, ?)
            `,
            [
              orderId,
              item.product_id,
              item.quantity,
              item.price,
            ]
          );
        });
      }

      // send email
      await sendOrderEmail(email, orderId);

      res.json({
        success: true,
        message: "Order Placed Successfully",
        order_id: orderId,
      });
    }
  );
};