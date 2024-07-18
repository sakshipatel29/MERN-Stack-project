const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const UsersModel = require('./models/Users');
const EventModel = require('./models/Events');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Users", { useNewUrlParser: true, useUnifiedTopology: true });

// Ensure base upload directory exists
const baseUploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(baseUploadPath)) {
  fs.mkdirSync(baseUploadPath, { recursive: true });
}

// Set up storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const eventName = req.body.eventName;
    const uploadPath = path.join(baseUploadPath, eventName);
    console.log(`Saving files to: ${uploadPath}`); // Log the upload path
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log(`Saving file: ${file.originalname}`); // Log the file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

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

app.post('/Register', (req, res) => {
  UsersModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post('/create-event', upload.array('files'), (req, res) => {
  const { email, eventName, secretKey } = req.body;

  const newEvent = new EventModel({
    email,
    eventName,
    secretKey,
  });

  newEvent.save()
    .then(event => res.json(event))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
