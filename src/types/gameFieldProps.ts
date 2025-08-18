export type Card = {
  id: number;
  front: string;
  back: string;
  value?: number;
  op?: string; // "x2" або "+"
  effect?: string;
};

export type FlyingItem = {
  id: number;
  img: string;
  value?: number;
  op?: string;

  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type GameFieldProps = {
  onApply: React.Dispatch<React.SetStateAction<number>>;
  // ВАЖЛИВО: ref саме на <img> у RewardCounter
  rewardCounterRef: React.RefObject<HTMLImageElement | null>;
};
