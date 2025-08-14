import React from "react";

const RewardCounter: React.FC = () => {
  return (
    <div className="mt-5 w-[428px] flex flex-row justify-center items-center">
      <img
        className="h-[50px]"
        src="src/assets/Cash.svg"
        alt="Reward Counter"
      />
      <span className="w-[36px] h-[36px] text-indigo-50 font-extrabold text-4xl">
        0
      </span>
    </div>
  );
};

export default RewardCounter;
