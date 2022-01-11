const express = require("express");
const cors = require("cors");
const connectionDb = require("../database/config");
const routerUsers = require("../routes/users.routes");
const routerAuth = require("../routes/auth.routes");
const { handleErrors } = require("../middlewares/handle-errors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.database();
    this.middleware();
    this.routes();
  }

  async database() {
    await connectionDb();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(__dirname + "/public"));
  }

  routes() {
    this.app.use("/api/users", routerUsers);
    this.app.use("/api/auth", routerAuth);
    this.app.use(handleErrors);
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
