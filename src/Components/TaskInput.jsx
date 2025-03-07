import { useState } from 'react'

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Add a new task..."
    className="w-2/4 p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
  <button
    type="submit"
    className="bg-purple-600 text-white px-6 py-3 rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
  >
    Add
  </button>
</form>

  )
}

