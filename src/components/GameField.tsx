import React, { useState } from "react";
import { motion } from "framer-motion";
import { cardsData } from "../data/cardsData";
import type { FlipCardPropsType } from "../types/flipCard";

const GameField: React.FC<{
  onApply: (fn: (prev: number) => number) => void;
}> = ({ onApply }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[356px] h-[356px] grid grid-cols-3 mt-5">
        {cardsData.map((card) => (
          <FlipCard
            key={card.id}
            front={card.front}
            back={card.back}
            value={card.value}
            op={card.op === "x2" ? "x2" : undefined}
            onApply={onApply}
          />
        ))}
      </div>
    </div>
  );
};

const FlipCard: React.FC<FlipCardPropsType> = ({
  front,
  back,
  value,
  op,
  onApply,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [applied, setApplied] = useState(false);
  const handleClick = () => {
    const willFlipToBack = !flipped;

    // застосовуємо ефект лише при першому відкритті "назад"
    if (willFlipToBack && !applied) {
      if (op === "x2") {
        onApply((prev) => prev * 2); // ⬅ множимо на 2
      } else {
        onApply((prev) => prev + (value ?? 0)); // ⬅ додаємо число
      }
      setApplied(true);
    }

    setFlipped(!flipped);
  };

  return (
    <div
      className="w-full h-full cursor-pointer perspective"
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Передня */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={front} alt="Front" className="w-full h-full" />
        </div>

        {/* Задня */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <img src={back} alt="Back" className="w-full h-full" />
        </div>
      </motion.div>
    </div>
  );
};
export default GameField;
