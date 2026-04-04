import "./NavBar.css"
import { Link } from "react-router-dom";

const NavBar = ({children}) => {
    return (
        <> 
            <div className="container-navbar">
                <div className="links">
                    <p>
                        <Link to="/" className="text-navbar">Home</Link>
                    </p>
                    <p>
                        <Link to="/aboutme" className="text-navbar">About Me</Link>
                    </p>
                    <p>
                        <Link to="/projects" className="text-navbar">Projects</Link>
                    </p>
                    <p>
                        <Link to="/contactme" className="text-navbar">Contact Me</Link>
                    </p>
                </div>
            </div>
            {children}
        </>
    );
};

export default NavBar;