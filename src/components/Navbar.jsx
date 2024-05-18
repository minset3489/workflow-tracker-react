import { NavLink } from 'react-router-dom';

import Temple from '../assets/temple.svg'

const Navbar = () => {


    return ( <>
        <div className=' w-full py-8 px-0 box-border mb-20'>
            <ul className=' flex m-auto items-center justify-end'>
                <li className=' font-bold text-heading tracking-wide flex items-center mr-auto'>
                    <img className=' mr-3 filter-invert-25 w-9 mt-[-8px]' src={Temple} alt="The Logo" />
                    <span>Workflow Tracker</span>
                </li>

                <li>
                    <NavLink className=" mr-5 no-underline text-gray-500" to="/login">Login</NavLink>                    
                </li>

                <li>
                    <NavLink className=" mr-5 no-underline text-gray-500" to="/signup">Signup</NavLink>
                </li>

                <li>
                    <button className='btn'>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </> );
}
 
export default Navbar;