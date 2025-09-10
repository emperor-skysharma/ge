const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// Get all forum threads
router.get('/', authenticateToken, async (req, res) => {
  try {
    const threads = await prisma.forumThread.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching forum threads' });
  }
});

// Create new forum thread
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;
    const thread = await prisma.forumThread.create({
      data: {
        title,
        content,
        authorId: parseInt(userId)
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    res.status(201).json(thread);
  } catch (error) {
    res.status(500).json({ error: 'Error creating forum thread' });
  }
});

// Add reply to thread
router.post('/:threadId/replies', authenticateToken, async (req, res) => {
  try {
    const { threadId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;
    const reply = await prisma.forumReply.create({
      data: {
        content,
        threadId: parseInt(threadId),
        authorId: parseInt(userId)
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: 'Error adding reply' });
  }
});

module.exports = router;