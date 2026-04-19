<nav>
  <a href="https://agrimagurung.github.io/">Home</a> |
  <a href="/code-review/">Code Review</a> |
  <a href="/enhancement-one/">Software Design and Engineering</a> |
  <a href="/enhancement-two/">Algorithms and Data Structure</a> |
  <a href="/enhancement-three/">Databases</a>
</nav>

# Enhancement One: Software Design & Engineering

## Artifact Overview

  The artifact I selected for this enhancement is the **Travlr Getaways** 
  full-stack web application originally developed in CS 465. The project uses the 
  MEAN stack (MongoDB, Express.js, Angular, Node.js) and allows users to log in, 
  view available trips, and manage travel data. 

  The application was developed throughout the course and demonstrates key 
  full-stack concepts such as RESTful API development, database integration, 
  and frontend component design. While the original version included user 
  authentication, it did not implement fine-grained access control or role-based authorization.


## Reason for Selection

  I selected this artifact because it demonstrates real‑world full‑stack development 
  and provides a strong foundation for improving software architecture, security, 
  and maintainability. Implementing Role‑Based Access Control (RBAC) adds meaningful 
  complexity and aligns with industry standards for secure application design.


## Original Code

  View the original version of the project here:  
  <a href="LINK_TO_ORIGINAL_CODE" target="_blank">Original Travlr Getaways Code</a>


## Enhanced Code

  View the enhanced version with RBAC implemented here:  
  <a href="LINK_TO_ENHANCED_CODE" target="_blank">Enhanced Travlr Getaways Code</a>


## Planned Enhancement: Role‑Based Access Control (RBAC)

  The enhancement introduces RBAC to ensure that only authorized users can perform 
  sensitive operations. Admin users can create, edit, and delete trips, while regular 
  users have read‑only access.


```
User logs in
      ↓
Authenticate user with Passport.js
      ↓
If valid user → Generate JWT token with role info
      ↓
Middleware intercepts API requests
      ↓
Check JWT token
      ↓
If Admin → Allow create/edit/delete trips
If User → Allow read-only access
      ↓
Return response
```

## Skills Demonstrated

  - Secure authentication and authorization workflows  
  - Implementation of role-based access control (RBAC)  
  - Modular server-side architecture using Express middleware  
  - JWT-based role validation  
  - Angular route guards and protected UI design  
  - Improved API design and maintainability  
  - Secure coding practices and vulnerability mitigation  


## Alignment to Course Outcomes

  **Outcome 3:** Designing and evaluating secure computing solutions by 
  implementing RBAC and enforcing architectural safeguards across both frontend 
  and backend systems.

  **Outcome 4:** Applying well-founded techniques such as JWT authentication, 
  Angular route guards, middleware design, and secure API patterns.

  **Outcome 5:** Demonstrating a security mindset by anticipating misuse, 
  validating user permissions, and protecting sensitive operations through 
  layered security mechanisms.



## Reflection

  Enhancing this artifact strengthened my understanding of secure software design 
  and full-stack development. Implementing RBAC required analyzing user roles and 
  determining appropriate access levels, while ensuring that permissions were 
  consistently enforced across both the frontend and backend.

  One challenge I encountered was configuring Angular routing, particularly with 
  lazy-loaded components and ensuring the “No Access” page displayed correctly. 
  Resolving this improved my understanding of Angular’s structure and routing system.

  On the backend, I faced issues with route matching and parameter handling that 
  initially caused errors when retrieving trip data. Fixing these required aligning 
  frontend requests with backend routes and refining controller logic.

  Additionally, parts of the original application broke during the enhancement 
  process, requiring updates to the database structure and form components. 
  Addressing these issues reinforced the importance of maintaining consistency 
  across the full application stack.

  Overall, this enhancement improved the security, maintainability, and scalability 
  of the application while strengthening my ability to design and implement 
  real-world, secure systems.

