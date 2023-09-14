import { useEffect, useReducer, useState } from "react";
import "./style.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddRecipesSection = () => {
    const navigate = useNavigate();

    const [ingredientName, setIngredientName] = useState("");
    const [ingredientQuantity, setIngredientQuantity] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        console.log("ingredients ", ingredients)
    }, [ingredients])


    const reducer = (prevState, action) => {
        switch (action.type) {
            case "updateRecipeName":
                return { ...prevState, recipeName: action.payload }
            case "updateCategory":
                return { ...prevState, category: action.payload }
            case "updateDescription":
                return { ...prevState, description: action.payload }
            case "updateLevel":
                return { ...prevState, level: action.payload }
            case "updateTimeToMake":
                return { ...prevState, timeToMake: action.payload }
            case "updateProcedure":
                return { ...prevState, procedure: action.payload }
        }
    }
    const handleAddIngredient = (e) => {
        e.preventDefault();
        if (ingredientName.trim() !== "" && ingredientQuantity.trim() !== "") {
            setIngredients([...ingredients, { ingredientName, ingredientQuantity }]);
            setIngredientName("");
            setIngredientQuantity("");
        }
    };
    const handleDeleteIngredient = (index, e) => {
        e.preventDefault();
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };
    const [dataState, dispatch] = useReducer(reducer, {
        recipeName: "",
        category: "",
        description: "",
        level: "",
        procedure: "",
        timeToMake: 0
    });
    const handleFileChange = (e) => {

        const files = e.target.files;
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        console.log("Submit Called...");

        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        try {
            const createRecipeResponse = await axios.post(
                "http://localhost:4000/foodie-planner/Recipes/create-recipe",
                {
                    dataState,
                    ingredients,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("For multipart data ", createRecipeResponse.data);

            const formData = new FormData();
            formData.append("files", selectedFiles[0]);

            const fileUploadResponse = await axios.post(
                `http://localhost:4000/foodie-planner/Recipes/fileUpload/${createRecipeResponse.data.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("For form Data    ", fileUploadResponse.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };



    return <div className="addRecipeSection">
        <div className="contentt">
            <div className="recipes">Add Your Recipe</div>
        </div>
        <div className="addside">
            <div className="main">
                <form >
                    <div className="form">
                        <div className="ele1 box">
                            <label className="recipe-name recipe">Recipe Name</label>
                            <input type="text" placeholder="Recipe Name" onChange={(e) => dispatch({ type: "updateRecipeName", payload: e.target.value })} />
                        </div>
                        <div className="ele1 box">
                            <label className="recipe-name recipe">Time to Prepare</label>
                            <input type="text" placeholder="Time to Make in Minutes" onChange={(e) => dispatch({ type: "updateTimeToMake", payload: e.target.value })} />
                        </div>
                        <div className="ele7 box">
                            <label className="select-category recipe">Select Category</label>
                            <select className="select-option" onChange={(e) => dispatch({ type: "updateCategory", payload: e.target.value })}>
                                <option value="Lunch">Lunch</option>
                                <option value="BreakFast">BreakFast</option>
                                <option value="Salad">Salad</option>
                                <option value="Meals">Meals</option>
                                <option value="Diet">Diet</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </div>
                        <div className="ele7 box">
                            <label className="select-category recipe">Select Level</label>
                            <select className="select-option" onChange={(e) => dispatch({ type: "updateLevel", payload: e.target.value })}>
                                <option value="Lunch">Beginner</option>
                                <option value="BreakFast">Advanced</option>
                                <option value="Salad">Intermediate</option>
                            </select>
                        </div>
                        <div className="ele2 box">
                            <label htmlFor="description" className="recipe-description recipe">Recipe Description</label>
                            <textarea placeholder="Recipe Description" id="description" onChange={(e) => dispatch({ type: "updateDescription", payload: e.target.value })} />
                        </div>
                        <div className="file-input-container">
                            <input
                                type="file"
                                id="file-input"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />
                            <label htmlFor="file-input" className="custom-file-input">
                                Upload Photos
                            </label>
                        </div>
                        <div className="ingredients">
                            <div className="ele3 box">
                                Ingredients
                            </div>
                            <div className="ele4">
                                <input type="text" placeholder="Ingredient" onChange={(e) => setIngredientName(e.target.value)} value={ingredientName}></input>
                                <input type="text" placeholder="Quantity" onChange={(e) => setIngredientQuantity(e.target.value)} value={ingredientQuantity}></input>
                            </div>
                            <br />
                            <div>
                                <button className="add-ingredient" onClick={handleAddIngredient}>Add Ingredients</button>
                            </div>
                            <h3>Ingredients:</h3>
                            <ul>
                                {ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.ingredientName} - {ingredient.ingredientQuantity}
                                        <button onClick={(e) => handleDeleteIngredient(index, e)}>
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="ele2 box">
                            <label htmlFor="description" className="recipe-description recipe">Procedure</label>
                            <textarea placeholder="Procedure for your recipe" id="description" onChange={(e) => dispatch({ type: "updateProcedure", payload: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <button className="submit" onClick={handleSubmit}>Submit Recipe</button>
                    </div>
                </form>

            </div>
        </div>

    </div>
}
export default AddRecipesSection;