import React, { useState } from "react";
import ClaimButton from "./ClaimButton";
import type { ClaimSectionPropsTypes } from "../types/claimSectionProps";
import ModalClaim from "./ModalClaim";

const ClaimSection: React.FC<ClaimSectionPropsTypes> = (props) => {
  const { disabled, onClaim } = props;

  // збереження скільки балів додано при останньому натисканні
  const [addedPoints, setAddedPoints] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClaimClick = () => {
    if (disabled) return;

    // onClaim тепер повинен повертати кількість доданих балів
    const points = onClaim();
    setAddedPoints(points);

    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <ClaimButton disabled={disabled} onClaim={handleClaimClick} />

      {isModalOpen && addedPoints !== null && (
        <ModalClaim onClose={() => setIsModalOpen(false)} points={addedPoints}>
          <p className="text-center text-sm text-gray-500">Продовжуйте гру</p>
        </ModalClaim>
      )}
    </div>
  );
};

export default ClaimSection;
