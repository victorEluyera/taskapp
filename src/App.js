import logo from "./logo.svg";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>
        Welcome to my To-do-List
        <TodoList />
      </h2>
    </div>
  );
}

export default App;
