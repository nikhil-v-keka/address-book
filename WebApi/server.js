const http = require('http');

const express = require('express');
const app = express();
let data = require('./data.json');

app.get('/contacts', (request, response) => {
    const contacts = data.contacts;
    response.send(contacts);
})

app.listen(3000);