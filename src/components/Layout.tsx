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
            <nav className="bg-gray-800 text-white py-2 px-4 fixed top-0 z-1000 w-full">
                <div className="w-[calc(100%-2rem)] max-w-[1240px] flex justify-between items-center mx-auto">
                    <div className="flex items-center">
                        <Link className="text-white mx-2 no-underline hover:underline" to="/">HOME</Link>
                        <Link className="text-white mx-2 no-underline hover:underline" to="/profile">PROFILE</Link>
                    </div>
                    <div className="flex items-center">
                        {user && (
                            <>
                                <img className="w-10 h-10 rounded-full mr-2" src={user.avatar} alt="User Avatar" />
                                <span className="text-white mr-5">{user.nickname}</span>
                                <button
                                    className="py-2 px-3 bg-gradient-to-r from-purple-700 to-purple-300 text-white rounded cursor-pointer hover:bg-red-600"
                                    onClick={handleLogout}
                                >Logout</button>
                            </>
                        )}
                    </div>
                </div>

            </nav>
            <div className="py-24 px-8 bg-black">
                <Outlet />
            </div>
        </>
    );
}