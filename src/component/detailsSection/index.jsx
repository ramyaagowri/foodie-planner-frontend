import axios from "axios";
import "./style.css";
import { useEffect, useState } from "react";
import SideBar from "../sideBar"
import { useNavigate } from "react-router-dom";
const DetailsSection = (props) => {
    const { id } = props;
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState();
    const [ingredients, setIngredients] = useState([]);

    const saveRecipe = () => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
        else {
            axios.post(
                "http://localhost:4000/foodie-planner/Recipes/saveRecipe",
                {
                    recipeId: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then(() => {
                navigate("/profile/saved-recipe")
            });
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:4000/foodie-planner/Recipes/getDetails/${id}`)
            .then((response) => {
                setRecipe(response.data);
                axios.get(`http://localhost:4000/foodie-planner/Recipes/getIngredients/${id}`)
                    .then((response) => {
                        console.log("Ingredients ", response.data);
                        console.log(recipe, ingredients, "Froom detailed recipes")
                        setIngredients(response.data)
                    })
                    .catch((e) => console.log(e))
            })
            .catch((e) => console.log(e))

    }, [id])
    return <div className="section">
        <div>
            <div className="content">
                <div className="recipes">Recipe Details</div>
            </div>
            {console.log(recipe)}
            <div className="detailsMain">
                <div className="recipeName">{recipe?.recipeName}</div>
                <div className="ratings">Ratings in Star</div>
                <div className="recipeImage">
                    <img src={recipe?.image}></img>
                </div>
                <div className="title">Description</div>
                <div className="text">{recipe?.description}Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.</div>
                <div className="title">Procedure</div>
                <div className="procedure text" >{recipe?.procedure}</div>
                <div className="title">Ingredients</div>
                {console.log("Ingredients from Delaited Section ", ingredients)
                }
                {
                    ingredients.map((ing) => {
                        return <div key={ing.id} className="ing">
                            <div>{ing.ingredientName}</div>
                            <div>{ing.ingredientQuantity}</div>
                        </div>
                    })
                }

                <button onClick={() => saveRecipe()} className="saveButton">Save Recipe</button>
            </div>
        </div>
        <SideBar />
    </div>
}
export default DetailsSection
