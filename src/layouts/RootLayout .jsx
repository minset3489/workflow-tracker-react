import { Outlet,  } from "react-router-dom";


export default function RootLayout() {



  return (
    <div className="grow px-14 py-0">
        <div></div>
      <main>
        <Outlet />
      </main>

    </div>
  )
}