import { useEffect, useReducer, useState } from "react";
import './style.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { updateUser } from "./helper";

const user = {
  email: "",
  password: "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "updateEmail":
      return { ...state, email: action.payload }
    case "updatePassword":
      return { ...state, password: action.payload }
    default: return state
  }
}

const Auth = () => {
  const navigate = useNavigate();

  // Reducer Logic

  let [state, dispach] = useReducer(reducer, user)

  const postlogin = (e, { email, password }) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/foodie-planner/Auth/signup", {
        emailId: email,
        password,
      })
      .then((response) => {
        console.log(response.data.token);
        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log("Auth Error :", error);
      });
  };

  useEffect(() => {
    console.log("State", state)
  }, [state])

  return (
    <>
      <div className="login-container">
        <form className="jwt" onSubmit={(e) => postlogin(e, state)}>
          <div>Sign Up</div>

          <input
            placeholder="Enter Email Address"
            value={state.email}
            onChange={(e) => dispach({ type: "updateEmail", payload: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={state.password}
            onChange={(e) => dispach({ type: "updatePassword", payload: e.target.value })}
          />

          {/* <input
            placeholder="Enter Email Address"
            value={user.email}
            onChange={(e) => updateUser(user, setUser, "email", e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={(e) =>
              updateUser(user, setUser, "password", e.target.value)
            }
          /> */}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
export default Auth;
