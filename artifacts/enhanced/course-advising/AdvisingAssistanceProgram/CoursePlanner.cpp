//============================================================================
// name        : CoursePlanner.cpp
// author      : agrima gurung
// version     : 2.0
// copyright   : copyright 2026 agrima gurung
// description : advising system using an AVL tree (self-balancing BST)
//============================================================================
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <map>
#include <cctype>

using namespace std;

// helper function to convert a string to uppercase for comparisons (to make case insensitive)
string toupperStr(const string& str) {
    string result = str;
    for (char& ch : result) {
        ch = toupper(ch);
    }
    return result;
}

// helper function to trim leading + trailing whitespace from a string
string trim(const string& s) {
    size_t start = s.find_first_not_of(" \t\n\r");
    size_t end = s.find_last_not_of(" \t\n\r");
    if (start == string::npos) return ""; // string is all whitespace
    return s.substr(start, end - start + 1);
}

// struct: represents a single course w/ a course number, title, and prerequisites
struct Course {
    string courseNumber; // ex: "csci100"
    string courseTitle; // ex: "introduction to computer science"
    vector<string> prerequisites; // stores prereqs
};


// fix 1
// struct: node of the AVL tree containing course data
struct Node {
    Course data; // course info
    Node* left; // pointer to left child
    Node* right; // pointer to right child
	int height; // node height, needed for AVL balancing
	Node() : left(nullptr), right(nullptr), height(1) {} // default constructor
	Node(Course acourse) : data(acourse), left(nullptr), right(nullptr), height(1) {} // constructor with course
};

// fix 2
// helper function to get the height of a node, returns 0 if node is nullptr
int height(Node* node) {
    return node ? node->height : 0;
}

// fix 3
// helper function to calculate the balance factor of a node (left height - right height), returns 0 if node is nullptr
int getBalance(Node* node) {
    return node ? height(node->left) - height(node->right) : 0;
}

// class: AVL tree to store courses sorted via course number
class AVLTree {
private:
    Node* root; // root of the tree

    // the following are recursive helpers to:
    void inOrder(Node* node); // in order traversal (sort alphabetized)
    Node* searchnode(Node* node, const string& courseNumber);  // search for course node via course number
    void destroytree(Node* node); // delete all nodes ( used in destructor)

    // the following are AVL rotation and helpers to:
	Node* rightrotate(Node* y); // perform right rotation (for left-left imbalance)
	Node* leftrotate(Node* x); // perform left rotation (for right-right imbalance)
	Node* insertAVL(Node* curr, const Course& course); // return new subtree root after insertion + balancing

public:
    AVLTree(); // constructor: initializes empty tree
    virtual ~AVLTree(); // destuctor: frees memory


    bool isempty() const; // check if AVL tree is empty
    void insert(Course course); // insert a course into AVL Tree
    void printallcourses(); // print all courses in sorted order
    Course search(string courseNumber);   // searches and returns course, empty if not found
    void printcourse(string courseNumber); // print course info and prerequisites
};

// AVL tree constructor: initalizes root to nullptr
AVLTree::AVLTree() {
    root = nullptr;
}

// AVL tree destructor: calls recursive node deletion
AVLTree::~AVLTree() {
    destroytree(root);
}

// recursively deletes all nodes to free up memory
void AVLTree::destroytree(Node* node) {
    if (node != nullptr) {
        destroytree(node->left);
        destroytree(node->right);
        delete node;
    }
}

// check if the AVL tree is empty (no root node)
bool AVLTree::isempty() const {
    return root == nullptr;
}


// Right Rotation: fixes left-left imbalance
Node* AVLTree::rightrotate(Node* y) {
    Node* x = y->left; // left child (x) becomes new root of subtree
    Node* t2 = x->right; // t2 is the subtree that will be moved during rotation

    x->right = y; // perform rotation (x moves up, y becomes right child of x)
	y->left = t2; // move t2 subtree to y's left

    // update heights
    y->height = max(height(y->left), height(y->right)) + 1; 
    x->height = max(height(x->left), height(x->right)) + 1; 

	return x; // x is now new root of subtree after rotation

}

// Left Rotation: fixes right-right imbalance
Node* AVLTree::leftrotate(Node* x) {
	Node* y = x->right; // right child (y) becomes new root of subtree
	Node* t2 = y->left; // subtree that will be moved

	y->left = x; // perform rotation (y moves up, x becomes left child of y)
	x->right = t2; // move subtree (t2) to x's right

	// update heights
	x->height = max(height(x->left), height(x->right)) + 1; 
    y->height = max(height(y->left), height(y->right)) + 1; 

	return y; // y is new root of subtree after rotation

}

