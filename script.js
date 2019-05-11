let table = document.querySelector('table');
let playerColor, activePlayer, roundScore,
    scores, gamePlaying, defaultColor,
    totalScore, chanceAgain, icons, okClicked,
    avatarPlayer, defaultavatar1, defaultavatar2;

function init() {
    scores = [0, 0];
    totalScore = 0;
    activePlayer = 0;
    roundScore = 0;
    chanceAgain = 0;
    okClicked = 0;
    gamePlaying = true;
    defaultavatar1 = document.querySelector('.playerAvatar1').style.backgroundImage;
    defaultavatar2 = document.querySelector('.playerAvatar2').style.backgroundImage;
    document.querySelector('.playerScore1').textContent = 0;
    document.querySelector('.playerScore2').textContent = 0;
    avatarPlayer = [defaultavatar1, defaultavatar2];

    playerColor = ['rgb(0, 255, 0)', 'rgb(0, 242, 255)'];
    icons = ['😁', '😄', '😋', '😍', '😚', '😒', '😏', '😒', '😘', '😲', '😡', '😵', '🐊', '👻', '🐯', '🐗', '🐅', '🐲', '🕊', '🐉', '🐸', '🎃'];
}

//Randomly Select Player icons
function playerIcons() {
    let icon1, icon2, random;
    for (var i = 1; i <= 2; i++) {
        random = Math.floor(Math.random() * (icons.length));
        document.querySelectorAll('.playerIcon' + i)[0].innerHTML = 'Player ' + icons[random];
        document.querySelectorAll('.playerIcon' + i)[1].innerHTML = 'Player ' + icons[random];
    }
}

//Initialize the game
init();
playerIcons();

//Choose Player Avatar and appear in the Players Status Section
const avatars = document.querySelectorAll('img'),
    avatarsClick = document.querySelector('.avatarSection');
let previous1, previous2, toggle1, toggle2;

toggle1 = 0;
toggle2 = 0;
for (var i = 0; i < avatars.length; i++) {
    avatars[i].onclick = function () {

        if (this.parentNode.parentNode.className === 'player1') {
            if (toggle1) {
                previous1.classList.toggle('borderCircle');
            }
            toggle1 = 0;
            previous1 = this;
            avatarPlayer[0] = 'url(' + this.src + ')';
            document.querySelector('.playerAvatar1').style.backgroundImage = 'url(' + this.src + ')';
            this.classList.toggle('borderCircle');
            toggle1++;
        } else if (this.parentNode.parentNode.className === 'player2') {
            if (toggle2) {
                previous2.classList.toggle('borderCircle');
            }
            toggle2 = 0;
            previous2 = this;
            avatarPlayer[1] = 'url(' + this.src + ')';
            document.querySelector('.playerAvatar2').style.backgroundImage = 'url(' + this.src + ')';
            this.classList.toggle('borderCircle');
            toggle2++;
        }
    };
}

//Remove Player Selections after clicking OK button
function ok() {
    if ((document.querySelector('#player1Name').value != "" && document.querySelector('#player1Name').value != " ") && (document.querySelector('#player2Name').value != "" && document.querySelector('#player2Name').value != " ")) {
        setTimeout(() => {

            document.querySelector('.statusSelect').style.display = 'none';
            document.querySelector('.main').style.display = 'block';
            document.querySelector('.status').style.display = 'flex';
            document.querySelector('.playerUsername1').textContent = document.querySelector('#player1Name').value;
            document.querySelector('.playerUsername2').textContent = document.querySelector('#player2Name').value;
            document.querySelector('.status .player' + (activePlayer + 1)).classList.toggle('wobble');
            document.querySelector('.info').textContent = document.querySelector('.playerIcon' + (activePlayer + 1)).textContent + '[' + document.querySelector('#player1Name').value + ']' + ' Turn';
            // play.parentNode.style.display = 'none';

            document.querySelector('.playStart').style.display = 'none';
            document.querySelector('.playAgain').style.display = 'block';
        }, 1250);
    } else {
        document.querySelector('.errors').textContent = 'Can\'t let\'ya play without providing a Username... Gotcha? ';
        setTimeout(() => {
            document.querySelector('.errors').textContent = '';
        }, 4000);
    }

}

