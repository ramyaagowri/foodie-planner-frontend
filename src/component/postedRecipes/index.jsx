import axios from "axios";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import clock from "../../assets/clock.svg"
import knife from "../../assets/knife.svg"
import { NavLink } from "react-router-dom";

const PostedRecipies = () => {

    const [recipes, setRecipes] = useState([]);

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
                    console.log("From profile data ", response.data)
                    setRecipes(response.data[0].postedRecipies)
                    // setUser({
                    //     name, emailId, description, profilePic
                    // })
                    // setUser(response.data.postedRecipies)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);

    return <div>
        <div className="grid-container">
            {recipes.map((recipes) => {
                const recipeDetailLink = `/details/${recipes.id}`;
                return <NavLink to={recipeDetailLink} key={recipes.id}>
                    <div className="grid" >
                        <div className="imgdiv">
                            <div className="img" style={{ backgroundImage: `url(${recipes.image})` }}>
                            </div>
                        </div>
                        <div className="expert">
                            <div className="svg">
                                <ReactSVG src={clock} />
                                <div>45 Minutes</div>
                            </div>
                            <div className="svg">
                                <ReactSVG src={knife} style={{
                                    height: "20px",
                                    width: "20px"
                                }} />
                                <div>Expert</div>
                            </div>
                        </div>
                        {/* {console.log(recipe.recipesName)} */}
                        <div className="content">
                            <div className="content-heading"><strong>{recipes.recipeName}</strong></div>
                            <div className="content-section">{recipes.description}</div>
                            <div className="content-footer"><strong>Read More</strong></div>
                        </div>
                    </div>
                </NavLink>
            })}
        </div>
    </div>
}
export default PostedRecipies;