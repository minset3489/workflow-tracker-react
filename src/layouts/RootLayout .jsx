import { Outlet,  } from "react-router-dom";

// Component

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


export default function RootLayout() {



  return (
    <div className="flex">
        <Sidebar/>
        <div className="grow px-14 py-0">
            <Navbar/>
        <main>
            <Outlet />
        </main>

        </div>
    </div>
  )
}