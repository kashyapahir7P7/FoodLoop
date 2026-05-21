import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/profile-page.css'; // બધી CSS આ ફાઈલમાં હશે

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState([]);

    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    const navigate = useNavigate();

    const isOpen = () => {
        if (!profile || !profile.openingTime || !profile.closingTime) return true;
        const now = new Date();
        const currentTime = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
        return currentTime >= profile.openingTime && currentTime <= profile.closingTime;
    };

    const handleReelClick = (reelId) => {
        navigate('/', { state: { targetReelId: reelId } });
    };

    // fetch food partner profile and follow status 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await axios.get(
                    `https://foodloop-ailt.onrender.com/api/food/foodpartner/${id}`,
                    { withCredentials: true }
                );
                setProfile(profileRes.data.foodPartner);
                setVideos(profileRes.data.foodPartner.foodItems);

                const followRes = await axios.get(
                    `https://foodloop-ailt.onrender.com/api/follow/status/${id}`,
                    { withCredentials: true }
                );
                setIsFollowing(followRes.data.isFollowing);
                setFollowersCount(followRes.data.followersCount);

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleFollowToggle = async () => {
        const wasFollowing = isFollowing;
        setIsFollowing(!wasFollowing);
        setFollowersCount(prev => wasFollowing ? prev - 1 : prev + 1);

        try {
            await axios.post(
                "https://foodloop-ailt.onrender.com/api/follow/toggle",
                { foodPartnerId: id },
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
            setIsFollowing(wasFollowing);
            setFollowersCount(prev => wasFollowing ? prev + 1 : prev - 1);

            if (error.response && error.response.status === 401) {
                navigate("/user/login");
            }
        }
    };

    const totalLikes = videos.reduce((total, video) => total + (video.likeCount || 0), 0);

    if (isLoading) {
        return <div className="profile-page"><div className="loading">Loading...</div></div>;
    }

    if (!profile) {
        return <div className="profile-page"><div className="loading">Profile not found</div></div>;
    }

    // રિયલ ટાઈમ સ્ટેટસ માટે વેરીએબલ
    const currentlyOpen = isOpen();

    return (
        <div className="profile-page">
            <div className="profile-container">

                {/* === Back: Top Navigation Bar === */}
                <div className="profile-top-bar">
                    <button className="back-button" onClick={() => window.history.back()}>
                        <span className="back-icon">←</span> Back
                    </button>
                </div>

                {/* Profile Hero / Header */}
                <div className="profile-hero">
                    <div className="profile-top-content">

                        {/* Avatar & Info Group */}
                        <div className="profile-identity">

                            <div className="profile-avatar">
                                <img
                                    src={profile.logo || `https://ui-avatars.com/api/?name=${profile.name}&background=random&color=fff&size=200&bold=true`}
                                    alt={profile.name}
                                />
                            </div>

                            <div className="profile-info">
                                <h1 className="business-name">{profile.name || 'test-foody'}</h1>

                                {/* 1. Open/Closed Status  */}
                                <div className="store-status-container">
                                    <span className={`status-dot ${currentlyOpen ? 'open' : 'closed'}`}>
                                        ● {currentlyOpen ? 'Open Now' : 'Closed'}
                                    </span>
                                    {profile.openingTime && profile.closingTime && (
                                        <span className="status-time">
                                            | {profile.openingTime} - {profile.closingTime}
                                        </span>
                                    )}
                                </div>

                                {profile.address && (
                                    <p className="business-address">{profile.address}</p>
                                )}

                                <div className="badge-container">
                                    <div className="profile-badge">
                                        <span className="badge-icon">🍴</span> Food Partner
                                    </div>

                                    {/* Follow Button  */}
                                    <button
                                        className={`follow-partner-btn ${isFollowing ? 'following' : ''}`}
                                        onClick={handleFollowToggle}
                                    >
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                </div>

                                {/* 2. Cuisine Tags  */}
                                {profile.cuisines && profile.cuisines.length > 0 && (
                                    <div className="cuisine-tags-container">
                                        {profile.cuisines.map((tag, index) => (
                                            <span key={index} className="cuisine-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Stats Group  */}
                        <div className="profile-stats">
                            <div className="stat-box reels-card">
                                <p className="stat-value">{videos.length || 0}</p>
                                <p className="stat-label">Reels</p>
                            </div>
                            <div className="stat-box followers-card">
                                <p className="stat-value">{followersCount}</p>
                                <p className="stat-label">Followers</p>
                            </div>
                            <div className="stat-box likes-card">
                                <p className="stat-value">{totalLikes > 1000 ? (totalLikes / 1000).toFixed(1) + 'k' : totalLikes}</p>
                                <p className="stat-label">Likes</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Videos Grid */}
                <div className="videos-grid">
                    {videos.map((video) => (
                        <div
                            key={video._id}
                            className="video-item"
                            onClick={() => handleReelClick(video._id)}
                        >
                            <div className="play-icon">▶</div>
                            <video src={video.video} muted playsInline />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Profile;