import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./components/Game/Game";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/play" element={<Game />} />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
