const fs = require("fs");
const csv = require("csv-parser");
const { parse, format } = require("date-fns");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("src/db/cards.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the cards database.");
  }
});

const initDatabase = () => {
  db.run(
    "CREATE TABLE IF NOT EXISTS cards (id TEXT PRIMARY KEY, phone_number TEXT, status TEXT, timestamp TEXT, comment TEXT)"
  );
};

const parseAndFormatDate = (timestamp) => {
  const parsedDate = parse(timestamp, "yyyy-MM-dd", new Date());
  return format(parsedDate, "yyyy-MM-dd");
};

const getCardById = (id, callback) => {
  db.get("SELECT * FROM cards WHERE id = ?", [id], (err, row) => {
    callback(err, row);
  });
};

const getCardByPhoneNumber = (phone_number, callback) => {
  db.get(
    "SELECT * FROM cards WHERE phone_number = ?",
    [phone_number],
    (err, row) => {
      callback(err, row);
    }
  );
};

const insertDataFromCSV = (csvFilePath, status) => {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      const phoneNumberHeader = row["User Mobile"] || row["User contact"];
      if (!phoneNumberHeader) {
        console.error("Error: Phone number header not found in the CSV file.");
        return;
      }

      let {
        ID,
        "Card ID": cardId,
        phoneNumberHeader: phoneNumber,
        Timestamp: timestamp,
        Comment: comment,
      } = row;

      // const formattedTimestamp = parseAndFormatDate(timestamp);
      phoneNumber = phoneNumberHeader.replace(/['"]+/g, "");

      db.get(
        "SELECT * FROM cards WHERE id = ?",
        [cardId],
        (err, existingRow) => {
          if (err) {
            console.error("Error checking existing record:", err);
            return;
          }

          if (existingRow) {
            // if (formattedTimestamp > existingRow.timestamp) {
            db.run(
              "UPDATE cards SET phone_number = ?, status = ?, timestamp = ?, comment = ? WHERE id = ?",
              [phoneNumber, status, timestamp, comment, cardId]
            );
            // }
          } else {
            db.run(
              "INSERT INTO cards (id, phone_number, status, timestamp, comment) VALUES (?, ?, ?, ?, ?)",
              [cardId, phoneNumber, status, timestamp, comment]
            );
          }
        }
      );
    })
    .on("end", () => {
      console.log("CSV file successfully processed.");
    });
};

module.exports = {
  initDatabase,
  getCardById,
  getCardByPhoneNumber,
  insertDataFromCSV,
};
