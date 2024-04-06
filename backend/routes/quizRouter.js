// routes/quiz.js
import express from 'express';
import { QuizResult } from '../models/QuizResult.js';
import { getVideosData, getNextVideoId } from '../controllers/videoController.js'; // Assume these functions exist

const router = express.Router();

router.post('/submitQuiz', async (req, res) => {
  const { userId, videoId, score, passed } = req.body;

  const quizResult = await QuizResult.create({
    userId,
    videoId,
    score,
    passed
  });

  let nextVideoId = null;
  if (passed) {
    nextVideoId = getNextVideoId(videoId); // Determine the next video based on some logic
  } else {
    nextVideoId = videoId; // Repeat the same video
  }

  res.json({ success: true, nextVideoId });
});

export default router;
