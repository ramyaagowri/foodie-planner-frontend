import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

const ProfileDetails = () => {
    return <div className="profileNav-container">

        <img src="https://metropolitanhost.com/themes/themeforest/html/trickly/assets/img/ig/4.jpg"></img>
        <div className="profileDetails">
            <div className="author">Ramyaa Gowri's Recipes</div>
            <div className="followers">Followers 1k</div>
            <div className="user-description">Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
            Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</div>
        </div>
    </div>
}
export default ProfileDetails;





















// const ProfileDetails = () => {
//     const [user, setUser] = useState({
//         name: "",
//         emailId: "",
//         description: "",
//         profilePic: ""
//     });

//     const [isEditing, setIsEditing] = useState(false);
//     const [editedName, setEditedName] = useState(user.name);
//     const [editedDescription, setEditedDescription] = useState(user.description);

//     const [selectedProfilePic, setSelectedProfilePic] = useState(null);

//     const toggleEditMode = () => {
//         setIsEditing(!isEditing);
//         setEditedName(user.name);
//         setEditedDescription(user.description);
//     };

//     const saveChanges = () => {
//         setUser({ ...user, name: editedName, description: editedDescription });
//         setIsEditing(false);

//         // Upload the new profile picture, if selected
//         if (selectedProfilePic) {
//             const formData = new FormData();
//             formData.append("profilePic", selectedProfilePic);

//             const token = localStorage.getItem("token");
//             axios.post("http://localhost:4000/foodie-planner/Auth/updateProfilePic", formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             })
//                 .then((response) => {
//                     console.log("Profile picture uploaded:", response.data);
//                     axios.post("http://localhost:4000/foodie-planner/Auth/updateProfile", user, {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         }
//                     }).then((response) => {
//                         console.log("Profile Updated ->  ", response.data)
//                     })
//                 })
//                 .catch((error) => {
//                     console.error("Error uploading profile picture:", error);
//                 });
//         }
//     };
//     useEffect(() => {
//         console.log(user);
//     }, [user])
//     const handleProfilePicChange = (e) => {
//         setSelectedProfilePic(e.target.files[0]);
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             axios
//                 .get("http://localhost:4000/foodie-planner/Recipes/getSavedRecipe", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 })
//                 .then((response) => {
//                     console.log("From profile data ", response.data[0]);
//                     const { name, emailId, description, profilePic } = response.data[0];

//                     setUser({
//                         name,
//                         emailId,
//                         description,
//                         profilePic,
//                     });
//                 })
//                 .catch((error) => {
//                     console.error("Error:", error);
//                 });
//         }
//     }, []);

//     return (
//         <div className="profilecard">
//             <div>
//                 <img src={user.profilePic} alt="Profile Pic" />
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProfilePicChange}
//                     style={{ display: "none" }}
//                     id="profilePicInput"
//                 />
//                 <label htmlFor="profilePicInput" className="labelPic">Update Profile</label>
//                 <div className="details">
//                     <div className="name">
//                         {isEditing ? (
//                             <>
//                                 <input
//                                     type="text"
//                                     value={editedName}
//                                     onChange={(e) => setEditedName(e.target.value)}
//                                 />
//                             </>
//                         ) : (
//                             <>
//                                 <p>
//                                     <strong>{user.name}</strong>
//                                 </p>
//                             </>
//                         )}
//                     </div>
//                     <div className="desc">
//                         {isEditing ? (
//                             <div className="desc1">
//                                 <textarea
//                                     value={editedDescription}
//                                     onChange={(e) => setEditedDescription(e.target.value)}
//                                     id="desc2"
//                                 />
//                             </div>
//                         ) : user.description ? (
//                             <>
//                                 <p>{user.description}</p>
//                             </>
//                         ) : (
//                             <button onClick={toggleEditMode}>Add Description</button>
//                         )}
//                     </div>
//                     <p>
//                         <strong>{user.emailId}</strong>
//                     </p>
//                     {isEditing ? (
//                         <button onClick={saveChanges} className="labelPic">Save Changes</button>
//                     ) : (
//                         <button onClick={toggleEditMode} className="labelPic">Edit</button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ProfileDetails;