import React, { useState } from "react";
import ClaimButton from "./ClaimButton";
import ModalClaim from "./ModalClaim";
import type { ClaimSectionProps } from "../types/claimSectionProps";

const ClaimSection: React.FC<ClaimSectionProps> = ({
  disabled,
  openedCards,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClaimClick = () => {
    if (disabled) return;
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <ClaimButton disabled={disabled} onClaim={handleClaimClick} />

      {isModalOpen && (
        <ModalClaim
          onClose={() => setIsModalOpen(false)}
          points={openedCards.length}
        >
          <div className="grid grid-cols-3 gap-2 mt-4">
            {openedCards.map((card) => (
              <img
                key={card.id}
                src={card.back}
                alt="Opened card"
                className="w-16 h-16 rounded border-2 border-green-500"
              />
            ))}
          </div>
        </ModalClaim>
      )}
    </div>
  );
};

export default ClaimSection;
