import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
    const [profileDetails, setProfileDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        description: "",
        name: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
        axios
            .get("http://localhost:4000/foodie-planner/Auth/getProfile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setProfileDetails(response.data));
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        axios
            .post(
                "http://localhost:4000/foodie-planner/Auth/updateProfile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setProfileDetails(response.data);

                axios.post("http://localhost:4000/foodie-planner/Auth/updateProfilePic")
                setEditMode(false);



                //Sroll into view

                const target = document.querySelector(".profileImage");
                target.scrollIntoView({ behavior: "smooth" })
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    return (
        <>
            <div className="profileNav-container">
                <div className="profileImage">
                    <img
                        src="https://metropolitanhost.com/themes/themeforest/html/trickly/assets/img/ig/4.jpg"
                        alt="Profile"
                    />
                </div>
                <div className="profileDetails">
                    <div className="profileBorder">
                        <div className="author">{profileDetails.name}'s Recipes</div>
                        <div className="followers">Followers 1k</div>
                        <div className="user-description">
                            {editMode ? (
                                <form onSubmit={handleFormSubmit}>
                                    <div>
                                        {/* <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                    /> */}
                                    </div>
                                    <div className="Pro">
                                        <label>Name :</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            placeholder="Update Name"

                                        />
                                    </div>
                                    <div className="Pro">
                                        <label>Description :</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleFormChange}
                                            placeholder="Update Description"
                                        />
                                    </div>
                                    <div className="Pro">
                                        <label>Profile Picture:</label>
                                        <input type="file" name="profilePicture" />
                                    </div>

                                    <div className="Profilebtn">
                                        <button onClick={() => {
                                            setEditMode(!editMode)
                                            const target = document.querySelector(".profileImage");
                                            target.scrollIntoView({ behavior: "smooth" })
                                        }
                                        }>
                                            Cancel
                                        </button>

                                        {editMode ?
                                            <button type="submit">Save</button> : null}

                                    </div>                                </form>
                            ) : (
                                profileDetails.description
                            )}

                        </div>

                    </div>
                    {
                        !editMode ? <button onClick={() => setEditMode(!editMode)}>
                            Edit Profile                        </button> : null
                    }

                </div>
            </div>
        </>
    );
};

export default ProfileDetails;
