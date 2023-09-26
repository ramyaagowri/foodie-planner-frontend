import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import knife from "../../assets/knife.svg"
import clock from "../../assets/clock.svg"
import "./style.css"
const UserPostedProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [recipes, setRecipe] = useState([]);
    console.log("Identity ", id)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
        axios.get(`http://localhost:4000/foodie-planner/Recipes/getSavedRecipe/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log("Response from user posted in profile ", response.data)
            setRecipe(response.data[0].postedRecipies)
        })
    }, [])

    return <div className="PostedRecipesMain">
        <div className="grid-container">
            {recipes.map((recipes) => {
                const recipeDetailLink = `/details/${recipes.id}`;
                return <div className="grid" key={recipes.id}>
                    <div className="imgdiv">
                        <a href={recipeDetailLink}>
                            <div className="img" style={{ backgroundImage: `url(${recipes.image})` }}>                        </div>
                        </a>
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
                    <div className="content">
                        <div className="content-heading"><strong>{recipes.recipeName}</strong></div>
                        <div className="content-section">{recipes.description}</div>
                        <a href={recipeDetailLink}><div className="content-footer"><strong>Read More</strong></div></a>
                    </div>
                </div>
            })}
        </div>

    </div>
}
export default UserPostedProfile;