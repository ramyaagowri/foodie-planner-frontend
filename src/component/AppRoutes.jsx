import LoginPage from "../pages/loginPage";
import NoMatchRoutes from "./NoMatchRoutes"
import { Route, Routes } from "react-router-dom";
import { UserDataContextWrapper } from "./context";
import Home from "./home";
import Profile from "./Profile";

function AppRoutes() {
  return (
    <>
      <UserDataContextWrapper>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />

          <Route path="/profile" element={<Profile />}>
            <Route path="posted-recipe" element={<></>} />
            <Route path="saved-recipe" element={<></>} />
            <Route path="meal-plans" element={<></>} />
          </Route>

          <Route path="*" element={<NoMatchRoutes />} />
        </Routes>
      </UserDataContextWrapper>
    </>
  )
}

export default AppRoutes;