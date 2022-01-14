import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTaskList(tasksFromServer);
    }

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }


  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();
    // console.log(task);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task};
    setTaskList([...taskList, data]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    console.log('delete', id);
    setTaskList(taskList.filter((task) => task.id != id));
  };

  const togglereminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })

    const data = res.json();

    // console.log(id);

    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}


        <Routes>
          <Route path="/" element={
            <>
              {
                taskList.length > 0 ?
                  <Tasks taskList={taskList} onDelete={deleteTask} onToggle={togglereminder} />
                  : "No Task left"
              }
            </>
          } />

          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
