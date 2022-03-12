import {
  Routes,
  BrowserRouter as Router,
  Route,
  // useNavigate
} from "react-router-dom";
import Home from "./HomeComponent";


function MainComponent() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default MainComponent