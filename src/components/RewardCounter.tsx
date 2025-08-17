import React from "react";

type RewardCounterProps = {
  counter: number;
};

const RewardCounter = React.forwardRef<HTMLImageElement, RewardCounterProps>(
  ({ counter }, ref) => (
    <div className="flex items-center gap-2">
      <img ref={ref} src="/coin.png" alt="Coin" className="w-10 h-10" />
      <span className="text-xl font-bold">{counter}</span>
    </div>
  )
);

export default RewardCounter;
