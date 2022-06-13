import {
  Routes,
  BrowserRouter as Router,
  Route,
  // useNavigate
} from "react-router-dom";
import Home from "./HomeComponent";
import GenresPage from "./GenresPage";
import Register from "./RegisterPage";
import Login from "./LoginPage";

function MainComponent() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/genres/:genre" element={<GenresPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default MainComponent;
