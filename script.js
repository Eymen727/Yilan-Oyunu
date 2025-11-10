// DOM Elements
const canvas = document.getElementById('gameCanvas');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');
const gameOverScreen = document.getElementById('game-over-screen');
const pauseScreen = document.getElementById('pause-screen');
const finalScoreElement = document.getElementById('final-score');

// Canvas Context
const ctx = canvas.getContext('2d');

// Game Constants
const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 3000;
const SNAKE_SPEED = 5;
const SNAKE_SIZE = 20;
const FOOD_SIZE = 15;
const CAKE_SIZE = 30;

// Game State
let player = {
    x: WORLD_WIDTH / 2,
    y: WORLD_HEIGHT / 2,
    dx: SNAKE_SPEED,
    dy: 0,
    body: [],
    size: 5
};
let foods = [];
let cakes = [];
let score = 0;
let highscore = localStorage.getItem('highscore') || 0;
let isGameOver = false;
let isPaused = false;

// Camera
let camera = {
    x: 0,
    y: 0
};

// --- Game Setup ---
function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    highscoreElement.textContent = `Rekor: ${highscore}`;
    
    startNewGame();

    // Start game loop
    gameLoop();
}

function startNewGame() {
    // Reset player state
    player = {
        x: WORLD_WIDTH / 2,
        y: WORLD_HEIGHT / 2,
        dx: SNAKE_SPEED,
        dy: 0,
        body: [],
        size: 5,
    };
    
    // Reset game state
    score = 0;
    isGameOver = false;
    updateScore();
    foods = [];
    cakes = [];

    // Hide game over screen
    gameOverScreen.classList.add('hidden');

    // Initial food generation
    for (let i = 0; i < 100; i++) {
        spawnFood();
    }
    
    // Initial cake generation
    spawnCake();
}

// --- Game Loop ---
function gameLoop() {
    if (isGameOver) return;
    if (isPaused) return;

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

// --- Update Game State ---
function update() {
    // Move player
    player.x += player.dx;
    player.y += player.dy;

    // Add current head position to the body
    player.body.unshift({ x: player.x, y: player.y });

    // Keep the snake at the correct length
    while (player.body.length > player.size) {
        player.body.pop();
    }

    // Update camera to follow player
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;

    // Check for food collision
    foods.forEach((food, index) => {
        const dist = Math.hypot(player.x - food.x, player.y - food.y);
        if (dist - SNAKE_SIZE - FOOD_SIZE < 1) {
            eatFood(index);
        }
    });

    // Check for cake collision
    cakes.forEach((cake, index) => {
        const dist = Math.hypot(player.x - cake.x, player.y - cake.y);
        if (dist - SNAKE_SIZE - CAKE_SIZE < 1) {
            eatCake(index);
        }
    });

    // Check for wall collision
    if (player.x < 0 || player.x > WORLD_WIDTH || player.y < 0 || player.y > WORLD_HEIGHT) {
        gameOver();
    }
}

// --- Draw Everything ---
function draw() {
    // Clear canvas with background color
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply camera transform
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // Draw game world boundaries (optional, for debugging)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.strokeRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    
    // Draw foods
    ctx.fillStyle = 'red';
    foods.forEach(food => {
        ctx.beginPath();
        ctx.arc(food.x, food.y, FOOD_SIZE, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw cakes
    ctx.fillStyle = 'gold';
    cakes.forEach(cake => {
        ctx.beginPath();
        ctx.arc(cake.x, cake.y, CAKE_SIZE, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw player
    player.body.forEach((segment, index) => {
        // Head is brighter
        ctx.fillStyle = index === 0 ? 'lime' : '#4CAF50';
        // Tail gets smaller
        const scale = 1 - (index / (player.body.length * 1.5));
        const segmentSize = SNAKE_SIZE * scale;
        
        ctx.beginPath();
        ctx.arc(segment.x, segment.y, Math.max(2, segmentSize), 0, Math.PI * 2);
        ctx.fill();
    });

    // Restore camera transform
    ctx.restore();
}

// --- Game Over and Restart ---
function gameOver() {
    isGameOver = true;
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
        highscoreElement.textContent = `Rekor: ${highscore}`;
    }
    finalScoreElement.textContent = Math.floor(score);
    gameOverScreen.classList.remove('hidden');
}

function restartGame() {
    startNewGame();
    gameLoop();
}

// --- Pause and Unpause ---
function pauseGame() {
    isPaused = true;
    pauseScreen.classList.remove('hidden');
}

function unpauseGame() {
    isPaused = false;
    pauseScreen.classList.add('hidden');
    gameLoop();
}

// --- Helper Functions ---
function updateScore() {
    scoreElement.textContent = `Skor: ${Math.floor(score)}`;
}

function eatFood(index) {
    player.size += 1;
    score += 1;
    updateScore();
    foods.splice(index, 1);
    spawnFood();
}

function eatCake(index) {
    player.size += 5; // Extra growth
    score += 5;
    updateScore();
    cakes.splice(index, 1);
    // Don't spawn a new one immediately to keep them rare
    setTimeout(spawnCake, 5000); // Spawn another cake after 5 seconds
}

function spawnFood() {
    foods.push({
        x: Math.random() * WORLD_WIDTH,
        y: Math.random() * WORLD_HEIGHT
    });
}

function spawnCake() {
    // Only spawn a cake if there isn't one already
    if (cakes.length === 0) {
        cakes.push({
            x: Math.random() * WORLD_WIDTH,
            y: Math.random() * WORLD_HEIGHT
        });
    }
}

// --- Event Listeners ---
gameOverScreen.addEventListener('click', restartGame);
pauseScreen.addEventListener('click', unpauseGame);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            if (player.dy === 0 && !isPaused && !isGameOver) { // Prevent reversing
                player.dx = 0;
                player.dy = -SNAKE_SPEED;
            }
            break;
        case 'ArrowDown':
        case 's':
            if (player.dy === 0 && !isPaused && !isGameOver) { // Prevent reversing
                player.dx = 0;
                player.dy = SNAKE_SPEED;
            }
            break;
        case 'ArrowLeft':
        case 'a':
            if (player.dx === 0 && !isPaused && !isGameOver) { // Prevent reversing
                player.dx = -SNAKE_SPEED;
                player.dy = 0;
            }
            break;
        case 'ArrowRight':
        case 'd':
            if (player.dx === 0 && !isPaused && !isGameOver) { // Prevent reversing
                player.dx = SNAKE_SPEED;
                player.dy = 0;
            }
            break;
        case 'p':
        case 'P':
            if (!isGameOver) {
                if (isPaused) {
                    unpauseGame();
                } else {
                    pauseGame();
                }
            }
            break;
    }
});

// --- Start the game ---
setup();
