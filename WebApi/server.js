const http = require('http');

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const dataPath = './data.json';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/contacts', (request, response) => {
    const contacts = getContacts();
    response.send(contacts);
})

app.get('/contacts/:id', (request, response) => {
    const contacts = getContacts();
    const id = +request.params.id;
    response.send(contacts.find((contact) => contact.id === id));
})

app.post('/contacts', (request, response) => {
    const contacts = getContacts();
    let lastId = contacts.at(-1).id;
    console.log(request.body, lastId)

    request.body['id'] = contacts.length + 1;
    console.log(request.body, lastId)
    contacts.push(request.body);
    fs.writeFileSync(dataPath, JSON.stringify(new Object({"contacts": contacts})));
    response.send(request.body);
})

app.put('/contacts/:id', (request, response) => {
    const contacts = getContacts();
    const id = +request.params.id;
    let index = contacts.findIndex((contact) => contact.id === request.body.id);
    contacts[index] = request.body;
    fs.writeFileSync(dataPath, JSON.stringify(new Object({"contacts": contacts})));
    response.send(request.body);
})

app.delete('/contacts/:id', (request, response) => {
    let contacts = getContacts();
    const id = +request.params.id;
    contacts = contacts.filter((contact) => contact.id != id);
    fs.writeFileSync(dataPath, JSON.stringify({"contacts": contacts}));
})

app.get('/data', (request, response) => {
    const fileData = fs.readFileSync(dataPath);
    const contacts = JSON.parse(fileData).contacts;
    response.send(JSON.parse(fs.readFileSync(dataPath)).contacts);
})

app.listen(3000);

getContacts = () => {
    const fileData = fs.readFileSync(dataPath);
    return JSON.parse(fileData).contacts;
}