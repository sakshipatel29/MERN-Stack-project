
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

mongoose.connect("mongodb://localhost:27017/Users", { useNewUrlParser: true, useUnifiedTopology: true });

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

// Login endpoint
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

// Register endpoint
app.post('/Register', (req, res) => {
    UsersModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

// Create event endpoint
app.post('/create-event', upload.array('files'), (req, res) => {
    const { email, eventName, keyValue } = req.body;

    const newEvent = new EventModel({
        email,
        eventName,
        keyValue,
    });

    newEvent.save()
        .then(event => res.json(event))
        .catch(err => res.json(err));
});

// Fetch events endpoint
app.get('/events', async (req, res) => {
    const { email } = req.query;

    try {
        const events = await EventModel.find({ email });
        console.log('Fetched events from DB:', events); // Log the fetched events
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch event images endpoint
app.get('/event-images', (req, res) => {
    const eventName = req.query.eventName;
    const directoryPath = path.join(baseUploadPath, eventName);

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }

        // Filter to include only image files (optional)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        res.json(imageFiles);
    });
});

// Delete image endpoint
app.delete('/delete-image', (req, res) => {
    const { eventName, imageName } = req.body;
    const filePath = path.join(baseUploadPath, eventName, imageName);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to delete image', error: err });
        }
        res.json({ message: 'Image deleted successfully' });
    });
});

// Update event endpoint to add new images
app.post('/update-event', upload.array('files'), async (req, res) => {
    const { email, eventName, keyValue } = req.body;

    try {
        const event = await EventModel.findOne({ email, eventName });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.keyValue = keyValue || event.keyValue;
        await event.save();

        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(baseUploadPath));

// Start the server
app.listen(3001, () => {
    console.log("server is running");
});
