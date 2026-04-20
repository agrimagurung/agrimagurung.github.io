<nav>
  <a href="https://agrimagurung.github.io/">Home</a> |
  <a href="/code-review/">Code Review</a> |
  <a href="/enhancement-one/">Software Design and Engineering</a> |
  <a href="/enhancement-two/">Algorithms and Data Structure</a> |
  <a href="/enhancement-three/" class="active">Databases</a>
</nav>

# Enhancement Three: Databases

## Artifact Overview

  The artifact selected for this enhancement is the **GridFit data pipeline and database system** 
  developed in CS 340. This is a full-stack data-driven system that collects fitness data from a 
  data acquisition (DAQ) device, processes it using Python, and stores it in a MongoDB database.

  The system tracks real-time metrics such as voltage, current, power output, and session duration. 
  At the end of each session, it generates summary statistics and stores them for analysis and leaderboard tracking.

  This artifact demonstrates end-to-end database integration, connecting hardware input, backend processing, 
  and database storage into a complete and functional data pipeline.


## Reason for Selection

  I selected this artifact because it demonstrates real-world database integration and full-stack data processing. 
  Unlike traditional database assignments, this project involves live data ingestion, transformation using Python, 
  and storage in MongoDB, making it a strong example of applied database engineering.

  To enhance this system, I improved both performance and security. I implemented MongoDB aggregation pipelines 
  to improve leaderboard and analytics queries, allowing the system to analyze trends more efficiently. I also added 
  Redis caching to reduce repeated database calls and improve response time for frequently accessed data.

  In addition, I improved system security by moving sensitive information, such as the MongoDB connection string, 
  into environment variables. This prevents hardcoded credentials and aligns the project with secure coding practices.


## Original Code

  View the original version of the project here:  
  <a href="LINK_TO_ORIGINAL_CODE" target="_blank">Original GridFit Database System Code</a>


## Enhanced Code

  View the enhanced version with caching and aggregation improvements here:  
  <a href="LINK_TO_ENHANCED_CODE" target="_blank">Enhanced GridFit Database System Code</a>


## Planned Enhancement: Aggregation and Caching System

  The enhancement focuses on improving database performance and scalability by introducing MongoDB aggregation pipelines 
  and Redis caching. This allows the system to efficiently compute leaderboard rankings and historical trends while 
  minimizing database load.

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

  Enhancing this artifact strengthened my understanding of database design and full-stack system integration. 
  By implementing MongoDB aggregation pipelines, I was able to significantly improve the efficiency of data analysis, 
  especially for leaderboard generation and trend calculations.

  Adding Redis caching helped reduce repeated database queries and improved overall system performance. This made 
  the application more scalable and responsive under repeated usage.

  This project also reinforced the complexity of working with real-time data pipelines. Since the system relies on 
  hardware-generated input, I had to carefully debug across multiple layers to ensure accurate data flow between 
  the device, backend processing, and database storage.

  One important lesson I learned was the importance of secure coding practices. I discovered that my original project 
  contained a hardcoded MongoDB connection string, which I replaced with environment variables to improve security.

  Overall, this enhancement improved both the performance and security of the system while strengthening my ability 
  to design and implement scalable, data-driven applications.
