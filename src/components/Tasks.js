import Task from './Task'

const Tasks = ({ taskList, onDelete, onToggle}) => {
    return (
        <>
            {taskList.map((task, index) => (
                <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle}/> 
            ))}
        </>
    )
}

export default Tasks
