import { NavLink, Outlet } from "react-router-dom";
import "./style.css"
const Profile = ({ id }) => {
    const postedLink = `/user-profile/${id}/user-posted-recipes`
    const mealLink = `/user-profile/${id}/user-meal-plans`

    return <div>
        <div className="profileMain">
            <div className="profileContent">

                <div className="userImage">

                    <img src="http://res.cloudinary.com/dcp0fuq6t/image/upload/v1695191183/1.jpg"></img>

                </div>
                <div>
                    <div className="userName" >Cras ultricies's Recipes</div>
                    <div className="userDescription">
                        Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.
                    </div>
                </div>

            </div>
            <div className="userContents">
                <p>Let's Explore Cras ultricies's Recipes</p>
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
}

export default Profile;