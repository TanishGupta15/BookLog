import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate
  // useNavigate
} from "react-router-dom";
import Home from "./HomeComponent";
import GenresPage from "./landingPage/GenresPage";
import Register from "./Login Pages/RegisterPage";
import Login from "./Login Pages/LoginPage";
import ForgotPassword from './Login Pages/ForgotPassword'

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
        </Routes>
      </Router>
    </div>
  );
}

export default MainComponent;
