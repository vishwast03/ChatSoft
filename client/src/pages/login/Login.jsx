import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { SocketContext } from "../../contexts/socket";
import { UserContext } from "../../contexts/UserContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUsername } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername(name);
    socket.emit("newUser", { username: name, socketID: socket.id });
    navigate("/");
  };

  return (
    <div className="login">
      <Navbar />
      <div className="login__container">
        <h2>Enter username to continue</h2>
        <form className="login__form" onSubmit={handleSubmit}>
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

          <input type="submit" value="Submit" id="login__submitBtn" />
        </form>
      </div>
    </div>
  );
};

export default Login;
