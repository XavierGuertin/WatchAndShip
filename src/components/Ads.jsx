import React, { useState, useEffect } from 'react';

const Ads = ({ onWatchComplete }) => {
    // Placeholder for video file names
    const videoFiles = ['ad1.mp4', 'ad2.mp4', 'ad3.mp4', 'ad4.mp4'];
    const [currentVideo, setCurrentVideo] = useState('ad1.mp4');
    const [showPopup, setShowPopup] = useState(true);
    const [videosWatched, setVideosWatched] = useState(0);
    const [lastVideoIndex, setLastVideoIndex] = useState(0);

    useEffect(() => {
        // Select a random video when the component mounts
        selectRandomVideo();
    }, []);

    const selectRandomVideo = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * videoFiles.length);
        } while (randomIndex === lastVideoIndex);

        setLastVideoIndex(randomIndex);
        setCurrentVideo(videoFiles[randomIndex]);
    };

    const handleVideoEnd = () => {
        if (videosWatched === 3) {
            setShowPopup(false);
            onWatchComplete(videosWatched + 1);
            return;
        }
        const watchMore = window.confirm(`You have watched ${videosWatched + 1} ads. This means that you saved ${0.25 * (videosWatched + 1)}$. Would you like to watch another? If you leave, you will not be able to watch more ads.`);
        if (watchMore) {
            selectRandomVideo();
            setVideosWatched(videosWatched + 1);
        } else {
            setShowPopup(false);
            onWatchComplete(videosWatched + 1);
        }
    };

    if (!showPopup) return null;

    return (
        <div style={{ zIndex:20, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <video
                key={currentVideo}
                autoPlay={true}
                controls={false}
                onEnded={handleVideoEnd}
                style={{ width: "80%", height: "80%" }}>
                <source src={`/videos/${currentVideo}`} />
            </video>
        </div>
    );
};

export default Ads;