const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');
const path = require('path');
const Resume = require('../models/resume.model');
const resumeController = require("../Controllers/resumeController");

// Get all resumes
router.get('/all', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// Save resume
router.post('/save', resumeController.saveResume);

// Existing routes
router.post("/create", resumeController.createResume);
router.post("/enhanceField", resumeController.enhanceField);
router.post("/generate-pdf", resumeController.generateAndDownloadPDF);
router.get("/load", resumeController.getResumeByEmail);

module.exports = router; 