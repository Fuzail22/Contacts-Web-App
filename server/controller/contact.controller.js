const dbConnection = require("../config/mongoDB");
const contactModel = require("../model/contact.model");
const validation = require("../helper/validation");
const getAllContacts = async (req, res) => {
  contactModel
    .find({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          "The Following error occured during fetching all contacts from DB\n",
          err
        );
    });
};

const getContact = async (req, res) => {
  let doc = await contactModel.findById(req.params["id"]);
  if (!doc) {
    res.status(404).json("No such _id exist to find");
    return;
  } else {
    res.status(200).json(doc);
  }
};

const addNewContact = async (req, res, next) => {
  const contactData = req.body;
  if (validation.hasEmptyStringValues(contactData)) {
    res.send("Empty fields can't be added");
    return;
  }
  contactModel
    .create(contactData)
    .then((response) => {
      res.status(201).json("Contact successfully added");
    })
    .catch((err) => {
      res
        .status(500)
        .json(`The Following error occured during insertion into DB ${err}`);
    });
};
const updateContact = async (req, res) => {
  if (validation.hasEmptyStringValues(req.body)) {
    res.send("Empty fields can't be updated");
    return;
  }
  let doc = await contactModel.findById(req.params["id"]);
  let flag = false;
  if (!doc) {
    res.status(404).json("No such _id exist to update");
    return;
  }
  if (doc.name != req.body.name) {
    doc.name = req.body.name;
    console.log("name changed");
    flag = true;
  }
  if (doc.phone != req.body.phone) {
    doc.phone = req.body.phone;
    console.log("phone changed");
    flag = true;
  }
  if (doc.email != req.body.email) {
    doc.email = req.body.email;
    console.log("email changed");
    flag = true;
  }
  if (flag) {
    doc
      .save()
      .then((response) => {
        res.status(200).json(`Contact updated successfully`);
      })
      .catch((err) => {
        res.json(`The Following error occured during updating into DB ${err}`);
      });
  } else {
    res.status(304).json("No changes made to update contact");
  }
};
const deleteContact = async (req, res) => {
  contactModel
    .findByIdAndDelete(req.params["id"])
    .then((response) => {
      res.status(200).json(`Contact deleted successfully`);
    })
    .catch((err) => {
      res.json(`The Following error occured during deleting in DB ${err}`);
    });
};
module.exports = {
  getContact,
  addNewContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
