import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import LeaderboardData from "./LeaderBoardData";

export default function Leaderboard() {
  const { loggedUser } = useContext(AuthContext);

  return (
    <div className="w-full space-y-2 sm:max-w-md">
      <h3 className="text-gray-500 mt-4 px-4 sm:px-0 font-bold text-xl">
        Leaderboard
      </h3>
      <div className="bg-white shadow min-h-[370px] max-h-[370px] overflow-auto sm:rounded-lg">
        {!loggedUser.isPremiumUser ? (
          <div className="bg-gray-200 text-gray-600 text-2xl h-[370px] flex flex-col gap-4 items-center justify-center">
            <span className="text-5xl animate-bounce">🔒</span>
            Buy premium to unlock 🔓
          </div>
        ) : (
          <LeaderboardData
            id={loggedUser.id}
            idToken={loggedUser.idToken}
            isPremiumUser={loggedUser.isPremiumUser}
          />
        )}
      </div>
    </div>
  );
}
