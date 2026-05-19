
import "../../styles/UserProfile.css";
import {
    Heart,
    Bookmark,
    Eye,
    LogOut,
    ChevronRight,
    Calendar,
    Settings
} from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"


const UserProfile = () => {

    const [profile, setProfile] = useState(null);
    const navigate = useNavigate()


    // fetch profile data from backend
    useEffect(() => {

        const fetchProfile = async () => {

            try {
                const response = await axios.get(
                    "http://localhost:3000/api/auth/userprofile",
                    {
                        withCredentials: true
                    }
                )
                console.log(response.data)
                setProfile(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProfile()
    }, [])


    // logout user 
    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/auth/user/logout",
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

    return (

        <div className="profile-page">

            {/* HEADER */}
            <div className="profile-header">

                <h1>Profile</h1>

                <button className="profile-settings-btn">
                    <Settings size={22} />
                </button>

            </div>

            {/* PROFILE CARD */}
            <div className="profile-card">

                <div className="profile-image-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
                        alt="profile"
                        className="profile-image"
                    />
                </div>

                <h2 className="profile-name">{profile?.user?.fullName}</h2>

                <p className="profile-username">
                    @{profile?.user.fullName || profile?.user.fullName?.split(' ').join('_')} _foodie
                </p>

                <p className="profile-bio">
                    Food lover 🍕 | Exploring delicious reels across the city.
                </p>

                <div className="joined-date">
                    <Calendar size={16} />
                    <span>joined {profile?.user.updatedAt ? new Date(profile.user.updatedAt).toLocaleDateString() : 'Unknown'}</span>
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

                <div className="stat-card">
                    <Eye size={26} />
                    <h3>56</h3>
                    <p>Watched</p>
                </div>

            </div>

            {/* MENU */}
            <div className="profile-menu">

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

        </div>

    )

}

export default UserProfile;



