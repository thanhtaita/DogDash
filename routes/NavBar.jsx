import { Outlet, Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <nav className="sidenav">
        <span className="title">DogDash</span>
        <span className="sidenav-element">Dashboard</span>
        <Link className="sidenav-element">Search</Link>
        <span className="sidenav-element">About</span>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
