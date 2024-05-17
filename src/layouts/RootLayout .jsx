import { Outlet,  } from "react-router-dom";

// Component

import Navbar from "../components/Navbar";


export default function RootLayout() {



  return (
    <div className="grow px-14 py-0">
        <Navbar/>
      <main>
        <Outlet />
      </main>

    </div>
  )
}