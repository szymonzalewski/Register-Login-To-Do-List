import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Pobieranie danych z Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      setTasks(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    };

    fetchTasks();
  }, []);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if (newTask.trim() !== "") {
      const docRef = await addDoc(collection(db, "tasks"), { name: newTask });
      setTasks((t) => [...t, { id: docRef.id, name: newTask }]);
      setNewTask("");
    }
  }

  async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function updateTask(id, updatedTask) {
    await updateDoc(doc(db, "tasks", id), { name: updatedTask });
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: updatedTask } : task,
      ),
    );
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <span className="text">{task.name}</span>
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}>
              Delete
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              👆
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              👇
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default ToDoList;
