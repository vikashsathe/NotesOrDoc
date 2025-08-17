
import React from "react";
import { motion } from "motion/react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const Card = ({ data, reference }) => {
  // format date from DB
  const createdDate = new Date(data.createdAt).toLocaleString();

   // ✅ Share function
 const handleShare = () => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: data.title, bold: true, size: 28 })],
          }),
          new Paragraph({
            children: [new TextRun(data.description || "No description")],
          }),
          new Paragraph({
            children: [new TextRun(`File Size: ${data.fileSize || "N/A"}`)],
          }),
          new Paragraph({
            children: [new TextRun(`Tag: ${data.tag?.isOpen ? data.tag.tagTitle : "No tag"}`)],
          }),
          new Paragraph({
            children: [new TextRun(`Created At: ${createdDate}`)],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${data.title || "note"}.docx`);
  });
};

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      dragElastic={0.2}
      className="h-[290px] w-[250px] relative bg-zinc-700 text-zinc-100 px-5 py-5 capitalize rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Header */}
      <div className="flex gap-3 justify-between text-3xl">
        <i className="ri-file-line text-2xl bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335] text-transparent bg-clip-text"></i>
        <i class="ri-close-line"></i>
        
      </div>

      <h5 className="mt-2 text-sm">{data.title}</h5>
      <h6 className="mt-2 text-xs">{data.description}</h6>

      {/* ✅ Show createdAt from DB */}
      <div className="bottom-4 absolute w-full left-0 text-gray-500 text-xs flex justify-between items-center px-5">
        <p className="">{createdDate}</p>
        <i onClick={handleShare} className="ri-download-fill text-2xl cursor-pointer"></i>
      </div>
    </motion.div>
  );
};

export default Card;


