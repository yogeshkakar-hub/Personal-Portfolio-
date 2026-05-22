const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: [
    {
      type: String,
      trim: true,
    },
  ],
  githubLink: {
    type: String,
    default: '',
    trim: true,
  },
  liveLink: {
    type: String,
    default: '',
    trim: true,
  },
});

module.exports = mongoose.model('Project', projectSchema);