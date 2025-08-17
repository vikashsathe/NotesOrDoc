// import React, { useRef, useState } from "react";
// import Card from "./Card";
// import { motion } from "motion/react";

// const CardContaier = () => {

//     const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/api/notes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log("Saved:", data);
//       alert("Note saved successfully!");
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const ref = useRef(null);
//   const data = [
//     {
//       title: "This is demo1",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, ipsum.",
//       fileSize: "0.9mb",
//       close: false,
//       tag: {
//         isOpen: true,
//         tagTitle: "Download Now",
//         tagColor: "blue",
//       },
//     },
//     {
//       title: "This is demo2",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, ipsum.",
//       fileSize: "0.9mb",
//       close: true,
//       tag: {
//         isOpen: true,
//         tagTitle: "Progress bar",
//         tagColor: "green",
//       },
//     },
//     {
//       title: "This is demo3",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, ipsum.",
//       fileSize: "0.9mb",
//       close: false,
//       tag: {
//         isOpen: false,
//         tagTitle: "Download Now",
//         tagColor: "green",
//       },
//     },
//   ];

//   const newNoteForm = () => {
//     const newNoteForm = document.querySelector(".newNoteForm")
//     newNoteForm.classList.remove("hidden")
//   };
//   const CloseNewForm = () => {
//      const newNoteForm = document.querySelector(".newNoteForm")
//     newNoteForm.classList.add("hidden")
//     console.log("close")
//   };
//   return (
//     <div className="absolute py-22 px-8 top-0 w-full h-screen flex flex-col justify-center items-center">
//       <div
//         ref={ref}
//         className="p-5 gap-5 flex justify-start w-full h-screen items-start flex-wrap max-h-full overflow-scroll scroll-smooth"
//         style={{ scrollbarWidth: "none" }}
//       >
//         {data.map((item, idx) => (
//           <Card data={item} reference={ref} />
//         ))}

//         <div
//           onClick={newNoteForm}
//           className="absolute bottom-10 right-[50px] rounded-full p-[2px] 
//                 bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]"
//         >
//           <div className="bg-zinc-800 rounded-full p-2 flex items-center justify-center">
//             <i className="ri-add-large-line text-4xl bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335] text-transparent bg-clip-text"></i>
//           </div>
//         </div>
//       </div>

//      <motion.div drag className="absolute cursor-crosshair w-2/6 min-h-1/2 bg-zinc-600 p-5 rounded-xl shadow-lg newNoteForm hidden bg-blue-600 text-white">
//      <div className="flex justify-between">
//         <i onClick={CloseNewForm} class="ri-close-line text-2xl cursor-pointer"></i>
//         <i class="ri-palette-fill text-2xl cursor-pointer"></i>
//         </div>
//      <form onSubmit={handleSubmit}>


//       <input
//   type="text"
//   name="title"
//   placeholder="Enter Your Title"
//   required
//   value={formData.title}
//   onChange={handleChange}
//   className="w-full px-4 py-3 border border-zinc-800 rounded mt-5"
// />
   

//           <br />
//           <br />

//           <textarea
//   name="description"
//   placeholder="Enter Note Description"
//   required
//   value={formData.description}
//   onChange={handleChange}
//   className="w-full h-[180px] border border-zinc-800 px-4 py-3 rounded"
// />
//           <br />
//           <br />

//           <button
//             type="submit"
//             className="p-2 w-1/2 cursor-pointer text-xl rounded bg-zinc-700"
//           >
//             Add Note
//           </button>
//         </form>
 
// </motion.div>

//     </div>
//   );
// };

// export default CardContaier;






// // import React, { useState } from "react";

// // const NoteForm = () => {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await fetch("http://localhost:5000/api/notes", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();
// //       console.log("Saved:", data);
// //       alert("Note saved successfully!");
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };




import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import { motion } from "motion/react";

const CardContaier = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [notes, setNotes] = useState([]); // ✅ store all notes here
  const ref = useRef(null);

  // Fetch notes when page loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notes");
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Saved:", data);

      // add new note into state
      setNotes([...notes, data]);

      // clear input
      setFormData({ title: "", description: "" });

      alert("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Open/close form
  const newNoteForm = () => {
    document.querySelector(".newNoteForm").classList.remove("hidden");
  };
  const CloseNewForm = () => {
    document.querySelector(".newNoteForm").classList.add("hidden");
  };

  return (
    <div className="absolute py-22 px-8 top-0 w-full h-screen flex flex-col justify-center items-center">
      <div
        ref={ref}
        className="p-5 gap-5 flex justify-start w-full h-screen items-start flex-wrap max-h-full overflow-scroll scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {/* ✅ render notes */}
        {notes.map((item, idx) => (
          <Card key={idx} data={item} reference={ref} />
        ))}

        {/* Add note button */}
        <div
          onClick={newNoteForm}
          className="absolute bottom-10 right-[50px] rounded-full p-[2px] 
            bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]"
        >
          <div className="bg-zinc-800 rounded-full p-2 flex items-center justify-center">
            <i className="ri-add-large-line text-4xl bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335] text-transparent bg-clip-text"></i>
          </div>
        </div>
      </div>

      {/* Form popup */}
      <motion.div
        drag
        className="absolute cursor-crosshair w-2/6 min-h-1/2 bg-zinc-600 p-5 rounded-xl shadow-lg newNoteForm hidden bg-blue-600 text-white"
      >
        <div className="flex justify-between">
          <i
            onClick={CloseNewForm}
            className="ri-close-line text-2xl cursor-pointer"
          ></i>
          <i className="ri-palette-fill text-2xl cursor-pointer"></i>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Your Title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-zinc-800 rounded mt-5"
          />
          <br />
          <br />

          <textarea
            name="description"
            placeholder="Enter Note Description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full h-[180px] border border-zinc-800 px-4 py-3 rounded"
          />
          <br />
          <br />

          <button
            type="submit"
            className="p-2 w-1/2 cursor-pointer text-xl rounded bg-zinc-700"
          >
            Add Note
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CardContaier;
