import axios from "axios";
import { useEffect, useState } from "react";

const SavedRecipes = () => {
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
                    console.log(response.data.savedRecipes)
                    setRecipe(response.data.savedRecipes)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);
    return <><div className="card-container">
        {Recipe.map((recipe) => {
            { console.log(recipe.recipe.recipeName) }
            return (<div className="card-wrap" key={recipe.recipe.id} style={{ backgroundImage: `url("${recipe.recipe.image}")` }}>
                <div className="card-content">
                    <div >
                        <div className="recipe-name"><strong>Name of the Recipe :  </strong>{recipe.recipe.recipeName}</div>
                        <div className="description"><strong>Description :  </strong>{recipe.recipe.description}</div>
                    </div>
                    <div className="options">
                        <span><strong>Rated Upto : </strong>{recipe.recipe.rating}</span>
                        <a href="">View</a>
                    </div>
                </div>
            </div>)
        })}
        {/* <div className="card">44
    Posted Recipies
</div>
<div className="card">
    Posted Recipies
</div>
<div className="card">
    Posted Recipies
</div> */}
    </div></>
}

export default SavedRecipes;