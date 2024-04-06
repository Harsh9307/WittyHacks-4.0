import express, { application } from 'express';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js'
import { errorMiddleware } from './middlewares/error.js';
import QuizSchema from './models/Quiz.js'
import videoRoutes from './routes/videoRouter.js';

const app = express();
dotenv.config({
    path: "./.env"
});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
})
)

app.use('/api/v1/user',userRouter)
app.use('/api/v1/user', videoRoutes);

// Endpoint to create a quiz
app.post('/quizzes', async (req, res) => {
  const { videoId, questions } = req.body;

  try {
    const newQuiz = new QuizSchema({ videoId, questions });
    await newQuiz.save();
    res.status(201).send(newQuiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to get quizzes by video ID
app.get('/quizzes/:videoId', async (req, res) => {
    try {
      const quizzes = await QuizSchema.find({ videoId: req.params.videoId });
      res.send(quizzes);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

// route for seeing videos
app.get('/videos', (req, res) => {
  const dataPath = path.join(__dirname, './database/data.json');
  console.log(dataPath);
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send("Error reading video data");
      return;
    }
    res.json(JSON.parse(data));
  });
});



app.use(errorMiddleware);
export { app };
