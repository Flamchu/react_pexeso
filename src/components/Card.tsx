import type { CardType, GameMode } from "../App";

type CardProps = {
	card: CardType;
	selected: boolean;
	onSelect: (card: CardType) => void;
	mode: GameMode;
};

export function Card({ card, selected, onSelect, mode }: CardProps) {
	// check if card should be revealed
	const isRevealed = selected || card.matched;

	// render visual content based on game mode
	const renderContent = () => {
		if (!isRevealed) return null;

		switch (mode) {
			case "numbers":
				return <span className="text-xl font-bold">{card.value}</span>;

			case "colors":
				return <div className="w-8 h-8 rounded-full" style={{ backgroundColor: card.value }} />;

			case "shapes":
				switch (card.value) {
					case "triangle":
						return <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-black" />;
					case "square":
						return <div className="w-8 h-8 bg-black" />;
					case "pentagon":
						return <div className="w-8 h-8 bg-black clip-path-[polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)]" />;
					case "hexagon":
						return <div className="w-8 h-8 bg-black clip-path-[polygon(25%_0%,_75%_0%,_100%_50%,_75%_100%,_25%_100%,_0%_50%)]" />;
					case "circle":
						return <div className="w-8 h-8 bg-black rounded-full" />;
					case "star":
						return <div className="w-8 h-8 bg-black clip-path-[polygon(50%_0%,_61%_35%,_98%_35%,_68%_57%,_79%_91%,_50%_70%,_21%_91%,_32%_57%,_2%_35%,_39%_35%)]" />;
					case "cross":
						return (
							<div className="w-8 h-8 relative">
								<div className="absolute bg-black w-2 h-8 left-1/2 -translate-x-1/2" />
								<div className="absolute bg-black w-8 h-2 top-1/2 -translate-y-1/2" />
							</div>
						);
					case "rhombus":
						return <div className="w-8 h-8 bg-black transform rotate-45" />;
					default:
						return null;
				}

			default:
				return null;
		}
	};

	return (
		<button className={`w-16 h-16 bg-white border rounded shadow flex items-center justify-center transition-transform duration-300 ${isRevealed ? "cursor-default" : "hover:scale-105"}`} onClick={() => onSelect(card)} disabled={isRevealed}>
			{renderContent()}
		</button>
	);
}
