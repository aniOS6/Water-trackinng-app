const db = require("../config/db");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(
    sql,
    [name, email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Signup Success",
      });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

  db.query(
    sql,
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        res.json({
          message: "Login Success",
          user: result[0],
        });
      } else {
        res.status(401).json({
          message: "Wrong Email or Password",
        });
      }
    }
  );
};