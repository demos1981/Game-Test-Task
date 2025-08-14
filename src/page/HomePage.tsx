import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import RewardCounter from "../components/RewardCounter";
import GameField from "../components/GameField";
import TipsField from "../components/TipsField";
import ClaimButton from "../components/ClaimButton";
import TapbarField from "../components/TapbarField";
import HomeIndicator from "../components/HomeIndicator";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="bg-[url('/src/assets/RectangleGreen.svg')]  min-h-dvh min-w-[428px] bg-cover bg-center ">
        <Navbar />
        <Title />
        <RewardCounter />
        <GameField />
        <TipsField />
        <ClaimButton />
        <TapbarField />
        <HomeIndicator />
      </div>
    </>
  );
};

export default HomePage;
