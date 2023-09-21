import { ReactSVG } from "react-svg";
import SideBar from '../sideBar';
import facebook from "../../assets/facebook.svg"
import instagram from "../../assets/instagram.svg"
import twitter from "../../assets/twitter.svg"
import { NavLink } from 'react-router-dom';
import "./style.css"
import { useState } from "react";

const NavBar = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleSidebar = () => {
        if (!isClicked) {
            setIsClicked(true);
        }
    }

    const removeBackdrop = () => {
        setIsClicked(false)
    }

    return (
        <>
            <div className={isClicked ? "Backdrop" : "removeBackdrop"} onClick={() => removeBackdrop()}>
            </div>
            <div className='navbar'>
                <div className='menu' onClick={() => handleSidebar()}>
                    <div className="menu-icon">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className='subnav'>
                    <ul>
                        <li> <NavLink to="/home">Home</NavLink></li>
                        <li><NavLink to="/add-recipes">Add Recipe</NavLink></li>
                        <li><NavLink>Recipes</NavLink></li>
                        <li><NavLink to="/profile/user-profile">Profile</NavLink></li>
                    </ul>
                </div>
                <div className='social'>
                    <ReactSVG src={facebook}
                        style={{
                            height: "20px",
                            width: "20px",
                        }}
                    />
                    <ReactSVG src={instagram}
                        style={{
                            height: "20px",
                            width: "20px",
                        }}
                    />
                    <ReactSVG src={twitter}
                        style={{
                            height: "20px",
                            width: "20px",
                        }}
                    />
                </div>
            </div>
            <div style={{ marginTop: '50px' }}>
            </div>
            <SideBar clicked={isClicked} />
        </>
    );
};

export default NavBar;
