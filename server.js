const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/API/items');

const app = express();

//

//Body Parser Middleware
app.use(bodyParser.json());

//DB Configuration
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db /*, { useNewUrlParser: true, useUnifiedTopology: true }*/)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/API/items', items);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on ${port}`));