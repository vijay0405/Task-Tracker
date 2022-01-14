import Task from './Task'

const Tasks = ({ taskList, onDelete}) => {
    return (
        <>
            {taskList.map((task) => (
                <Task key={task.id} task={task} onDelete={()=>onDelete(task.id)}/> 
            ))}
        </>
    )
}

export default Tasks
