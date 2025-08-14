import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import RewardCounter from "../components/RewardCounter";
import GameField from "../components/GameField";
import TipsField from "../components/TipsField";
import ClaimButton from "../components/ClaimButton";
import TapbarField from "../components/TapbarField";
import Background from "../components/Background";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="relative min-h-dvh min-w-[428px] overflow-hidden">
        
        <Background/>
        <div className="relative z-10">
          <Navbar />
          <Title />
          <RewardCounter />
          <GameField />
          <TipsField />
          <ClaimButton />
          <TapbarField />
        </div>
      </div>
    </>
  );
};

export default HomePage;
