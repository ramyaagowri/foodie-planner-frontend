import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css"
import { useNavigate } from "react-router-dom";

const PostedRecipes = () => {
    const navigate = useNavigate()
    const [Recipe, setRecipe] = useState([]);
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
                    console.log("Hereeeeee", response.data)
                    setRecipe(response.data.postedRecipies)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        else {
            navigate("/login")
        }
    }, []);

    return (
        <div className="card-container">
            {Recipe.map((recipe) => {
                { console.log(recipe.image) }
                return (
                    <div className="card-wrap" key={recipe.id} style={{ backgroundImage: `url("${recipe.image}")` }}>
                        <div className="card-content">
                            <div>
                                <div className="recipe-name"><strong>Name of the Recipe :  </strong>{recipe.recipeName}</div>
                                <div className="description"><strong>Description :  </strong>{recipe.description}</div>
                            </div>
                            <div className="options">
                                <span><strong>Rated Upto : </strong>{recipe.rating}</span>
                                <a href="">View</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default PostedRecipes;
