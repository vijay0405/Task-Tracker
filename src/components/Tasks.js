const Tasks = ({taskList}) => {
    return (
        <>
            {taskList.map((task) => (
                <h3 key={task.id}>{task.text}</h3>
            ))}
        </>
    )
}

export default Tasks
