import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null); 

useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  checkAuth(); 
  window.addEventListener("storage", checkAuth); 

  return () => window.removeEventListener("storage", checkAuth);
}, []);


  const handleUserClick = () => {
    console.log("Logged in?", isLoggedIn);
    if (isLoggedIn) {
      setShowProfile(!showProfile);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowProfile(false);
    navigate("/login");
  };

  return (
    <nav className="fixed z-10 flex justify-between items-center px-5 top-0 bg-zinc-700 w-full py-5">
      <div>
        <h1 className="text-4xl font-medium">
          <span className="text-yellow-500">Keep</span>Note
        </h1>
      </div>

      <div
        onClick={handleUserClick}
        className="bg-zinc-900 userDiv flex cursor-pointer justify-center items-center rounded-4xl w-[40px] h-[40px] text-center"
      >
        <i className="ri-user-fill text-2xl bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335] text-transparent bg-clip-text"></i>
      </div>


      {showProfile && (
        <div className="absolute border-s-[0.2px] border-yellow-500 top-0 w-2/6 h-screen right-0 p-10 bg-zinc-600 text-black shadow-lg">
          {/* Close button */}
          <div className="flex justify-between items-center mb-3">
            <h1 className="font-semibold text-5xl"> <span className="text-yellow-500">Keep</span>Notes</h1>
            <i
              onClick={() => setShowProfile(false)}
              className="ri-close-line text-4xl cursor-pointer hover:text-zinc-300"
            ></i>
          </div>

        
          <div className="mt-10 flex gap-5 flex-col whitespace-nowrap capitalize">
            <p className="text-2xl cursor-pointer hover:text-yellow-500">
              <i className="ri-lightbulb-line"></i> notes
            </p>
            <p className="text-2xl cursor-pointer hover:text-yellow-500">
              <i className="ri-notification-3-line"></i> reminders
            </p>
            <p className="text-2xl cursor-pointer hover:text-yellow-500">
              <i className="ri-delete-bin-6-line"></i> trash
            </p>
            <p className="text-2xl cursor-pointer hover:text-yellow-500">
              <i className="ri-settings-4-line"></i> settings
            </p>
          </div>

          <div className="absolute bottom-10 left-0 px-10 flex justify-between items-center w-full">
            {/* ✅ Show user info */}
          {user && (
            <div className="cursor-pointer">
              <i class="ri-user-fill text-2xl rounded-4xl bg-yellow-500 p-1"></i>
              <p className="text-xl mt-1 capitalize">{user.name}</p>
              <p className="text-sm">{user.email}</p>
            </div>
          )}

          <button onClick={handleLogout} className="bg-red-500 cursor-pointer text-white px-10 py-2 rounded hover:bg-red-600"> Logout </button>
          </div>

      

          
        </div>
      )}
    </nav>
  );
};

export default Header;
