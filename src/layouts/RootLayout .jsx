import { Outlet,  } from "react-router-dom";

// Component

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OnlineUsers from "../components/OnlineUsers";
import {useAuthContext} from '../hooks/useAuthContext'


export default function RootLayout() {
  const {user} = useAuthContext()


  return (
    <div className="flex">
        <Sidebar/>
        <div className="grow px-14 py-0">
            <Navbar/>
            
          <main>
              <Outlet />
          </main>
        
        </div>
        {user && <OnlineUsers/>}
    </div>
  )
}