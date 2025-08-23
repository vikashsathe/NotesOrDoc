import React, { useRef, useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import TodoCard from "./TodoCard";
import { motion, AnimatePresence } from "framer-motion";
import server from "../environment";

const FrontSectionContaier = () => {

  const [activeForm, setActiveForm] = useState(null)
  const formRef = useRef(null);

   // Close form if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setActiveForm(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const ref = useRef(null);

  // Notes & Todos state
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);

  // Note form state
  const [formData, setFormData] = useState({ title: "", description: "" });

  // Todo form state
  const [todoTitle, setTodoTitle] = useState("");
  const [tasks, setTasks] = useState([{ id: Date.now(), value: "" }]);

  const [showIcons, setShowIcons] = useState(false);

  // Fetch Notes & Todos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [notesRes, todosRes] = await Promise.all([
          fetch(`${server}/api/notes`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${server}/api/todo`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setNotes(await notesRes.json());
        setTodos(await todosRes.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  // ----------------- Notes -----------------
  const handleNoteChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${server}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setNotes([...notes, data]);
      setFormData({ title: "", description: "" });
      setActiveForm(null)
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${server}/api/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleUpdateNote = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${server}/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      setNotes(notes.map((note) => (note._id === id ? data : note)));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // ----------------- Todos -----------------
  const handleTaskChange = (id, value) =>
    setTasks(tasks.map((task) => (task.id === id ? { ...task, value } : task)));

  const addTask = () =>
    setTasks([...tasks, { id: Date.now(), value: "" }]);

  const removeTask = (id) => {
    if (tasks.length === 1) return;
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    if (!todoTitle || tasks.length === 0) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${server}/api/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: todoTitle,
          task: tasks.map((t) => t.value),
        }),
      });
      const data = await res.json();
      setTodos([...todos, data]);
      setTodoTitle("");
      setTasks([{ id: Date.now(), value: "" }]);
      // setShowTodoForm(false);
      setActiveForm(null)
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${server}/api/todo/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${server}/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="absolute py-22 px-8 top-0 w-full h-screen flex flex-col justify-center items-center">
      <div
        ref={ref}
        className="p-5 gap-5 flex flex-wrap justify-start w-full h-screen items-start overflow-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            data={note}
            reference={ref}
            onDelete={() => handleDeleteNote(note._id)}
            onUpdate={handleUpdateNote}
          />
        ))}

        {todos.map((todo) => (
          <TodoCard
            key={todo._id}
            data={todo}
            reference={ref}
            onDelete={() => handleDeleteTodo(todo._id)}
            onUpdate={handleUpdateTodo}
          />
        ))}

        {/* Add Button */}
        <div
          className="absolute bottom-10 right-[50px] rounded-full p-[2px] bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]"
          onMouseEnter={() => setShowIcons(true)}
        >
          <div className="bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer">
            <i className="ri-add-large-line text-4xl p-2 text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]"></i>
          </div>
        </div>
      </div>

      {/* Note Form */}
      <AnimatePresence>
        {activeForm === 'note' && (
          <motion.div
            drag
            dragConstraints={ref}
            ref={formRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute newNoteForm bg-zinc-500 w-2/6 min-h-1/2 p-5 rounded-xl shadow-lg text-white"
          >
            <div className="flex justify-between items-center">
              <i
                onClick={() => (
                  setActiveForm(null)
                )}
                className="ri-close-line text-2xl cursor-pointer"
              ></i>
              <h5>Create New Note</h5>
            </div>
            <form onSubmit={handleNoteSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                required
                value={formData.title}
                onChange={handleNoteChange}
                className="w-full px-4 py-3 border rounded mt-5"
              />
              <textarea
                name="description"
                placeholder="Description"
                required
                value={formData.description}
                onChange={handleNoteChange}
                className="w-full h-44 border px-4 py-3 rounded mt-3"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded mt-5"
              >
                Add Note
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Todo Form */}
      <AnimatePresence>
        {activeForm === 'todo' && (
          <motion.div
            drag
            dragConstraints={ref}
            ref={formRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute newTodoForm bg-zinc-600 w-2/5 h-1/2 px-10 py-5 rounded-xl shadow-lg text-white overflow-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <form onSubmit={handleTodoSubmit}>
              <div className="flex justify-between items-center">
                <i
                  onClick={() => setActiveForm(null)}
                  className="ri-close-line text-3xl cursor-pointer"
                ></i>
                <h5>Create ToDo</h5>
              </div>
              <input
                type="text"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full px-4 py-2 border rounded mt-5"
              />
              <ol className="mt-2 list-decimal list-inside">
                {tasks.map((task, idx) => (
                  <li key={task.id} className="flex items-center gap-2 relative">
                    <input
                      type="text"
                      value={task.value}
                      onChange={(e) =>
                        handleTaskChange(task.id, e.target.value)
                      }
                      placeholder={`Task ${idx + 1}`}
                      required
                      className="w-full px-4 py-2 border rounded mt-2"
                    />
                    <i
                      className="ri-close-line text-3xl cursor-pointer absolute right-2 mt-2"
                      onClick={() => removeTask(task.id)}
                    ></i>
                  </li>
                ))}
              </ol>
              <div className="flex justify-between mt-5">
               
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded"
                >
                  Save Todo
                </button>
                 <p
                  onClick={addTask}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded cursor-pointer"
                >
                  Add Task
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Icons */}
      <AnimatePresence>
        {showIcons && (
          <motion.div
            onMouseLeave={() => setShowIcons(false)}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-4xl absolute bottom-10 right-30 flex flex-col gap-2"
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer"
              onClick={() => (
                 setActiveForm("todo")
              )}
            >
              <i className="ri-todo-line text-yellow-500"></i>
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer"
              onClick={() => (
                setActiveForm('note')
              )}
            >
              <i className="ri-sticky-note-add-line text-yellow-500"></i>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FrontSectionContaier;
