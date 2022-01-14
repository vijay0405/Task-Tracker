import { useState } from "react"
import Header from './components/Header';
import Tasks from './components/Tasks';

function App() {

  const [taskList, setTaskList] = useState([{
    id: "1",
    text: "Collect Food",
    day: "Feb 5th at 2:30pm",
    remainder: false
  },
  {
    id: "2",
    text: "Collect Items",
    day: "Feb 6th at 3:30pm",
    remainder: true
  },
  {
    id: "3",
    text: "Collect Tickers",
    day: "Feb 7th at 4:30pm",
    remainder: true
  }])

  const deleteTask = (id) => {
    console.log('delete', id);
    setTaskList(taskList.filter((task)=> task.id != id));
  };

  return (
    <div className="container">
      <Header />
      {
        taskList.length > 0 ?
        <Tasks taskList={taskList} onDelete={deleteTask}/>
        : "No Task left"
      }
    </div>
  );
}

export default App;
