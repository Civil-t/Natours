const express = require("express");
const fs = require("fs");

const app = express();

/* app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server", app: "Natours" });
});

app.post("/", (req, res) => {
  res.send("You can post ...");
}); */

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/tours", (req, res) => {
  res.status(200).json({
    status: "successful",
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
