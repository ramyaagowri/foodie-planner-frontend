import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context";

const Home = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const toProfilePage = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    else {
      navigate("/profile")
    }

  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    // console.log("Google code " + code)

    axios.post("http://localhost:4000/foodie-planner/Auth/googleOauth", { code })
      .then((response) => {
        // console.log("dtaaaa", response.data)
        console.log(response)
        localStorage.setItem("token", response.data.token);
      })
      .catch(error => {
        console.log("Error", error)
      })
  }, []);

  return (
    <>
      <div><button onClick={() => toProfilePage()}>Profile</button></div>
    </>
  );

}
export default Home;