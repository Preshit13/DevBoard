const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getDB } = require("../db/connection");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Passport local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const db = getDB();
      const user = await db.collection("users").findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });
      if (user.password !== password)
        return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const db = getDB();
    const { username, password, displayName } = req.body;
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "Username already exists" });
    const user = {
      username,
      password,
      displayName,
      createdAt: new Date(),
    };
    const result = await db.collection("users").insertOne(user);
    res.status(201).json({ _id: result.insertedId, username, displayName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /auth/login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({
        _id: user._id,
        username: user.username,
        displayName: user.displayName,
      });
    });
  })(req, res, next);
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Logged out successfully" });
  });
});

// GET /auth/me
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      displayName: req.user.displayName,
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

module.exports = { router, passport };
