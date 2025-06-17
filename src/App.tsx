import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "./components/Card";
import { GameControls } from "./components/GameControls";
import { generateDeck } from "./utils/deck";

export type CardType = {
	id: number;
	value: string;
	matched: boolean;
};

export type GameMode = "numbers" | "colors" | "shapes";
export type Difficulty = "easy" | "medium" | "hard";

export default function App() {
	const [deck, setDeck] = useState<CardType[]>([]);
	const [selected, setSelected] = useState<CardType[]>([]);
	const [mode, setMode] = useState<GameMode>("numbers");
	const [difficulty, setDifficulty] = useState<Difficulty>("easy");
	const [attempts, setAttempts] = useState(0);
	const [pairsLeft, setPairsLeft] = useState(0);
	const [time, setTime] = useState(0);
	const [bestTime, setBestTime] = useState<number | null>(null);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const gameComplete = pairsLeft === 0;

	const pairCount = difficulty === "easy" ? 8 : difficulty === "medium" ? 12 : 16;

	const newGame = useCallback(() => {
		const newDeck = generateDeck(mode, pairCount);
		setDeck(newDeck);
		setSelected([]);
		setAttempts(0);
		setPairsLeft(newDeck.length / 2);
		setTime(0);
		if (timerRef.current) clearInterval(timerRef.current);
		timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
	}, [mode, pairCount]);

	const handleSelect = (card: CardType) => {
		if (selected.length === 2 || selected.find((c) => c.id === card.id) || card.matched) return;
		const newSelected = [...selected, card];
		setSelected(newSelected);
		if (newSelected.length === 2) {
			setAttempts((prev) => prev + 1);
			const [a, b] = newSelected;
			if (a.value === b.value) {
				setDeck((prev) => prev.map((c) => (c.value === a.value ? { ...c, matched: true } : c)));
				setPairsLeft((prev) => prev - 1);
				setSelected([]);
			} else {
				setTimeout(() => setSelected([]), 1000);
			}
		}
	};

	useEffect(() => {
		newGame();
	}, [newGame]);

	useEffect(() => {
		if (gameComplete && timerRef.current) {
			clearInterval(timerRef.current);
			const stored = localStorage.getItem(`bestTime-${mode}-${difficulty}`);
			const best = stored ? parseInt(stored, 10) : null;
			if (!best || time < best) {
				setBestTime(time);
				localStorage.setItem(`bestTime-${mode}-${difficulty}`, time.toString());
			} else {
				setBestTime(best);
			}
		}
	}, [gameComplete, time, mode, difficulty]);

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
			<h1 className="text-3xl font-bold mb-4">Logické pexeso</h1>
			<GameControls onNewGame={newGame} mode={mode} setMode={setMode} attempts={attempts} pairsLeft={pairsLeft} time={time} bestTime={bestTime} difficulty={difficulty} setDifficulty={setDifficulty} />
			<div className={`grid gap-4 mt-4 ${pairCount <= 8 ? "grid-cols-4" : pairCount <= 12 ? "grid-cols-6" : "grid-cols-8"}`}>
				{deck.map((card) => (
					<Card key={card.id} card={card} selected={selected.some((c) => c.id === card.id)} onSelect={handleSelect} mode={mode} />
				))}
			</div>
			{gameComplete && <p className="mt-6 text-green-600 font-semibold">🎉 Hra dokončena za {time} sekund!</p>}
		</div>
	);
}
