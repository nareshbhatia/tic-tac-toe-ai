interface SquareProps {
  value: string;
  onClick: () => void;
}

export function Square({ value, onClick }: SquareProps) {
  return (
    <button
      className="flex justify-center items-center border rounded w-32 h-16 text-xl font-semibold"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
