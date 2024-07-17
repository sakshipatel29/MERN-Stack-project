const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UsersModel = require('./models/Users');
const EventModel = require('./models/Events');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Users", { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/Login", (req, res) => {
    const { email, password } = req.body;
    UsersModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("incorrect credentials");
            }
        } else {
            res.json("user doesn't exist!");
        }
    });
});

app.post('/register', (req, res) => {
    UsersModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post('/create-event', (req, res) => {
    const { email, eventName, secretKey } = req.body; // Removed images from destructuring

    const newEvent = new EventModel({
        email,
        eventName,
        secretKey
    });

    newEvent.save()
    .then(event => res.json(event))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("server is running");
});
