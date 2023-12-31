import axios, { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import clock from "../../assets/clock.svg"
import knife from "../../assets/knife.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"
const PostedRecipies = () => {

    const [recipes, setRecipes] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const handleDelete = (id) => {
        //Delete the post 
        axios.delete(`http://localhost:4000/foodie-planner/Recipes/delete/${id}`)
            .then(() => {
                toast.info('Recipe Deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setDeleted(true);
                const navbarHeight = 100;
                const targetElement = document.getElementById("scrollTarget");
                if (targetElement) {
                    const scrollPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth',
                    });
                }
            })
    }
    useEffect(() => {
        // const targetElement = document.getElementById('scrollTarget');
        // if (targetElement) {
        //     targetElement.scrollIntoView();
        // }
        const navbarHeight = 100;
        const targetElement = document.getElementById("scrollTarget");
        if (targetElement) {
            const scrollPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
        }

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
                    console.log("From profile data--------------", response.data)
                    setRecipes(response.data[0].postedRecipies)

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [deleted]);

    return <div>
        <div id="scrollTarget" ></div>
        {recipes.length > 0 ?
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
                            {deleted ? setTimeout(() => {
                                setDeleted(false)
                            }, 0) : <button onClick={() => handleDelete(recipes.id)} style={
                                {
                                    color: "white",
                                    backgroundColor: "#262626"
                                }
                            }>Delete</button>}
                        </div>
                    </div>
                })}
            </div> : <div className="alternative_text">Post your favorite recipe</div>}

        <ToastContainer />
    </div >
}
export default PostedRecipies;