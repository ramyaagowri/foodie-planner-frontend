import axios from "axios";
import React, { useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css"
import NavBar from "../navBar";
import HomeSection from "../homeSection";
import HomeFooter from "../homeFooter";
import FooterImageSeries from "../footerImageSeries";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();




  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    console.log("Google code " + code)

    axios.post("http://localhost:4000/foodie-planner/Auth/googleOauth", { code })
      .then((response) => {
        console.log("dtaaaa", response.data)
        // console.log(response)
        localStorage.setItem("token", response.data.token)
        navigate("/home")

      })
      .catch(error => {
        console.log("Error", error)
      })

  }, []);

  return (
    <>
      <div className="HomePage">
        <NavBar />
        <HomeSection />
        <FooterImageSeries />
        <HomeFooter />
      </div>
      {/* <div className="Profile-btn"><button onClick={() => toProfilePage()}>Profile</button></div> */}
    </>
  );

}
export default Home;