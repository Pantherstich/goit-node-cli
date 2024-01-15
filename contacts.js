const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// contacts.js

/*
 * Розкоментуй і запиши значення
 * const contactsPath = ;
 */

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;

  // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;

  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const putchContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(putchContacts, null, 2));
  const contactById = await getContactById(contactId);
  return contactById;

  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await listContacts();
  const putchContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(putchContacts, null, 2));
  return newContact;

  // ...твій код. Повертає об'єкт доданого контакту (з id).
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
