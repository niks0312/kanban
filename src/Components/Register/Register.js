import { useNavigate } from "react-router-dom";
import "./register.css";
import { register } from "../../Features/taskManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { validEmail, validPassword } from "../../FormValidator/formValidator";
import { useState } from "react";
export default function Register() {
  const registerUrl =
    "https://niks-dd24b-default-rtdb.asia-southeast1.firebasedatabase.app/users.json";

  const [error, setError] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.taskManagement);
  console.log("register", reduxData);

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = [];

    if (
      validEmail.test(e.target.email.value) &&
      validPassword.test(e.target.password.value)
    ) {
      let registeredUsers = [];
      let usersdata = localStorage.getItem("users");
      e.preventDefault();
      console.log(e.target.email.value);

      let user = {
        email: e.target.email.value,
        password: e.target.password.value,
        username: e.target.username.value,
      };
      fetch(registerUrl, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            alert("user registered succesfully");
          }
        })
        .catch((err) => console.log(err));

      if (JSON.parse(usersdata)?.length > 0) {
        const userCred = {
          email: e.target.email.value,
          password: e.target.password.value,
        };
        dispatch(register(userCred));
        registeredUsers = JSON.parse(usersdata);
        console.log(registeredUsers);
        registeredUsers.push(user);
        localStorage.setItem("users", JSON.stringify(registeredUsers));
        navigate("/login");
      } else {
        const userCred = {
          email: e.target.email.value,
          password: e.target.password.value,
        };

        dispatch(register(userCred));
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/login");
      }
    } else {
      if (
        !validEmail.test(e.target.email.value) ||
        !validPassword.test(e.target.password.value)
      ) {
        if (!validEmail.test(e.target.email.value)) {
          setError((prev) => {
            prev.email = true;
            return { ...prev };
          });
        }
        if (!validPassword.test(e.target.password.value)) {
          setError((prev) => {
            prev.password = true;
            return { ...prev };
          });
        }
      }
    }

    //   // fetch(registerUrl, {
    //   //   method: "post",
    //   //   body: JSON.stringify(user),
    //   //   headers: {
    //   //     contentType: "application/json",
    //   //   },
    //   })
    // //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err));
  };
  return (
    <div className="register">
      <span className="registerTitle" style={{ color: "white" }}>
        Register
      </span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          id="username"
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
        />
        <label>Email</label>
        <input
          id="email"
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
        />
        {error.email && <p className="error">Invalid email</p>}
        <label>Password</label>
        <input
          id="password"
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
        />
        {error.password && <p className="error">Invalid password</p>}
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
