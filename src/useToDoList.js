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

function useToDoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(items);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskName) => {
    if (taskName.trim() !== "") {
      try {
        const docRef = await addDoc(collection(db, "tasks"), {
          name: taskName,
        });
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: docRef.id, name: taskName },
        ]);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (id, updatedName) => {
    try {
      await updateDoc(doc(db, "tasks", id), { name: updatedName });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, name: updatedName } : task,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    moveTaskUp,
    moveTaskDown,
    loading,
    error,
  };
}

export default useToDoList;
