# GridFit
A full-stack MERN application that processes real-time hardware data and transforms it into interactive sustainability analytics and competitive engagement.

GridFit was developed as the software layer of a cross-disciplinary energy initiative. The computer science team designed and implemented the complete data pipeline, backend infrastructure, database architecture, and frontend dashboard.

## Project Overview
GridFit takes live voltage data from a hardware generator, processes it in real time using Python, stores structured results in MongoDB, and displays personalized analytics through a React web application. The system demonstrates full-stack development, real-time data processing, REST API design, and database-driven user dashboards.

## Software Architecture
### 1️⃣ Real-Time Data Processing (Python)
- Voltage data collected via DAQ
- Processed using PySerial
- Custom logic calculates:
  - Power generated
  - CO₂ saved
  - Generation rate
- Structured data sent to MongoDB

### 2️⃣ Backend API (Node.js + Express)
- RESTful endpoints for retrieving user metrics
- Middleware for request handling and routing
- Database queries for leaderboard ranking and historical stats

### 3️⃣ Database Layer (MongoDB)
- Stores user profiles and energy metrics
- Supports leaderboard sorting and impact tracking
- Designed for scalable document-based storage

### 4️⃣ Frontend Dashboard (React)
- Dynamic user interface
- Student ID-based metric lookup
- Real-time leaderboard rendering
- Responsive, component-based architecture

## Features
- Real-time data ingestion pipeline
- Backend REST API architecture
- MongoDB data modeling
- Personalized user dashboards
- Competitive leaderboard logic
- End-to-end data flow from hardware → database → UI

## Tech Stack
**Frontend:** React, JavaScript, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Data Processing:** Python

## License
Licensed under the Apache 2.0 License.
See the [LICENSE](LICENSE) file for full details.
