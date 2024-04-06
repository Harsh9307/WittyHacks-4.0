import fs from 'fs';
import path from 'path';

// Mockup function for getting videos data
const getVideosData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, '../data/videos.json'), 'utf8');
  return JSON.parse(jsonData);
};

// Function to find the next video based on sequence
export const getNextVideoId = (currentVideoId) => {
  const videos = getVideosData();
  const currentVideo = videos.find(video => video.id === currentVideoId);
  if (!currentVideo) return null; // Handle error or invalid ID

  const nextVideo = videos.find(video => video.sequence === currentVideo.sequence + 1);
  if (!nextVideo) {
    // Handle the case where current video is the last in the series
    // For simplicity, let's return null or you can loop to the first video
    return null;
  }

  return nextVideo.id; // Return the next video's ID
};
