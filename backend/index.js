import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Schema Definitions
const planSchema = new mongoose.Schema({
  title: { type: String, maxlength: 200 },
  todos: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      text: { type: String, required: true, maxlength: 150 },
      done: { type: Boolean, default: false }, // legacy, use completed for new
      completed: { type: Boolean, default: false },
      created_at: { type: Date, default: Date.now },
    },
  ],
  notes: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      text: { type: String, required: true, maxlength: 300 },
      created_at: { type: Date, default: Date.now },
    },
  ],
  creation_date: { type: Date, default: Date.now },
});

const Plan = mongoose.model("Plan", planSchema);

// Validation helper
const validatePlan = (body) => {
  const errors = [];

  if (
    body.title &&
    (typeof body.title !== "string" || body.title.length > 200)
  ) {
    errors.push("Title must be a string with max 200 characters");
  }

  if (!Array.isArray(body.todos)) {
    errors.push("Todos must be an array");
  } else {
    body.todos.forEach((todo, idx) => {
      if (!todo.text || typeof todo.text !== "string" || !todo.text.trim()) {
        errors.push(`Todo ${idx} must have non-empty text`);
      }
      if (todo.text && todo.text.length > 150) {
        errors.push(`Todo ${idx} text must be max 150 characters`);
      }
      if (todo.completed !== undefined && typeof todo.completed !== "boolean") {
        errors.push(`Todo ${idx} completed must be boolean`);
      }
    });
  }

  if (!Array.isArray(body.notes)) {
    errors.push("Notes must be an array");
  } else {
    body.notes.forEach((note, idx) => {
      if (!note.text || typeof note.text !== "string" || !note.text.trim()) {
        errors.push(`Note ${idx} must have non-empty text`);
      }
      if (note.text && note.text.length > 300) {
        errors.push(`Note ${idx} text must be max 300 characters`);
      }
    });
  }

  if (body.todos.length === 0 && body.notes.length === 0) {
    errors.push("Plan must have at least one todo or note");
  }

  return errors;
};

// GET /api/plans - Get all plans sorted by creation_date DESC
app.get("/api/plans", async (req, res) => {
  try {
    const plans = await Plan.find({}).sort({ creation_date: -1 });
    res.json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
});

// GET /api/plans/:id - Get single plan by ID
app.get("/api/plans/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch plan" });
  }
});

// POST /api/plans - Create new plan
app.post("/api/plans", async (req, res) => {
  const { title, todos, notes } = req.body;

  const errors = validatePlan(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join("; ") });
  }

  try {
    const plan = new Plan({
      title: title || null,
      todos: todos.map((t) => ({ text: t.text, completed: !!t.completed })),
      notes: notes.map((n) => ({ text: n.text })),
      creation_date: new Date(),
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create plan" });
  }
});

// DELETE /api/plans/:id - Delete plan
app.delete("/api/plans/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan deleted", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete plan" });
  }
});

// PUT /api/plans/:id - Update plan
app.put("/api/plans/:id", async (req, res) => {
  const { id } = req.params;
  const { title, todos, notes } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title || null;
    if (todos !== undefined)
      updateData.todos = todos.map((t) => ({
        text: t.text,
        completed: !!t.completed,
      }));
    if (notes !== undefined)
      updateData.notes = notes.map((n) => ({ text: n.text }));

    const plan = await Plan.findByIdAndUpdate(id, updateData, { new: true });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update plan" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
