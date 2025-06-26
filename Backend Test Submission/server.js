const express = require("express");
const bodyParser = require("body-parser");
const shortenerRoutes = require("./shortener");

const app = express();
app.use(bodyParser.json());
app.use("/", shortenerRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

