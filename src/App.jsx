

import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  Navigate,
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

import { useAuthContext } from './hooks/useAuthContext'


function App() {
  const { user, authIsReady } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="create" element={ user ? <Create /> : <Navigate to="/login"/> } />
        <Route path="project" element={ user ? <Project /> : <Navigate to="/login"/> } />
        <Route path="login" element={ !user ? <Login /> : <Navigate to="/"/> } />
        <Route path="signup" element={ !user ? <Signup /> : <Navigate to="/"/> } />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      {authIsReady && <RouterProvider router={router} />}
    </>
  );
}

export default App;
