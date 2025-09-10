const express = require('express');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Submit challenge evidence
router.post('/:challengeId', authenticateToken, upload.single('evidence'), async (req, res) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user.userId;
    const { description } = req.body;
    // Create submission
    const submission = await prisma.submission.create({
      data: {
        userId: parseInt(userId),
        challengeId: parseInt(challengeId),
        evidenceUrl: req.file ? `/uploads/${req.file.filename}` : null,
        description,
        status: 'PENDING'
      }
    });
    // Award pending points
    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        points: { increment: 10 } // 10 points for submission
      }
    });
    res.json({
      message: 'Submission created successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating submission' });
  }
});

// Approve submission (Admin/Teacher only)
router.post('/:id/approve', authenticateToken, authorizeRole('TEACHER', 'ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    // Update submission status
    const submission = await prisma.submission.update({
      where: { id: parseInt(id) },
      data: {
        status: 'APPROVED',
        verifiedAt: new Date()
      }
    });
    // Award full points
    await prisma.user.update({
      where: { id: submission.userId },
      data: {
        points: { increment: 40 } // Additional 40 points for approval
      }
    });
    res.json({
      message: 'Submission approved successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ error: 'Error approving submission' });
  }
});

// Reject submission (Admin/Teacher only)
router.post('/:id/reject', authenticateToken, authorizeRole('TEACHER', 'ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    // Update submission status
    const submission = await prisma.submission.update({
      where: { id: parseInt(id) },
      data: {
        status: 'REJECTED',
        rejectionReason: reason
      }
    });
    // Deduct pending points
    await prisma.user.update({
      where: { id: submission.userId },
      data: {
        points: { decrement: 10 } // Remove pending points
      }
    });
    res.json({
      message: 'Submission rejected successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ error: 'Error rejecting submission' });
  }
});

module.exports = router;