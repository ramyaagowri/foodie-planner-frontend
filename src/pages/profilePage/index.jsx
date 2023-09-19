import { NavLink, Outlet } from "react-router-dom";
import "./style.css"
import ProfileSection from "../../component/Profile";
import FooterImageSeries from "../../component/footerImageSeries";
import HomeFooter from "../../component/homeFooter";

function ProfilePage() {
    return <div>
        <ProfileSection />
        <div className="profile-main">
            <div className="profile-nav">
                <ul>
                    <li> <NavLink to="user-profile">Profile</NavLink></li>
                    <li> <NavLink to="posted-recipe">Posted Recipes</NavLink></li>
                    <li><NavLink to="saved-recipe">WishList</NavLink></li>
                    <li> <NavLink to="meal-plans">Meal plans</NavLink></li>
                </ul>
            </div >
            <div className="profile-contents">
                <Outlet />
            </div>
        </div>
        <FooterImageSeries />
        <HomeFooter />
    </div >
}

export default ProfilePage;