import { NavLink, Outlet } from "react-router-dom";
import "./style.css"
import ProfileSection from "../../component/Profile";
import FooterImageSeries from "../../component/footerImageSeries";
import HomeFooter from "../../component/homeFooter";
import ProfileDetails from "../../component/profileDetails";

function ProfilePage() {
    return <div>
        <ProfileSection />
        <ProfileDetails />
        <div className="profile-nav">
            <ul>
                <li> <NavLink to="posted-recipe">Posted Recipes</NavLink></li>
                <li><NavLink to="saved-recipe">Saved Recipes</NavLink></li>
                <li> <NavLink to="meal-plans">Meal plans</NavLink></li>
            </ul>
        </div >
        <Outlet />
        <FooterImageSeries />
        <HomeFooter />
    </div >
}

export default ProfilePage;