import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li>
                    <Link to="/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/assets">
                        Assets
                    </Link>
                </li>
                <li>
                    <Link to="/employees">
                        Employees
                    </Link>
                </li>
                <li>
                    <Link to="/categories">
                        Categories
                    </Link>
                </li>
                <li>
                    <Link to="/brands">
                        Brands
                    </Link>
                </li>
                <li>
                    <Link to="/locations">
                        Locations
                    </Link>
                </li>
                <li>
                    <Link to="/statuses">
                        Statuses
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;