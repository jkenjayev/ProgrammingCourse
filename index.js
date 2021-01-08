const express = require("express");
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


