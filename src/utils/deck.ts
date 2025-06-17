import type { CardType, GameMode } from "../App";

// generate pairs of values based on mode
function generateValues(mode: GameMode): string[] {
	if (mode === "numbers") return Array.from({ length: 8 }, (_, i) => (i + 1).toString());
	if (mode === "colors") return ["#ff5733", "#33c1ff", "#85ff33", "#ff33a6", "#a633ff", "#ffc733", "#33ffbd", "#ff3333"];
	if (mode === "shapes") return ["triangle", "square", "pentagon", "hexagon", "circle", "star", "cross", "rhombus"];
	return [];
}

// generate shuffled deck with pairs
export function generateDeck(mode: GameMode): CardType[] {
	const baseValues = generateValues(mode);
	const pairs = [...baseValues, ...baseValues];

	// shuffle values
	for (let i = pairs.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pairs[i], pairs[j]] = [pairs[j], pairs[i]];
	}

	// map to card objects
	return pairs.map((value, index) => ({
		id: index,
		value,
		matched: false,
	}));
}
