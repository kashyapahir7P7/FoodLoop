import { useEffect, useRef, useState } from 'react';
import ReelCard from './ReelCard';
import '../styles/reels-feed.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

/**
 * ReelsFeed Component
 * Main container for reel-style video feed with snap scrolling
 */

const ReelsFeed = () => {
    const feedRef = useRef(null);
    const [currentReelIndex, setCurrentReelIndex] = useState(0);
    const [reels, setReels] = useState([])
    const navigate = useNavigate()

    // Track scroll position for analytics or features
    useEffect(() => {
        const handleScroll = () => {
            if (feedRef.current) {
                const scrollTop = feedRef.current.scrollTop;
                const reelHeight = window.innerHeight;
                const index = Math.round(scrollTop / reelHeight);
                setCurrentReelIndex(Math.min(index, reels.length - 1));
            }
        };

        const feedElement = feedRef.current;
        if (feedElement) {
            feedElement.addEventListener('scroll', handleScroll);
            return () => feedElement.removeEventListener('scroll', handleScroll);
        }
    }, [reels.length]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {
                setReels(response.data.foodItems)
            })
            .catch(error => {
                console.log(error)
                navigate("/user/login")
            })
    }, [])

    return (
        <div className="reels-feed-container" ref={feedRef}>
            <div className="top-feed-title">
                <h2>Reels</h2>
            </div>
            {reels.map((reel, index) => (
                <ReelCard
                    key={reel._id}
                    reel={reel}
                    isActive={index === currentReelIndex}
                />
            ))}
        </div>
    );
};

export default ReelsFeed;
