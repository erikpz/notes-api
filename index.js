const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.json({
    message: "Home page",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Bacckend running in port" + PORT);
});
