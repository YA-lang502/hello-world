const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    health: 100
};

const enemies = [];
const items = [];
let score = 0;
let currentMission = 1;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    ctx.fillStyle = 'red';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function drawItems() {
    ctx.fillStyle = 'green';
    items.forEach(item => {
        ctx.fillRect(item.x, item.y, item.width, item.height);
    });
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function drawHealth() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Health: ${player.health}`, 10, 50);
}

function drawMission() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Mission: ${currentMission}`, 10, 80);
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function moveEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += 2;
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }
    });
}

function checkCollision() {
    enemies.forEach((enemy, index) => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            player.health -= 10;
            enemies.splice(index, 1);
            if (player.health <= 0) {
                resetGame();
            }
        }
    });

    items.forEach((item, index) => {
        if (
            player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + item.height &&
            player.y + player.height > item.y
        ) {
            score += 10;
            items.splice(index, 1);
        }
    });
}

function createEnemy() {
    const x = Math.random() * (canvas.width - 50);
    enemies.push({ x, y: 0, width: 50, height: 50 });
}

function createItem() {
    const x = Math.random() * (canvas.width - 50);
    items.push({ x, y: 0, width: 30, height: 30 });
}

function resetGame() {
    player.x = canvas.width / 2 - 25;
    player.y = canvas.height - 60;
    player.health = 100;
    enemies.length = 0;
    items.length = 0;
    score = 0;
    currentMission = 1;
}

function nextMission() {
    currentMission++;
    if (currentMission > 5) {
        alert('Hai sconfitto Jessica! Complimenti!');
        resetGame();
    } else {
        alert(`Missione ${currentMission} completata!`);
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    drawItems();
    drawScore();
    drawHealth();
    drawMission();
    movePlayer();
    moveEnemies();
    checkCollision();
    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown') {
        player.dy = player.speed;
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        player.dx = 0;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

setInterval(createEnemy, 2000);
setInterval(createItem, 5000);

update();
