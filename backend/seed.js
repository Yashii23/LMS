import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";

import Course from "./models/Course.js";
import Lesson from "./models/Lesson.js";
import Quiz from "./models/Quiz.js";
import Question from "./models/Question.js";
import Assignment from "./models/Assignment.js";

dotenv.config();

const instructorId =
  new mongoose.Types.ObjectId(
    "6a3b867a6b8fb0413c3e432e"
  );

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    console.log("Cleaning Database...");

    await Lesson.deleteMany();
    await Question.deleteMany();
    await Quiz.deleteMany();
    await Assignment.deleteMany();
    await Course.deleteMany();

    console.log("Old Data Removed");

    console.log("Creating Courses...");

    const courses = await Course.insertMany([
      {
        title: "MERN Stack Development",
        description:
          "Complete MERN Stack Course from Beginner to Advanced.",
        category: "Web Development",
        level: "Advanced",
        price: 2999,
        thumbnail:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        duration: 40,
        instructor: instructorId,
        isPublished: true,
      },

      {
        title: "React Development",
        description:
          "Master React.js with Hooks, Routing and API Integration.",
        category: "Frontend",
        level: "Intermediate",
        price: 1999,
        thumbnail:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        duration: 25,
        instructor: instructorId,
        isPublished: true,
      },

      {
        title: "Node.js Backend",
        description:
          "Build scalable backend applications using Node.js & Express.",
        category: "Backend",
        level: "Intermediate",
        price: 2499,
        thumbnail:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        duration: 30,
        instructor: instructorId,
        isPublished: true,
      },

      {
        title: "Python Programming",
        description:
          "Python programming from beginner to advanced.",
        category: "Programming",
        level: "Beginner",
        price: 1499,
        thumbnail:
          "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
        duration: 28,
        instructor: instructorId,
        isPublished: true,
      },

      {
        title: "JavaScript Mastery",
        description:
          "Complete JavaScript ES6+ course.",
        category: "Programming",
        level: "Beginner",
        price: 1599,
        thumbnail:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        duration: 24,
        instructor: instructorId,
        isPublished: true,
      },
    ]);

    console.log("Courses Created");

    const [
      mern,
      react,
      node,
      python,
      javascriptCourse,
    ] = courses; 
	    console.log("Creating Lessons...");

    await Lesson.insertMany([

      // ================= MERN =================

      {
        course: mern._id,
        title: "Introduction to MERN Stack",
        description: "Overview of MongoDB, Express, React and Node.",
        videoUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M",
        duration: "18 min",
        order: 1,
      },
      {
        course: mern._id,
        title: "MongoDB Fundamentals",
        description: "Collections, Documents and CRUD Operations.",
        videoUrl: "https://www.youtube.com/watch?v=ofme2o29ngU",
        duration: "25 min",
        order: 2,
      },
      {
        course: mern._id,
        title: "Express.js Basics",
        description: "Creating APIs using Express.",
        videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
        duration: "24 min",
        order: 3,
      },
      {
        course: mern._id,
        title: "React Components & Hooks",
        description: "Functional Components, Props, State and Hooks.",
        videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        duration: "32 min",
        order: 4,
      },
      {
        course: mern._id,
        title: "Complete MERN Project",
        description: "Frontend + Backend Integration.",
        videoUrl: "https://www.youtube.com/watch?v=O3BUHwfHf84",
        duration: "40 min",
        order: 5,
      },

      // ================= React =================

      {
        course: react._id,
        title: "Introduction to React",
        description: "What is React and Virtual DOM.",
        videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        duration: "18 min",
        order: 1,
      },
      {
        course: react._id,
        title: "JSX & Components",
        description: "Understanding JSX syntax.",
        videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        duration: "20 min",
        order: 2,
      },
      {
        course: react._id,
        title: "React Hooks",
        description: "useState and useEffect.",
        videoUrl: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
        duration: "22 min",
        order: 3,
      },
      {
        course: react._id,
        title: "React Router",
        description: "Routing between pages.",
        videoUrl: "https://www.youtube.com/watch?v=Ul3y1LXxzdU",
        duration: "26 min",
        order: 4,
      },
      {
        course: react._id,
        title: "API Integration",
        description: "Fetching data using Axios.",
        videoUrl: "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        duration: "28 min",
        order: 5,
      },

      // ================= Node =================

      {
        course: node._id,
        title: "Node.js Introduction",
        description: "Node.js Runtime Environment.",
        videoUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
        duration: "20 min",
        order: 1,
      },
      {
        course: node._id,
        title: "NPM & Modules",
        description: "Understanding npm and packages.",
        videoUrl: "https://www.youtube.com/watch?v=jHDhaSSKmB0",
        duration: "18 min",
        order: 2,
      },
      {
        course: node._id,
        title: "Express Framework",
        description: "Creating Express Applications.",
        videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
        duration: "26 min",
        order: 3,
      },
      {
        course: node._id,
        title: "REST API Development",
        description: "GET POST PUT DELETE APIs.",
        videoUrl: "https://www.youtube.com/watch?v=pKd0Rpw7O48",
        duration: "34 min",
        order: 4,
      },
      {
        course: node._id,
        title: "JWT Authentication",
        description: "Authentication using JWT.",
        videoUrl: "https://www.youtube.com/watch?v=mbsmsi7l3r4",
        duration: "30 min",
        order: 5,
      },

      // ================= Python =================

      {
        course: python._id,
        title: "Python Basics",
        description: "Variables and Data Types.",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        duration: "20 min",
        order: 1,
      },
      {
        course: python._id,
        title: "Conditional Statements",
        description: "if else and nested conditions.",
        videoUrl: "https://www.youtube.com/watch?v=Zp5MuPOtsSY",
        duration: "18 min",
        order: 2,
      },
      {
        course: python._id,
        title: "Loops",
        description: "for and while loops.",
        videoUrl: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ",
        duration: "24 min",
        order: 3,
      },
      {
        course: python._id,
        title: "Functions",
        description: "Functions and Parameters.",
        videoUrl: "https://www.youtube.com/watch?v=9Os0o3wzS_I",
        duration: "20 min",
        order: 4,
      },
      {
        course: python._id,
        title: "Object Oriented Programming",
        description: "Classes and Objects.",
        videoUrl: "https://www.youtube.com/watch?v=Ej_02ICOIgs",
        duration: "28 min",
        order: 5,
      },

      // ================= JavaScript =================

      {
        course: javascriptCourse._id,
        title: "JavaScript Basics",
        description: "Variables and Operators.",
        videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        duration: "22 min",
        order: 1,
      },
      {
        course: javascriptCourse._id,
        title: "Functions",
        description: "Arrow Functions and Scope.",
        videoUrl: "https://www.youtube.com/watch?v=N8ap4k_1QEQ",
        duration: "18 min",
        order: 2,
      },
      {
        course: javascriptCourse._id,
        title: "DOM Manipulation",
        description: "DOM Events and Selectors.",
        videoUrl: "https://www.youtube.com/watch?v=5fb2aPlgoys",
        duration: "26 min",
        order: 3,
      },
      {
        course: javascriptCourse._id,
        title: "ES6 Features",
        description: "let, const, spread and destructuring.",
        videoUrl: "https://www.youtube.com/watch?v=NCwa_xi0Uuc",
        duration: "24 min",
        order: 4,
      },
      {
        course: javascriptCourse._id,
        title: "Async JavaScript",
        description: "Promises, Async Await and Fetch.",
        videoUrl: "https://www.youtube.com/watch?v=PoRJizFvM7s",
        duration: "30 min",
        order: 5,
      },

    ]);

    console.log("25 Lessons Created Successfully");
	    console.log("Creating Assignments...");

    const assignments = await Assignment.insertMany([
      {
        title: "Build a MERN Authentication System",
        description:
          "Create a JWT-based authentication system using MERN Stack.",
        course: mern._id,
        dueDate: new Date("2026-12-31"),
        maxMarks: 100,
        createdBy: instructorId,
      },

      {
        title: "React Dashboard Project",
        description:
          "Develop a responsive admin dashboard using React.",
        course: react._id,
        dueDate: new Date("2026-12-31"),
        maxMarks: 100,
        createdBy: instructorId,
      },

      {
        title: "Node REST API",
        description:
          "Build a REST API with Express and MongoDB.",
        course: node._id,
        dueDate: new Date("2026-12-31"),
        maxMarks: 100,
        createdBy: instructorId,
      },

      {
        title: "Python File Handling",
        description:
          "Create a Student Management System using Python.",
        course: python._id,
        dueDate: new Date("2026-12-31"),
        maxMarks: 100,
        createdBy: instructorId,
      },

      {
        title: "JavaScript Todo App",
        description:
          "Develop a Todo Application using Vanilla JavaScript.",
        course: javascriptCourse._id,
        dueDate: new Date("2026-12-31"),
        maxMarks: 100,
        createdBy: instructorId,
      },
    ]);

    console.log(
      `${assignments.length} Assignments Created`
    );



    console.log("Creating Quizzes...");

    const quizzes = await Quiz.insertMany([
      {
        title: "MERN Stack Quiz",
        description:
          "Test your MERN Stack knowledge.",
        course: mern._id,
        duration: 30,
        totalMarks: 50,
        createdBy: instructorId,
        isPublished: true,
      },

      {
        title: "React Quiz",
        description:
          "React Components, Hooks and Routing.",
        course: react._id,
        duration: 20,
        totalMarks: 50,
        createdBy: instructorId,
        isPublished: true,
      },

      {
        title: "Node.js Quiz",
        description:
          "Node.js & Express Fundamentals.",
        course: node._id,
        duration: 20,
        totalMarks: 50,
        createdBy: instructorId,
        isPublished: true,
      },

      {
        title: "Python Quiz",
        description:
          "Python Programming Basics.",
        course: python._id,
        duration: 20,
        totalMarks: 50,
        createdBy: instructorId,
        isPublished: true,
      },

      {
        title: "JavaScript Quiz",
        description:
          "Core JavaScript Concepts.",
        course: javascriptCourse._id,
        duration: 20,
        totalMarks: 50,
        createdBy: instructorId,
        isPublished: true,
      },
    ]);

    console.log(
      `${quizzes.length} Quizzes Created`
    );

    const [
      mernQuiz,
      reactQuiz,
      nodeQuiz,
      pythonQuiz,
      jsQuiz,
    ] = quizzes;
	
	    console.log("Creating Questions...");

    await Question.insertMany([

      // ================= MERN QUIZ =================

      {
        quiz: mernQuiz._id,
        question: "Which database is used in the MERN Stack?",
        options: ["MongoDB", "MySQL", "Oracle", "PostgreSQL"],
        correctAnswer: "MongoDB",
        marks: 5,
      },
      {
        quiz: mernQuiz._id,
        question: "What does the E in MERN stand for?",
        options: ["Express.js", "Electron", "Engine", "Enterprise"],
        correctAnswer: "Express.js",
        marks: 5,
      },
      {
        quiz: mernQuiz._id,
        question: "Which library is used for building UI?",
        options: ["Angular", "React", "Vue", "Bootstrap"],
        correctAnswer: "React",
        marks: 5,
      },
      {
        quiz: mernQuiz._id,
        question: "Node.js runs on which engine?",
        options: ["Rhino", "V8", "SpiderMonkey", "Java VM"],
        correctAnswer: "V8",
        marks: 5,
      },
      {
        quiz: mernQuiz._id,
        question: "Which package connects MongoDB with Node.js?",
        options: ["Axios", "Express", "Mongoose", "Redux"],
        correctAnswer: "Mongoose",
        marks: 5,
      },



      // ================= REACT QUIZ =================

      {
        quiz: reactQuiz._id,
        question: "React is developed by?",
        options: ["Google", "Meta", "Amazon", "Microsoft"],
        correctAnswer: "Meta",
        marks: 5,
      },
      {
        quiz: reactQuiz._id,
        question: "Which hook manages state?",
        options: ["useMemo", "useState", "useRef", "useEffect"],
        correctAnswer: "useState",
        marks: 5,
      },
      {
        quiz: reactQuiz._id,
        question: "JSX stands for?",
        options: [
          "Java XML",
          "JavaScript XML",
          "JSON XML",
          "Java Extension"
        ],
        correctAnswer: "JavaScript XML",
        marks: 5,
      },
      {
        quiz: reactQuiz._id,
        question: "Which hook is used for side effects?",
        options: [
          "useState",
          "useReducer",
          "useEffect",
          "useMemo"
        ],
        correctAnswer: "useEffect",
        marks: 5,
      },
      {
        quiz: reactQuiz._id,
        question: "Props are used to?",
        options: [
          "Store Database",
          "Pass Data",
          "Manage CSS",
          "Create APIs"
        ],
        correctAnswer: "Pass Data",
        marks: 5,
      },



      // ================= NODE QUIZ =================

      {
        quiz: nodeQuiz._id,
        question: "Node.js is a?",
        options: [
          "Framework",
          "Runtime Environment",
          "Database",
          "Programming Language"
        ],
        correctAnswer: "Runtime Environment",
        marks: 5,
      },
      {
        quiz: nodeQuiz._id,
        question: "Which framework is commonly used with Node.js?",
        options: [
          "Laravel",
          "Express.js",
          "Spring",
          "Django"
        ],
        correctAnswer: "Express.js",
        marks: 5,
      },
      {
        quiz: nodeQuiz._id,
        question: "Which package manager comes with Node.js?",
        options: [
          "Composer",
          "Pip",
          "npm",
          "Gradle"
        ],
        correctAnswer: "npm",
        marks: 5,
      },
      {
        quiz: nodeQuiz._id,
        question: "Which module creates a web server?",
        options: [
          "http",
          "url",
          "path",
          "fs"
        ],
        correctAnswer: "http",
        marks: 5,
      },
      {
        quiz: nodeQuiz._id,
        question: "Express middleware is used to?",
        options: [
          "Style Pages",
          "Handle Requests",
          "Compile Code",
          "Create Database"
        ],
        correctAnswer: "Handle Requests",
        marks: 5,
      },
	        // ================= PYTHON QUIZ =================

      {
        quiz: pythonQuiz._id,
        question: "Python is a?",
        options: [
          "Compiled Language",
          "Interpreted Language",
          "Database",
          "Markup Language"
        ],
        correctAnswer: "Interpreted Language",
        marks: 5,
      },
      {
        quiz: pythonQuiz._id,
        question: "Which keyword defines a function in Python?",
        options: [
          "function",
          "define",
          "def",
          "func"
        ],
        correctAnswer: "def",
        marks: 5,
      },
      {
        quiz: pythonQuiz._id,
        question: "Which symbol is used for comments?",
        options: [
          "#",
          "//",
          "/*",
          "--"
        ],
        correctAnswer: "#",
        marks: 5,
      },
      {
        quiz: pythonQuiz._id,
        question: "Which loop iterates over sequences?",
        options: [
          "for",
          "repeat",
          "loop",
          "iterate"
        ],
        correctAnswer: "for",
        marks: 5,
      },
      {
        quiz: pythonQuiz._id,
        question: "Which datatype stores True or False?",
        options: [
          "int",
          "float",
          "bool",
          "str"
        ],
        correctAnswer: "bool",
        marks: 5,
      },



      // ================= JAVASCRIPT QUIZ =================

      {
        quiz: jsQuiz._id,
        question: "Which keyword declares a block-scoped variable?",
        options: [
          "var",
          "let",
          "goto",
          "dim"
        ],
        correctAnswer: "let",
        marks: 5,
      },
      {
        quiz: jsQuiz._id,
        question: "Which company developed JavaScript?",
        options: [
          "Microsoft",
          "Netscape",
          "Google",
          "Oracle"
        ],
        correctAnswer: "Netscape",
        marks: 5,
      },
      {
        quiz: jsQuiz._id,
        question: "Which method converts JSON string into an object?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "parseJSON()",
          "toObject()"
        ],
        correctAnswer: "JSON.parse()",
        marks: 5,
      },
      {
        quiz: jsQuiz._id,
        question: "Which operator checks both value and datatype?",
        options: [
          "==",
          "===",
          "=",
          "!="
        ],
        correctAnswer: "===",
        marks: 5,
      },
      {
        quiz: jsQuiz._id,
        question: "Promises are used for?",
        options: [
          "Styling",
          "Database",
          "Asynchronous Programming",
          "Routing"
        ],
        correctAnswer: "Asynchronous Programming",
        marks: 5,
      }

    ]);

    console.log("25 Questions Created Successfully");

    console.log("====================================");
    console.log(" LMS DATABASE SEEDED SUCCESSFULLY ");
    console.log("====================================");

    console.log("Courses Created :", courses.length);
    console.log("Lessons Created : 25");
    console.log("Assignments Created :", assignments.length);
    console.log("Quizzes Created :", quizzes.length);
    console.log("Questions Created : 25");

    await mongoose.disconnect();

    console.log("MongoDB Disconnected");

    process.exit(0);

  } catch (error) {

    console.error(error);

    await mongoose.disconnect();

    process.exit(1);

  }
};

seedDatabase();