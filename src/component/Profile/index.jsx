import { useContext, useEffect } from "react";
import { UserDataContext } from "../context";
import { Outlet } from "react-router-dom";

const Profile = () => {
    let profileContext = useContext(UserDataContext)

    useEffect(() => {
        console.log("Profile Data", profileContext)
    }, [profileContext])

    return (
        <div className="userdetails">
            <img src={profileContext.state.profilePic}></img>
            <div>
                <p>Name : {profileContext.state.name}</p>
                <p>Description : Description Content</p>
                <p>Email :{profileContext.state.email}</p>
            </div>

            <div>
                <Outlet />
            </div>
        </div >
    )
}
export default Profile;