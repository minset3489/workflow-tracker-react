
import { NavLink, useLocation } from "react-router-dom";

import DashboardIcon from "./../assets/dashboard_icon.svg";
import AddIcon from "./../assets/add_icon.svg";
import Avatar from "./Avatar";

import {useAuthContext} from '../hooks/useAuthContext'

const Sidebar = () => {
    // Get the current location using useLocation hook
    const location = useLocation();
    // Extract the pathname from the location object
    const { pathname } = location;

    const {user} = useAuthContext()

    return (
        <div className="w-72 min-w-72 bg-primary h-lvh box-border relative text-white">
            <div className="fixed w-72">
                <div className="font-bold text-center tracking-wide py-10 px-8 border-b border-solid border-gray-300 border-opacity-20">
                    {user?.photoURL && <Avatar src={user.photoURL} />}
                    <p>Hey {user?.displayName}</p>
                </div>
                <nav className="mt-20 ml-8">
                    <ul>
                        <li className="mt-3">
                            <NavLink
                                to="/"
                                className={`flex p-3 no-underline w-full text-white box-border ${pathname === '/' ? '!text-primary bg-bg rounded-l-lg' : ''}`}
                            >
                                <img className={`mr-3 filter-invert-100 ${pathname === '/' ? 'opacity-50' : ''}`} src={DashboardIcon} alt="dashboard icon" />
                                <span >Dashboard</span>
                            </NavLink>
                            <NavLink
                                to="/create"
                                className={`flex p-3 no-underline w-full text-white box-border ${pathname === '/project' ? ' !text-primary bg-bg rounded-l-lg' : ''}`}
                            >
                                <img className={`mr-3 filter-invert-100 ${pathname === '/project' ? ' opacity-50' : ''}`} src={AddIcon} alt="add project icon" />
                                <span >New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
 
export default Sidebar;
