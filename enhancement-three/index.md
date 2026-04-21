<nav>
  <a href="https://agrimagurung.github.io/">Home</a> |
  <a href="/code-review/">Code Review</a> |
  <a href="/enhancement-one/">Software Design and Engineering</a> |
  <a href="/enhancement-two/">Algorithms and Data Structure</a> |
  <a href="/enhancement-three/" class="active">Databases</a>
</nav>

# Enhancement Three: Databases

## Artifact Overview

The artifact selected for this enhancement is the **GridFit data pipeline and database system** developed in CS 340. This project is a full-stack, data-driven system that collects fitness-related metrics from a data acquisition (DAQ) device, processes the raw sensor input using Python, and stores structured results in a MongoDB database.

The system captures real-time performance data such as voltage, current, power output, and session duration during each user workout session. After each session completes, the backend computes summary statistics and persists them in the database for later retrieval and analysis.

Overall, this artifact demonstrates a complete end-to-end data pipeline that integrates hardware input, backend processing, and database storage into a unified system capable of supporting real-time analytics.



## Reason for Selection

I selected this artifact because it represents a strong example of real-world database engineering beyond basic CRUD operations. Unlike traditional coursework projects, this system processes live data streams from hardware, transforms the data using Python, and stores the results in MongoDB for analytical use.

To improve the system, I focused on both performance optimization and system security. On the performance side, I introduced MongoDB aggregation pipelines to shift computational workload from the application layer into the database. This allows ranking and analytics operations—such as leaderboard generation—to be executed more efficiently using database-native operations like `$group`, `$sort`, and `$limit`.

In addition, I implemented Redis caching in key leaderboard endpoints (`/daily`, `/weekly`, and `/all-time`). By storing frequently requested query results in memory using `setEx()` with a 60-second expiration time, the system significantly reduces redundant database queries and improves API response times under repeated access.

From a security perspective, I improved the system by refactoring the codebase to remove hardcoded sensitive credentials. Specifically, I migrated the MongoDB connection string into environment variables using a `.env` file. This prevents accidental exposure of credentials and aligns the project with secure software development best practices.


## Original Code

View the original version of the project here:  
<a href="https://github.com/agrimagurung/agrimagurung.github.io/tree/main/artifacts/original/gridfit/mern" target="_blank">Original GridFit Database System Code</a>


## Enhanced Code

View the enhanced version with caching and aggregation improvements here:  
<a href="https://github.com/agrimagurung/agrimagurung.github.io/tree/main/artifacts/enhanced/gridfit" target="_blank">Enhanced GridFit Database System Code</a>


## Planned Enhancement: Aggregation and Caching System

This enhancement focuses on improving database efficiency, scalability, and response time by introducing MongoDB aggregation pipelines and Redis caching into the leaderboard system.

The workflow of the optimized system is as follows:

```
User requests leaderboard (daily / weekly / all-time)
↓
Backend API receives request
↓
Check Redis cache for existing results
↓
If cache hit → return cached data
Else:
↓
Query MongoDB using aggregation pipeline:
- Filter by date range (if applicable)
- Group by user/session
- Calculate totals (power, energy, etc.)
- Sort by performance metrics
↓
Store result in Redis cache (temporary)
↓
Return processed data to frontend
↓
Frontend displays leaderboard and trend analytics
```


## Skills Demonstrated

  - MongoDB database design and data modeling  
  - Aggregation pipeline development for advanced queries  
  - Redis caching for performance optimization  
  - Full-stack data pipeline integration  
  - Backend API design and optimization  
  - Secure handling of environment variables  
  - Performance tuning for scalable systems  


## Alignment to Course Outcomes

  **Outcome 3:** Designing and evaluating computing solutions by improving database performance 
  through aggregation pipelines and optimized data retrieval strategies.

  **Outcome 4:** Applying modern database technologies and tools such as MongoDB aggregation 
  frameworks and Redis caching to improve system efficiency and scalability.

  **Outcome 5:** Developing a security mindset by securing sensitive information using environment 
  variables and reducing exposure of database credentials within the application.


## Reflection

Enhancing this artifact significantly deepened my understanding of how database design decisions impact system performance and scalability. By implementing MongoDB aggregation pipelines, I was able to shift complex computation from the application layer into the database itself, resulting in more efficient and structured data processing.

Adding Redis caching further improved system performance by reducing repeated database queries for frequently accessed leaderboard data. This made the system more responsive, especially under repeated or concurrent requests.

Working with this system also reinforced the complexity of building full-stack data pipelines that integrate hardware input with backend processing. Debugging data flow across multiple layers—device input, Python processing, API routes, and database storage—required careful attention to ensure consistency and correctness.

One important takeaway from this enhancement was the importance of secure coding practices. Discovering a hardcoded MongoDB connection string highlighted a real security risk, and migrating it into environment variables helped me understand how production systems manage sensitive configuration data.

Overall, this enhancement improved both the performance and security of the GridFit system while strengthening my ability to design scalable, data-driven applications.
