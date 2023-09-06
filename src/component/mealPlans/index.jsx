import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css"
const MealPlans = () => {
    const [plan, setPlan] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios
                .get("http://localhost:4000/foodie-planner/MealPlans/getMealPlan", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response.data)
                    setPlan(response.data);
                    // setRecipe(response.data.postedRecipies)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);
    return <>
        <div className="card-container">
            {plan.map((meal) => {
                { console.log(meal) }
                return (<div className="card-wrap" key={meal.id}>
                    <div>
                        <div className="description"><strong>Day :  </strong>{meal.day}</div>
                        <div className="recipe-name"><strong>Name of the Recipe :  </strong>{meal.mealPlan}</div>
                    </div>
                </div>)
            })}

        </div></>
}
export default MealPlans;