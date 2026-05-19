import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/profile-page.css';

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    // const [reels, setReels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState([]);

    // Fetch profile and reels
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile
                const profileRes = await axios.get(
                    `http://localhost:3000/api/food/foodpartner/${id}`,
                    { withCredentials: true }
                );
                setProfile(profileRes.data.foodPartner);
                setVideos(profileRes.data.foodPartner.foodItems)

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);


    // const handleReelClick = (reel) => {
    //     setSelectedReel(reel);
    //     setShowReelViewer(true);
    // };

    if (isLoading) {
        return <div className="profile-page"><div className="loading">Loading...</div></div>;
    }

    if (!profile) {
        return <div className="profile-page"><div className="loading">Profile not found</div></div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-top">
                        {/* Avatar */}
                        <div className="profile-avatar">
                            <img
                                src={profile.logo || 'https://images.pexels.com/photos/17997570/pexels-photo-17997570.jpeg'}
                                alt={profile.name}
                            />
                        </div>

                        {/* Info */}
                        <div className="profile-info">
                            <h1 className="business-name">{profile.name}</h1>
                            <p className="business-address">{profile.address}</p>
                            <div className="profile-badge">
                                🍴 Food Partner
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="profile-stats">
                        <div className="stat-box">
                            <p className="stat-label">Total Meals</p>
                            <p className="stat-value">{profile.totalMeals || 0}</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-label">Customer Serve</p>
                            <p className="stat-value">{Math.floor((profile.followers || 0) / 1000)}K</p>
                        </div>
                    </div>
                </div>

                {/* Videos Grid */}
                <div className="videos-grid">
                    {videos.map((video) => (
                        <div
                            key={video._id}
                            className="video-item"
                        >
                            <div className="play-icon">▶</div>
                            <video src={video.video} />
                        </div>
                    ))}
                </div>

                {/* Reel Viewer Modal */}
                {/* { videos (
                <div className="reel-modal active">
                    <button className="close-btn" >✕</button>
                    <div className="reel-modal-content">
                        <ReelCard reel={videos} />
                    </div>
                </div>
            )} */}
            </div>
        </div>
    );
};

export default Profile;