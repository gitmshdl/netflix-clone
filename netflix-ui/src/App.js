import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import "bootstrap/dist/css/bootstrap.min.css";
import Player from "./pages/Player";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import MyList from "./pages/MyList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Netflix />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/mylist" element={<MyList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
