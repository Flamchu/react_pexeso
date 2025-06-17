import type { CardType, GameMode } from "../App";

type CardProps = {
	card: CardType;
	selected: boolean;
	onSelect: (card: CardType) => void;
	mode: GameMode;
};

export function Card({ card, selected, onSelect, mode }: CardProps) {
	const isRevealed = selected || card.matched;

	const renderContent = () => {
		if (!isRevealed) return null;

		switch (mode) {
			case "numbers":
				return <span className="text-xl font-bold">{card.value}</span>;

			case "colors":
				return <div className="w-8 h-8 rounded-full" style={{ backgroundColor: card.value }} />;

			case "shapes": {
				const shapeSymbols: Record<string, string> = {
					triangle: "▲",
					square: "■",
					pentagon: "⬟",
					hexagon: "⬢",
					circle: "●",
					star: "★",
					cross: "✚",
					rhombus: "◆",
				};
				return <span className="text-2xl">{shapeSymbols[card.value] ?? "?"}</span>;
			}

			default:
				return null;
		}
	};

	return (
		<button className={`w-16 h-16 bg-white border rounded shadow flex items-center justify-center transition-transform duration-500 ${isRevealed ? "cursor-default rotate-[360deg]" : "hover:scale-105"}`} onClick={() => onSelect(card)} disabled={isRevealed}>
			{renderContent()}
		</button>
	);
}
