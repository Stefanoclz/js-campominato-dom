console.log('JS OK');

// creare una griglia di gioco quadrata, in cui ogni cella contiene un
// numero tra quelli compresi in un range compreso tra 1 e 100
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

// BONUS:
// L'utente indica un livello di difficoltà, in base al livello scelto la griglia conterrà un range diverso:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49 

// Collegamento con bottoni per cambio difficoltà

const easyBtn = document.getElementById('easy');

const mediumBtn = document.getElementById('medium');

const hardBtn = document.getElementById('hard');

const resetBtn = document.getElementById('reset');

let alertMessage = document.getElementById('alert');

let score = document.getElementById('score');

// inizio diochiarazioni per calcolo griglia e celle

const grid = document.getElementById('grid');

let columns;

let rows;

function generateRandomNumber(min, max) {
    const range = (max - min) + 1
    return Math.floor(Math.random() * range) + min;
}

function startgame(columns, rows) {
    let record = 1;
    grid.classList.remove('noClick');
    let totalCells = columns * rows;
    const bombPosition = generateBombs(totalCells);
    generateCell(columns, rows);

    for (let i = 1; i <= totalCells; i++) {
        const cell = document.getElementById('cell-' + i);
        cell.addEventListener('click', function () {
            const isBomb = bombPosition.includes(i);
            console.log(bombPosition);
            if (isBomb) {
                cell.classList.add('bg-red');
                alertMessage.style.color = 'blue';
                alertMessage.innerText = "HAI PERSO!";
                grid.classList.toggle('noClick');
                for (let x = 0; x < bombPosition.length; x++) {
                    const allBombs = 'cell-' + bombPosition[x];
                    console.log(allBombs);
                    document.getElementById(allBombs).classList.add('bg-red');
                }
            } else {
                cell.classList.add('bg-azure');
                score.innerText = `Il tuo Punteggio: ${record++}`;
                let maxScore = (columns * rows) - bombPosition.length;
                if ((record - 1) === maxScore) {
                    alertMessage.innerText = "HAI VINTO!";
                    alertMessage.style.color = 'yellow';
                }

                console.log('punteggio massimo: ' + maxScore);

                console.log('punteggio: ' + (record - 1));


            }
        })
    }
}

function generateBombs(max) {
    const positions = [];
    while (positions.length < 16) {
        const number = generateRandomNumber(1, max);
        if (!positions.includes(number)) {
            positions.push(number);
        }
    }
    return positions;
}

// inizio generazione celle e comando per cambio colore al click e generazione numeri

function generateCell(column, rows) {

    alertMessage.innerText = '';

    grid.innerHTML = '';

    totalCells = columns * rows;

    for (let i = 0; i < totalCells; i++) {

        let cell = document.createElement('div');

        cell.classList.add('cell');

        cell.innerText = i + 1;

        cell.id = "cell-" + (i + 1);

        grid.appendChild(cell);

    }
}

// comando per bottone modalità facile

easyBtn.addEventListener('click', function () {

    grid.classList.add('gridHard');

    grid.classList.remove('gridEasy', 'gridMedium');

    columns = 10;

    rows = 10;

    let easyMode = startgame(10, 10);

})

// comando per bottone modalità media

mediumBtn.addEventListener('click', function () {

    grid.classList.add('gridMedium');

    grid.classList.remove('gridHard', 'gridEasy');

    columns = 9;

    rows = 9;

    let mediumMode = startgame(9, 9);

})

// comando per bottone modalità difficle

hardBtn.addEventListener('click', function () {

    grid.classList.add('gridEasy');

    grid.classList.remove('gridMedium', 'gridHard');

    columns = 7;

    rows = 7;

    let hardMode = startgame(7, 7);

})
