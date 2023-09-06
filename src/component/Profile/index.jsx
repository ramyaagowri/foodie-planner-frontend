import { useContext, useEffect, useState } from "react";
// import { UserDataContext } from "../context";
import "./style.css"
import axios from "axios";
const ProfileTop = () => {
    // let profileContext = useContext(UserDataContext)
    const [user, setUser] = useState({
        name: "",
        descriptiom: "",
        profilePic: "",
        emailId: ""
    })
    // useEffect(() => {
    //     console.log("Profile Data", profileContext)
    // }, [profileContext])
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:4000/foodie-planner/Recipes/getSavedRecipe", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const { name, emailId, description, profilePic } = response.data;
                    console.log(name, emailId, profilePic, description)
                    setUser({
                        name, emailId, description, profilePic
                    })
                    // setUser(response.data.postedRecipies)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);

    return (
        <div className="userdetails">
            {console.log(user)}
            <img src={user.profilePic} alt="Profile Photo" className="div1"></img>
            {/* {user.profilePic} */}
            <div className="div2">
                <p><strong>Name : </strong>{user.name}</p>
                <p><strong>Description : </strong>{user.description}</p>
                <p><strong>Email : </strong>{user.emailId}</p>
            </div>
        </div >
    )
}
export default ProfileTop;