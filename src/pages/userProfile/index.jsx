import { useParams } from "react-router-dom";
import Profile from "../../component/profile";
import HomeFooter from "../../component/homeFooter";
import NavBar from "../../component/navBar";

const UserProfile = () => {
    const { id } = useParams();

    return <>
        <NavBar />
        <div className="content">
            <div className="recipes">Profile</div>
        </div>
        <Profile id={id} />
        <HomeFooter /></>

}

export default UserProfile;