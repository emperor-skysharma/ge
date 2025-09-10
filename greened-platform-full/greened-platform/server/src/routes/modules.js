const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// Get all learning modules
router.get('/', authenticateToken, async (req, res) => {
  try {
    const modules = await prisma.module.findMany({
      include: {
        quizzes: {
          select: {
            id: true,
            title: true,
            questions: true
          }
        }
      }
    });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching modules' });
  }
});

// Get module by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const module = await prisma.module.findUnique({
      where: { id: parseInt(id) },
      include: {
        quizzes: true
      }
    });
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching module' });
  }
});

// Submit quiz answers
router.post('/:moduleId/quizzes/:quizId/submit', authenticateToken, async (req, res) => {
  try {
    const { moduleId, quizId } = req.params;
    const { answers } = req.body;
    const userId = req.user.userId;
    // Get quiz with questions
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(quizId) },
      include: { questions: true }
    });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 10; // 10 points per correct answer
      }
    });
    // Create quiz submission
    const submission = await prisma.quizSubmission.create({
      data: {
        userId: parseInt(userId),
        quizId: parseInt(quizId),
        score,
        answers
      }
    });
    // Update user points
    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        points: { increment: score }
      }
    });
    res.json({
      message: 'Quiz submitted successfully',
      score,
      submission
    });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting quiz' });
  }
});

module.exports = router;