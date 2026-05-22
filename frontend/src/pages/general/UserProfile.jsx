
import "../../styles/UserProfile.css";
import {
    Heart,
    Bookmark,
    LogOut,
    ChevronRight,
    Calendar,
    Users
} from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"


const UserProfile = () => {

    const [profile, setProfile] = useState(null);
    const [followingCount, setFollowingCount] = useState(0);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // 1. Profile Data
                const profileRes = await axios.get("/api/auth/userprofile", { withCredentials: true });
                setProfile(profileRes.data);

                const followRes = await axios.get("/api/follow/my-following", { withCredentials: true });
                if (followRes.data.success) {
                    setFollowingCount(followRes.data.count);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfileData();
    }, []);


    // logout user 
    const handleLogout = async () => {
        try {
            await axios.post(
                "/api/auth/user/logout",
                {},
                {
                    withCredentials: true
                }
            )
            navigate("/user/login")
        } catch (error) {
            console.log(error)
        }
    }

    // dynamic bio generator based on user's name and join date (just for fun :) )
    const getDynamicBio = () => {
        if (!profile?.user) return "Food lover 🍕 | Exploring delicious reels across the city.";

        const firstName = profile.user.fullName ? profile.user.fullName.split(' ')[0] : 'Foodie';
        const joinYear = profile.user.updatedAt ? new Date(profile.user.updatedAt).getFullYear() : new Date().getFullYear();

        const bios = [
            `🍕 ${firstName}'s official foodie journal. Hunting for the best tastes in town since ${joinYear}!`,
            `✨ Exploring flavor galaxies. ${firstName} is on a mission to find the perfect reel since ${joinYear}.`,
            `🌶️ Spicy, sweet, and everything neat. Just a ${firstName} looking for some good food vibes.`
        ];

        const index = firstName.length % bios.length;
        return bios[index];
    };

    return (

        <div className="profile-page">

            {/* HEADER */}
            <div className="profile-header">

                <div className="profile-top-bar">
                    <button className="back-button" onClick={() => window.history.back()}>
                        <span className="back-icon">←</span> Back
                    </button>
                </div>

                <div className="profile-top-bar">
                    <h1>Profile</h1>
                </div>

                <div className="profile-top-bar">
                </div>

            </div>

            {/* PROFILE CARD */}
            <div className="profile-card">

                {/* Avatar Section */}
                <div className="profile-image-wrapper">
                    <img
                        src={profile?.user?.profilePic || `https://ui-avatars.com/api/?name=${profile?.user?.fullName || 'User'}&background=random&color=fff&size=200&bold=true`}
                        alt="profile"
                        className="profile-image"
                    />
                </div>

                {/* User Details Section  */}
                <div className="profile-details-holder">
                    <h2 className="profile-name">{profile?.user?.fullName || 'Foodie User'}</h2>

                    <p className="profile-username">
                        @{profile?.user?.fullName ? profile.user.fullName.toLowerCase().split(' ').join('_') : 'user'}_foodloop
                    </p>

                    <p className="profile-bio">{getDynamicBio()}</p>

                    <div className="joined-date">
                        <Calendar size={14} />
                        <span>Joined {profile?.user?.updatedAt ? new Date(profile.user.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'}</span>
                    </div>
                </div>

            </div>

            {/* STATS */}
            <div className="profile-stats">

                <div className="stat-card">
                    <Heart size={26} />
                    <h3>{profile?.likedCount || 0}</h3>
                    <p>Liked</p>
                </div>

                <div className="stat-card">
                    <Bookmark size={26} />
                    <h3>{profile?.savedCount || 0}</h3>
                    <p>Saved</p>
                </div>

                <div className="stat-card" onClick={() => navigate("/following")} style={{ cursor: 'pointer' }}>
                    <Users size={26} />
                    <h3>{followingCount}</h3>
                    <p>Following</p>
                </div>

            </div>

            {/* MENU */}
            <div className="profile-menu">

                <button className="menu-item" onClick={() => navigate("/following")}>
                    <div className="menu-left">
                        <div className="menu-icon" style={{ backgroundColor: '#AC92EC', color: 'purple' }}>
                            <Users size={22} />
                        </div>
                        <div>
                            <h4>Following</h4>
                            <p>View food partners you follow</p>
                        </div>
                    </div>
                    <ChevronRight size={22} />
                </button>

                <button className="menu-item" onClick={() => navigate("/saved")}>
                    <div className="menu-left">
                        <div className="menu-icon save-icon">
                            <Bookmark size={22} />
                        </div>
                        <div>
                            <h4>Saved Reels</h4>
                            <p>View all your saved food reels</p>
                        </div>
                    </div>
                    <ChevronRight size={22} />
                </button>

                <button className="menu-item" onClick={() => navigate("/liked")}>
                    <div className="menu-left">
                        <div className="menu-icon like-icon">
                            <Heart size={22} />
                        </div>
                        <div>
                            <h4>Liked Reels</h4>
                            <p>View reels you liked recently</p>
                        </div>
                    </div>
                    <ChevronRight size={22} />
                </button>

                <button className="menu-item logout-item" onClick={handleLogout}>
                    <div className="menu-left">
                        <div className="menu-icon logout-icon">
                            <LogOut size={22} />
                        </div>
                        <div>
                            <h4>Logout</h4>
                            <p>Sign out from your account</p>
                        </div>
                    </div>
                    <ChevronRight size={22} />
                </button>

            </div>

            <div className="app-version-footer">
                <p>FoodLoop App v1.0.0</p>
                <p>Cooked with ❤️ by FoodLoop</p>
            </div>

        </div>

    )

}

export default UserProfile;



