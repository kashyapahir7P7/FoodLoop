import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Heart,
    MessageCircle,
    Bookmark,
    Home,
    User,
} from 'lucide-react';

import { useVideoVisibility } from '../hooks/useVideoVisibility';
import '../styles/reel-card.css';
import axios from 'axios';


const ReelCard = ({ reel }) => {
    const videoRef = useVideoVisibility();

    const [liked, setLiked] = useState(reel.isLiked || false);
    const [likeCount, setLikeCount] = useState(reel.likeCount || 0);
    const [saved, setSaved] = useState(reel.isSaved || false);
    const [saveCount, setSaveCount] = useState(reel.saveCount || 0);

    const handleLike = async () => {

        try {

            const response = await axios.post(
                "http://localhost:3000/api/food/like",
                {
                    foodId: reel._id
                },
                {
                    withCredentials: true
                }
            )

            setLiked(response.data.liked)

            if (response.data.liked) {
                setLikeCount(prev => prev + 1)
            } else {
                setLikeCount(prev => prev - 1)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleBookMark = async () => {

        try {
            const response = await axios.post(
                "http://localhost:3000/api/food/save",
                {
                    foodId: reel._id
                },
                {
                    withCredentials: true
                }
            )
            setSaved(response.data.saved)

            if (response.data.saved) {
                setSaveCount(prev => prev + 1)
            } else {
                setSaveCount(prev => prev - 1)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="reel-card">

            {/* ================= VIDEO ================= */}
            <div className="reel-video-container">
                <video
                    ref={videoRef}
                    className="reel-video"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                >
                    <source src={reel.video} type="video/mp4" />
                </video>

                <div className="reel-loading-skeleton"></div>
            </div>

            {/* ================= OVERLAY ================= */}
            <div className="reel-gradient-overlay"></div>

            {/* ================= CONTENT ================= */}
            <div className="reel-content-overlay">

                <div className="reel-info">
                    <p className="reel-store-name">@{reel.name}</p>

                    <h2 className="reel-title">
                        {reel.name}
                    </h2>

                    <p className="reel-description">
                        {reel.description}
                    </p>
                </div>

                <Link
                    to={"/foodpartner/" + reel.foodPartner}
                    className="reel-visit-button"
                >
                    Visit Store
                </Link>

            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="reel-sidebar">

                {/* LIKE */}
                <button
                    className={`sidebar-action ${liked ? 'active-like' : ''}`}
                    onClick={handleLike}
                >
                    <Heart
                        size={26}
                        fill={liked ? 'currentColor' : 'transparent'}
                    />
                    <span>{likeCount}</span>
                </button>

                {/* COMMENT */}
                <button className="sidebar-action">
                    <MessageCircle size={26} />
                    <span>{reel.comments}</span>
                </button>

                {/* SAVE */}
                <button
                    className={`sidebar-action ${saved ? 'active-save' : ''}`}
                    onClick={handleBookMark}
                >
                    <Bookmark
                        size={24}
                        fill={saved ? 'currentColor' : 'transparent'}
                    />
                    <span>{saveCount}</span>
                </button>

            </div>

            {/* ================= BOTTOM NAVIGATION ================= */}
            <div className="bottom-reel-navbar">


                <Link to="/" className="bottom-nav-item active-nav">
                    <Home size={24} />
                </Link>

                <Link to="/saved" className="bottom-nav-item">
                    <Bookmark size={22} />
                </Link>

                <Link to="/userprofile" className="bottom-nav-item" >
                    <User size={22} />
                </Link>

            </div>

        </div>
    );
};

export default ReelCard;