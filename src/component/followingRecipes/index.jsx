import axios from "axios";
import { useEffect, useState } from "react";
import DisplayCards from "../displayCards";
import Pagination from "../pagination";

const FollowingRecipes = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(6);
    const token = localStorage.getItem("token");
    const [data, setData] = useState([])
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
    const getFollowingFeed = () => {
        axios.get("http://localhost:4000/foodie-planner/Recipes/followingfeed", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("From following feed ", response.data);
            setData(response.data)
        })
    }

    useEffect(() => {
        getFollowingFeed();
    }, []);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = data.slice(indexOfFirstRecipe, indexOfLastRecipe);

    return (
        <>
            <DisplayCards recipes={currentRecipes} />
            <Pagination total={data.length} perpage={recipesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    );
}

export default FollowingRecipes;
