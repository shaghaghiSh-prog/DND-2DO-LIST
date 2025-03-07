import { useDrop } from 'react-dnd'
import TaskItem from './TaskItem'

export default function Column({ title, status, tasks, moveTask, deleteTask, updateTask }) {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      moveTask(item.id, null, item.status, status)
    },
  })

  return (
    <div ref={drop} className="bg-gray-700 p-4 rounded-md min-h-[300px]">
      <h2 className="text-xl font-semibold mb-4 text-purple-300">{title}</h2>
      {tasks.map((task, index) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          deleteTask={deleteTask} 
          updateTask={updateTask}
          moveTask={moveTask}
          index={index}
        />
      ))}
    </div>
  )
}

