const mongoose = require("mongoose");

const connectionDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectionDb;
