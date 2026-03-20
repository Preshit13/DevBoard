const express = require("express");
const { getDB } = require("../db/connection");
const { ObjectId } = require("mongodb");

const router = express.Router();

// GET all feedback with optional sort and pagination
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const { sort, page, limit } = req.query;
    const sortField =
      sort === "asc" || sort === "desc" ? "rating" : "createdAt";
    const sortOrder = sort === "asc" ? 1 : -1;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await db.collection("feedback").countDocuments();
    const data = await db
      .collection("feedback")
      .find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .toArray();

    res.json({ data, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET feedback by project with optional sort and pagination
router.get("/project/:projectId", async (req, res) => {
  try {
    const db = getDB();
    const { sort, page, limit } = req.query;
    const sortField =
      sort === "asc" || sort === "desc" ? "rating" : "createdAt";
    const sortOrder = sort === "asc" ? 1 : -1;
    const query = { projectId: req.params.projectId };

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await db.collection("feedback").countDocuments(query);
    const data = await db
      .collection("feedback")
      .find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .toArray();

    res.json({ data, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single feedback
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const feedback = await db
      .collection("feedback")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create feedback
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const { projectId, userName, rating, comment } = req.body;
    const feedback = {
      projectId,
      userName,
      rating,
      comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection("feedback").insertOne(feedback);
    res.status(201).json({ _id: result.insertedId, ...feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update feedback
router.put("/:id", async (req, res) => {
  try {
    const db = getDB();
    const { userName, rating, comment } = req.body;
    const result = await db.collection("feedback").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          userName,
          rating,
          comment,
          updatedAt: new Date(),
        },
      },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Feedback not found" });
    res.json({ message: "Feedback updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE feedback
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const result = await db
      .collection("feedback")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Feedback not found" });
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
