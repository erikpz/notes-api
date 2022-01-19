const express = require("express");
const cors = require("cors");
const connectionDb = require("../database/config");
const routerUsers = require("../routes/users.routes");
const routerAuth = require("../routes/auth.routes");
const routerNotes = require("../routes/notes.routes");
const routerUploads = require("../routes/uploads.routes");
const { handleErrors } = require("../middlewares/handle-errors");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.routesPath = {
      auth: "/api/auth",
      users: "/api/users",
      notes: "/api/notes",
      uploads: "/api/uploads",
    };

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
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.routesPath.auth, routerAuth);
    this.app.use(this.routesPath.users, routerUsers);
    this.app.use(this.routesPath.notes, routerNotes);
    this.app.use(this.routesPath.uploads, routerUploads);
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
