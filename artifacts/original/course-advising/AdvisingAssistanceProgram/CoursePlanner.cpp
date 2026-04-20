//============================================================================
// Name        : CoursePlanner.cpp
// Author      : Agrima Gurung
// Version     : 1.0
// Copyright   : Copyright 2025 Agrima Gurung
// Description : Advising system using a Binary Search Tree
//============================================================================
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <map>
#include <cctype>

using namespace std;

// helper function to convert a string to upercase for comparisions (to make case insensitive)
string ToUpper(const string& str) {
    string result = str;
    for (char& ch : result) {
        ch = toupper(ch);
    }
    return result;
}

// helper function to trim leading + trailing whitespace from a string
string Trim(const string& s) {
    size_t start = s.find_first_not_of(" \t\n\r");
    size_t end = s.find_last_not_of(" \t\n\r");
    if (start == string::npos) return ""; // string is all whitespace
    return s.substr(start, end - start + 1);
}

// struct: represents a single course w/ a course number, title, and prerequisites
struct Course {
    string courseNumber; // ex: "CSCI100"
    string courseTitle; // ex: "Introduction to Computer Science"
    vector<string> prerequisites; // stores prereqs
};

// struct: node of the binary search tree containing course data
struct Node {
    Course data;
    Node* left;
    Node* right;
    Node() : left(nullptr), right(nullptr) {}
    Node(Course aCourse) : data(aCourse), left(nullptr), right(nullptr) {}
};

// class: binary search tree to store courses sorted via course number
class BinarySearchTree {
private:
    Node* root; // tree root

    // the following are recursive helpers to:
    void addNode(Node* node, Course course); // insert a course into BST
    void inOrder(Node* node); // in order traversal (sort alphabetized)
    Node* searchNode(Node* node, const string& courseNumber);  // search for course node via course number
    void destroyTree(Node* node); // delete all nodes (destuctor)

public:
    BinarySearchTree();
    virtual ~BinarySearchTree();

    bool IsEmpty() const; // check if BST is empty
    void Insert(Course course); // insert a course into BST
    void PrintAllCourses(); // printt all courses in sorted order
    Course Search(string courseNumber);   // searchs and returns Course, empty if not found
    void PrintCourse(string courseNumber); // print course info and prerequisites
};

// BST Constructor: initalizes root to nullptr
BinarySearchTree::BinarySearchTree() {
    root = nullptr;
}

// BST Destructor: calls recursive node deletion
BinarySearchTree::~BinarySearchTree() {
    destroyTree(root);
}

// Recursively deletes ALL nodes to free up memory
void BinarySearchTree::destroyTree(Node* node) {
    if (node != nullptr) {
        destroyTree(node->left);
        destroyTree(node->right);
        delete node;
    }
}

// check if the BST is empty (no root node)
bool BinarySearchTree::IsEmpty() const {
    return root == nullptr;
}

// recursive helper function to insert node into tree based on Course name
void BinarySearchTree::addNode(Node* node, Course course) {
    if (course.courseNumber < node->data.courseNumber) {
        // insert into left subtree if left child is nullptr, else recurse left
        if (node->left == nullptr)
            node->left = new Node(course);
        else
            addNode(node->left, course);
    }
    else {
        // insert into right subtree if right subtree is nullptr, else recurse right
        if (node->right == nullptr)
            node->right = new Node(course);
        else
            addNode(node->right, course);
    }
}

// public insert method: handles empty tree case
void BinarySearchTree::Insert(Course course) {
    if (root == nullptr)
        root = new Node(course);
    else
        addNode(root, course);
}

// recusive ordered traversal, prints courses sorted via course number
void BinarySearchTree::inOrder(Node* node) {
    if (node == nullptr) return;

    inOrder(node->left); // traverse left subtreee first

    // print course number + title
    cout << node->data.courseNumber << ", " << node->data.courseTitle << endl;

    // print prerequisites, if empty; empty = none
    if (node->data.prerequisites.empty()) {
        cout << "Prerequisites: None" << endl;
    }
    else {
        cout << "Prerequisites: ";
        for (size_t i = 0; i < node->data.prerequisites.size(); ++i) {
            cout << node->data.prerequisites[i];
            if (i < node->data.prerequisites.size() - 1) cout << ", ";
        }
        cout << endl;
    }

    inOrder(node->right); // traverse right subtree last
}

// print all courses, or message if no data loaded:(
void BinarySearchTree::PrintAllCourses() {
    if (!root) {
        cout << "No data loaded yet." << endl;
        return;
    }
    inOrder(root);
}

// recursive helper to find Node* matching course number, or nullptr if not found :(
Node* BinarySearchTree::searchNode(Node* node, const string& courseNumber) {
    if (node == nullptr) return nullptr;

    if (courseNumber == node->data.courseNumber) {
        return node;
    }
    else if (courseNumber < node->data.courseNumber) {
        return searchNode(node->left, courseNumber);
    }
    else {
        return searchNode(node->right, courseNumber);
    }
}

// public search method, returns a course obj. or empty course IF not found
Course BinarySearchTree::Search(string courseNumber) {
    Node* resultNode = searchNode(root, courseNumber);
    if (resultNode != nullptr) {
        return resultNode->data;
    }
    return Course{};  // empty course = not found
}

