const express = require("express");
const app = express();
const router = require("./routes/index");
const { initDatabase, insertDataFromCSV } = require("./models/card");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDatabase();
insertDataFromCSV("src/data/Pickup.csv", "Pickup");
insertDataFromCSV("src/data/Delivered.csv", "Delivered");
insertDataFromCSV("src/data/Delivery_exceptions.csv", "Failed");
insertDataFromCSV("src/data/Returned.csv", "Returned");

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server is running on port 3000"));
