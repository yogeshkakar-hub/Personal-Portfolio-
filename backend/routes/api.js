const express = require('express');
const Project = require('../models/Project');
const Message = require('../models/Message');

const router = express.Router();

router.get('/projects', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post('/projects', async (req, res, next) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;

    const project = new Project({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
});

router.post('/messages', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const contactMessage = new Message({
      name,
      email,
      message,
    });

    const savedMessage = await contactMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
});

router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = new Message({
      name,
      email,
      message: subject ? `${subject}\n\n${message}` : message,
    });

    const savedMessage = await contactMessage.save();
    res.status(201).json({
      message: 'Message sent successfully.',
      data: savedMessage,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;