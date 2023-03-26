let fields = [];

let gameOver = false;

let currentShape = 'cross';

function fillShape(id) {

    if(!fields[id] && !gameOver) {
        if(currentShape == 'cross') {
            currentShape = 'circle';
            document.getElementById('player-1').classList.toggle('player-inactive');
            document.getElementById('player-2').classList.toggle('player-inactive');
        } else {
            currentShape = 'cross';
            document.getElementById('player-1').classList.toggle('player-inactive');
            document.getElementById('player-2').classList.toggle('player-inactive');
        }

        fields[id] = currentShape;

        draw();
        checkForWin();
    }
}

function draw() {
    for(let i = 0; i < fields.length; i++) {
        if(fields[i] == 'circle') {
            document.getElementById('circle-'+ i).classList.remove('d-none');
        }

        if(fields[i] == 'cross') {
            document.getElementById('cross-'+ i).classList.remove('d-none');
        }
    }
}

function checkForWin() {
    let winner;

    if(fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-0').style.scale = '1';
    }
    if(fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-1').style.scale = '1';
    }
    if(fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-2').style.scale = '1';
    }
    if(fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-3').style.scale = '1';
    }
    if(fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-4').style.scale = '1';
    }
    if(fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-5').style.scale = '1';
    }
    if(fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-6').style.rotate = '-45deg';
        document.getElementById('line-6').style.scale = '1 1.1';
    }
    if(fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-7').style.rotate = '45deg';
        document.getElementById('line-7').style.scale = '1 1.1';
    }

    if(fields.length == 9 && !winner) {
        console.log('DRAW')
        gameOver = true;

        setTimeout(function() {
            document.getElementById('end-screen').classList.remove('d-none');
            document.getElementById('restart').classList.remove('d-none');
            document.getElementById('player-won').innerHTML = '';
            document.querySelector('#win-draw p').innerHTML = 'Draw';
        }, 1000)
    }

    if(winner) {
        console.log('WON:', winner);
        gameOver = true;

        setTimeout(function() {
            document.getElementById('end-screen').classList.remove('d-none');
            document.getElementById('restart').classList.remove('d-none');
            document.getElementById('player-won').innerHTML = winner;
            document.querySelector('#win-draw p').innerHTML = 'WON';
        }, 1000)
    }
}

function restart() {
    gameOver = false;
    fields = [];
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('restart').classList.add('d-none');

    for(let i = 0; i < 8; i++) {
        document.getElementById('line-'+ i).style.scale ='0';

    }

    for(let i = 0; i < 9; i++) {
        document.getElementById('circle-'+ i).classList.add('d-none');
        document.getElementById('cross-'+ i).classList.add('d-none');
    }
}