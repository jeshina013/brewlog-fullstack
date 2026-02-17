import { Routes, Route, NavLink } from "react-router-dom";
import Manage1 from "./pages/Manage1";
import Addposts from "./pages/Addposts";
import HomeTemp from "./pages/HomeTemp";

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="brand">BrewLog</div>
        <div className="nav-links">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/add">Add Post</NavLink>
          <NavLink to="/manage">Manage</NavLink>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<HomeTemp />} />
        <Route path="/add" element={<Addposts />} />
        <Route path="/manage" element={<Manage1 />} />
      </Routes>
    </div>
  );
}
export default App;
