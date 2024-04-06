// server/models/Quiz.js

import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // Assuming you have a Video model. If not, adjust accordingly.
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [
        {
          text: String,
          isCorrect: Boolean,
        },
      ],
    },
  ],
});

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz; // Use ES6 export here
