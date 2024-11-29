import path from 'path';
import fs from 'fs/promises';
import Contact from '../models/Contact.js';


const contactsPath = path.join(process.cwd(), 'src/db/contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts.toString())
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact =  contacts.find(contact => contact.id === contactId)
  if (!contact) {
    throw new Error(`Could not find contact with id: ${contactId}`);
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToRemove = await getContactById(contactId);
  const filtered = contacts.filter(contact => contact.id !== contactId);
  if (!contactToRemove) {
    throw new Error(`Could not find contact with id: ${contactId}`);
  } else {
    await fs.writeFile(contactsPath, JSON.stringify(filtered, null, 2));
    return contactToRemove
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contact = new Contact(name, email, phone);
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

async function updateContact(contactId, name, email, phone) {
  let contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) {
    return null;
  } else {
    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;
    contacts = contacts.filter(contact => contact.id !== contactId)
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  }
}

const contactsService = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}

export default contactsService;