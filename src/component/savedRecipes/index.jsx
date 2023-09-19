import axios from "axios";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import clock from "../../assets/clock.svg"
import knife from "../../assets/knife.svg"
import { NavLink } from "react-router-dom";
const SavedRecipes = () => {
    const [recipes, setRecipe] = useState([]);
    useEffect(() => {
        const scrollToContent = () => {
            const targetElement = document.getElementById('scrollTarget');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        };

        scrollToContent();
    }, []);
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
                    // console.log("From Saved Recipes", response.data[0].savedRecipes)
                    setRecipe(response.data[0].savedRecipes)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);
    return <div>
        <div id="scrollTarget"></div>
        <div className="grid-container">
            {recipes.map((recipe) => {
                const recipeDetailLink = `/details/${recipes.id}`;
                return <NavLink to={recipeDetailLink} key={recipe.id}>
                    <div className="grid">
                        <div className="imgdiv">
                            <div className="img" style={{ backgroundImage: `url(${recipe.recipe.image})` }}>
                            </div>
                        </div>

                        <div className="expert">
                            <div className="svg">
                                <ReactSVG src={clock} />
                                <div>{recipe.recipe.timeToMake} Minutes</div>
                            </div>
                            <div className="svg">
                                <ReactSVG src={knife} style={{
                                    height: "20px",
                                    width: "20px"
                                }} />
                                <div>{recipe.recipe.level}</div>
                            </div>
                        </div>

                        {/* {console.log(recipe.recipesName)} */}
                        <div className="content">
                            <div className="content-heading"><strong>{recipe.recipe.recipeName}</strong></div>
                            <div className="content-section">{recipe.recipe.description}</div>
                            <div className="content-footer"><strong>Read More</strong></div>
                        </div>
                    </div>
                </NavLink>
            })}
        </div>
    </div>
}

export default SavedRecipes;