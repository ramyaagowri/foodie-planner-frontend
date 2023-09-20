import axios from "axios";
import "./style.css";
import { FaStar } from "react-icons/fa"
import { useEffect, useState } from "react";
import SideBar from "../sideBar"
import wishlist from "../../assets/wishlist.svg"
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DetailsSection = (props) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    const { id } = props;
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        document.body.classList.add('no-scroll');
        setIsOpen(true);
    };

    const closePopup = () => {
        document.body.classList.remove('no-scroll');
        setIsOpen(false);
    };
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
            ).then((response) => {
                console.log("Response from the wishList  ", response)
                if (response.status == 200) {
                    const classToMove = document.querySelector(".detailsMain");
                    classToMove.scrollIntoView({ behavior: "smooth" })
                    toast.success('Recipe added to Wishlist', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

            }).catch(() => {
                const classToMove = document.querySelector(".detailsMain");
                classToMove.scrollIntoView({ behavior: "smooth" })
                toast.warn('Recipe is aldready in Wishlist', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
        }
    }

    const arrLength = 5 - (recipe?.rating || 0);
    const link = `${recipe?.videoLink}`;
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
        axios.post("http://localhost:4000/foodie-planner/Recipes/rate", {
            userRating: rating,
            recipeId: id
        }).then((Response) => console.log(Response))
    }, [id, rating])

    return <div className="section">
        <div>
            <div className="content">
                <div className="recipes">Recipe Details</div>
            </div>
            {console.log(recipe)}
            <div className="detailsMain">
                <div className="recipeName">{recipe?.recipeName}</div>
                <div className="ratings">
                    {console.log(recipe?.rating)}
                    { }
                    {

                        [...Array(recipe?.rating)].map((stars, index) => {
                            return <FaStar size={30} color="yellow" key={index} />
                        })
                    }
                    {
                        [...Array(arrLength)].map((stars, index) => {
                            return <FaStar size={30} color="grey" key={index} />
                        })
                    }
                </div>
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
                {link ? <div className="video">
                    {console.log("Linkkkkkkkkkk", link)}
                    <ReactPlayer url={link}></ReactPlayer>

                    {/* <iframe src={link}></iframe> */}
                </div> : null}
                <div className="rate">
                    <div className="wishlist"> <div onClick={() => saveRecipe()} className="saveButton"><div>Add to WishList</div><ReactSVG src={wishlist} /></div></div>
                    <div className="rateButton saveButton" onClick={() => openPopup()}> <div >Rate Recipe</div>
                        <FaStar size={25} style={{ fill: "yellow" }} />
                    </div>
                    {!isOpen ? null : <div className="popup-overlay">
                        <div className='popup-content'>
                            <div className="ratee">
                                <div><strong>Rate Recipe</strong></div>
                                <div>
                                    {[...Array(5)].map((star, index) => {
                                        const currentRating = index + 1;
                                        return (
                                            <label key={index}>
                                                <input type="radio"
                                                    value={currentRating}
                                                    name="rating"
                                                    onClick={() => setRating(currentRating)}>
                                                </input>
                                                <FaStar size={30} className="star" color={currentRating <= (hover || rating) ? "yellow" : null}
                                                    onMouseEnter={() => setHover(currentRating)}
                                                    onMouseLeave={() => setHover(null)} />
                                            </label>
                                        )
                                    })}
                                </div>
                                <button onClick={() => closePopup()}>Close</button>
                            </div>
                        </div>
                    </div>
                    }

                </div>
                <ToastContainer />
            </div>
        </div>
        <SideBar />
    </div>
}
export default DetailsSection
