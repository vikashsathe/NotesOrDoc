// import { useState } from 'react'

// import { useNavigate } from 'react-router-dom'
// const Header = () => {
//   const navigate = useNavigate();

//      const OpenRegisterForm = () => {
//       navigate("/login"); 
// }
  
//   return (
//       <nav className='fixed z-10 flex justify-between items-center px-5 top-0 bg-zinc-700 w-full py-5'>
//         <div>
//           <h1 className='text-4xl font-medium'>KeepNote</h1>
//         </div>
//         <div onClick={OpenRegisterForm} className='bg-zinc-900 userDiv flex cursor-pointer justify-center items-center rounded-4xl w-[40px] h-[40px] text-center'>
//           <i class="ri-user-fill text-2xl text-zinc-100"></i>
//         </div>

//         <div>profile</div>
//       </nav>
//   )
// }

// export default Header




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // check login status
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleUserClick = () => {
    if (isLoggedIn) {
      setShowProfile(!showProfile); // toggle profile div
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // clear login state
    setIsLoggedIn(false);
    setShowProfile(false);
    navigate("/login");
  };

  return (
    <nav className="fixed z-10 flex justify-between items-center px-5 top-0 bg-zinc-700 w-full py-5">
      <div>
        <h1 className="text-4xl font-medium">KeepNote</h1>
      </div>

      <div
        onClick={handleUserClick}
        className="bg-zinc-900 userDiv flex cursor-pointer justify-center items-center rounded-4xl w-[40px] h-[40px] text-center"
      >
        <i className="ri-user-fill text-2xl bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335] text-transparent bg-clip-text"></i>
      </div>

      {showProfile && (
        <div className="absolute top-0 w-2/6 h-screen right-0 p-10 bg-zinc-600 text-black shadow-lg">
          {/* Close button */}
          <div className="flex justify-between items-center mb-3">
            <h1 className="font-normal text-5xl">KeepNotes</h1>
          
           

            <i onClick={() => setShowProfile(false)} class="ri-close-line text-4xl cursor-pointer hover:text-zinc-300"></i>
          </div>
            <div className="mt-10 flex gap-5 flex-col whitespace-nowrap">
           <p className="text-2xl  w-1/5 cursor-pointer hover:text-zinc-400"><i class="ri-lightbulb-line"></i> notes</p>
           <p className="text-2xl  w-1/5 cursor-pointer hover:text-zinc-400"><i class="ri-notification-3-line"></i> reminders</p>
           <p className="text-2xl  w-1/5 cursor-pointer hover:text-zinc-400"><i class="ri-delete-bin-6-line"></i> trash</p>
           <p className="text-2xl  w-1/5 cursor-pointer hover:text-zinc-400"><i class="ri-settings-4-line"></i> settings</p>
           </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 absolute cursor-pointer bottom-10 right-10 text-white w-50 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}      
    </nav>
  );
};

export default Header;
