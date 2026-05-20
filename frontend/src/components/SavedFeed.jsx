import { useEffect, useState } from "react";
import axios from "axios";
import ReelCard from "./ReelCard";

const SavedFeed = () => {

    const [savedFoods, setSavedFoods] = useState([]);

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

        };

        fetchSavedFoods();

    }, []);

    return (

        <div className="reels-feed-container">
            <div className="top-feed-title">
                <h2>Saved</h2>
            </div>

            {
                savedFoods.map((item) => (

                    <ReelCard
                        key={item.food._id}
                        reel={item.food}
                    />

                ))
            }

        </div>

    );

};

export default SavedFeed;