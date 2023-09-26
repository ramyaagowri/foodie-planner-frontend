import FollowingRecipes from "../../component/followingRecipes";
import HomeFooter from "../../component/homeFooter";
import NavBar from "../../component/navBar";
import "./style.css"
const FollowingPage = () => {
    return <>
        <NavBar />
        <div className="content">
            <div className="recipes">Following</div>
        </div>
        <FollowingRecipes />
        <HomeFooter />
    </>
}
export default FollowingPage;
