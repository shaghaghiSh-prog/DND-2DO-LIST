"use client";

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskInput from "./TaskInput";
import Column from "./Column";

function Home() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text, status: "unprogress" },
    ]);
  };

  const moveTask = (dragIndex, hoverIndex, sourceStatus, targetStatus) => {
    const dragTask = tasks.find((task) => task.id === dragIndex);
    const updatedTasks = tasks.filter((task) => task.id !== dragIndex);

    const targetIndex = updatedTasks.findIndex(
      (task) => task.id === hoverIndex
    );

    updatedTasks.splice(targetIndex, 0, { ...dragTask, status: targetStatus });

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
            Drag & Drop To-Do List
          </h1>
          <TaskInput onAdd={addTask} />
          <div className="grid grid-cols-1 items-center justify-center content-center md:grid-cols-3 gap-6 mt-8">
            <Column 
              title="Unprogress"
              status="unprogress"
              tasks={tasks.filter((t) => t.status === "unprogress")}
              moveTask={moveTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
            <Column
              title="In Progress..."
              status="inprogress"
              tasks={tasks.filter((t) => t.status === "inprogress")}
              moveTask={moveTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
            <Column
              title="Done"
              status="done"
              tasks={tasks.filter((t) => t.status === "done")}
              moveTask={moveTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default Home;
