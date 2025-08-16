import React from "react";

const ClaimButton: React.FC<{
  disabled: boolean;
  onClaim: () => void;
}> = ({ disabled, onClaim }) => {
  return (
    <div className="flex justify-center items-center mt-5">
      <button
        onClick={onClaim}
        disabled={disabled}
        className={`w-[348px] h-[48px] rounded-lg border 
          ${
            disabled
              ? "text-gray-300 border-gray-300"
              : "bg-green-500 text-white border-green-500"
          }`}
      >
        Claim
      </button>
    </div>
  );
};

export default ClaimButton;