//Click the borders of table and see the action
if (gamePlaying) {
    for (i = 0; i < table.rows.length; i++) {
        for (j = 0; j < table.rows[i].cells.length; j++) {
            table.rows[i].cells[j].onclick = function () {

                var rIndex, cIndex, checkBorder, rowCol, rowColTotal;
                rIndex = this.parentElement.rowIndex + 1;
                cIndex = this.cellIndex + 1;
                rowCol = [rIndex, cIndex];

                roundScore = 0;
                chanceAgain = 0;

                checkBorder = document.querySelector(`.r${rIndex} .c${cIndex}`).style.borderColor;
                if (checkBorder != playerColor[0] && checkBorder != playerColor[1]) {

                    colorLines(rowCol);
                    document.querySelector('.info').textContent = document.querySelector('.playerIcon' + (activePlayer + 1)).textContent + '[' + document.querySelector('.playerUsername' + (activePlayer + 1)).textContent + ']' + ' Turn';

                    if (totalScore === 64 || scores[0] > 32 || scores[1] > 32) {
                        document.querySelector('.status .player' + (activePlayer + 1)).classList.toggle('wobble');
                        gamePlaying = false;
                        document.querySelector('.status').style.zIndex = '2';

                        if (scores[0] > scores[1]) {
                            document.querySelector('.info').textContent = document.querySelector('.playerIcon1').textContent + '[' + document.querySelector('.playerUsername' + (activePlayer + 1)).textContent + ']' + ' Won and laughs loudly';
                            document.querySelector('.status .player1').classList.toggle('winner1');
                            document.querySelector('.status .player2').style.opacity = '0';
                        } else if (scores[0] < scores[1]) {
                            document.querySelector('.info').textContent = document.querySelector('.playerIcon2').textContent + '[' + document.querySelector('.playerUsername' + (activePlayer + 1)).textContent + ']' + ' Won and laughs loudly';
                            document.querySelector('.status .player2').classList.toggle('winner2');
                            document.querySelector('.status .player1').style.opacity = '0';
                        } else {
                            document.querySelector('.info').textContent = "Booo. It's a Draw!!!";
                            document.querySelector('.status').style.display = 'none';
                        }
                    }
                }
            };
        }
    }
}

//If selected row is odd 'hr' is selected otherwise span is selected when even to color the line
function colorLines(rowCol) {
    if (rowCol[0] % 2) {
        document.querySelector(`.r${rowCol[0]} .c${rowCol[1]} hr`).style.borderColor = playerColor[activePlayer];
        upCheck(rowCol);
        downCheck(rowCol);
    } else {
        document.querySelector(`.r${rowCol[0]} .c${rowCol[1]} span`).style.borderColor = playerColor[activePlayer];
        rightCheck(rowCol);
        leftCheck(rowCol);
    }
    scores[activePlayer] += roundScore;
    totalScore = scores[0] + scores[1];
    document.querySelector('.playerScore' + (activePlayer + 1)).textContent = scores[activePlayer];
    if (!chanceAgain) {
        nextPlayer();
    }
}

//Change Players
function nextPlayer() {
    document.querySelector('.status .player' + (activePlayer + 1)).classList.toggle('wobble');
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.status .player' + (activePlayer + 1)).classList.toggle('wobble');
}

//Check sideways if all four borders are colored or not
function rightCheck(rowCol) {
    var color, appearBlock, rightCount = 0,
        checkLines = [[-1, 1], [1, 1], [0, 2]];
    for (var i = 0; i < 3; i++) {
        var row = rowCol[0] + checkLines[i][0];
        var col = rowCol[1] + checkLines[i][1];
        if (Boolean(document.querySelector(`.r${row} .c${col}`))) {
            if (row % 2) {
                color = document.querySelector(`.r${row} .c${col} hr`).style.borderColor;
            } else {
                color = document.querySelector(`.r${row} .c${col} span`).style.borderColor;
            }
        }
        if (color == playerColor[0] || color == playerColor[1]) {
            rightCount++;
        }
    }
    if (rightCount === 3) {
        appearBlock = rowCol[1] + 1;
        document.querySelector(`.r${rowCol[0]} .blk${appearBlock}`).style.backgroundImage = avatarPlayer[activePlayer];
        roundScore++;
        chanceAgain++;
    }
}

