import "./App.css";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import UserSuccess from "./components/UserSuccess";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/usersuccess" element={<UserSuccess />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
