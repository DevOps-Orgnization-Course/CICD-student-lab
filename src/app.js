const express = require("express");
const { TasksStore } = require("./tasksStore");
const { validateTask } = require("./validate");

function createApp(store = new TasksStore()) {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/tasks", (req, res) => {
    res.json(store.list());
  });

  app.get("/api/tasks/:id", (req, res) => {
    const task = store.get(req.params.id);
    if (!task) return res.status(404).json({ error: "task not found" });
    res.json(task);
  });

  app.post("/api/tasks", (req, res) => {
    const { valid, errors } = validateTask(req.body);
    if (!valid) return res.status(400).json({ errors });
    const task = store.add(req.body.title.trim());
    res.status(201).json(task);
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const removed = store.remove(req.params.id);
    if (!removed) return res.status(404).json({ error: "task not found" });
    res.status(204).send();
  });

  return app;
}

module.exports = { createApp };
