import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TopLoader = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setVisible(true);
            setProgress(30);
        }, 10);

        const timer1 = setTimeout(() => setProgress(70), 150);
        
        const timer2 = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setVisible(false);
                setProgress(0); 
            }, 300);
        }, 500); 

        return () => {
            clearTimeout(startTimer);
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [location.pathname]);

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '3px',
            background: '#ff4757',
            width: `${progress}%`,
            transition: 'width 0.3s ease, opacity 0.3s ease',
            zIndex: 99999,
            opacity: progress === 100 ? 0 : 1,
            boxShadow: '0 0 10px #ff4757, 0 0 5px #ff4757'
        }} />
    );
};

export default TopLoader;