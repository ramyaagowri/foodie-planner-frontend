import React, { useEffect, useState } from "react";
import "./loginpage.css";
import axios from "axios";
import Auth from "../../component/auth";

const LoginPage = () => {
  const [googleUrl, setGoogleUrl] = useState("")

  useEffect(() => {
    axios.post("http://localhost:4000/foodie-planner/Auth/googleUrl",
      { auth: true }
    )
      .then((res) => {
        // console.log("zzzz", res.data)
        setGoogleUrl(res.data);
      });
  }, [])

  return (
    <div className="loginPage">
      <div>
        <Auth />
      </div>

      {googleUrl && (
        <div className="googleauth">
          <div style={{ margin: "15px 0" }} >or</div>
          <a href={googleUrl}>Sign In With Google</a>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
