import { useState } from "react"
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {

  const [showAddTask, setShowAddTask] = useState(false);

  const [taskList, setTaskList] = useState([{
    id: "1",
    text: "Collect Food",
    day: "Feb 5th at 2:30pm",
    reminder: false
  },
  {
    id: "2",
    text: "Collect Items",
    day: "Feb 6th at 3:30pm",
    reminder: true
  },
  {
    id: "3",
    text: "Collect Tickets",
    day: "Feb 7th at 4:30pm",
    reminder: true
  }])

  const addTask = (task) => {
    console.log(task);
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task};
    setTaskList([...taskList, newTask]);
  }

  const deleteTask = (id) => {
    console.log('delete', id);
    setTaskList(taskList.filter((task)=> task.id != id));
  };

  const togglereminder = (id) => {
    console.log(id);
    setTaskList(
      taskList.map((task) => 
        task.id === id ? {...task, reminder: !task.reminder} : task
      )
    );
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {
        taskList.length > 0 ?
        <Tasks taskList={taskList} onDelete={deleteTask} onToggle={togglereminder}/>
        : "No Task left"
      }
    </div>
  );
}

export default App;
