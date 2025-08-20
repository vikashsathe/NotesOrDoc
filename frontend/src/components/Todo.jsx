import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Document, Paragraph, TextRun, Packer } from "docx";
import { saveAs } from "file-saver";

const Todo = ({ data, reference, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...data });

  const [isOpen, setIsOpen] = useState(false);

  const togglePalette = () => setIsOpen(!isOpen);

  useEffect(() => {
    setTempData({ ...data });
  }, [data]);

  const createdDate = new Date(data.createdAt).toLocaleString();

  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(data._id, tempData);
    setIsEditing(false);
  };

  const handleShare = () => {
    const createdDate = data.createdAt
      ? new Date(data.createdAt).toLocaleString()
      : "Unknown date";

    const doc = new Document({
      sections: [
        {
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: tempData.title || "No Title",
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            // Tasks (convert array into paragraphs)
            ...(Array.isArray(tempData.task) && tempData.task.length > 0
              ? tempData.task.map(
                  (t) =>
                    new Paragraph({
                      children: [new TextRun(t)],
                    })
                )
              : [new Paragraph("No Task")]),

            // File size
            new Paragraph({
              children: [new TextRun(`File Size: ${data.fileSize || "N/A"}`)],
            }),

            // Tag
            new Paragraph({
              children: [
                new TextRun(
                  `Tag: ${data.tag?.isOpen ? data.tag.tagTitle : "No tag"}`
                ),
              ],
            }),

            // Created date
            new Paragraph({
              children: [new TextRun(`Created At: ${createdDate}`)],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${tempData.title || "note"}.docx`);
    });
  };



  return (
    <motion.div
      drag
      dragConstraints={reference}
      onDoubleClick={() => setIsEditing(!isEditing)}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      dragElastic={0.2}
      className="w-[280px] relative rounded-2xl px-5 py-3 shadow-lg overflow-hidden"
      style={{ backgroundColor: tempData.color || "#3F3F47" }}
      layout
    >

      {/* Header Note  */}
      <div className="todoCardHeader w-full bg-transparent text-white absolute top-0 left-0">
<div className="px-5 py-2 flex justify-between text-zinc-950">
  <div onMouseLeave={togglePalette} className="flex items-center gap-2">
            <i
              onMouseEnter={togglePalette}
              className="ri-palette-fill text-xl cursor-pointer"
            ></i>
            <div
              className={`flex gap-1 transition-all duration-300 overflow-hidden ${
                isOpen ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              {[
                "#3F3F47",
                "#34d399",
                "#60a5fa",
                "#f87171",
                "#fbbf24",
                "#a78bfa",
                "#f472b6",
                "#22d3ee",
              ].map((clr) => (
                <div
                  key={clr}
                  className="w-4 h-4 border-[0.5px] rounded-full cursor-pointer"
                  style={{ backgroundColor: clr }}
                  onClick={() => setTempData({ ...tempData, color: clr })}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex gap-1">
   <i onClick={handleShare} className="ri-download-fill text-xl  cursor-pointer"></i>
   <i onClick={() => onDelete(data._id)} className="ri-close-line text-xl cursor-pointer"></i>
   </div>
</div>
      </div>
 

      {/* Content */}
      {isEditing ? (
        <div className="mt-10 flex flex-col">
          <input
            name="title"
            value={tempData.title}
            onChange={handleChange}
            className="text-white text-sm capitalize w-full"
          />
          <input
            name="task"
            value={tempData.task.join("\n")}
            onChange={(e) =>
              setTempData({ ...tempData, task: e.target.value.split("\n") })
            }
            className="text-sm mt-2 text-white capitalize w-full"
          />
        
           <i onClick={handleSave} className="ri-check-double-line text-xl cursor-pointer mb-20"></i>
        </div>
      ) : (
        <>
          <h3 className="text-sm text-white capitalize mt-10">{data.title}</h3>
          
<ul className="text-sm text-white capitalize mt-2 mb-10">
  {data.task.map((t, i) => (
    <li key={i} className="flex gap-2 items-center">
      <input
        type="checkbox"
        className=" peer h-3 w-3 cursor-pointer rounded-4xl
    appearance-none border-[0.3px] border-zinc-900
    checked:bg-zinc-950 focus:outline-none"
        id={`task-${i}`}
      />
      <label
        htmlFor={`task-${i}`}
        className="cursor-pointer peer-checked:line-through peer-checked:text-zinc-900"
      >
        {t}
      </label>
    </li>
  ))}
</ul>


        </>
      )}

      {/* Footer */}
      <div className="absolute bottom-2 left-0 w-full flex justify-between items-center px-5 text-gray-300 text-xs">
        <span className="text-[10px]">{createdDate.split(",")[0]}</span>
          <i className="ri-task-line text-2xl text-zinc-950"></i>
      </div>
    </motion.div>
  );
};

export default Todo;
