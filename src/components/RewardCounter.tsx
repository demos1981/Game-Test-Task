import React from "react";
import type { RewardCounterProps } from "../types/rewardCounter";

const RewardCounter: React.FC<RewardCounterProps> = ({ counter }) => {
  return (
    <div className="mt-5 w-[428px] flex flex-row justify-center items-center">
      <img className="h-[50px]" src="/assets/Cash.svg" alt="Reward Counter" />
      <span className="w-[36px] h-[36px] text-indigo-50 font-extrabold text-4xl">
        {counter}
      </span>
    </div>
  );
};

export default RewardCounter;
