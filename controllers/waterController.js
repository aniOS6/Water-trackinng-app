const db = require("../config/db");

exports.addWater = (req, res) => {
  const { user_id, amount, time } = req.body;

  const sql =
    "INSERT INTO water_entries (user_id, amount, time) VALUES (?, ?, ?)";

  db.query(
    sql,
    [user_id, amount, time],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Water Added",
      });
    }
  );
};

exports.getWater = (req, res) => {
  const user_id = req.params.user_id;

  const sql =
    "SELECT * FROM water_entries WHERE user_id=?";

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.updateWater = (req, res) => {
  const { amount, time } = req.body;

  const sql =
    "UPDATE water_entries SET amount=?, time=? WHERE id=?";

  db.query(
    sql,
    [amount, time, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Updated",
      });
    }
  );
};

exports.deleteWater = (req, res) => { 
  const sql =
    "DELETE FROM water_entries WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Deleted",
    });
  });
};