// eventController.js
const Event = require('./models/Events.js');
const User = require('./models/Users.js');

const createEvent = async (req, res) => {
  try {
    const email = req.body.email; // Assuming email is sent in the request body
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newEvent = new Event({
      email: user.email,
      eventName: user.eventName,
      keyValue: user.keyValue // Automatically add the user's email
      // other fields
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

module.exports = { createEvent };
