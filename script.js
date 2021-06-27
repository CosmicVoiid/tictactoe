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

	const clearBoard = () => {
		for (let i = 0; i < 9; i++) {
			const gridItem = document.querySelectorAll(".game-marker");
			boardArray[i] = "";
			gridItem[i].textContent = "";
		}
	};

	const changeArray = (i, mark) => {
		return (boardArray[i] = mark);
	};

	const getTile = (i) => boardArray[i];
	const getArray = (i) => boardArray;

	return { createBoard, getArray, changeArray, getTile, clearBoard };
})();

//create players
const playerFactory = (player, mark) => {
	const getPlayer = () => player;
	const getMark = () => mark;
	return { getPlayer, getMark, player };
};

const player1Display = () => {
	message.textContent = `${player1.getPlayer()}'s turn!`;
};

//Control game flow
const game = (() => {
	gameBoard.createBoard();
	const message = document.querySelector("#message");
	const form = document.querySelector("#form");
	player1 = playerFactory("player1Name", "X");
	player1 = playerFactory("player2Name", "O");
	const playerNames = () => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const modal = document.querySelector("#modal");
			const modalOverlay = document.querySelector("#modal-overlay");
			modal.classList.add("close");
			modalOverlay.classList.add("close");
			const player1Name = document.querySelector("#player1").value;
			const player2Name = document.querySelector("#player2").value;
			player1 = playerFactory(`${player1Name}`, "X");
			player2 = playerFactory(`${player2Name}`, "O");
			message.textContent = `${player1.getPlayer()}'s turn!`;
			return { player1, player2 };
		});
	};
	//const player2 = startGame.player2;
	const gridItem = document.querySelectorAll(".game-marker");
	const header = document.querySelector("header");

	//checks which players turn it is
	let turnCounter = true;
	const turn = () => {
		let temp = turnCounter;
		turnCounter = !turnCounter;
		return temp ? player1 : player2;
	};

	const resetTurn = () => {
		turnCounter = true;
	};

	//checks if grid square has already been occupied
	const markCheck = (i) => {
		if (gameBoard.getTile(i) !== "") {
			gridItem[i].removeEventListener;
			return false;
		}
	};

	//checks if there is a 3 in a row
	const gameCheck = () => {
		let tempArray = gameBoard.getArray();
		let winStr = "";
		let colWin = 3,
			rowWin = 1,
			diagWin1 = 4,
			diagWin2 = 2;

		//checks first column
		for (let i = 0; i < tempArray.length; i += colWin) {
			winStr += tempArray[i];
		}
		if (winCheck(winStr) === 1) return player1;
		else if (winCheck(winStr) === 2) return player2;
		else winStr = "";

		//checks second column
		for (let i = 1; i < tempArray.length; i += colWin) {
			winStr += tempArray[i];
		}
		if (winCheck(winStr) === 1) return player1;
		else if (winCheck(winStr) === 2) return player2;
		else winStr = "";

		//checks third column
		for (let i = 2; i < tempArray.length; i += colWin) {
			winStr += tempArray[i];
		}
		if (winCheck(winStr) === 1) return player1;
		else if (winCheck(winStr) === 2) return player2;
		else winStr = "";

		//checks first row
		for (let i = 0; i < tempArray.length - 6; i += rowWin) {
			winStr += tempArray[i];
		}
		if (winCheck(winStr) === 1) return player1;
		else if (winCheck(winStr) === 2) return player2;
		else winStr = "";

		//checks second row
		for (let i = 3; i < tempArray.length - 3; i += rowWin) {
			winStr += tempArray[i];
		}
		if (winCheck(winStr) === 1) return player1;
		else if (winCheck(winStr) === 2) return player2;
		else winStr = "";

		//checks third row
		for (let i = 6; i < tempArray.length; i += rowWin) {
			winStr += tempArray[i];
		}
		if (winCheck(winStr) === 1) return player1;
		else if (winCheck(winStr) === 2) return player2;
		else winStr = "";

		//checks diagonal win 1
		for (let i = 0; i < tempArray.length; i += diagWin1) {
			winStr += tempArray[i];
		}
		if (winCheck(winStr) === 1) return player1;
		else if (winCheck(winStr) === 2) return player2;
		else winStr = "";

		//checks diagonal win 2
		for (let i = 2; i < tempArray.length - 1; i += diagWin2) {
			winStr += tempArray[i];
		}
		if (winCheck(winStr) === 1) return player1;
		else if (winCheck(winStr) === 2) return player2;
		else winStr = "";
	};

	//check for 3 in a row
	const winCheck = (trio) => {
		if (trio === "XXX") return 1;
		else if (trio === "OOO") return 2;
	};

	//check for draw
	const drawCheck = () => {
		if (gameBoard.getArray().indexOf("") === -1) return true;
	};

	const gameFlow = () => {
		let endgame = false;
		for (let i = 0; i < 9; i++) {
			gridItem[i].addEventListener("click", () => {
				while (endgame !== true) {
					//check if grid square is occupied
					if (markCheck(i) === false) return false;

					//mark on grid
					let player = turn();
					message.textContent = `${turn().getPlayer()}'s turn!`;
					turn();
					gridItem[i].textContent = player.getMark();
					gameBoard.changeArray(i, player.getMark());
					console.log(gameBoard.getArray());

					//check for draw
					if (drawCheck() === true) {
						message.textContent = "It's a draw!";
						endgame = true;
					}

					//check if game is won
					if (gameCheck() === player1) {
						message.textContent = player1.getPlayer() + " wins!";
						turn();
						endgame = true;
					} else if (gameCheck() === player2) {
						message.textContent = player2.getPlayer() + " wins!";
						endgame = true;
					}
				}
			});
		}
	};

	return {
		gameCheck,
		gameFlow,
		playerNames,
		resetTurn,
		player1Display,
		player1,
		player2,
	};
})();

const newGame = (() => {
	const restart = document.querySelector("#restart");
	restart.addEventListener("click", () => {
		const message = document.querySelector("#message");
		message.textContent = "";
		gameBoard.clearBoard();
		game.player1Display();
		game.resetTurn();
		game.gameFlow();
	});
})();

const startGame = (() => {
	game.playerNames();
	game.gameFlow();
})();
