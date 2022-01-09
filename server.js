const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.static(__dirname + "/public"));
  }

  routes() {
    this.app.get("/home", (req, res) => {
      res.send("Server class");
    });
    this.app.get("*", (req, res) => {
      res.status(404).send("404 | NOT FOUND");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in port: " + this.port);
    });
  }
}

module.exports = {
  Server,
};
