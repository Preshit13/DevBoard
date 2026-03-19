const { MongoClient } = require("mongodb");
require("dotenv").config({
  path: require("path").join(__dirname, "../../.env"),
});

const MONGO_URI = process.env.MONGO_URI;

const titles = [
  "WeatherApp",
  "ChatBot",
  "PortfolioSite",
  "TaskManager",
  "BlogPlatform",
  "EcommerceStore",
  "RecipeApp",
  "FitnessTracker",
  "NewsAggregator",
  "CodeEditor",
  "MovieDatabase",
  "MusicPlayer",
  "TravelPlanner",
  "BudgetTracker",
  "SocialNetwork",
  "JobBoard",
  "LearningPlatform",
  "EventManager",
  "PhotoGallery",
  "QuizApp",
];

const techStacks = [
  "React",
  "Node",
  "Python",
  "Django",
  "Vue",
  "Angular",
  "MongoDB",
  "PostgreSQL",
  "TypeScript",
  "GraphQL",
  "Redis",
  "Docker",
  "AWS",
  "Firebase",
];

const categories = ["Web", "Mobile", "AI", "DevTools", "Game", "Data"];

const authors = [
  "alex_dev",
  "jordan_codes",
  "priya_builds",
  "marcus_tech",
  "sarah_dev",
  "kevin_js",
  "nina_react",
  "tom_node",
  "emily_fullstack",
  "chris_dev",
  "lisa_codes",
  "mike_builds",
  "anna_tech",
  "david_dev",
  "emma_codes",
  "ryan_js",
  "sophia_react",
  "james_node",
  "olivia_dev",
  "liam_fullstack",
];

const descriptions = [
  "A full stack web application built with modern technologies.",
  "An open source tool for developers to improve productivity.",
  "A community driven platform for sharing and discovering projects.",
  "A responsive web app with a clean and intuitive user interface.",
  "A RESTful API backed application with real time features.",
  "A data driven application with interactive visualizations.",
  "A mobile first web application optimized for all devices.",
  "A scalable application built with microservices architecture.",
  "A developer tool that simplifies complex workflows.",
  "A collaborative platform for teams to work together efficiently.",
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomItems(arr, min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function randomDate() {
  const start = new Date(2024, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

async function seed() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db("devboard");

  // Clear existing data
  await db.collection("projects").deleteMany({});
  await db.collection("feedback").deleteMany({});
  await db.collection("bookmarks").deleteMany({});
  console.log("Cleared existing data");

  // Insert 600 projects
  const projects = [];
  for (let i = 0; i < 1000; i++) {
    projects.push({
      title: `${randomItem(titles)} ${i + 1}`,
      description: randomItem(descriptions),
      techStack: randomItems(techStacks, 2, 4),
      category: randomItem(categories),
      githubLink: `https://github.com/${randomItem(authors)}/project-${i + 1}`,
      demoURL: `https://project-${i + 1}.vercel.app`,
      authorName: randomItem(authors),
      createdAt: randomDate(),
      updatedAt: new Date(),
    });
  }
  const insertedProjects = await db.collection("projects").insertMany(projects);
  console.log(`Inserted ${projects.length} projects`);

  // Get inserted project IDs
  const projectIds = Object.values(insertedProjects.insertedIds).map((id) =>
    id.toString(),
  );

  // Insert 250 feedback records
  const feedbackData = [];
  const comments = [
    "Great project!",
    "Really impressive work.",
    "Love the UI design.",
    "Very useful tool.",
    "Clean and well structured code.",
    "Awesome implementation.",
    "This is exactly what I needed.",
    "Excellent documentation.",
    "Very creative idea.",
    "Well executed project.",
  ];
  for (let i = 0; i < 250; i++) {
    feedbackData.push({
      projectId: randomItem(projectIds),
      userName: randomItem(authors),
      rating: Math.floor(Math.random() * 5) + 1,
      comment: randomItem(comments),
      createdAt: randomDate(),
      updatedAt: new Date(),
    });
  }
  await db.collection("feedback").insertMany(feedbackData);
  console.log(`Inserted ${feedbackData.length} feedback records`);

  // Insert 150 bookmarks
  const bookmarkData = [];
  const notes = [
    "Check this out later",
    "Great reference project",
    "Similar to what I am building",
    "Inspiration for my next project",
    "Good example of clean code",
    "Useful for learning",
    "Share with teammates",
    "Review the architecture",
  ];
  for (let i = 0; i < 150; i++) {
    bookmarkData.push({
      projectId: randomItem(projectIds),
      userName: randomItem(authors),
      note: randomItem(notes),
      createdAt: randomDate(),
      updatedAt: new Date(),
    });
  }
  await db.collection("bookmarks").insertMany(bookmarkData);
  console.log(`Inserted ${bookmarkData.length} bookmarks`);

  console.log("Seeding complete: 1000 total records inserted");
  await client.close();
}

seed().catch(console.error);
