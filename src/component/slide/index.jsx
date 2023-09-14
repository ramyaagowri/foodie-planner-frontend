import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import clock from "../../assets/clock.svg";
import knife from "../../assets/knife.svg";
import { ReactSVG } from "react-svg";

const Slide = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login");
        axios.get("http://localhost:4000/foodie-planner/Recipes/getAllRecipe")
            .then((response) => {
                console.log(response.data);
                setRecipes(response.data);
            });
    }, []);

    const carouselConfig = {
        responsive: {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                slidesToSlide: 3,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
            },
        },
        infinite: true,
        autoPlay: true,
        autoPlaySpeed: 2000,
        showDots: true,
        renderButtonGroupOutside: true,
    };

    return (
        <div className="home-section">
            <Carousel {...carouselConfig}>
                {recipes.map((recipe) => {
                    const recipeDetailLink = `/details/${recipe.id}`;
                    return (
                        <NavLink to={recipeDetailLink} key={recipe.id}>
                            <div className="grid">
                                <div className="imgdiv">
                                    <div className="img" style={{ backgroundImage: `url(${recipe.image})` }}></div>
                                </div>
                                <div className="expert">
                                    <div className="svg">
                                        <ReactSVG src={clock} />
                                        <div>45 Minutes</div>
                                    </div>
                                    <div className="svg">
                                        <ReactSVG src={knife} style={{ height: "20px", width: "20px" }} />
                                        <div>Expert</div>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="content-heading"><strong>{recipe.recipeName}</strong></div>
                                    <div className="content-section">{recipe.description}</div>
                                    <div className="content-footer"><strong>Read More</strong></div>
                                </div>
                            </div>
                        </NavLink>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default Slide;
