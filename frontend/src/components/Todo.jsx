import React from "react";
import { motion } from "framer-motion";

const Todo = ({ data, reference }) => {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      dragElastic={0.2}
      className="w-[280px] px-5 py-5 rounded-2xl shadow-lg bg-zinc-700 text-white overflow-hidden"
      layout
    >
      <h3 className="text-lg font-bold">{data.title}</h3>
      <ul className="list-disc list-inside mt-2">
        {data.task.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Todo;
