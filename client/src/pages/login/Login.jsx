import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "../../utils/axios";
import Navbar from "../../components/navbar/Navbar";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailError(false);
        break;
      case "password":
        setPasswordError(false);
    }

    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", {
        email: inputData.email,
        password: inputData.password,
      })
      .then(({ data }) => {
        if (!data.success) {
          if (data.errorField === "email") {
            setEmailError(true);
          }
          if (data.errorField === "password") {
            setPasswordError(true);
          }
        } else {
          sessionStorage.setItem("auth-token--chatsoft", data.authToken);
          navigate("/");
        }
      });
  };

  return (
    <div className="login">
      <Navbar />
      <div className="login__container">
        <h2>Enter username to continue</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={inputData.email}
            onChange={handleChange}
          />
          {emailError && (
            <span className="formAlert">
              No account with this email exists.
            </span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={inputData.password}
            onChange={handleChange}
          />
          {passwordError && (
            <span className="formAlert">Incorrect password!</span>
          )}
          <input type="submit" value="Log in" id="login__submitBtn" />
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
