const GameBoard = (() => {
	let gameBoard = ["O", "O", "X", "O", "X", "X", "O", "X", "X", "O"];

	return { gameBoard };
})();

const playerFactory = (player, mark) => {
	return { player, mark };
};

const player1 = playerFactory("player1", "X");

console.log(player1.mark);
