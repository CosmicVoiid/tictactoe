const GameBoard = (() => {
	const grid = document.querySelector("#game-board");
	let gameBoard = ["O", "O", "X", "O", "X", "X", "O", "X", "X"];
	const displayController = () => {
		for (let i = 0; i < gameBoard.length; i++) {
			const gridItem = document.createElement("div");
			gridItem.classList.add("game-marker");
			gridItem.textContent = gameBoard[i];
			grid.appendChild(gridItem);
		}
	};
	return { gameBoard, displayController };
})();

const playerFactory = (player, mark) => {
	return { player, mark };
};

const player1 = playerFactory("player1", "X");
const player2 = playerFactory("player2", "O");

console.log(player1.mark);
GameBoard.displayController();
