import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import RewardCounter from "../components/RewardCounter";
import GameField from "../components/GameField";
import TipsField from "../components/TipsField";

import TapbarField from "../components/TapbarField";
import Background from "../components/Background";

const HomePage: React.FC = () => {
  const [score, setScore] = useState(0);
  const rewardCounterRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div className="relative min-h-dvh min-w-[428px] overflow-hidden">
        <Background />
        <div className="relative z-10">
          <Navbar />
          <Title />
          <RewardCounter ref={rewardCounterRef} counter={score} />
          <GameField onApply={setScore} rewardCounterRef={rewardCounterRef} />
          <TipsField />

          <TapbarField />
        </div>
      </div>
    </>
  );
};

export default HomePage;
