import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const Navbar = () => {
    // const [loggedUserData, setLoggedUserData] = useState('');
    const { loggedUserData, setLoggedUserData } = useUser();
    const [showmenu, setShowMenu] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setShowMenu(false);
        } else {
            setShowMenu(true);
            let userData = sessionStorage.getItem('ticketUserData');
            if (userData !== null) {
                setLoggedUserData(JSON.parse(userData));
            }
        }

    }, [location])
    const clearUser = () => {
        sessionStorage.removeItem('ticketUserData');
        usenavigate('/login')
    }
    return (
        <>
            {showmenu && loggedUserData.role == "admin" &&
                <nav className="bg-gray-800 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div>
                                <Link to="/" className="text-white text-2xl font-bold">Logo</Link>
                                <Link to="/ticket" className="text-white hover:bg-gray-500 px-3 py-2 rounded-md  font-bold text-2xl">Ticket List</Link>

                            </div>
                            <div className="flex items-center justify-evenly h-16">
                                <p className="text-white text-2xl ">welcome <span className='font-bold text-red-500 '>{loggedUserData.userName}</span></p>
                                <Link to="/login" onClick={clearUser} className="text-white bg-green-700 hover:bg-green-500 px-3 py-2 rounded-md text-2xl font-bold ms-40">Logout</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            }

            {showmenu && loggedUserData.role == "user" &&
                <nav className="bg-sky-700 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div>
                                <Link to="/" className="text-white text-2xl font-bold">Logo</Link>
                                <Link to="/ticket" className="text-white hover:bg-sky-500 px-3 py-2 rounded-md  font-bold text-2xl">Ticket List</Link>

                            </div>
                            <div className="flex items-center justify-evenly h-16">
                                <p className="text-white text-2xl ">welcome <span className='font-bold text-red-500 '>{loggedUserData.userName}</span></p>
                                <Link to="/login" onClick={clearUser} className="text-white bg-green-700 hover:bg-green-500 px-3 py-2 rounded-md text-2xl font-bold ms-40">Logout</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            }

            {showmenu && loggedUserData.role == "techSupport" &&
                <nav className="bg-yellow-400 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div>
                                <Link to="/" className="text-white text-2xl font-bold">Logo</Link>
                                <Link to="/ticket" className="text-white hover:bg-yellow-700 px-3 py-2 rounded-md  font-bold text-2xl">Ticket List</Link>

                            </div>
                            <div className="flex items-center justify-evenly h-16">
                                <p className="text-white text-2xl ">welcome <span className='font-bold text-red-500 '>{loggedUserData.userName}</span></p>
                                <Link to="/login" onClick={clearUser} className="text-white bg-green-700 hover:bg-green-500 px-3 py-2 rounded-md text-2xl font-bold ms-40">Logout</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            }
        </>

    );
};

export default Navbar;