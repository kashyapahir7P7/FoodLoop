import { useEffect, useState } from "react";
import axios from "axios";
import ReelCard from "./ReelCard";
import { ArrowLeft, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SavedFeed = () => {

    const [savedFoods, setSavedFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {

        const fetchSavedFoods = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:3000/api/food/saved",
                    {
                        withCredentials: true
                    }
                );

                console.log(response.data);

                setSavedFoods(response.data.savedItems);

            } catch (error) {

                console.log(error);

            }
            finally {
                setIsLoading(false);
            }

        };

        fetchSavedFoods();

    }, []);

    return (

        <div className="reels-feed-container" style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>

            {/* Top Bar with Back Button */}
            <div className="top-feed-title" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', zIndex: 10, position: 'relative' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Saved</h2>
            </div>

            {/* Content Area */}
            {isLoading ? (
                <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>
                    Loading...
                </div>
            ) : savedFoods.length === 0 ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70vh',
                    color: '#a0a0a0',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #333',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'
                    }}>
                        <Bookmark size={40} color="#fff" strokeWidth={1.5} />
                    </div>
                    <h3 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>No Saved Reels</h3>
                    <p style={{ fontSize: '14px', textAlign: 'center', maxWidth: '250px', margin: 0 }}>
                        When you save delicious food reels, they will appear here.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        style={{
                            marginTop: '20px',
                            padding: '10px 24px',
                            backgroundColor: '#ff4757', 
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        Explore Reels
                    </button>
                </div>
            ) : (
                savedFoods.map((item) => (
                    <ReelCard
                        key={item.food._id}
                        reel={item.food}
                    />
                ))
            )}
        </div>

    );

};

export default SavedFeed;