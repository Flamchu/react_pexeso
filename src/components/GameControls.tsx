import type { GameMode, Difficulty } from "../App";

type GameControlsProps = {
	onNewGame: () => void;
	mode: GameMode;
	setMode: (mode: GameMode) => void;
	attempts: number;
	pairsLeft: number;
	time: number;
	bestTime: number | null;
	difficulty: Difficulty;
	setDifficulty: (d: Difficulty) => void;
};

export function GameControls({ onNewGame, mode, setMode, attempts, pairsLeft, time, bestTime, difficulty, setDifficulty }: GameControlsProps) {
	return (
		<div className="flex flex-col sm:flex-row items-center gap-4">
			<button onClick={onNewGame} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
				Nová hra
			</button>

			<div className="flex gap-2 items-center">
				<label className="font-semibold">Mód:</label>
				<select className="border p-1 rounded" value={mode} onChange={(e) => setMode(e.target.value as GameMode)}>
					<option value="numbers">Čísla</option>
					<option value="colors">Barvy</option>
					<option value="shapes">Tvary</option>
				</select>
			</div>

			<div className="flex gap-2 items-center">
				<label className="font-semibold">Obtížnost:</label>
				<select className="border p-1 rounded" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
					<option value="easy">Lehká</option>
					<option value="medium">Střední</option>
					<option value="hard">Těžká</option>
				</select>
			</div>

			<div className="text-sm font-medium">
				Pokusy: <strong>{attempts}</strong> | Zbývá párů: <strong>{pairsLeft}</strong>
			</div>

			<div className="text-sm font-medium">
				Čas: <strong>{time}s</strong> | Nejlepší čas: <strong>{bestTime ?? "-"}</strong>
			</div>
		</div>
	);
}
