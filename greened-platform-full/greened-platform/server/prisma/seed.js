const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  // Create sample users
  const adminPassword = await bcrypt.hash('admin123', saltRounds);
  const teacherPassword = await bcrypt.hash('teacher123', saltRounds);
  const studentPassword = await bcrypt.hash('student123', saltRounds);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@greened.edu',
      password: adminPassword,
      role: 'ADMIN',
      points: 0
    }
  });

  const teacher = await prisma.user.create({
    data: {
      name: 'Teacher User',
      email: 'teacher@greened.edu',
      password: teacherPassword,
      role: 'TEACHER',
      points: 0
    }
  });

  const student = await prisma.user.create({
    data: {
      name: 'Student User',
      email: 'student@greened.edu',
      password: studentPassword,
      role: 'STUDENT',
      points: 0
    }
  });

  // Create sample modules
  const module1 = await prisma.module.create({
    data: {
      title: 'Biodiversity Conservation',
      description: 'Learn about protecting biodiversity in Punjab',
      content: 'Biodiversity conservation is the practice of protecting and preserving the variety of species, ecosystems, and genetic diversity in a given area. In Punjab, we focus on protecting native species like the Indian Wild Ass and various bird species.'
    }
  });

  const module2 = await prisma.module.create({
    data: {
      title: 'Sustainable Agriculture',
      description: 'Understanding eco-friendly farming practices',
      content: 'Sustainable agriculture in Punjab involves using techniques that protect the environment, expand the Earth\'s natural resource base, and maintain and improve soil fertility. This includes crop rotation, organic farming, and water conservation.'
    }
  });

  // Create sample quizzes
  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'Biodiversity Basics',
      description: 'Test your knowledge of biodiversity conservation',
      moduleId: module1.id
    }
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'Sustainable Farming',
      description: 'Test your knowledge of sustainable agriculture',
      moduleId: module2.id
    }
  });

  // Create sample questions
  await prisma.question.create({
    data: {
      quizId: quiz1.id,
      questionText: 'Which of these is a key principle of biodiversity conservation?',
      options: ['Monoculture farming', 'Habitat destruction', 'Species protection', 'Overfishing'],
      correctAnswer: 'Species protection'
    }
  });

  await prisma.question.create({
    data: {
      quizId: quiz1.id,
      questionText: 'What is the main threat to biodiversity in Punjab?',
      options: ['Urbanization', 'Climate change', 'Pollution', 'All of the above'],
      correctAnswer: 'All of the above'
    }
  });

  await prisma.question.create({
    data: {
      quizId: quiz2.id,
      questionText: 'Which technique helps maintain soil fertility?',
      options: ['Monoculture', 'Crop rotation', 'Overgrazing', 'Deforestation'],
      correctAnswer: 'Crop rotation'
    }
  });

  await prisma.question.create({
    data: {
      quizId: quiz2.id,
      questionText: 'What is a benefit of organic farming?',
      options: ['Increased chemical use', 'Soil degradation', 'Reduced water pollution', 'Higher costs'],
      correctAnswer: 'Reduced water pollution'
    }
  });

  // Create sample challenges
  await prisma.challenge.create({
    data: {
      title: 'Plant a Tree',
      description: 'Plant a native tree in your community and document it with a photo',
      points: 50
    }
  });

  await prisma.challenge.create({
    data: {
      title: 'Reduce Plastic Use',
      description: 'Go a week without using single-use plastics and document your experience',
      points: 50
    }
  });

  await prisma.challenge.create({
    data: {
      title: 'Community Clean-up',
      description: 'Organize or participate in a community clean-up event',
      points: 75
    }
  });

  // Create sample forum threads
  const thread1 = await prisma.forumThread.create({
    data: {
      title: 'Best practices for urban gardening',
      content: 'I\'m starting a small garden on my apartment balcony. Any tips for growing vegetables in containers?',
      authorId: student.id
    }
  });

  const thread2 = await prisma.forumThread.create({
    data: {
      title: 'Water conservation techniques',
      content: 'What are some effective ways to conserve water in our daily lives?',
      authorId: teacher.id
    }
  });

  // Create sample forum replies
  await prisma.forumReply.create({
    data: {
      content: 'Make sure to use containers with good drainage and choose vegetables that grow well in pots like tomatoes and herbs.',
      threadId: thread1.id,
      authorId: teacher.id
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Some great techniques include fixing leaks, using drought-resistant plants, and collecting rainwater.',
      threadId: thread2.id,
      authorId: student.id
    }
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });