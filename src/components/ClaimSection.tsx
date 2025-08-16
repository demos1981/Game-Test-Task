import React, { useState } from "react";
import ClaimButton from "./ClaimButton";
import type { ClaimSectionPropsTypes } from "../types/claimSectionProps";
import ModalClaim from "./ModalClaim";

// allOpened / onRevealAll залишився у типі для сумісності, але не використовується зараз
const ClaimSection: React.FC<
  ClaimSectionPropsTypes & {
    disabled: boolean;
    onClaim: () => void;
  }
> = (props) => {
  const { disabled, onClaim } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClaimClick = () => {
    if (disabled) return;
    onClaim();
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <ClaimButton disabled={disabled} onClaim={handleClaimClick} />
      {isModalOpen && (
        <ModalClaim onClose={() => setIsModalOpen(false)}>
          <p className="text-center text-lg">
            Ваши бали зараховані ✅ продовжуйте гру
          </p>
        </ModalClaim>
      )}
    </div>
  );
};

export default ClaimSection;
