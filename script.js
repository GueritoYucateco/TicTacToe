let fields = [];

let activeLanguage = 'en';

let counterArray = [
    {
        player1 : 0,
        player2 : 0
    }
]

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
        console.log(fields)

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

    if(fields.length == 9 && !fields.includes(undefined) && !winner) {
        console.log('DRAW')
        gameOver = true;

        setTimeout(function() {
            document.getElementById('end-screen').classList.remove('d-none');
            document.getElementById('restart').classList.remove('d-none');
            document.getElementById('player-won').innerHTML = '';
            document.querySelector('#win-draw p').innerHTML = 'Draw';
            document.querySelector('.player-number').classList.add('d-none');
            document.querySelector('#player-won').classList.add('d-none');
        }, 1000)
    }

    if(winner) {
        console.log('WON:', winner);
        gameOver = true;

        setTimeout(function() {
            document.getElementById('end-screen').classList.remove('d-none');
            document.getElementById('restart').classList.remove('d-none');
            drawWinner(winner);
            document.querySelector('#win-draw p').innerHTML = 'WON !';
            document.querySelector('.player-number').classList.remove('d-none');
            document.querySelector('#player-won').classList.remove('d-none');
            switchLanguage(activeLanguage);
        }, 1000)

        counter(winner);

    }
}

function drawWinner(winner) {
    if(winner == 'circle') {
        document.querySelector('.player-number').innerHTML = '1';
    }

    if(winner == 'cross') {
        document.querySelector('.player-number').innerHTML = '2';
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

function counter(winner) {
    let player1 = document.querySelector('#player-1 div');
    let player2 = document.querySelector('#player-2 div');
    
    for(let i = 0; i < counterArray.length; i++) {
        let player1Points = counterArray[i];
        let player2Points = counterArray[i];
        
        if(winner == 'circle') {
            player1Points.player1++;
        }
        
        if(winner == 'cross') {
            player2Points.player2++;
        }

        player1.innerHTML = player1Points.player1;
        player2.innerHTML = player2Points.player2;
    }
}

function openMenu() {
    document.querySelector('.menu-inactive').classList.toggle('menu');
}



// -- SWITCH TO LANGUAGE --

function switchLanguage(language) {
    let p1 = document.querySelector('#player-1 span');
    let p2 = document.querySelector('#player-2 span');
    let restart = document.querySelector('#restart');
    let winDraw = document.querySelector('#win-draw p');
    let winner = document.querySelector('#player-won');

    activeLanguage = language;

    if (language == "en") {
        p1.innerHTML = 'Player 1';
        p2.innerHTML = 'Player 2';
        restart.innerHTML = 'Restart';
        winDraw.innerHTML = 'WON !';
        winner.innerHTML = 'Player';
        return;
    }
    if (language == 'de') {
        p1.innerHTML = 'Spieler 1';
        p2.innerHTML = 'Spieler 2';
        restart.innerHTML = 'Nochmal';
        winDraw.innerHTML = 'hat gewonnen !';
        winner.innerHTML = 'Spieler';
        return;
    }

    if (language == "es") {
        p1.innerHTML = 'Jugador 1';
        p2.innerHTML = 'Jugador 2';
        restart.innerHTML = 'Reanudar';
        winDraw.innerHTML = 'ganó !';
        winner.innerHTML = 'Jugador';

        return;
    }

    if(language == "fr") {
        p1.innerHTML = 'Joueur 1';
        p2.innerHTML = 'Joueur 2';
        restart.innerHTML = 'Redémarrage';
        winDraw.innerHTML = 'a gagné !';
        winner.innerHTML = 'Joueur';
        return;
    }
}

function toggleDarkMode() {
    document.querySelector('.player-panel').classList.toggle('invert');
    document.querySelector('table').classList.toggle('invert');
    document.querySelector('body').classList.toggle('bg-dark');
    document.querySelector('.slider__bar').classList.toggle('slider__bar__active');
}