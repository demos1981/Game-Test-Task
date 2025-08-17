import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cardsData } from "../data/cardsData";
import ClaimSection from "./ClaimSection";

type Card = {
  id: number;
  front: string;
  back: string;
  value?: number;
  op?: string; // наприклад "x2"
};

type GameFieldProps = {
  onApply: React.Dispatch<React.SetStateAction<number>>;
  rewardCounterRef: React.RefObject<HTMLDivElement | null>; // <-- дозволяємо null
};

const GameField: React.FC<GameFieldProps> = ({ onApply, rewardCounterRef }) => {
  const [openedCards, setOpenedCards] = useState<Card[]>([]);
  const [flyingItems, setFlyingItems] = useState<
    {
      id: number;
      img: string;
      value?: number;
      op?: string;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }[]
  >([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const applyCardValue = (
    card: { value?: number; op?: string },
    prev: number
  ): number => (card.op === "x2" ? prev * 2 : prev + (card.value ?? 0));

  const handleCardOpen = (
    card: Card,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (openedCards.some((c) => c.id === card.id)) return;

    setOpenedCards((prev) => [...prev, card]);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const counterRect = rewardCounterRef.current?.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (counterRect && containerRect) {
      setFlyingItems((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          img: card.back,
          value: card.value,
          op: card.op,
          startX: rect.left - containerRect.left,
          startY: rect.top - containerRect.top,
          endX:
            counterRect.left -
            containerRect.left +
            counterRect.width / 2 -
            rect.width / 4,
          endY:
            counterRect.top -
            containerRect.top +
            counterRect.height / 2 -
            rect.height / 4,
        },
      ]);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-center items-center"
    >
      {/* Сітка карт */}
      <div className="w-[356px] h-[356px] grid grid-cols-3 mt-5">
        {cardsData.map((card) => (
          <FlipCard
            key={card.id}
            card={card}
            isOpened={openedCards.some((c) => c.id === card.id)}
            onOpen={(e) => handleCardOpen(card, e)}
          />
        ))}
      </div>

      {/* Літаючі копії картинок (після доліту — нарахування) */}
      {flyingItems.map((item) => (
        <motion.img
          key={item.id}
          src={item.img}
          className="absolute w-16 h-16 rounded-lg shadow-lg pointer-events-none"
          initial={{ x: item.startX, y: item.startY, opacity: 1, scale: 1 }}
          animate={{ x: item.endX, y: item.endY, opacity: 0, scale: 0.3 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => {
            onApply((prev) =>
              applyCardValue({ value: item.value, op: item.op }, prev)
            );
            setFlyingItems((prev) => prev.filter((f) => f.id !== item.id));
          }}
        />
      ))}

      {/* ClaimSection: тепер ПЕРЕДАЄМО openedCards */}
      <ClaimSection
        disabled={openedCards.length === 0}
        openedCards={openedCards}
      />
    </div>
  );
};

const FlipCard: React.FC<{
  card: Card;
  isOpened: boolean;
  onOpen: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ card, isOpened, onOpen }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!flipped) onOpen(e);
    setFlipped(true);
  };

  return (
    <div
      className={`w-full h-full cursor-pointer perspective ${
        isOpened ? "ring-2 ring-yellow-400" : ""
      }`}
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
          <img src={card.front} alt="Front" className="w-full h-full" />
        </div>
        {/* Задня */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <img src={card.back} alt="Back" className="w-full h-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default GameField;
