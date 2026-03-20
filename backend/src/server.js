const express = require("express");
const session = require("express-session");
const { connectDB } = require("./db/connection");
const { router: authRouter, passport } = require("./routes/auth");

const projectsRouter = require("./routes/projects");
const feedbackRouter = require("./routes/feedback");
const bookmarksRouter = require("./routes/bookmarks");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://devboard-frontend.onrender.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "devboard_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/bookmarks", bookmarksRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
