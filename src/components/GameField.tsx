import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cardsData } from "../data/cardsData";
import ClaimSection from "./ClaimSection";
import ModalClaim from "./ModalClaim";

type Card = {
  id: number;
  front: string;
  back: string;
  value?: number;
  op?: string; // "x2" або "+"
  effect?: string;
};

type FlyingItem = {
  id: number;
  img: string;
  value?: number;
  op?: string;

  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

type GameFieldProps = {
  onApply: React.Dispatch<React.SetStateAction<number>>;
  // ВАЖЛИВО: ref саме на <img> у RewardCounter
  rewardCounterRef: React.RefObject<HTMLImageElement | null>;
};

const FLY_SIZE = 64; // відповідає класам w-16 h-16

const GameField: React.FC<GameFieldProps> = ({ onApply, rewardCounterRef }) => {
  const [openedCards, setOpenedCards] = useState<Card[]>([]);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState<"stop" | "bomb" | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  const applyCardValue = (
    card: { value?: number; op?: string },
    prev: number
  ) => (card.op === "x2" ? prev * 2 : prev + (card.value ?? 0));

  const handleCardOpen = (
    card: Card,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (openedCards.some((c) => c.id === card.id)) return;
    // спецефекти 💣⛔
    if (card.effect === "stop") {
      setGameOverReason("stop");
      setGameOver(true);
      return;
    }
    if (card.effect === "reset") {
      onApply(0);
      setOpenedCards((prev) => [...prev, card]);
      return;
    }
    if (card.effect === "bomb") {
      onApply(0);
      setGameOverReason("bomb");
      setGameOver(true);
      return;
    }

    const cardRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const counterRect = rewardCounterRef.current?.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!counterRect || !containerRect) return;

    // Центри картки та монетки, відносно контейнера GameField
    const startX =
      cardRect.left - containerRect.left + cardRect.width / 2 - FLY_SIZE / 2;
    const startY =
      cardRect.top - containerRect.top + cardRect.height / 2 - FLY_SIZE / 2;

    const endX =
      counterRect.left -
      containerRect.left +
      counterRect.width / 2 -
      FLY_SIZE / 2;
    const endY =
      counterRect.top -
      containerRect.top +
      counterRect.height / 2 -
      FLY_SIZE / 2;

    setOpenedCards((prev) => [...prev, card]);
    setFlyingItems((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        img: card.back,
        value: card.value,
        op: card.op,
        startX,
        startY,
        endX,
        endY,
      },
    ]);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-center items-center"
    >
      {/* Сітка карт */}
      <div className="w-[356px] h-[356px] grid grid-cols-3 mt-5 gap-0">
        {cardsData.map((card) => (
          <FlipCard
            key={card.id}
            card={card}
            isOpened={openedCards.some((c) => c.id === card.id)}
            onOpen={(e) => handleCardOpen(card, e)}
          />
        ))}
      </div>

      {/* Літаючі копії: дуга + плавність; нарахування ПІСЛЯ доліту */}
      {flyingItems.map((item) => {
        const midX = (item.startX + item.endX) / 4;
        const arch = Math.max(60, Math.abs(item.startY - item.endY) * 2);
        const midY = Math.min(item.startY, item.endY) - arch; // верхня точка дуги

        return (
          <motion.img
            key={item.id}
            src={item.img}
            className="absolute w-16 h-16 rounded-lg shadow-lg pointer-events-none"
            initial={{ x: item.startX, y: item.startY, opacity: 1, scale: 1 }}
            animate={{
              x: [item.startX, midX, item.endX],
              y: [item.startY, midY, item.endY],
              opacity: [1, 1, 0],
              scale: [1, 1.05, 0.3],
            }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            onAnimationComplete={() => {
              onApply((prev) =>
                applyCardValue({ value: item.value, op: item.op }, prev)
              );
              setFlyingItems((prev) => prev.filter((f) => f.id !== item.id));
            }}
          />
        );
      })}

      {/* Claim показує відкриті картки (підсвічування) */}
      <ClaimSection
        disabled={openedCards.length === 0}
        openedCards={openedCards}
      />
      {/* Модалка завершення гри */}
      {gameOver && (
        <ModalClaim onClose={() => window.location.reload()} points={0}>
          <div className="text-center p-4 relative">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              Гра закінчена!
            </h2>

            {gameOverReason === "bomb" ? (
              <>
                <p className="text-white mb-4">
                  💣 Ти підірвався на бомбі! Лічильник скинуто.
                </p>
                {/* Вибухові частинки */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {Array.from({ length: 15 }).map((_, i) => {
                    const angle = (i / 15) * Math.PI * 2;
                    const distance = 80 + Math.random() * 40;
                    return (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg"
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos(angle) * distance,
                          y: Math.sin(angle) * distance,
                          opacity: 0,
                          scale: 0.2,
                        }}
                        transition={{
                          duration: 1.2,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-white">⛔ Ти натрапив на стоп-карту!</p>
            )}
          </div>
        </ModalClaim>
      )}
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
