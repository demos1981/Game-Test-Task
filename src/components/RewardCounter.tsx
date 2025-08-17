import { forwardRef } from "react";

type RewardCounterProps = {
  counter: number;
};

const RewardCounter = forwardRef<HTMLDivElement, RewardCounterProps>(
  ({ counter }, ref) => {
    return (
      <div
        ref={ref}
        className="flex justify-center items-center mt-4 text-xl font-bold text-amber-50"
      >
        <img src="/assets/Cash.svg" alt="Reward Icon" className="mr-2" />
        {counter}
      </div>
    );
  }
);

export default RewardCounter;
