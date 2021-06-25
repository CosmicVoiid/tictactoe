//Create game board
const gameBoard = (() => {
	const grid = document.querySelector("#game-board");
	const boardArray = [];

	const createBoard = () => {
		for (let i = 0; i < 9; i++) {
			boardArray[i] = "";
			const gridItem = document.createElement("div");
			gridItem.classList.add("game-marker");
			grid.appendChild(gridItem);
		}
	};

	const changeArray = (i, mark) => {
		return (boardArray[i] = mark);
	};

	const getArray = () => boardArray;

	return { createBoard, getArray, changeArray };
})();

//create players
const playerFactory = (player, mark) => {
	const getPlayer = () => player;
	const getMark = () => mark;
	return { getPlayer, getMark };
};

//Control game flow
const game = (() => {
	gameBoard.createBoard();
	const player1 = playerFactory("player1", "X");
	const player2 = playerFactory("player2", "O");
	const gridItem = document.querySelectorAll(".game-marker");

	let turnCounter = true;
	const turn = () => {
		let temp = turnCounter;
		turnCounter = !turnCounter;
		return temp ? player1.getMark() : player2.getMark();
	};

	for (let i = 0; i < 9; i++) {
		gridItem[i].addEventListener("click", () => {
			let player = turn();
			gridItem[i].textContent = player;
			gameBoard.changeArray(i, player);
			console.log(gameBoard.getArray());
		});
	}
})();
