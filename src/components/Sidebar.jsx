
import { NavLink, useLocation } from "react-router-dom";

import DashboardIcon from "./../assets/dashboard_icon.svg";
import AddIcon from "./../assets/add_icon.svg";

const Sidebar = () => {
    // Get the current location using useLocation hook
    const location = useLocation();
    // Extract the pathname from the location object
    const { pathname } = location;

    return (
        <div className="w-[300px] min-w-[300px] bg-primary min-h-dvh box-border relative text-white">
            <div className="fixed w-auto">
                <div className="font-bold text-center tracking-wide py-10 px-8 border-b border-solid border-gray-300 border-opacity-20">
                    {/* avatar and username here later */}
                    <p>Hey user</p>
                </div>
                <nav className="mt-20 ml-5">
                    <ul>
                        <li className="mt-3">
                            <NavLink
                                to="/"
                                className={`flex p-3 no-underline w-full text-white box-border ${pathname === '/' ? 'text-gray-600 bg-bg rounded-tl-lg' : ''}`}
                            >
                                <img className={`mr-3 filter-invert-100 ${pathname === '/' ? 'opacity-60' : ''}`} src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink
                                to="/project"
                                className={`flex p-3 no-underline w-full text-white box-border ${pathname === '/project' ? 'text-gray-600 bg-bg rounded-tl-lg' : ''}`}
                            >
                                <img className={`mr-3 filter-invert-100 ${pathname === '/project' ? ' opacity-60' : ''}`} src={AddIcon} alt="add project icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
 
export default Sidebar;
