import { useState, useContext } from "react";

import UserProfile from "./UserProfile";
import { UserIcon } from "../../assets/Icons";
import { AuthContext } from "../../contexts/AuthContext";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const authCtx = useContext(AuthContext);

  const profileRef = useClickOutside(() => setShowProfile(false));

  return (
    <header className="p-4 flex justify-between items-center fixed top-0 left-0 w-full border-b-2 bg-white z-10">
      <h1 className="text-xl font-bold sm:text-2xl">Expense Tracker</h1>
      {authCtx.loggedIn && (
        <>
          <button
            className="border border-gray-400 rounded-full hover:text-indigo-600 hover:border-indigo-600 transition-colors"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            <UserIcon />
          </button>

          {showProfile && (
            <div
              className="bg-white rounded-md shadow-md p-4 flex flex-col gap-4 items-center fixed top-[66px] right-4"
              ref={profileRef}
            >
              <UserProfile setShowProfile={setShowProfile} />
            </div>
          )}
        </>
      )}
    </header>
  );
}
