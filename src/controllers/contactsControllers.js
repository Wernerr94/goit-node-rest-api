import contactsService from "../services/contactsServices.js";
import {createContactSchema, updateContactSchema} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  const list = await contactsService.listContacts();
  if (!list) {
    res.status(500).json({message: "Cannot list contacts"});
  }
  res.status(200).json({
    status: "200",
    data: list
  });
};

export const getContactById = async (req, res) => {
  try {
    const contact = await contactsService.getContactById(req.params.id);
    if (contact) {
      res.json({
        status: "200",
        data: contact
      });
    }
  } catch (e) {
    res.status(404).json({status: "404", "message": e.message})
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await contactsService.removeContact(req.params.id);
    if (contact) {
      res.status(200).json({
        status: "200",
        data: contact
      });
    }
  } catch (err) {
    res.status(404).json({status: "404", "message": err.message})
  }
};

export const createContact = async (req, res) => {
  try {
    const {name, email, phone} = await createContactSchema.validateAsync(req.body, {abortEarly: false});
    const createdContact = await contactsService.addContact(name, email, phone);
    if (createdContact) {
      res.status(201).json({
        status: "201",
        data: createdContact
      });
    }
  } catch (err) {
    res.status(400).json({status: "400", "message": err.message});
  }

};

export const updateContact = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) res.status(400).json({
      status: "400",
      "message": "Body must have at least one field"
    });
    const {name, email, phone} = await updateContactSchema.validateAsync(req.body, {abortEarly: false});
    const updatedContact = await contactsService.updateContact(req.params.id, name, email, phone);
    if (updatedContact) {
      res.status(200).json({
        status: "200",
        data: updatedContact
      });
    } else {
      res.status(404).json({status: "404", "message": "Not found"})
    }
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};
