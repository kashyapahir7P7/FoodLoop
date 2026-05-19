import { useEffect, useState } from "react";
import axios from "axios";
import ReelCard from "./ReelCard";

const LikedFeed = () => {

    const [likedFoods, setLikedFoods] = useState([]);

    useEffect(() => {

        const fetchLikedFoods = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/food/liked",
                    {
                        withCredentials: true
                    }
                );
                setLikedFoods(response.data.likedItems);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLikedFoods();

    }, []);



    return (

        <div className="reels-feed-container">

            {
                likedFoods.map((item) => (

                    <ReelCard
                        key={item.food._id}
                        reel={item.food}
                    />

                ))
            }

        </div>

    );

};

export default LikedFeed;