const express = require("express");

const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.json("Hello");
});

app.listen(port, () => console.log("Server listening on port", port));
