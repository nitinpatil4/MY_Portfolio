const Message = require('../models/Message');
const { sendContactNotification } = require('../utils/mailer');

// @desc  Handle contact form submission
// @route POST /api/contact
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const saved = await Message.create({ name, email, message });

    try {
      await sendContactNotification({ name, email, message });
    } catch (mailErr) {
      console.error('Email notification failed:', mailErr.message);
    }

    res.status(201).json({ message: 'Message sent successfully', data: saved });
  } catch (err) {
    next(err);
  }
};

// @desc  Get all contact messages (admin)
// @route GET /api/contact
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

// @desc  Delete a contact message (admin)
// @route DELETE /api/contact/:id
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendMessage, getMessages, deleteMessage };