// AVL tree insertion helper function, returns the new root of the subtree after insertion and balancing
Node* AVLTree::insertAVL(Node* curr, const Course& course) {
    if (curr == nullptr)
        return new Node(course);

    if (course.courseNumber < curr->data.courseNumber)
        curr->left = insertAVL(curr->left, course);
    else if (course.courseNumber > curr->data.courseNumber)
        curr->right = insertAVL(curr->right, course);
    else
		return curr; // duplicate course numbers are not allowed, ignore insertion

    // update height
    curr->height = 1 + max(height(curr->left), height(curr->right));

	// get balance factor
    int balance = getBalance(curr);

    // 4 possible imbalance cases
	// Left-Left case
    if (balance > 1 && course.courseNumber < curr -> left -> data.courseNumber)
        return rightrotate(curr);

	// Right-Right case
    if (balance < -1 && course.courseNumber > curr -> right -> data.courseNumber)
		return leftrotate(curr);
    
    // Left-Right case:
    if (balance > 1 && course.courseNumber > curr -> left -> data.courseNumber) {
        curr->left = leftrotate(curr->left);
        return rightrotate(curr);
    }

    // Right-Left case:
    if (balance < -1 && course.courseNumber < curr->right->data.courseNumber) {
        curr->right = rightrotate(curr->right);
        return leftrotate(curr);
    }

    return curr; // return the current root if no rotation is required

}

// public insert function
void AVLTree::insert(Course course) {
    root = insertAVL(root, course);
}

// in-order traversal, prints courses sorted via course number
void AVLTree::inOrder(Node* node) {
    if (node == nullptr) return;

    inOrder(node->left); // traverse left subtree first

    // print course number + title
    cout << node->data.courseNumber << ", " << node->data.courseTitle << endl;

    // print prerequisites; if empty, empty = none
    if (node->data.prerequisites.empty()) {
        cout << "prerequisites: none" << endl;
    }
    else {
        cout << "prerequisites: ";
        for (size_t i = 0; i < node->data.prerequisites.size(); ++i) {
            cout << node->data.prerequisites[i];
            if (i < node->data.prerequisites.size() - 1) cout << ", ";
        }
        cout << endl;
    }

    inOrder(node->right); // traverse right subtree last
}

// print all courses, or message if tree is empty :(
void AVLTree::printallcourses() {
    if (!root) {
        cout << "no data loaded yet." << endl;
        return;
    }
    inOrder(root);
}

// search helper: returns Node* for a course number, or nullptr
Node* AVLTree::searchnode(Node* node, const string& courseNumber) {
    if (node == nullptr) return nullptr;

    if (courseNumber == node->data.courseNumber) {
        return node;
    }
    else if (courseNumber < node->data.courseNumber) {
        return searchnode(node->left, courseNumber);
    }
    else {
        return searchnode(node->right, courseNumber);
    }
}

// public search: returns a Course obj. or empty if not found
Course AVLTree::search(string courseNumber) {
    Node* resultnode = searchnode(root, courseNumber);
    if (resultnode != nullptr) {
        return resultnode->data;
    }
    return Course{};  // empty course = not found
}

// print details for a specific course (includes prerequisites with titles)
void AVLTree::printcourse(string courseNumber) {
    if (!root) {
        cout << "no data loaded yet." << endl;
        return;
    }

    Course foundcourse = search(courseNumber);

    if (foundcourse.courseNumber.empty()) {
        cout << "course not found." << endl;
        return;
    }

    // print course number + title
    cout << foundcourse.courseNumber << ", " << foundcourse.courseTitle << endl;


    // print prerequisites or n/a
    if (foundcourse.prerequisites.empty()) {
        cout << "prerequisites: none" << endl;
    }
    else {
        cout << "prerequisites: ";
        for (size_t i = 0; i < foundcourse.prerequisites.size(); ++i) {
            string prereqnum = foundcourse.prerequisites[i];
            Course prereqcourse = search(prereqnum);
            cout << prereqnum;
            if (!prereqcourse.courseTitle.empty()) {
                cout << " - " << prereqcourse.courseTitle;
            }
            if (i < foundcourse.prerequisites.size() - 1) cout << ", ";
        }
        cout << endl;
    }

}

