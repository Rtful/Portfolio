import { NavLink } from 'react-router-dom';
import './Navbar.css'; // optional: for cleaner separation of styles

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''}>
                        Gallery
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
                        Projects
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about-me" className={({ isActive }) => isActive ? 'active' : ''}>
                        About Me
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/3d" className={({ isActive }) => isActive ? 'active' : ''}>
                        3D
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
