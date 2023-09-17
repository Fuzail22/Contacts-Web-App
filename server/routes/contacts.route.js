const express = require("express");
const contactRouter = express.Router();
const contactController = require("../controller/contact.controller");

contactRouter
  .route("/")
  .get(contactController.getAllContacts)
  .post(contactController.addNewContact);
contactRouter
  .route("/:id")
  .get(contactController.getContact)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);
module.exports = contactRouter;
