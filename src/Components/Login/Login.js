import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Features/taskManagementSlice";
import "./login.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.taskManagement);
  const loginUrl = "https://reqres.in/api/login";
  const dispatch = useDispatch();
  console.log("Redux Login", userData.token);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    let usersdata = localStorage.getItem("users");
    let registeredUsers = JSON.parse(usersdata);

    let user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const data = JSON.stringify({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    const methods = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      e.target.email.value !== undefined &&
      e.target.password.value !== undefined
    ) {
      fetch(loginUrl, methods)
        .then((res) => res.json())
        .then((data) => {
          console.log("Token", data);
          if (data.token !== undefined) {
            dispatch(login(data.token));
            // userData.token = data.token;
          }
        })
        .catch((err) => console.log(err));

      const isValidUser = registeredUsers.filter(
        (user) => user.email === e.target.email.value
      );

      isValidUser.length > 0 &&
        localStorage.setItem("user", JSON.stringify(isValidUser[0].email));
      if (e.target.email.value === userData.token.email) {
        navigate("/");
      }
    }
  };
  return (
    <div className="login">
      <span className="loginTitle" style={{ color: "white" }}>
        Login
      </span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          id="email"
          type="text"
          required={true}
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="loginInput"
          id="password"
          type="password"
          placeholder="Enter your password..."
        />
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
    </div>
  );
}
