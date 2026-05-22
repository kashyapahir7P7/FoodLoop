import { useEffect, useRef, useState } from 'react';
import ReelCard from './ReelCard';
import '../styles/reels-feed.css';
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom';


const ReelsFeed = () => {
    const feedRef = useRef(null);
    const [currentReelIndex, setCurrentReelIndex] = useState(0);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [reels, setReels] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const targetReelId = location.state?.targetReelId;

    // Track scroll position for analytics or features
    useEffect(() => {
        const handleScroll = () => {
            if (feedRef.current) {
                const scrollTop = feedRef.current.scrollTop;
                const reelHeight = window.innerHeight;
                const index = Math.round(scrollTop / reelHeight);
                setCurrentReelIndex(Math.min(index, (reels?.length || 1) - 1));
            }
        };

        const feedElement = feedRef.current;
        if (feedElement) {
            feedElement.addEventListener('scroll', handleScroll);
            return () => feedElement.removeEventListener('scroll', handleScroll);
        }
    }, [reels?.length]);

    useEffect(() => {
        axios.get("/api/food", { withCredentials: true })
            .then(response => {
                setReels(response.data.foodItems || []);
                setIsPageLoading(false);
            })
            .catch(error => {
                console.log(error);
                navigate("/user/login");
            })
    }, []);

    useEffect(() => {
        if (reels?.length > 0 && targetReelId && feedRef.current) {
            const targetIndex = reels.findIndex(reel => reel._id === targetReelId);

            if (targetIndex !== -1) {
                const scrollTarget = targetIndex * window.innerHeight;

                setTimeout(() => {
                    feedRef.current.scrollTo({ top: scrollTarget, behavior: 'instant' });
                    setCurrentReelIndex(targetIndex);

                    window.history.replaceState({}, document.title);
                }, 100);
            }
        }
    }, [reels, targetReelId]);

    if (isPageLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#000' }}>
                <div style={{
                    width: '45px',
                    height: '45px',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    borderTop: '4px solid #ff4757', 
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        )
    }

    return (
        <div className="reels-feed-container" ref={feedRef}>
            <div className="top-feed-title">
                <h2>Reels</h2>
            </div>
            {reels?.length === 0 ? (
                 <div style={{ color: '#888', textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)' }}>
                     No reels available right now.
                 </div>
            ) : (
                reels?.map((reel, index) => (
                    <ReelCard
                        key={reel._id}
                        reel={reel}
                        isActive={index === currentReelIndex}
                    />
                ))
            )}
        </div>
    );
};

export default ReelsFeed;