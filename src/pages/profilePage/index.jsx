import { NavLink, Outlet } from "react-router-dom";
import ProfileTop from "../../component/Profile";
import "./style.css"

function ProfilePage() {
    return <div className="profile-full">
        <ProfileTop />
        <div className="profile-nav">
            <ul>
                <li> <NavLink to="posted-recipe">Posted Recipes</NavLink></li>
                <li><NavLink to="saved-recipe">Saved Recipes</NavLink></li>
                <li> <NavLink to="meal-plans">Meal plans</NavLink></li>
            </ul>
        </div >
        <Outlet />
    </div >
}

export default ProfilePage;