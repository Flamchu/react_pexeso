import type { CardType, GameMode } from "../App";

function generateValues(mode: GameMode, count: number): string[] {
	if (mode === "numbers") {
		return Array.from({ length: count }, (_, i) => (i + 1).toString());
	}

	if (mode === "colors") {
		const base = ["#ff5733", "#33c1ff", "#85ff33", "#ff33a6", "#a633ff", "#ffc733", "#33ffbd", "#ff3333", "#3366ff", "#cc66ff", "#66ff66", "#ff9966", "#66ffff", "#ffcc00", "#cc0033", "#9999ff"];
		return base.slice(0, count);
	}

	if (mode === "shapes") {
		const shapes = ["triangle", "square", "pentagon", "hexagon", "circle", "star", "cross", "rhombus", "trapezoid", "oval", "heart", "moon", "arrow", "parallelogram", "crescent", "wave"];
		return shapes.slice(0, count);
	}

	return [];
}

export function generateDeck(mode: GameMode, count: number): CardType[] {
	const baseValues = generateValues(mode, count);
	const values = [...baseValues, ...baseValues];

	for (let i = values.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[values[i], values[j]] = [values[j], values[i]];
	}

	return values.map((value, index) => ({
		id: index,
		value,
		matched: false,
	}));
}
