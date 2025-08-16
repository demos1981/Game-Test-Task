import React from "react";
import type { ModalPropsType as ModalProps } from "../types/modalProps";

const ModalClaim: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-80 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
export default ModalClaim;
