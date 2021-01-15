const mongoose = require("mongoose");
const express = require("express");
const categoriesRoute = require("./routes/categories");
const customersRoute = require("./routes/customer");
const CoursesRoute = require("./routes/courses");
const enrollmentsRoute = require("./routes/enrollments");
const usersRouter = require("./routes/users");
const authRoute = require("./routes/auth");
const config = require("config");
const app = express();

if(!config.get("jwtPrivateKey")) {
  console.log("ERROR: a variable jwtPrivateKey is not signed");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/programmingCourse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connection is OK with Database");
  })
  .catch((err) => {
    console.log("Connection is Error with Database", err);
  });

app.use(express.json());

app.use("/api/categories", categoriesRoute);
app.use("/api/customers", customersRoute);
app.use("/api/courses", CoursesRoute);
app.use("/api/enrollments", enrollmentsRoute);
app.use("/api/users", usersRouter);
app.use("/api/login", authRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Hey! I am listening the ${port}th port`);
});
