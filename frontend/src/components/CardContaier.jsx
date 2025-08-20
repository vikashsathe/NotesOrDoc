import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import Todo from "./Todo";
import { motion, AnimatePresence } from "framer-motion";

const CardContainer = () => {
  const ref = useRef(null);

  // Notes & Todos state
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);

  // Note form state
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [showNoteForm, setShowNoteForm] = useState(false);

  // Todo form state
  const [todoTitle, setTodoTitle] = useState("");
  const [tasks, setTasks] = useState([{ id: Date.now(), value: "" }]);
  const [showTodoForm, setShowTodoForm] = useState(false);

  // Fetch Notes & Todos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [notesRes, todosRes] = await Promise.all([
          fetch("http://localhost:3000/api/notes", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:3000/api/todo", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setNotes(await notesRes.json());
        setTodos(await todosRes.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle Note input
  const handleNoteChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setNotes([...notes, data]);
      setFormData({ title: "", description: "" });
      setShowNoteForm(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Handle Todo input
  const handleTaskChange = (id, value) =>
    setTasks(tasks.map((task) => (task.id === id ? { ...task, value } : task)));

  const addTask = () => setTasks([...tasks, { id: Date.now(), value: "" }]);

  const removeTask = (id) => {
    if (tasks.length === 1) return; // Keep at least one
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    if (!todoTitle || tasks.length === 0) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: todoTitle, task: tasks.map((t) => t.value) }),
      });
      const data = await res.json();
      setTodos([...todos, data]);
      setTodoTitle("");
      setTasks([{ id: Date.now(), value: "" }]);
      setShowTodoForm(false);
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Delete / Update Note
  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/notes/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleUpdateNote = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      setNotes(notes.map((note) => (note._id === id ? data : note)));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };


  return (
    <div className="absolute py-22 px-8 top-0 w-full h-screen flex flex-col justify-center items-center">
      <div ref={ref} className="p-5 gap-5 flex flex-wrap justify-start w-full h-screen items-start overflow-scroll" style={{scrollbarWidth:"none"}}>
        {notes.map((note, idx) => (
          <Card key={note._id || idx} data={note} reference={ref} onDelete={() => handleDeleteNote(note._id)} onUpdate={handleUpdateNote} />
        ))}
        {/* <Todo reference={ref} todos={todos} /> */}
        {todos.map((todo, index) => (
  <Todo key={todo._id || index} data={todo} reference={ref} />
))}


        {/* Add Button */}
        <div className="absolute bottom-10 right-[50px] rounded-full p-[2px] bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]">
          <div className="bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer">
            <i className="ri-add-large-line text-4xl p-2 text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]"
               onClick={() => { setShowNoteForm(!showNoteForm); setShowTodoForm(!showTodoForm); }}></i>
          </div>
        </div>
      </div>

      {/* Note Form */}
      {showNoteForm && (
        <motion.div drag dragConstraints={ref} className="absolute bg-zinc-500 cursor-crosshair w-2/6 min-h-1/2 p-5 rounded-xl shadow-lg text-white">
          <div className="flex justify-between items-center">
            <i className="ri-close-line text-2xl cursor-pointer" onClick={() => setShowNoteForm(false)}></i>
            <h5>Create New Note</h5>
          </div>
          <form onSubmit={handleNoteSubmit}>
            <input type="text" name="title" placeholder="Title" required value={formData.title} onChange={handleNoteChange} className="w-full px-4 py-3 border rounded mt-5"/>
            <textarea name="description" placeholder="Description" required value={formData.description} onChange={handleNoteChange} className="w-full h-44 border px-4 py-3 rounded mt-3"/>
            <button type="submit" className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded mt-5">Add Note</button>
          </form>
        </motion.div>
      )}

      {/* Todo Form */}
      {showTodoForm && (
        <motion.div drag dragConstraints={ref} className="absolute bg-zinc-600 w-2/5 h-1/2 px-10 py-5 rounded-xl shadow-lg text-white overflow-scroll" style={{scrollbarWidth:"none"}}>
          <form onSubmit={handleTodoSubmit}>
            <div className="flex justify-between items-center">
              <i className="ri-close-line text-3xl cursor-pointer" onClick={() => setShowTodoForm(false)}></i>
              <h5>Create ToDo</h5>
            </div>
            <input type="text" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} placeholder="Title" required className="w-full px-4 py-2 border rounded mt-5"/>
            <ol className="mt-2 list-decimal list-inside">
              {tasks.map((task, idx) => (
                <li key={task.id} className="flex items-center gap-2 relative">
                  <input type="text" value={task.value} onChange={(e) => handleTaskChange(task.id, e.target.value)} placeholder={`Task ${idx + 1}`} required className="w-full px-4 py-2 border rounded mt-2"/>
                  <i className="ri-close-line text-3xl cursor-pointer absolute right-2 mt-2" onClick={() => removeTask(task.id)}></i>
                </li>
              ))}
            </ol>
            <div className="flex justify-between mt-5">
              <p onClick={addTask} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded cursor-pointer">Add Task</p>
              <button type="submit" className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded">Save Todo</button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default CardContainer;
