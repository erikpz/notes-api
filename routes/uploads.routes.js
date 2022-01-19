const { Router } = require("express");
const { uploadFile } = require("../controllers/uploads.controller");
const validateJWT = require("../middlewares/validate-jwt");

const uploadRouter = Router();

uploadRouter.post("/", [validateJWT], uploadFile);

module.exports = uploadRouter;
