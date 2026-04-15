import React, { useState, useEffect } from "react";
import API from "./api";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // Get tasks from backend
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  // Add task
  const addTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
  <div className="container">
    <h1>Task Manager</h1>

    <input
      placeholder="Enter task"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{ padding: "8px", width: "70%" }}
    />

    <button onClick={addTask} style={{ padding: "8px", marginLeft: "10px" }}>
      Add
    </button>

    <h3>Your Tasks:</h3>

    {tasks.map((task) => (
      <div
        key={task._id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      >
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none"
          }}
        >
          {task.title}
        </span>

        <div>
          <button onClick={async () => {
            await API.put(`/tasks/${task._id}`);
            fetchTasks();
          }}>
            {task.completed ? "Undo" : "Done"}
          </button>

          <button onClick={async () => {
            await API.delete(`/tasks/${task._id}`);
            fetchTasks();
          }} style={{ marginLeft: "5px" }}>
            Delete
          </button>
        </div>
      </div>
    ))}

    <button onClick={logout} style={{ marginTop: "20px" }}>
      Logout
    </button>
  </div>
);
}

export default Dashboard;