<nav>
  <a href="https://agrimagurung.github.io/">Home</a> |
  <a href="/code-review/">Code Review</a> |
  <a href="/enhancement-one/">Software Design and Engineering</a> |
  <a href="/enhancement-two/" class="active">Algorithms and Data Structure</a> |
  <a href="/enhancement-three/">Databases</a>
</nav>

# Enhancement Two: Algorithms and Data Structure

## Artifact Overview

  The artifact selected for this enhancement is the **Advising Course Planner** 
  program developed during CS 300: Data Structures and Algorithms. This program 
  allows users to load course data from a CSV file and organizes it using data 
  structures such as binary search trees, vectors, and hash tables. Users can 
  search for courses, display course details, and view prerequisite information.

  The original implementation focused on basic data organization and retrieval 
  but did not include advanced self-balancing structures or extensive validation.


## Reason for Selection

  I selected this artifact because it demonstrates my understanding of core 
  algorithms and data structures while also providing an opportunity to implement 
  more advanced concepts. The original program functioned correctly, but it could 
  be improved in terms of efficiency, scalability, and clarity.

  To enhance the application, I implemented an AVL tree to ensure the binary 
  search tree remains balanced after each insertion. This required developing 
  recursive insertion logic, implementing tree rotations, and maintaining height 
  balance throughout the structure. 

  Additionally, I utilized vectors and maps to manage course data and prerequisite 
  relationships, demonstrating my ability to integrate multiple data structures 
  within a single application. I also improved the codebase by adding detailed 
  comments, strengthening error handling, and validating input data to make the 
  program more robust and maintainable.


## Original Code

  View the original version of the project here:  
  <a href="https://github.com/agrimagurung/agrimagurung.github.io/tree/main/artifacts/original/course-advising/AdvisingAssistanceProgram" target="_blank">Original Advising Course Planner Code</a>


## Enhanced Code

  View the enhanced version with AVL tree implementation here:  
  <a href="https://github.com/agrimagurung/agrimagurung.github.io/tree/main/artifacts/enhanced/course-advising/AdvisingAssistanceProgram" target="_blank">Enhanced Advising Course Planner Code</a>


## Planned Enhancement: AVL Tree Implementation

  The enhancement introduces a self-balancing AVL tree to improve search and 
  insertion efficiency. By maintaining balance within the tree, the program ensures 
  optimal time complexity for operations, even as the dataset grows.

  This enhancement also includes improved data validation and error handling to 
  manage edge cases such as duplicate course entries and missing prerequisites.

```
Load CSV data
↓
Parse course information
↓
Insert courses into AVL tree
↓
Balance tree using rotations
↓
User selects operation:
→ Search course
→ Display all courses
→ View prerequisites
↓
Return results to user
```


## Skills Demonstrated

  - Implementation of AVL trees and self-balancing binary search trees  
  - Recursive algorithms for insertion and search  
  - Tree rotations and height balancing techniques  
  - Integration of multiple data structures (vectors, maps, trees)  
  - Algorithm optimization and efficiency improvements  
  - Error handling and input validation  
  - Writing clear, maintainable, and well-documented code  


## Alignment to Course Outcomes

  **Outcome 3:** Designing and evaluating computing solutions using advanced 
  data structures, demonstrated through the implementation of an AVL tree and 
  recursive algorithms.

  **Outcome 4:** Applying well-founded techniques to optimize performance, 
  including efficient insertion, search, and balancing operations to ensure 
  scalability.


## Reflection

  Enhancing this artifact deepened my understanding of algorithms and data 
  structures, particularly in implementing self-balancing trees. While the 
  original project introduced binary search trees, this enhancement required 
  me to extend that knowledge by incorporating AVL tree logic and maintaining 
  balance through rotations.

  One of the main challenges I faced was handling edge cases such as duplicate 
  course entries and missing prerequisite data while ensuring the tree remained 
  balanced after each insertion. Solving these issues strengthened my debugging 
  skills and improved my ability to think through complex algorithmic problems.

  I also gained experience integrating multiple data structures to manage 
  relationships between courses and their prerequisites. Additionally, improving 
  code documentation and structure made the program easier to understand and 
  maintain.

  Overall, this enhancement strengthened my ability to design efficient, scalable 
  solutions and increased my confidence in working with complex data structures 
  and algorithms.
