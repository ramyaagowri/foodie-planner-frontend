import { useParams } from "react-router-dom";
import NavBar from "../../component/navBar";
import FooterImageSeries from "../../component/footerImageSeries";
import HomeFooter from "../../component/homeFooter";
import DetailsSection from "../../component/detailsSection";
import Slide from "../../component/slide";

const DetailedRecipes = () => {
    const { id } = useParams();
    return <>
        <NavBar />
        <DetailsSection id={id} />
        {/* <Slide /> */}
        <FooterImageSeries />
        <HomeFooter />
    </>
}
export default DetailedRecipes;