function leftCheck(rowCol) {
    var color, appearBlock, leftCount = 0,
        checkLines = [[-1, -1], [1, -1], [0, -2]];
    for (var i = 0; i < 3; i++) {
        var row = rowCol[0] + checkLines[i][0];
        var col = rowCol[1] + checkLines[i][1];
        if (Boolean(document.querySelector(`.r${row} .c${col}`))) {
            if (row % 2) {
                color = document.querySelector(`.r${row} .c${col} hr`).style.borderColor;
            } else {
                color = document.querySelector(`.r${row} .c${col} span`).style.borderColor;
            }
        }
        if (color == playerColor[0] || color == playerColor[1]) {
            leftCount++;
        }
    }
    if (leftCount === 3) {
        appearBlock = rowCol[1] - 1;
        document.querySelector(`.r${rowCol[0]} .blk${appearBlock}`).style.backgroundImage = avatarPlayer[activePlayer];
        roundScore++;
        chanceAgain++;
    }
}

function upCheck(rowCol) {
    var color, appearBlock, upCount = 0,
        checkLines = [[-1, -1], [-2, 0], [-1, 1]];
    for (var i = 0; i < 3; i++) {
        var row = rowCol[0] + checkLines[i][0];
        var col = rowCol[1] + checkLines[i][1];
        if (Boolean(document.querySelector(`.r${row} .c${col}`))) {
            if (row % 2) {
                color = document.querySelector(`.r${row} .c${col} hr`).style.borderColor;
            } else {
                color = document.querySelector(`.r${row} .c${col} span`).style.borderColor;
            }
        }
        if (color == playerColor[0] || color == playerColor[1]) {
            upCount++;
        }
    }
    if (upCount === 3) {
        appearBlock = rowCol[0] - 1;
        document.querySelector(`.r${appearBlock} .blk${rowCol[1]}`).style.backgroundImage = avatarPlayer[activePlayer];
        roundScore++;
        chanceAgain++;
    }
}

function downCheck(rowCol) {
    var color, appearBlock, downCount = 0,
        checkLines = [[1, -1], [2, 0], [1, 1]];
    for (var i = 0; i < 3; i++) {
        var row = rowCol[0] + checkLines[i][0];
        var col = rowCol[1] + checkLines[i][1];
        if (Boolean(document.querySelector(`.r${row} .c${col}`))) {
            if (row % 2) {
                color = document.querySelector(`.r${row} .c${col} hr`).style.borderColor;
            } else {
                color = document.querySelector(`.r${row} .c${col} span`).style.borderColor;
            }
        }
        if (color == playerColor[0] || color == playerColor[1]) {
            downCount++;
        }
    }
    if (downCount === 3) {
        appearBlock = rowCol[0] + 1;
        document.querySelector(`.r${appearBlock} .blk${rowCol[1]}`).style.backgroundImage = avatarPlayer[activePlayer];
        roundScore++;
        chanceAgain++;
    }
}

//Reset the table to initial state
function tableReset() {
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {

            var rIndex, cIndex, rowCol;
            rIndex = table.rows[i].cells[j].parentElement.rowIndex + 1;
            cIndex = table.rows[i].cells[j].cellIndex + 1;
            rowCol = [rIndex, cIndex];

            if (table.rows[i].cells[j].classList[0] == 'hr') {
                document.querySelector(`.r${rowCol[0]} .c${rowCol[1]} hr`).style.borderColor = '#ddd';
            } else if (table.rows[i].cells[j].classList[0] == 'vr') {
                document.querySelector(`.r${rowCol[0]} .c${rowCol[1]} span`).style.borderColor = '#ddd';
            } else if (table.rows[i].cells[j].classList[1] == 'clr') {
                document.querySelector(`.r${rowCol[0]} .blk${rowCol[1]}`).style.backgroundImage = 'none';
            }
        }
    }
}

const playAgainBtn = document.querySelector('.playAgain');
playAgainBtn.addEventListener('click', reset, false);
//Reset the game
function reset() {
    init();
    playerIcons();
    tableReset();
    document.querySelector('.status .player1').classList.remove('wobble');
    document.querySelector('.status .player2').classList.remove('wobble');
    document.querySelector('.status .player1').classList.remove('winner1');
    document.querySelector('.status .player2').classList.remove('winner2');
    document.querySelector('.playNow').style.display = 'flex';
    document.querySelector('.statusSelect').style.display = 'flex';
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.status').style.display = 'none';
    document.querySelector('.status').style.zIndex = '-1';
    document.querySelector('.status .player1').style.opacity = '1';
    document.querySelector('.status .player2').style.opacity = '1';
    document.querySelector('.playAgain').style.display = 'none';
    document.querySelector('.playStart').style.display = 'block';
}
