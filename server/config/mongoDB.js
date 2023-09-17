const connectString = process.env.connectString;
const mongoose = require("mongoose");
mongoose
  .connect(connectString)
  .then(() => console.log("MongoDB Connection Succesfull"))
  .catch((err) => {
    console.log(
      "The following error occured while trying to connect to MongoDB Cluster\n",
      err
    );
  });
