import {
  Routes,
  BrowserRouter as Router,
  Route,
  // useNavigate
} from "react-router-dom";
import Home from "./HomeComponent";
import GenresPage from "./GenresPage";


function MainComponent() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres/:genre" element={<GenresPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default MainComponent