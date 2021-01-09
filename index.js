const mongoose = require("mongoose");
const express = require("express");
const categoriesRoute = require("./routes/categories");
const app = express();
app.use(express.json());
app.use("/api/categories", categoriesRoute);

mongoose
  .connect("mongodb://localhost/programmingCourse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection is OK with Database");
  })
  .catch((err) => {
    console.log("Connection is Error with Database", err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Hey! I am listening the ${port}th port`);
});
