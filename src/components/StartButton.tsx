import React from "react";
import { motion } from "framer-motion";

type StartButtonProps = {
  onRestart: () => void;
};

const StartButton: React.FC<StartButtonProps> = ({ onRestart }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onRestart}
      className="px-6 py-3 mt-6 bg-green-600 text-white font-bold rounded-2xl shadow-lg hover:bg-green-700 transition"
    >
      🔄 Почати спочатку
    </motion.button>
  );
};

export default StartButton;
