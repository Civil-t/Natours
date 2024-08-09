const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

/* app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server", app: "Natours" });
});

app.post("/", (req, res) => {
  res.send("You can post ...");
}); */

// Read tours data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Get all tours API
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "successful",
    results: tours.length,
    data: {
      tours,
    },
  });
});

//Get a tour based on a url parameter
app.get("/api/v1/tours/:id", (req, res) => {
  res.status(200).json({
    status: "successful",
    results: tours.length,
    data: {
      tour,
    },
  });
});

//Post a tour
app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log(err);
      res
        .status(201)
        .json({ status: "Added successfully", data: req.body, ID: newId });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
