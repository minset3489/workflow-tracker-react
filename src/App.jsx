

import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

// pages

import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import NotFound from './pages/NotFound';

// layouts
import RootLayout from './layouts/RootLayout '

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />

      <Route path="create" element={<Create />} />

      <Route path="login" element={<Login />} />

      <Route path="signup" element={<Signup />} />

      <Route path="project/:id" element={<Project />} />

      <Route path="*" element={<NotFound/>} />
    </Route>
  )
)


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
