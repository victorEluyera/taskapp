import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] =
    useState(() => {
      return JSON.parse(localStorage.getItem("tasks"));
    }) || {};
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from localStorage on mount

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    console.log("Saving to localStorage:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = { text: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((_, i) => i !== id);
    setTasks(updatedTasks);
  };

  // Save Edit
  const saveEdit = (id) => {
    const updatedTasks = tasks.map((task, i) =>
      i === id ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setIsEditing(null);
  };

  // Toggle Task Status
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task, i) =>
      i === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>To-Do-List</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          style={{ width: "70%", padding: "10px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 15px" }}>
          Add
        </button>
        <ul style={{ marginTop: "20px", listStyleType: "none", padding: 0 }}>
          {tasks.map((todo, id) => (
            <li
              key={id}
              style={{
                margin: "10px 0",
                padding: "10px",
                background: "#f0f0f0",
              }}
            >
              {isEditing === id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px" }}
                  />
                  <button
                    onClick={() => saveEdit(id)}
                    style={{
                      padding: "5px 10px",
                      background: "green",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <button
                    onClick={() => {
                      setIsEditing(id);
                      setEditText(todo.text);
                    }}
                    style={{
                      padding: "5px 10px",
                      marginLeft: "10px",
                      background: "blue",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Edit
                  </button>
                </>
              )}

              <button
                onClick={() => handleDeleteTask(id)}
                style={{
                  padding: "5px 10px",
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => toggleTask(id)}
                style={{
                  padding: "5px 10px",
                  background: todo.completed ? "green" : "orange",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                {todo.completed ? "Completed" : "Ongoing"}
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default TodoList;
