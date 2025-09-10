const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// Get analytics summary (Admin/Teacher only)
router.get('/summary', authenticateToken, authorizeRole('TEACHER', 'ADMIN'), async (req, res) => {
  try {
    // Get total users
    const totalUsers = await prisma.user.count();
    
    // Get total submissions
    const totalSubmissions = await prisma.submission.count();
    
    // Get approved submissions
    const approvedSubmissions = await prisma.submission.count({
      where: { status: 'APPROVED' }
    });
    
    // Get average points
    const avgPoints = await prisma.user.aggregate({
      _avg: {
        points: true
      }
    });
    res.json({
      totalUsers,
      totalSubmissions,
      approvedSubmissions,
      averagePoints: avgPoints._avg.points || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
});

// Get user progress (Student only)
router.get('/progress', authenticateToken, authorizeRole('STUDENT'), async (req, res) => {
  try {
const userId = req.user.userId;
    
    // Get user's completed challenges
    const completedChallenges = await prisma.submission.count({
      where: {
        userId: parseInt(userId),
        status: 'APPROVED'
      }
    });
    
    // Get user's quiz scores
    const quizScores = await prisma.quizSubmission.findMany({
      where: {
        userId: parseInt(userId)
      },
      select: {
        score: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    
    // Get user's points history
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { points: true, badges: true }
    });
    res.json({
      completedChallenges,
      quizScores,
      points: user.points,
      badges: user.badges
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching progress' });
  }
});

module.exports = router;