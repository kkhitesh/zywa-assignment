const { getCardById, getCardByPhoneNumber } = require("../models/card");

const getCardStatus = (req, res) => {
  const phone_number = req.body.phone_number;
  const card_id = req.body.card_id;

  if (!phone_number && !card_id) {
    return res
      .status(400)
      .json({ error: "Provide either phone_number or card_id parameter" });
  }

  if (phone_number) {
    getCardByPhoneNumber(phone_number, (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (row) {
        return res.json({
          card_id: row.id,
          status: row.status,
          contact: row.phone_number,
          comment: row.comment,
          lastUpdatedAt: row.timestamp,
        });
      } else {
        return res.status(404).json({ error: "Card not found" });
      }
    });
  } else if (card_id) {
    getCardById(card_id, (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (row) {
        return res.json({
          card_id: row.id,
          status: row.status,
          contact: row.phone_number,
          comment: row.comment,
          lastUpdatedAt: row.timestamp,
        });
      } else {
        return res.status(404).json({ error: "Card not found" });
      }
    });
  }
};

module.exports = {
  getCardStatus,
};
