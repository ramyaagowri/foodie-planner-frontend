// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import "./style.css"
// import { useEffect, useState } from "react";
// import axios from "axios";
// const Profile = ({ id }) => {
//     const token = localStorage.getItem("token")
//     if (!token) navigate("/login")
//     const [user, setUserData] = useState([]);
//     const [following, setFollowing] = useState(false)
//     const [followingDetails, setFollowingDetails] = useState([])
//     const profileLink = `/user-profile/${id}`
//     const postedLink = `/user-profile/${id}/user-posted-recipes`
//     const mealLink = `/user-profile/${id}/user-meal-plans`
//     const navigate = useNavigate();
//     const handleFollow = () => {
//         axios.get(`http://localhost:4000/foodie-planner/Auth/follow/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then((response) => {
//             console.log(response.data);
//             // response.status == 200 ? setFollowing(true) : setFollowing(false)
//         })
//     }
//     const getProfile = async () => {

//         try {
//             const response = await axios.get(`http://localhost:4000/foodie-planner/Auth/getProfile/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             const profileData = await response.data;
//             console.log("Profile Data", profileData);
//             setUserData(profileData.data)
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     }
//     const getFollowing = () => {
//         axios.get("http://localhost:4000/foodie-planner/Auth/getFollowing", {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then((response) => {
//             console.log(response.data);
//             response.data.map((item) => {
//                 setFollowingDetails((prev) => [...prev, item.followingId]);
//             })
//             console.log(followingDetails.includes(Number(id)))
//             followingDetails.includes(Number(id)) ?
//                 setFollowing(true)
//                 : setFollowing(false)

//         })
//         console.log("Following status initial ", followingDetails)
//     }
//     const handleUnfollow = () => {
//         axios.get(`http://localhost:4000/foodie-planner/Auth/unfollow/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then((response) => {
//             console.log(response.data);
//             response.status == 200 ? setFollowing(false) : null
//         })
//     }
//     useEffect(() => {
//         getProfile();
//         getFollowing()
//     }, [following])
//     useEffect(() => {
//         getProfile();
//         getFollowing()

//     }, [])
//     // console.log(user)
//     return <div>
//         {console.log("Following id", followingDetails)}
//         <div className="profileMain">
//             <div className="profileContent">
//                 <div className="userImage">
//                     <img src={user?.profilePic}></img>
//                     {console.log("Following----------", following)}
//                     {following ? <a onClick={() => handleUnfollow()}> Following</a> : <a onClick={() => handleFollow()}>Follow</a>}

//                 </div>
//                 <div>
//                     <div className="userName" >{user?.name}'s Recipes</div>
//                     <div className="userDescription">
//                         {user?.description}
//                         Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.
//                     </div>
//                 </div>

//             </div>
//             <div className="userContents">
//                 <p>Let's Explore {user?.name}'s Recipes</p>
//                 <div className="userNav">
//                     <ul>
//                         <li><NavLink to={postedLink}>Posted Recipes</NavLink></li>
//                         <li><NavLink to={mealLink}>Meal Plans</NavLink></li>
//                     </ul>
//                 </div>
//                 <Outlet />
//             </div>
//         </div>
//     </div>
// }

// export default Profile;






import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ id }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [user, setUserData] = useState([]);
    const [following, setFollowing] = useState(false);
    const [followingDetails, setFollowingDetails] = useState([]);
    const profileLink = `/user-profile/${id}`;
    const postedLink = `/user-profile/${id}/user-posted-recipes`;
    const mealLink = `/user-profile/${id}/user-meal-plans`;
    const handleUnfollow = () => {
        axios.get(`http://localhost:4000/foodie-planner/Auth/unfollow/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            response.status == 200 ? setFollowing(false) : null
        })
    }
    const handleFollow = () => {
        axios.get(`http://localhost:4000/foodie-planner/Auth/follow/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            response.status == 200 ? setFollowing(true) : setFollowing(false)
        });
    };

    const getProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/foodie-planner/Auth/getProfile/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const profileData = await response.data;
            console.log("Profile Data", profileData);
            setUserData(profileData.data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const getFollowing = () => {
        axios.get("http://localhost:4000/foodie-planner/Auth/getFollowing", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            const followingIds = response.data.map((item) => item.followingId);
            setFollowingDetails(followingIds);

            if (followingIds.includes(Number(id))) {
                setFollowing(true);
            } else {
                setFollowing(false);
            }
        });
    };

    useEffect(() => {
        getProfile();
        getFollowing();
    }, []);

    return <div>
        {console.log("Following id", followingDetails)}
        <div className="profileMain">
            <div className="profileContent">
                <div className="userImage">
                    <img src={user?.profilePic}></img>
                    {console.log("Following----------", following)}
                    {following ? <a onClick={() => handleUnfollow()}> Following</a> : <a onClick={() => handleFollow()}>Follow</a>}

                </div>
                <div>
                    <div className="userName" >{user?.name}'s Recipes</div>
                    <div className="userDescription">
                        {user?.description}
                        Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.
                    </div>
                </div>

            </div>
            <div className="userContents">
                <p>Let's Explore {user?.name}'s Recipes</p>
                <div className="userNav">
                    <ul>
                        <li><NavLink to={postedLink}>Posted Recipes</NavLink></li>
                        <li><NavLink to={mealLink}>Meal Plans</NavLink></li>
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    </div>
};

export default Profile;
