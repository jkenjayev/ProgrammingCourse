const express = require("express");
const Joi = require("joi");
const app = express();

const categories = [
  { id: 1, title: "data consistency" },
  { id: 2, title: "Algorithms and DS" },
  { id: 3, title: "Client-side development" },
  { id: 4, title: "Server-side development" },
  { id: 5, title: "Full stack development" },
];

app.get("/api/categories", (req, res) => {
  res.send(categories);
});

app.get("/api/categories/:id", (req, res) => {
  const category = categories.find((ctg) => ctg.id === parseInt(req.params.id));
  if (!category) return res.status(404).send("Oops! Not found such category");

  res.send(category);
});

app.post("api/categories", (req, res) => {
    const { error } = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const category = {id: categories.length + 1, title: req.body.title};
    categories.push(category);

    res.status(201).send(category);
});

app.put("/api/categories/:id", (req, res) => {
    const { error } = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const category = categories.find(ctg => ctg.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('Not found such category');

    category.title = req.body.title

    res.send(category);
})

function validateCategory(category) {
  const schema = {
    title: Joi.string().required().min(4),
  };

  return Joi.validate(category, schema);
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Hey! I am listening the ${port}th port`);
});
