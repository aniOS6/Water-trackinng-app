const db = require("../config/db");

exports.getProducts = (req, res) => {
  db.query(
    "SELECT * FROM products",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};