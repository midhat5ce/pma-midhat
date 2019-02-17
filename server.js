const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const products = require('./routes/api/products');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log('Connected'))
        .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello wwww'));

app.use('/api/users', users);
app.use('/api/products', products);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Port: ${port}`));