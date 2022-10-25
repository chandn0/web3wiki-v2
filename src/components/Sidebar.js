import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from "../logo.jpeg";

const Sidebar = () => {

  return (
    <>
      <div className="siderContent">
        <img className="logo" src={logo} alt="logo"></img>
        <div className="menu">
          <Link to="/" className="link" >
            <div className="menuItems">
              Home
            </div>
          </Link>
          <Link to="/myBlogs" className="link">
            <div className="menuItems">
              MyBlogs
            </div>
          </Link>
          <Link to="/newStory" className="link">
            <div className="menuItems">
              New
            </div>
          </Link>
          <Link to="/edited" className="link">
            <div className="menuItems">
              Edited
            </div>
          </Link>
          <Link to="/requests" className="link">
            <div className="menuItems">
              Requests
            </div>
          </Link>
        </div>
        <div className="logout" >
          <Link to="/about" className="link">
            <div className="menuItems">
              About
            </div>
          </Link>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
