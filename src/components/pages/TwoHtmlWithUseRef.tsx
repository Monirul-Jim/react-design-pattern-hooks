// const TwoHtmlWithUseRef = () => {
//   return <div></div>;
// };

// export default TwoHtmlWithUseRef;
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const playlistUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
    const apiKey = "AIzaSyBZ5EMCEWwIV7h7UVVbinObGvG3cFdLj58";
    const playlistId = "PLgH5QX0i9K3qzryglMjcyEktz4q7ySunX";

    axios
      .get(playlistUrl, {
        params: {
          part: "snippet",
          maxResults: 50,
          playlistId: playlistId,
          key: apiKey,
        },
      })
      .then((response) => {
        const videoData = response.data.items.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
        }));
        setVideos(videoData);
      })
      .catch((error) => {
        console.error("Error fetching YouTube playlist:", error);
      });
  }, []);

  const showPreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const showNextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      Math.min(prevIndex + 1, videos.length - 1)
    );
  };
  const selectVideo = (index) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
      <div>
        <h1>YouTube Playlist</h1>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videos[currentVideoIndex]?.id}`}
          controls
          volume
          playing
          width="100%"
          height="500px"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={showPreviousVideo}
            className="bg-orange-500 text-white px-4 py-2 rounded"
            disabled={currentVideoIndex === 0}
          >
            Prev
          </button>
          <button
            onClick={showNextVideo}
            className="bg-orange-500 text-white px-4 py-2 rounded"
            disabled={currentVideoIndex === videos.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      <div className="overflow-y-auto max-h-96">
        <h1>All Video Titles</h1>
        <ul>
          {videos.map((video, index) => (
            <li key={video.id}>
              <h1
                className={`cursor-pointer py-2 px-6 rounded-md border-b border-blue-300 ${
                  currentVideoIndex === index ? "bg-blue-300" : ""
                } text-xl`}
                onClick={() => selectVideo(index)}
              >
                {video.title}
              </h1>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoList;