// load courses from a CSV file and insert into the AVL tree
void loadCourses(AVLTree& tree) {
    tree = AVLTree();  // reset tree

    string filename;
    // cs 300 abcu_advising_program_input.csv = file used in project
    cout << "enter filename to load courses: ";
    getline(cin, filename);
    ifstream file(filename);
    if (!file.is_open()) {
        cout << "error: file '" << filename << "' not found or could not be opened" << endl;
        return;
    }

    vector<Course> rawlines; // stores courses temporarily
    map<string, Course> coursemap; // for quick plookup of courses by course number

    string line;
    while (getline(file, line)) {
        if (line.empty()) continue;

        vector<string> tokens;
        stringstream ss(line);
        string token;

        // split line by commas, trim excess, and store if non-empty
        while (getline(ss, token, ',')) {
            token = trim(token);
            if (!token.empty()) tokens.push_back(token);
        }

        // ensures each row must have at least course number + title
        if (tokens.size() < 2) {
            cout << "warning: invalid row (missing title or course number)." << endl;
            continue;
        }

        // normalize course number to uppercase and trim title/prereqs
        string courseNumber = toupperStr(tokens[0]);
        string courseTitle = trim(tokens[1]);
        vector<string> prerequisites;

        for (size_t i = 2; i < tokens.size(); ++i)
            prerequisites.push_back(toupperStr(trim(tokens[i])));

        // skip duplicate course numbers
        if (coursemap.find(courseNumber) != coursemap.end()) {
            cout << "warning: duplicate course " << courseNumber << " found. skipping." << endl;
            continue; // skip duplicate
        }

        // create course obj. & store it
        Course course = { courseNumber, courseTitle, prerequisites };
        coursemap[courseNumber] = course; // store in map for quick lookup
        rawlines.push_back(course); // keep list to insert later

    }



    // warn if any prereq is misisng
    for (const Course& course : rawlines) {
        for (const string& prereq : course.prerequisites) {
            if (coursemap.find(prereq) == coursemap.end()) {
                cout << "warning: prerequisite " << prereq << " not found for course " << course.courseNumber << endl;
            }
        }
    }

    // insert all courses into AVL tree
    for (const Course& course : rawlines) {
        tree.insert(course);
    }

    file.close();
    cout << "data loaded successfully from '" << filename << "'." << endl;
}

// main program, contains menu requiring user input
int main() {
    AVLTree tree;
    int choice = 0;

    // display welcome message
    cout << "============================================================" << endl;
    cout << "        welcome to the abcu course advising assistant!" << endl;
    cout << "============================================================" << endl;
    cout << "you're now using a command-line program built to help" << endl;
    cout << "academic advisors efficiently explore computer science" << endl;
    cout << "curriculum data at abcu. this program supports:" << endl;
    cout << "  - loading course data from a csv file" << endl;
    cout << "  - viewing an alphanumeric list of courses being offered" << endl;
    cout << "  - looking up individual courses and their prerequisites" << endl;
    cout << "------------------------------------------------------------" << endl;



    // loops menu until user chooses to exit
    while (choice != 9) {
        cout << "\nmenu:\n";
        cout << "  1. load data structure" << endl;
        cout << "  2. print course list" << endl;
        cout << "  3. print course info" << endl;
        cout << "  9. exit" << endl;
        cout << "what would you like to do?: ";

        // validate user input for menu choice
        if (!(cin >> choice)) {
            // if invalid = clear error and ignore rest of the line
            cout << "invalid input. please enter a number from the menu." << endl;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            continue;  // restart loop + prompt again
        }

        cin.ignore(numeric_limits<streamsize>::max(), '\n');  // clear leftover input

        // the following code handles user's menu selection
        switch (choice) {
        case 1:
            loadCourses(tree); // load courses from csv file into AVLTree
            break;
        case 2:
            if (!tree.isempty())
                tree.printallcourses(); // print all courses (sorted)
            else
                cout << "no course data loaded yet. please load data first." << endl;
            break;
        case 3: {
            if (tree.isempty()) {
				cout << "no course data loaded yet. please load data first." << endl;
                break;
            }

            string courseNumber;
            cout << "enter the course you want to learn more about!: ";
            getline(cin, courseNumber);  // read full line input
            courseNumber = toupperStr(trim(courseNumber));  // convert input to uppercase
            tree.printcourse(courseNumber); // print course info
            break;
        }
        case 9:
            cout << "thank you for using the course planner!" << endl; // exit message
            break;
        default:
            cout << choice << " is an invalid option :( please try again!" << endl;
            break;
        }
    }

    return 0;
}
