const router = require("express").Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add task
router.post("/", async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title
        });

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json("Task deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json("Task not found");
        }

        task.completed = !task.completed;

        await task.save();

        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error updating task");
    }
});


module.exports = router;