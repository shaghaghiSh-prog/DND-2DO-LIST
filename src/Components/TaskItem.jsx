import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { XCircle, Edit2, Check } from 'lucide-react'

export default function TaskItem({ task, deleteTask, updateTask, moveTask, index }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, index, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'TASK',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      
      if (dragIndex === hoverIndex) {
        return
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      moveTask(item.id, task.id, item.status, task.status)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  const handleUpdate = () => {
    updateTask(task.id, editText)
    setIsEditing(false)
  }

  return (
    <div
      ref={ref}
      className={`p-3 mb-2 bg-gray-600 rounded-md shadow-md flex justify-between items-center cursor-move ${
        isDragging ? 'opacity-50' : ''
      } ${task.status === 'done' ? 'bg-red-700 line-through' : ''}`}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-grow bg-gray-700 text-white p-1 rounded"
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
          autoFocus
        />
      ) : (
        <span className="flex-grow">{task.text}</span>
      )}
      <div className="flex space-x-2">
        {task.status !== 'done' && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-400 hover:text-blue-300 focus:outline-none"
          >
            {isEditing ? <Check size={20} /> : <Edit2 size={20} />}
          </button>
        )}
        {task.status === 'done' && (
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-400 focus:outline-none"
          >
            <XCircle size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

