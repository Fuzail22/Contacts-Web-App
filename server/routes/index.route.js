const express = require("express");
const router = express.Router();
const contacts = require("./contacts.route");

router.get("/", (req, res) => {
  res.status(200).send("This is Home Route, used to check server's health");
});

router.use("/api/contacts", contacts);

module.exports = router;
