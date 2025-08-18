import React from "react";
import { motion } from "framer-motion";
import StartButton from "./StartButton";

type GameOverModalProps = {
  reason: "bomb" | "stop";
  onRestart: () => void;
};

const GameOverModal: React.FC<GameOverModalProps> = ({ reason, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      {reason === "bomb" && (
        <motion.div
          className="bg-red-800 text-white rounded-2xl p-6 shadow-2xl w-[320px] text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.5, 1.1, 1],
            opacity: 1,
            x: [0, -10, 10, -10, 10, 0], // тряска
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold mb-4">💣 БОМБА!</h2>
          <p className="mb-4 text-lg">Ти підірвався! Лічильник обнулено.</p>
          <StartButton onRestart={onRestart} />
        </motion.div>
      )}

      {reason === "stop" && (
        <motion.div
          className="bg-yellow-700 text-white rounded-2xl p-6 shadow-2xl w-[320px] text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            boxShadow: [
              "0 0 20px rgba(255,0,0,0.4)",
              "0 0 40px rgba(255,0,0,0.7)",
              "0 0 20px rgba(255,0,0,0.4)",
            ], // пульсація
          }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }}
        >
          <h2 className="text-3xl font-extrabold mb-4">⛔ СТОП!</h2>
          <p className="mb-4 text-lg">
            Ти натрапив на стоп-карту. Гра закінчилась.
          </p>
          <StartButton onRestart={onRestart} />
        </motion.div>
      )}
    </div>
  );
};

export default GameOverModal;
