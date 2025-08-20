import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Document, Paragraph, TextRun, Packer } from "docx";
import { saveAs } from "file-saver";

const Card = ({ data, reference, onDelete, onUpdate }) => {
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
    const updatedData = { ...tempData };
    onUpdate(data._id, updatedData);
    setTempData(updatedData); 
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
            new Paragraph({
              children: [
                new TextRun({
                  text: tempData.title || "No Title",
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [new TextRun(tempData.description || "No description")],
            }),
            new Paragraph({
              children: [new TextRun(`File Size: ${data.fileSize || "N/A"}`)],
            }),
            new Paragraph({
              children: [
                new TextRun(
                  `Tag: ${data.tag?.isOpen ? data.tag.tagTitle : "No tag"}`
                ),
              ],
            }),
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
      onDoubleClick={() => setIsEditing(!isEditing)}
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      dragElastic={0.2}
      className="h-[290px] w-[250px] relative px-5 py-5 rounded-2xl overflow-hidden shadow-lg"
      style={{ backgroundColor: tempData.color || "#3F3F47" }}
    >
      <div className="flex justify-between items-center mb-2">
        <i className="ri-file-line text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]"></i>
        <div className="flex gap-2">
          <i
            onClick={onDelete}
            className="ri-close-line text-gray-300 text-xl cursor-pointer"
          ></i>
        </div>
      </div>

      {isEditing ? (
        <div className="flex flex-col">
          <input
            name="title"
            value={tempData.title}
            onChange={handleChange}
            className="text-white text-sm capitalize"
          />
          <textarea
            name="description"
            value={tempData.description}
            onChange={handleChange}
            className="text-sm mt-2 text-white capitalize min-h-[120px]"
            style={{ scrollbarWidth: "none" }}
          />

          {/* color palette */}
          <div onMouseLeave={togglePalette} className="flex items-center gap-2">
            <i
              onMouseEnter={togglePalette}
              className="ri-palette-fill text-gray-300 text-xl cursor-pointer"
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

          <i
            onClick={handleSave}
            className="absolute bottom-12 right-5 text-yellow-500 ri-check-double-line text-2xl cursor-pointer"
          ></i>
          
        </div>
      ) : (
        <>
          <h5 className="text-sm text-white capitalize">{tempData.title}</h5>
          <p
            className="text-sm mt-2 text-white capitalize min-h-[120px]"
            style={{ scrollbarWidth: "none" }}
          >
            {tempData.description}
          </p>
        </>
      )}

      <div className="absolute bottom-4 left-0 w-full flex justify-between items-center px-5 text-gray-300 text-xs">
        <span>{createdDate.split(",")[0]}</span>
        <i
          onClick={handleShare}
          className="ri-download-fill text-xl  cursor-pointer"
        ></i>
      </div>
    </motion.div>
  );
};

export default Card;




