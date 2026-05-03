import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!task) return;

    await axios.post("http://localhost:5000/add", { text: task });
    setTask("");
    fetchTasks();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>To-Do List</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "10px" }}
      />

      <button onClick={addTask} style={{ padding: "10px", marginLeft: "10px" }}>
        Add
      </button>

      <ul style={{ listStyle: "none", marginTop: "20px" }}>
        {tasks.map((t, i) => (
          <li key={i} style={{ margin: "10px", fontSize: "18px" }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;