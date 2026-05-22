import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store, ArrowLeft } from 'lucide-react';

const FollowingList = () => {
    const [following, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await axios.get(
                    "/api/follow/my-following",
                    { withCredentials: true }
                );
                
                if (response.data.success) {
                    setFollowing(response.data.following);
                }
            } catch (error) {
                console.log("Error fetching following list:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowing();
    }, []);

    // ડાર્ક થીમ માટેના કલર્સ 
    const darkTheme = {
        background: '#000000',
        cardBg: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#a0a0a0',
        border: '#2a2a2a'
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: darkTheme.background, color: darkTheme.textPrimary }}>
            
            {/* Header */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px', 
                padding: '20px',
                borderBottom: `1px solid ${darkTheme.border}`,
                position: 'sticky',
                top: 0,
                backgroundColor: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 10
            }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ background: 'none', border: 'none', color: darkTheme.textPrimary, cursor: 'pointer', display: 'flex' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 style={{ fontSize: '20px', margin: 0, fontWeight: '600' }}>Following</h2>
            </div>

            {/* List Container */}
            <div style={{ padding: '15px' }}>
                {isLoading ? (
                    <div style={{ textAlign: 'center', color: darkTheme.textSecondary, marginTop: '50px' }}>
                        Loading...
                    </div>
                ) : following.length === 0 ? (
                    <div style={{ textAlign: 'center', color: darkTheme.textSecondary, marginTop: '50px' }}>
                        You are not following any food partners yet.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {following.map((item) => (
                            <div 
                                key={item._id} 
                                onClick={() => navigate(`/foodpartner/${item.foodPartner._id}`)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 15px',
                                    backgroundColor: darkTheme.cardBg,
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    {/* Partner Logo/Icon */}
                                    <div style={{ 
                                        width: '48px', 
                                        height: '48px', 
                                        borderRadius: '50%', 
                                        backgroundColor: '#2d3436', // થોડું લાઇટ ડાર્ક
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ff4757' // તમારી એપનો પ્રાઇમરી કલર (Red/Orange)
                                    }}>
                                        <Store size={22} />
                                    </div>
                                    
                                    {/* Partner Details */}
                                    <div>
                                        <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: darkTheme.textPrimary }}>
                                            {item.foodPartner.name}
                                        </h3>
                                        <p style={{ margin: 0, fontSize: '13px', color: darkTheme.textSecondary }}>
                                            Food Partner
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Visit Button */}
                                <button style={{
                                    padding: '6px 16px',
                                    backgroundColor: '#2a2a2a',
                                    border: `1px solid ${darkTheme.border}`,
                                    borderRadius: '8px',
                                    fontWeight: '500',
                                    fontSize: '13px',
                                    color: darkTheme.textPrimary,
                                    cursor: 'pointer'
                                }}>
                                    Visit
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FollowingList;