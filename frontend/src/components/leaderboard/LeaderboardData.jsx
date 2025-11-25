import { useEffect, useState } from "react";
import axios from "axios";

export default function LeaderboardData({ idToken, isPremiumUser, id }) {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/leaderboard",
          {
            headers: { Authorization: idToken },
          }
        );

        setLeaderboardData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    isPremiumUser && fetchLeaderboard();
  }, [idToken, isPremiumUser]);
  return (
    <div className="p-4 py-6 sm:p-6 text-gray-600">
      {leaderboardData.length === 0 ? (
        <p className="">No data available.</p>
      ) : (
        <ul>
          {leaderboardData.map((user, index) => {
            return (
              <li
                key={user.id}
                className="flex justify-between py-2 border-b last:border-0"
              >
                <span className={user.id === id ? "font-semibold" : ""}>
                  {index + 1}. {user.firstName} {user.lastName}{" "}
                  {user.id === id && "(You)"}
                </span>
                <span className="font-semibold">
                  ₹ {user.totalExpenses || 0}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
