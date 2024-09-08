import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/store";
import { useEffect } from "react";
import { getUserInfo } from "../lib/api/auth";

export default function Layout() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  useEffect(() => {
      getUserInfo().then((res) => {
          if (res) {
              setUser({
                  id: res.id,
                  nickname: res.nickname,
                  avatar: res.avatar,
              });
          } else {
              handleLogout();
          }
      });
  }, [])

  const handleLogout = () => {
      setUser(null);
      navigate("/login");
      localStorage.clear();
  }

  return (
      <>
          <nav>
              <div>
                  <Link to="/">HOME</Link>
                  <Link to="/profile">PROFILE</Link>
              </div>
              <div>
                  {user && (
                      <>
                          <img src={user.avatar} alt="User Avatar" />
                          <span>{user.nickname}</span>
                          <button onClick={handleLogout}>Logout</button>
                      </>
                  )}
              </div>
          </nav>
          <div>
              <Outlet />
          </div>
      </>
  );
}