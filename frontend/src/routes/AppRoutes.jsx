import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import Home from '../pages/general/Home'
import CreateFood from '../pages/foodpartner/CreateFood'
import Profile from '../pages/foodpartner/Profile'
import SavedFeed from '../components/SavedFeed';
import UserProfile from '../pages/general/UserProfile';
import LikedFeed from '../components/LikedFeed';
import FollowingList from '../components/FollowingList';
import TopLoader from '../components/TopLoader';

const AppRoutes = () => {
  return (
    <div className="app-container">
      <Router>
        <TopLoader />
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
          <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/create-food" element={<CreateFood />} />
          <Route path="/foodpartner/:id" element={<Profile />} />
          <Route path="/saved" element={<SavedFeed />} />
          <Route path="/liked" element={<LikedFeed />} />
          <Route path="/following" element={<FollowingList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;