import { Route, Routes } from "react-router-dom";
import React from "react";
import { UserDataContextWrapper } from "../component/context";
import Home from "../component/home";
import LoginPage from "../pages/loginPage";
import Profile from "../pages/profilePage"
import NoMatchRoutes from "../NoMatchRoutes";
import PostedRecipes from "../component/postedRecipes";
import SavedRecipes from "../component/savedRecipes";
import MealPlans from "../component/mealPlans";
function AppRoutes() {
    return (
        <>
            <UserDataContextWrapper>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />}>
                        <Route path="posted-recipe" element={<PostedRecipes />} />
                        <Route path="saved-recipe" element={<SavedRecipes />} />
                        <Route path="meal-plans" element={<MealPlans />} />
                    </Route>

                    <Route path="*" element={<NoMatchRoutes />} />
                </Routes>
            </UserDataContextWrapper>
        </>
    )
}

export default AppRoutes;