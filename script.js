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
			console.log(boardArray[i]);
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
	return { getPlayer, getMark };
};

//Control game flow
const game = (() => {
	gameBoard.createBoard();
	const message = document.querySelector("#message");
	const player1 = playerFactory("player1", "X");
	const player2 = playerFactory("player2", "O");
	const gridItem = document.querySelectorAll(".game-marker");
	const header = document.querySelector("header");

	//checks which players turn it is
	let turnCounter = true;
	const turn = () => {
		let temp = turnCounter;
		turnCounter = !turnCounter;
		return temp ? player1 : player2;
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

	message.textContent = `${player1.getPlayer()}'s turn!`;
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

	return { gameCheck, gameFlow, player1, player2 };
})();

const newGame = (() => {
	const restart = document.querySelector("#restart");
	restart.addEventListener("click", () => {
		const message = document.querySelector("#message");
		message.textContent = "";
		gameBoard.clearBoard();
		const player1 = game;
		message.textContent = `${game.player1.getPlayer()}'s turn!`;
		game.gameFlow();
	});
})();

game.gameFlow();
