import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../utils/axios";
import Navbar from "../../components/navbar/Navbar";

import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailError(false);
        break;
      case "password":
      case "cpassword":
        setPasswordError(false);
    }

    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputData.password !== inputData.cpassword) {
      setPasswordError(true);
      return;
    }

    axios
      .post("/auth/create", {
        fullname: inputData.fullname,
        email: inputData.email,
        password: inputData.password,
      })
      .then(({ data }) => {
        if (!data.success && data.errorField === "email") {
          setEmailError(true);
        } else {
          sessionStorage.setItem("auth-token--chatsoft", data.authToken);
          navigate("/");
        }
      });
  };

  return (
    <div className="signup">
      <Navbar />
      <div className="signup__container">
        <h2>Sign up to continue</h2>
        <form className="signup__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            required
            value={inputData.fullname}
            onChange={handleChange}
          />
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
              An account with this email already exists.
            </span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={8}
            required
            value={inputData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            required
            value={inputData.cpassword}
            onChange={handleChange}
          />
          {passwordError && (
            <span className="formAlert">Passwords must match.</span>
          )}
          <input type="submit" id="signup__submitBtn" value="Sign up" />
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
