import React, { useState } from "react";
import Kanban from "./kanban/Kanban";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  // const [user, setUser] = useState(false);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Kanban />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
