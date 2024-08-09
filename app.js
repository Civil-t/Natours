const express = require("express");
const fs = require("fs");

const app = express();

//MIDDLEWARE

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  console.log(requestTime);
  next();
});

// Get all tours API
const getTours = (req, res) => {
  res.status(200).json({
    status: "successful",
    results: tours.length,
    data: {
      tours,
    },
  });
};

// ROUTE HANDLERS

//Get a tour based on a url parameter
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //id > tours.length
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

// Update values of an object using patch
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "successful",
    data: {
      tour: "<Updated tour here..>",
    },
  });
};

// Delete a tour
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

//Post a tour
const postTour = (req, res) => {
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
};

// Read tours data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/* app.get("/api/v1/tours", getTours);
app.get("/api/v1/tours/:id", getTour);
app.patch("/api/v1/tours/:id", updateTour);
app.delete("/api/v1/tours/:id", deleteTour);
app.post("/api/v1/tours", postTour); */

//ROUTES
app.route("/api/v1/tours").get(getTours).post(postTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
