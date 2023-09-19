import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import axios from "axios";
import clock from "../../assets/clock.svg"
import knife from "../../assets/knife.svg"
import { ReactSVG } from "react-svg";

const Slide = () => {
    const [Recipe, setRecipe] = useState([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // Show 1 slide at a time
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000, // Set autoplay speed in milliseconds (2 seconds)
    };
    useEffect(() => {
        axios.get("http://localhost:4000/foodie-planner/Recipes/randomRecipe")
            .then((response) => {
                console.log("From Side Bar", response.data)
                setRecipe(response.data)
            })
    }, [])
    return (
        <div className="slide"><Slider {...settings}>
            {Recipe.map((recipes) => {
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
                    <div className="contents">
                        <div className="content-heading"><strong>{recipes.recipeName}</strong></div>
                        <div className="content-section">{recipes.description}</div>
                        <a href={recipeDetailLink}><div className="content-footer"><strong>Read More</strong></div></a>
                    </div>
                </div>
            })}
        </Slider></div>

    );
};

export default Slide;
