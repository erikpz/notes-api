const mongoose = require("mongoose");
require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB CONNECTED!!!!!!"))
  .catch((e) => {
    console.log(e);
  });

module.exports = mongoose;
