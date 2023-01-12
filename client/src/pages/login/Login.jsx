import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { UserContext } from "../../contexts/UserContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUsername } = useContext(UserContext);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername(name);
    navigate("/");
  };

  return (
    <div className="login">
      <Navbar />
      <div className="login_container">
        <h2>Enter username to continue</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="usernameInput"
            placeholder="Username"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input type="submit" value="Submit" id="login_submitBtn" />
        </form>
      </div>
    </div>
  );
};

export default Login;
