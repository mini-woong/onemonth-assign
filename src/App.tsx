import Main from "./pages/Main";
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

function App() {

  return (
    <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<Main />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>

          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
        </Routes>
  )
}

export default App
