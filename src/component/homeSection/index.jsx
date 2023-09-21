import "./style.css"
import { ReactSVG } from "react-svg";
import clock from "../../assets/clock.svg"
import knife from "../../assets/knife.svg"
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const HomeSection = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login");
        axios.get("http://localhost:4000/foodie-planner/Recipes/getAllRecipe")
            .then((response) => {
                console.log(response.data);
                setRecipes(response.data)
            });

    }, [])

    return (
        <div className="home-section">
            <div className="content">
                <div className="recipes">Recipe Grid</div>
            </div>
            <div className="scrollTarget"></div>
            <div className="grid-container">
                {recipes.map((recipes) => {
                    const recipeDetailLink = `/details/${recipes.id}`;
                    return <div className="grid" key={recipes.id}>
                        <div className="imgdiv">
                            <a href={recipeDetailLink}><div className="img" style={{ backgroundImage: `url(${recipes.image})` }} >
                            </div></a>
                        </div>
                        <div className="expert">
                            <div className="svg">
                                <ReactSVG src={clock} />
                                <div>{recipes.timeToMake} Minutes</div>
                            </div>
                            <div className="svg">
                                <ReactSVG src={knife} style={{
                                    height: "20px",
                                    width: "20px"
                                }} />
                                <div>{recipes.level}</div>
                            </div>
                        </div>
                        {/* {console.log(recipe.recipesName)} */}
                        <div className="content">
                            <div className="content-heading"><strong>{recipes.recipeName}</strong></div>
                            <div className="content-section">{recipes.description}</div>
                            <a href={recipeDetailLink}><div className="content-footer"><strong>Read More</strong></div></a>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
export default HomeSection;

