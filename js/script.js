'use strict';

const fields = Array.from(document.querySelectorAll('.field'));
const winnerDeclarator = document.querySelector('.winner-declarator');

let counter = 0;

const allWinnerFieldIndexes = [
							   	[0, 1, 2],
						  	   	[3, 4, 5],
						  	   	[6, 7, 8],
						      	[0, 3, 6],
						      	[1, 4, 7],
						      	[2, 5, 8],
						      	[0, 4, 8],
						      	[2, 4, 6]
						     			    		];

const indexesOfXInputs = [];
const indexesOfOInputs = [];

fields.forEach((field, index) => {
	field.onclick = addProperItem.bind(field, index);
});

function addProperItem(index) {
	this.onclick = null;

	if (getQueue() % 2 !== 0) {
		addX.call(this);
		pushIndexes(indexesOfXInputs, index);
	} 	

	else {
		addO.call(this);
		pushIndexes(indexesOfOInputs, index);
	}

	if (checkWinner(indexesOfXInputs)) {
		endGameOnWin();
		highlightWinnerFields(indexesOfXInputs);
		declareWinner(indexesOfXInputs);
	} 

	else if (checkWinner(indexesOfOInputs)) {
		endGameOnWin();
		highlightWinnerFields(indexesOfOInputs);
		declareWinner(indexesOfOInputs);
	} 

	else if (fields.every(field => field.innerHTML !== '')) {
		declareDraw();
	}
}

function addX() {
	this.innerHTML = 'X';
}

function addO() {
	this.innerHTML = 'O';
}

function getQueue() {
	return ++counter;
}

function pushIndexes(inputIndexes, index) {
	inputIndexes.push(index);
}

function checkWinner(inputIndexes) {
	return allWinnerFieldIndexes.some(
		probableWinnerFieldIndexes => probableWinnerFieldIndexes.every(
			fieldIndex => inputIndexes.some(
				inputedFieldIndex => inputedFieldIndex === fieldIndex
			)
		)
	)
}

function endGameOnWin() {
	fields.forEach((field) => {
		field.onclick = null;
	});
}

function highlightWinnerFields(inputIndexes) {
	const highligthedFieldIndexes = allWinnerFieldIndexes.filter(
		winnerFieldIndexes => winnerFieldIndexes.every(
			winnerFieldIndex => inputIndexes.some(
				inputedFieldIndex => inputedFieldIndex === winnerFieldIndex
			)
		)
	)[0];

	highligthedFieldIndexes.forEach(
		highligthedFieldIndex => fields[highligthedFieldIndex].classList.add('field_highlighted')
	);
}

function declareWinner(inputIndexes) {
	winnerDeclarator.innerHTML = `Winner is ${fields[inputIndexes[0]].innerHTML}`;
}

function declareDraw() {
	winnerDeclarator.innerHTML = 'Draw <br>Try Again';
}



