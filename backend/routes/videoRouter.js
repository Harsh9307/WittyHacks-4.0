import express from 'express';
import {getAllVideos, getVideoById} from '../controllers/userController.js'

const router = express.Router();


router.get('/videos', getAllVideos);
router.get('/videos/:id', getVideoById);


export default router;
