import { Outlet } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OnlineUsers from "../components/OnlineUsers";


export default function RootLayout(user) {


  return (
    <div className="flex">
      <Sidebar />
      <div className="grow px-14 py-0">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      {user && <OnlineUsers />}
    </div>
  );
}
