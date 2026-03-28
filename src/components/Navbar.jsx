import "./NavBar.css"
import { Link } from "react-router";

const NavBar = ({children}) => {
    return (
        <> 
            <div className="container-navbar">
                <div className="links">
                    <p>
                        <Link to="/home">Home</Link>
                    </p>
                    <p>
                        <Link to="/aboutme">About Me</Link>
                    </p>
                    <p>
                        <Link to="/projects">Projects</Link>
                    </p>
                    <p>
                        <Link to="/contactme">Contact Me</Link>
                    </p>
                </div>
            </div>
            {children}
        </>
    );
};

export default NavBar;