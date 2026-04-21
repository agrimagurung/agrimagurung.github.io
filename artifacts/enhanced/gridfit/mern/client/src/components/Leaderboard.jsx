import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Leaderboard() {
  // State to control how many leaderboard entries are displayed (default = 10)
  const [limit, setLimit] = useState(10);

  // Extract the user ID from the URL
  const { id } = useParams(); 

  // State variables to hold the leaderboard data from backend for daily, all-time, and weekly trends:
  const [dailyLeaderboard, setDailyLeaderboard] = useState([]);
  const [allTimeLeaderboard, setAllTimeLeaderboard] = useState([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]); 

  // State to track loading status while data is being fetched
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchLeaderboards() {
      try {
        setLoading(true); // Set to true to indicate data is being fetched

        // Fetch daily leaderboard with dynamic limit
        const dailyResponse = await fetch(`http://localhost:5050/leaderboard/daily?limit=${limit}`); // Fetch daily leaderboard data with the specified limit
        if (!dailyResponse.ok) throw new Error("Failed to fetch daily leaderboard"); // Check if the response is successful, if not throw an error
        const dailyData = await dailyResponse.json(); // Parse the response data as JSON
        setDailyLeaderboard(dailyData); // Update the state with the fetched daily leaderboard data

        // Fetch all-time Leaderboard data with dynamic limit
        const allTimeResponse = await fetch(`http://localhost:5050/leaderboard/all-time?limit=${limit}`);
        if (!allTimeResponse.ok) throw new Error("Failed to fetch all-time leaderboard");
        const allTimeData = await allTimeResponse.json();
        setAllTimeLeaderboard(allTimeData);

        // Fetch weekly aggregated trends (used for analytics) with dynamic limit
        const weeklyResponse = await fetch(`http://localhost:5050/leaderboard/weekly?limit=${limit}`);
        if (!weeklyResponse.ok) throw new Error("Failed to fetch weekly leaderboard");
        const weeklyData = await weeklyResponse.json();
        setWeeklyLeaderboard(weeklyData);

      } catch (error) { // Handle errors
        console.error("Error fetching leaderboards:", error);
      } finally {
        setLoading(false); // Stop loading after all requests complete
      }
    }

    fetchLeaderboards();
  }, [limit]); // Re-run the effect whenever the limit changes to fetch updated leaderboard data

    // Display loading message while data is being fetched
    if (loading) {
      return (
        <div className="text-white text-center mt-20 text-2xl">
          Loading leaderboard...
        </div>
      );
    }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(/src/assets/background.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="bg-[#333333] bg-opacity-30 p-10 w-[80%] rounded-2xl shadow-lg text-center"
        style={{
          marginTop: "50px",
          maxWidth: "800px",
        }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">Leaderboard</h1>
        <p className="text-lg text-gray-300 mb-6">
          See how you rank among other users based on energy usage!
        </p>
        
        {/* User can select how many top entries to display in the leaderboard (5, 10, or 20 entries) */}
        <div className="mb-6"> 
          <label className="text-white mr-2">Show top:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))} // Update the limit state when the user selects a different option
            className="p-2 rounded bg-gray-700 text-white" // Dropdown to select the number of leaderboard entries to display
          >
            {/* Options for the number of entries to display in the leaderboard */}
            <option value={5}>5</option> 
            <option value={10}>10</option> 
            <option value={20}>20</option>
          </select>
        </div>


        {/* Daily Leaderboard UI code */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Daily Best Users</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-gray-300">
              <thead>
                <tr className="bg-[#444444]">
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Student ID</th>
                  <th className="px-4 py-2">Watts</th>
                </tr>
              </thead>
              <tbody>
                {dailyLeaderboard.map((user, index) => (
                  <tr
                    key={user.S_ID}
                    className={`${
                      user.S_ID === id
                        ? "bg-green-500 text-white" // Highlight the user's row
                        : index % 2 === 0
                        ? "bg-[#555555]"
                        : "bg-[#444444]"
                    }`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.S_ID}</td>
                    <td className="px-4 py-2">{user.watts} Watts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All-Time Leaderboard UI code */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">All-Time Top Users</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-gray-300">
              <thead>
                <tr className="bg-[#444444]">
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Student ID</th>
                  <th className="px-4 py-2">Watts</th>
                </tr>
              </thead>
              <tbody>
                {allTimeLeaderboard.map((user, index) => (
                  <tr
                    key={user.S_ID}
                    className={`${
                      user.S_ID === id
                        ? "bg-green-500 text-white" // Highlight the user's row
                        : index % 2 === 0
                        ? "bg-[#555555]"
                        : "bg-[#444444]"
                    }`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.S_ID}</td>
                    <td className="px-4 py-2">{user.watts} Watts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Trends UI code */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Weekly Trends</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-gray-300">
              <thead>
                <tr className="bg-[#444444]">
                  <th className="px-4 py-2">Student ID</th>
                  <th className="px-4 py-2">Weeks Recorded</th>
                </tr>
              </thead>
              <tbody>
                {weeklyLeaderboard.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-4">
                      No weekly data available
                    </td>
                  </tr>
                )}
                {weeklyLeaderboard.map((user) => (
                  <tr key={user.S_ID} className="bg-[#555555]">
                    <td className="px-4 py-2">{user.S_ID}</td>
                    <td className="px-4 py-2">
                      {user.weeklyTrends.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}