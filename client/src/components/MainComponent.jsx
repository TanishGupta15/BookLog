import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
  // useNavigate
} from "react-router-dom";
import Home from "./HomeComponent.jsx";
import GenresPage from "./landingPage/GenresPage.jsx";
import BookPage from "./landingPage/BookPage.jsx";
import Register from "./Login Pages/RegisterPage.jsx";
import Login from "./Login Pages/LoginPage.jsx";
import ForgotPassword from "./Login Pages/ForgotPassword.jsx";
import OuathCallBack from "./Custom Components/OuathCallBack.jsx";

function MainComponent() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="genres/:genre" element={<GenresPage />} />
          <Route path="books/:bookId" element={<BookPage />} />
          <Route path="/user/oauthcallback" element={<OuathCallBack />} />
        </Routes>
      </Router>
    </div>
  );
}

export default MainComponent;
