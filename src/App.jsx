import ToDoList from "./ToDoList.jsx";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function App() {
  return <ToDoList />;
}
export default App;
