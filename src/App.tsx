import { useCallback, useEffect, useState } from "react";
import { Card } from "./components/Card";
import { GameControls } from "./components/GameControls";
import { generateDeck } from "./utils/deck";

export type CardType = {
	id: number;
	value: string;
	matched: boolean;
};

export type GameMode = "numbers" | "colors" | "shapes";

export default function App() {
	// current deck of cards
	const [deck, setDeck] = useState<CardType[]>([]);
	// cards selected by user
	const [selected, setSelected] = useState<CardType[]>([]);
	// game mode selected by user
	const [mode, setMode] = useState<GameMode>("numbers");
	// number of attempts
	const [attempts, setAttempts] = useState(0);
	// pairs found
	const [pairsLeft, setPairsLeft] = useState(0);

	// shuffle and start new game
	const newGame = useCallback(() => {
		const newDeck = generateDeck(mode);
		setDeck(newDeck);
		setSelected([]);
		setAttempts(0);
		setPairsLeft(newDeck.length / 2);
	}, [mode]);

	// handle card click
	const handleSelect = (card: CardType) => {
		// ignore already matched or already selected card
		if (selected.length === 2 || selected.find((c) => c.id === card.id) || card.matched) return;
		const newSelected = [...selected, card];
		setSelected(newSelected);

		// check if two cards selected
		if (newSelected.length === 2) {
			setAttempts((prev) => prev + 1);
			const [a, b] = newSelected;
			if (a.value === b.value) {
				// update matched cards
				setDeck((prevDeck) => prevDeck.map((c) => (c.value === a.value ? { ...c, matched: true } : c)));
				setPairsLeft((prev) => prev - 1);
				setSelected([]);
			} else {
				// flip cards back after timeout
				setTimeout(() => setSelected([]), 1000);
			}
		}
	};

	// start game on initial load or mode change
	useEffect(() => {
		newGame();
	}, [newGame]);

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
			<h1 className="text-3xl font-bold mb-4">Logické pexeso</h1>
			<GameControls onNewGame={newGame} mode={mode} setMode={setMode} attempts={attempts} pairsLeft={pairsLeft} />
			<div className="grid grid-cols-4 gap-4 mt-4">
				{deck.map((card) => (
					<Card key={card.id} card={card} selected={selected.some((c) => c.id === card.id)} onSelect={handleSelect} mode={mode} />
				))}
			</div>
			{pairsLeft === 0 && <p className="mt-6 text-green-600 font-semibold">🎉 Hra dokončena!</p>}
		</div>
	);
}
