// filepath: c:\Users\kokic\mern-stack-example\mern\server\routes\leaderboard.js
import express from "express";
import { getDb } from "../db/connection.js"; // Import the database connection
import redisClient from "../db/redis.js"; // Redis client

const router = express.Router();
const CACHE_TTL = 60; // Cache expiration time in seconds (1 minute)

// Helper function to retrieve cached data or execute the query if cache is missing
// 1. Checks Redis cache using a unique cache key
// 2. If data exists -> return cached results
// 3. If not -> execute query, cache result, then return
async function getCachedOrQuery(cacheKey, queryFunction) {
  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log(`Cache hit for ${cacheKey}`);
      return JSON.parse(cachedData);
    }

    // store result in Redis with expiration
    console.log(`Cache miss for ${cacheKey}`);
    const data = await queryFunction();

    await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("Cache error:", err);
    return await queryFunction(); // Fallback to direct query if cache fails
  }
}


// GET /leaderboard/daily - Fetch daily best users
router.get("/daily", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;  // limit the number of results, default to 10

  // Validate the limit parameter, make sure it's a positive number and not overally large
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return res.status(400).send("Invalid limit value");
  }

  try {
    const cacheKey = `leaderboard:daily:${limit}`;

    const data = await getCachedOrQuery(cacheKey, async () => {
      const db = getDb(); // Get the initialized database
      const collection = db.collection("Users");

      // Get todays starting timestamp (midnight)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Fetch top 10 users for today sorted by watts in descending order
      return await collection.aggregate([
        { $match: { lastUpdated: { $gte: today } } }, // Filter by today's date
        { $sort: { watts: -1 } }, // Sort users by watts output (highest first)
        { $limit: limit }, // Limit results dynamically
        { $project: { S_ID: 1, watts: 1, _id: 0 } } // Return only S_ID and watts
      ]).toArray();
    });

    res.status(200).send(data);

  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching daily leaderboard data: ${err.message}`);
  }
});


// GET /leaderboard/all-time - Fetch top 10 users
router.get("/all-time", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;  // limit the number of results, default to 10

  // Validate the limit parameter, make sure it's a positive number and not overally large
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return res.status(400).send("Invalid limit value");
  }

  try {
    const cacheKey = `leaderboard:all-time:${limit}`;

    const data = await getCachedOrQuery(cacheKey, async () => {
      const db = getDb(); // Get the initialized database
      const collection = db.collection("Users");

      // return top users sorted by watts in descending order, limited to the specified number
      return await collection.aggregate([
        { $sort: { watts: -1 } }, // Sort all users by total watts (descending)
        { $limit: limit }, // Limit total results 
        { $project: { S_ID: 1, watts: 1, _id: 0 } } // Return only S_ID and watts for the leaderboard display
      ]).toArray();
    });
      
    res.status(200).send(data); // Send the cached or queried data as response

  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching all-time leaderboard: ${err.message}`);
  }
});


// GET /leaderboard/weekly - Weekly trends (analytics route)
router.get("/weekly", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;  // limit the number of results, default to 10

  // Validate the limit parameter, make sure it's a positive number and not overally large
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return res.status(400).send("Invalid limit value");
  }

  try {
    const cacheKey = `leaderboard:weekly:${limit}`;

    const data = await getCachedOrQuery(cacheKey, async () => {
    const db = getDb(); // Get the initialized database
      const collection = db.collection("Users");

      return await collection.aggregate([
        // 1. Add a computed week field based on lastUpdated date
        { $addFields : {
          week: { 
            $dateToString: { 
              format: "%Y-%U", // Group by year and week
              date: "$lastUpdated"
            }
          }
        }},

        // 2. Group by user + week to calculate weekly totals 
        { $group: {
            _id: {
              user: "$S_ID",
              week: "$week"
            },
            totalWatts: { 
              $sum: { $toDouble: { $ifNull: ["$watts", 0] } }
            },
            count: { $sum: 1 }
        }},

        // 3. Regroup by user to build an array of weekly trends for each user
        { $group: {
          _id: "$_id.user",
          weeklyTrends: {
            $push: {
              week: "$_id.week",
              avgWatts: {
                $divide: ["$totalWatts", "$count"] // Calculate average watts per week
              }
            }
          }
        }},

        // 4. Calculate max average watts across all weeks for each user (used for ranking)
        { $addFields: {
          maxAvgWatts: {
            $max: "$weeklyTrends.avgWatts"
          }
        }},

        // 5. Sort users based on best weekly performance
        { $sort: {
          maxAvgWatts: -1 // Sort by max average watts (descending)
        }},

        // 6. Shape final output
        { $project: {
          S_ID: "$_id",
          weeklyTrends: 1, 
          _id: 0
        }},
        
        // 7. Limit results to the specified number of top users
        { $limit: limit }
        
      ]).toArray();
    });

    res.status(200).send(data);

  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching weekly trends: ${err.message}`);
  }
});

export default router;