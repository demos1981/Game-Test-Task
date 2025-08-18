import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ModalClaimProps = {
  onClose: () => void;
  points: number;
  children?: React.ReactNode;
};

const ModalClaim: React.FC<ModalClaimProps> = ({
  onClose,
  points,
  children,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Модалка */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-xl p-6 w-[360px] max-w-[90%] text-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Кнопка закриття */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold text-gray-800">Відкриті картки</h2>
          <p className="text-sm text-gray-500 mt-1">
            Ти відкрив <span className="font-semibold">{points}</span> карток
          </p>

          {/* Картки */}
          <div className="mt-4 grid grid-cols-3 gap-3 justify-items-center">
            {React.Children.map(children, (child, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {child}
              </motion.div>
            ))}
          </div>

          {/* Ок кнопка */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            Claim
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalClaim;
