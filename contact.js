const fs = require('fs').promises;
const path = require('path');
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "db/contacts.json");

function listContacts() {
    fs.readFile(contactsPath)
        .then(data => JSON.parse(data))
        .catch(error => console.log(error.message))    
}

function getContactById(contactId) {
    fs.readFile(contactsPath)
        .then(data => {
            const contacts = JSON.parse(data)
            const contactById = contacts.find(item => item.id === contactId);
            if (!contactById) {
                return null;
            };
            return (contactById);
        })    
        .catch(error => console.log(error.message)) 
}


function removeContact(contactId) {
    fs.readFile(contactsPath)
        .then(data => {
            const contacts = JSON.parse(data);
            const idx = contacts.findIndex(item => item.id === contactId);
            if (idx === -1) {
                return null;
            };
            const [removeContacts] = contacts.splice(idx, 1);
            fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
            return removeContacts;
        })
        .catch(error => console.log(error.message))
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath)
        .then(data => {
            const contacts = JSON.parse(data);
            const newContact = {
                id: ObjectID(),
                name,
                email,
                phone
            };
            contacts.push(newContact);
            fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
            return newContact;
        })
        .catch(error => console.log(error.message))
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}