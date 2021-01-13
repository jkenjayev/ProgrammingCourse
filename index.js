const mongoose = require("mongoose");
const express = require("express");
const categoriesRoute = require("./routes/categories");
const customersRoute = require("./routes/customer");
const CoursesRoute = require("./routes/courses");
const enrollmentsRoute = require("./routes/enrollments");
const usersRouter = require("./routes/users");
const app = express();
app.use(express.json());
app.use("/api/categories", categoriesRoute);
app.use("/api/customers", customersRoute);
app.use("/api/courses", CoursesRoute);
app.use("/api/enrollments", enrollmentsRoute);
app.use("/api/users", usersRouter);

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
