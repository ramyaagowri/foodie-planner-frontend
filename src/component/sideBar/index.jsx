import { useEffect, useState } from "react";
import "./style.css"
import axios from "axios";
import { NavLink } from "react-router-dom";

const SideBar = (props) => {
   
    const { clicked } = props;
    const [Recipes, setRecipe] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/foodie-planner/Recipes/randomRecipe")
            .then((response) => {
                console.log("From Side Bar", response.data)
                setRecipe(response.data)
            })
    }, [])
    return <div className={clicked ? "activee" : "sidebar"}>
        <div className="backdrop">
            <div className="outline">
                <div className="out1">Good Food</div>
                <div className="out2">Best Quality Food</div>
            </div>
        </div>
        <div className="recentCard">
            {
                Recipes.map((item) => {
                    const link = `/details/${item.id}`
                    return <NavLink to={link} key={item.id}>
                        <div className="posts">
                            <div className="postsCard">
                                <div className="imageContainer">
                                    <img src={item.image} />
                                </div>
                                <div className="contentContainer">
                                    <div className="unit1"><strong>{item.recipeName}</strong></div>
                                    <div className="unit2"><strong>{item.description}</strong></div>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                })
            }
        </div>
    </div>
}
export default SideBar;
// https://metropolitanhost.com/themes/themeforest/html/trickly/assets/img/sidebar-cta.jpg