// print details for a specific course (includes prerequisites with titles)
void BinarySearchTree::PrintCourse(string courseNumber) {
    if (!root) {
        cout << "No data loaded yet." << endl;
        return;
    }

    Course foundCourse = Search(courseNumber);

    if (foundCourse.courseNumber.empty()) {
        cout << "Course not found." << endl;
        return;
    }

    // print course number + title
    cout << foundCourse.courseNumber << ", " << foundCourse.courseTitle << endl;


    // print prerequisites or n/a
    if (foundCourse.prerequisites.empty()) {
        cout << "Prerequisites: None" << endl;
    }
    else {
        cout << "Prerequisites: ";
        for (size_t i = 0; i < foundCourse.prerequisites.size(); ++i) {
            string prereqNum = foundCourse.prerequisites[i];
            Course prereqCourse = Search(prereqNum);
            cout << prereqNum;
            if (!prereqCourse.courseTitle.empty()) {
                cout << " - " << prereqCourse.courseTitle;
            }
            if (i < foundCourse.prerequisites.size() - 1) cout << ", ";
        }
        cout << endl;
    }

}

// load courses from a csv file and insert into the BST
void LoadCourses(BinarySearchTree& bst) {
    bst = BinarySearchTree();  // Reset tree

    string fileName;
    // CS 300 ABCU_Advising_Program_Input.csv = file used in project
    cout << "Enter filename to load courses: ";
    getline(cin, fileName);
    ifstream file(fileName);
    if (!file.is_open()) {
        cout << "Error: File '" << fileName << "' not found or could not be opened" << endl;
        return;
    }

    vector<Course> rawLines; // stores courses temp
    map<string, Course> courseMap; // for quick prereq lookup

    string line;
    while (getline(file, line)) {
        if (line.empty()) continue;

        vector<string> tokens;
        stringstream ss(line);
        string token;

        // split line by comma, trim excess, and store if non-empty
        while (getline(ss, token, ',')) {
            token = Trim(token);
            if (!token.empty()) tokens.push_back(token);
        }

        // ensures each row must have at least course number + title
        if (tokens.size() < 2) {
            cout << "Warning: Invalid row (missing title or course number)." << endl;
            continue;
        }

        // normalize course number to upercase and trim title/prereqs
        string courseNumber = ToUpper(tokens[0]);
        string courseTitle = Trim(tokens[1]);
        vector<string> prerequisites;

        for (size_t i = 2; i < tokens.size(); ++i)
            prerequisites.push_back(ToUpper(Trim(tokens[i])));

        // check for duplicate course number
        if (courseMap.find(courseNumber) != courseMap.end()) {
            cout << "Warning: Duplicate course " << courseNumber << " found. Skipping." << endl;
            continue; // Skip duplicate
        }

        // create course obj. & store it
        Course course = { courseNumber, courseTitle, prerequisites };
        courseMap[courseNumber] = course; // store in map for quick lookup
        rawLines.push_back(course); // keep list to insert later

        // 
    }



    // warn if any prereq is misisng in courseMap
    for (const Course& course : rawLines) {
        for (const string& prereq : course.prerequisites) {
            if (courseMap.find(prereq) == courseMap.end()) {
                cout << "Warning: Prerequisite " << prereq << " not found for course " << course.courseNumber << endl;
            }
        }
    }

    // insert all courses into BST
    for (const Course& course : rawLines) {
        bst.Insert(course);
    }

    file.close();
    cout << "Data loaded successfully from '" << fileName << "'." << endl;
}

// Main program, contains menu requiring user input
int main() {
    BinarySearchTree bst;
    int choice = 0;

    // Display welcome message
    cout << "============================================================" << endl;
    cout << "        Welcome to the ABCU Course Advising Assistant!" << endl;
    cout << "============================================================" << endl;
    cout << "You're now using a command-line program built to help" << endl;
    cout << "academic advisors efficiently explore Computer Science" << endl;
    cout << "curriculum data at ABCU. This program supports:" << endl;
    cout << "  - Loading course data from a CSV file" << endl;
    cout << "  - Viewing an alphanumeric list of courses being offered" << endl;
    cout << "  - Looking up individual courses and their prerequisites" << endl;
    cout << "------------------------------------------------------------" << endl;



    // loops menu until user chooses to exit
    while (choice != 9) {
        cout << "\nMenu:\n";
        cout << "  1. Load Data Structure" << endl;
        cout << "  2. Print Course List" << endl;
        cout << "  3. Print Course Info" << endl;
        cout << "  9. Exit" << endl;
        cout << "What would you like to do?: ";

        // validate user input for menu choice
        if (!(cin >> choice)) {
            // if invalid = clear error and ignore rest of the line
            cout << "Invalid input. Please enter a number from the menu." << endl;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            continue;  // restart loop + prompt again
        }

        cin.ignore(numeric_limits<streamsize>::max(), '\n');  // clear leftover input

        // the following code handles user's menu selection
        switch (choice) {
        case 1:
            LoadCourses(bst); // load courses from csv file into BST
            break;
        case 2:
            if (!bst.IsEmpty())
                bst.PrintAllCourses(); // print all courses (sorted)
            else
                cout << "No course data loaded yet. Please load data first." << endl;
            break;
        case 3: {
            string courseNumber;
            cout << "Enter the course you want to learn more about!: ";
            getline(cin, courseNumber);  // read full line input
            courseNumber = ToUpper(Trim(courseNumber));  // convert input to uppercase
            bst.PrintCourse(courseNumber); // print course info
            break;
        }
        case 9:
            cout << "Thank you for using the course planner!" << endl; // exit message
            break;
        default:
            cout << choice << " is an invalid option :( please try again!" << endl;
            break;
        }
    }

    return 0;
}
