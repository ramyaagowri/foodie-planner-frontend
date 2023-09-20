import axios from "axios";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import clock from "../../assets/clock.svg"
import knife from "../../assets/knife.svg"
import "./style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const unSave = (id) => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:4000/foodie-planner/Recipes/unSave/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            setRecipe((prevRecipes) => prevRecipes.filter((recipe) => recipe.recipe.id !== id));
            toast.success('Removed Recipe From WishList', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
    }
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
                    console.log("From Saved Recipes", response.data[0].savedRecipes)
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
                const recipeDetailLink = `/details/${recipe.recipe.id}`;
                return <div className="grid" key={recipe.recipe.id}>
                    <div className="imgdiv">
                        <a href={recipeDetailLink}>  <div className="img" style={{ backgroundImage: `url(${recipe.recipe.image})` }}>
                        </div></a>
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
                        <a href={recipeDetailLink}><div className="content-footer"><strong>Read More</strong></div></a>
                    </div>
                    <div className="button">
                        <button onClick={() => unSave(recipe.recipe.id)}><strong>Remove from WishList</strong></button>
                    </div>
                </div>
            })}
        </div>
        <ToastContainer />
    </div>
}

export default SavedRecipes;