const fs = require('fs').promises;
const path = require('path');
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContact = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;

    } catch (error) {
        console.log(error.message)
    }
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contactById = contacts.find(item => item.id === contactId);
        if (!contactById) {
            return null;
        };
        return contactById;
    } catch (error) {
        console.log(error.message)
    };
};

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(item => item.id === contactId);
        if (idx === -1) {
            return null;
        };
        const [removeContacts] = contacts.splice(idx, 1);
        updateContact(contacts);
        return removeContacts;
    } catch (error) {
        console.log(error.message);
    };
};

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: ObjectID(),
            name,
            email,
            phone
        };
        contacts.push(newContact);
        updateContact(contacts);
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}