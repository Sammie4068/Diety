const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { authRoute } = require("./routes/index");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));

app.use("/users", cors(), authRoute);

const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "e dey work!!!" });
});

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
