import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ModalPropsType as ModalProps } from "../types/modalProps";

const ModalClaim: React.FC<ModalProps> = ({ onClose, children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // запускаємо анімацію виїзду назад
    }, 2000); // 2 сек на паузу

    return () => clearTimeout(timer);
  }, []);

  // коли анімація закінчилась і модалка зникла — викликаємо onClose
  const handleExitComplete = () => {
    if (!visible) onClose();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none"
          initial={{ y: "-100%" }}
          animate={{ y: "30%" }} // зупинка приблизно по центру
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-80 shadow-xl pointer-events-auto relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalClaim;
