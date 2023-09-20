import { Route, Routes } from "react-router-dom";
import DetailedRecipes from "../pages/detailedRecipes";
import { UserDataContextWrapper } from "../component/context";
import Home from "../component/home";
import LoginPage from "../pages/loginPage";
import Profile from "../pages/profilePage"
import NoMatchRoutes from "../NoMatchRoutes";
import PostedRecipes from "../component/postedRecipes";
import SavedRecipes from "../component/savedRecipes";
import MealPlans from "../component/mealPlans";
import AddRecipes from "../pages/addRecipes";
import ProfileDetails from "../component/profileDetails";
import UserProfile from "../pages/userProfile";
import UserPostedProfile from "../component/UserPostedProfile";
import UserMealPlansProfile from "../component/UserMealPlansProfile";
function AppRoutes() {
    return (
        <>
            <UserDataContextWrapper>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />}>
                        <Route path="user-profile" element={<ProfileDetails />} />
                        <Route path="posted-recipe" element={<PostedRecipes />} />
                        <Route path="saved-recipe" element={<SavedRecipes />} />
                        <Route path="meal-plans" element={<MealPlans />} />
                    </Route>
                    <Route path="/add-recipes" element={<AddRecipes />} />
                    <Route path="/details/:id" element={<DetailedRecipes />} />
                    <Route path="/user-profile/:id" element={<UserProfile />}>
                        <Route path="user-posted-recipes" element={<UserPostedProfile />} />
                        <Route path="user-meal-plans" element={<UserMealPlansProfile />} />
                    </Route>
                    <Route path="*" element={<NoMatchRoutes />} />
                </Routes>
            </UserDataContextWrapper>
        </>
    )
}

export default AppRoutes;