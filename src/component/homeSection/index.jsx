import "./style.css"
import { ReactSVG } from "react-svg";
import clock from "../../assets/clock.svg"
import knife from "../../assets/knife.svg"
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayCards from ".././displayCards"
import Pagination from ".././pagination"


const HomeSection = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const navigate = useNavigate();
    useEffect(() => {
        const navbarHeight = 100;
        const targetElement = document.querySelector(".grid-container");
        if (targetElement) {
            const scrollPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
        }
    }, [currentPage])
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login");
        axios.get("http://localhost:4000/foodie-planner/Recipes/getAllRecipe")
            .then((response) => {
                console.log(response.data);
                setRecipes(response.data);
            });

    }, []);
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    const currentRecipes = recipes.slice(firstIndex, lastIndex);
    return (
        <div className="home-section">
            <div className="content">
                <div className="recipes">Recipe Grid</div>
            </div>
            <div className="scrollTarget"></div>
            <DisplayCards recipes={currentRecipes} />
            <Pagination total={recipes.length} perpage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}
export default HomeSection;

