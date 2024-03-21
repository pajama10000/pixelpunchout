var character = document.getElementById('character');
var gameArea = document.getElementById('gameArea');

// Set the character image based on the selection
character.src = localStorage.getItem('character') + '.png';

// Character movement
var speed = 3;
var keys = {37: false, 38: false, 39: false, 40: false, 69: false, 82: false};

var lastFireballShotTime = 0;
var bulletInterval;

window.onkeydown = function(e) {
    keys[e.keyCode] = true;

    if (keys[69] && !bulletInterval) {
        // 'E' key
        bulletInterval = setInterval(shootBullet, 100);  // Adjust firing rate as needed
    }
}

window.onkeyup = function(e) {
    keys[e.keyCode] = false;

    if (e.keyCode == 69 && bulletInterval) {
        // 'E' key
        clearInterval(bulletInterval);
        bulletInterval = null;
    }
}

function gameLoop() {
    if(keys[37] && character.offsetLeft > 0){
        // Left arrow key
        character.style.left = character.offsetLeft - speed + 'px';
    }
    if(keys[38] && character.offsetTop > 0){
        // Up arrow key
        character.style.top = character.offsetTop - speed + 'px';
    }
    if(keys[39] && character.offsetLeft < gameArea.offsetWidth - character.offsetWidth){
        // Right arrow key
        character.style.left = character.offsetLeft + speed + 'px';
    }
    if(keys[40] && character.offsetTop < gameArea.offsetHeight - character.offsetHeight){
        // Down arrow key
        character.style.top = character.offsetTop + speed + 'px';
    }
    if(keys[82]){
        // 'R' key
        shootFireball();
    }
    requestAnimationFrame(gameLoop);
}

function shootBullet() {
    var bullet = document.createElement('img');
    bullet.src = 'bullet1.png';
    bullet.className = 'bullet';
    bullet.style.position = 'absolute';
    bullet.style.top = character.offsetTop + 'px';
    bullet.style.left = character.offsetLeft + 'px';
    bullet.style.height = '10px';  // Adjust size as needed
    bullet.style.width = '20px';   // Adjust size as needed
    gameArea.appendChild(bullet);

    // Bullet movement
    var bulletSpeed = 5;
    function moveBullet() {
        if (bullet.offsetLeft < gameArea.offsetWidth) {
            bullet.style.left = bullet.offsetLeft + bulletSpeed + 'px';
            requestAnimationFrame(moveBullet);
        } else {
            // Remove the bullet when it goes out of the game area
            gameArea.removeChild(bullet);
        }
    }
    moveBullet();
}

function shootFireball() {
    var currentTime = new Date().getTime();

    // If 10 seconds have passed since the last fireball was shot
    if (currentTime - lastFireballShotTime > 10000) {
        lastFireballShotTime = currentTime;

        var fireball = document.createElement('img');
        fireball.src = 'fireball.png';
        fireball.className = 'fireball';
        fireball.style.position = 'absolute';
        fireball.style.top = character.offsetTop + 'px';
        fireball.style.left = character.offsetLeft + 'px';
        fireball.style.height = '20px';  // Adjust size as needed
        fireball.style.width = '30px';   // Adjust size as needed
        gameArea.appendChild(fireball);

        // Fireball movement
        var fireballSpeed = 3;
        function moveFireball() {
            if (fireball.offsetLeft < gameArea.offsetWidth) {
                fireball.style.left = fireball.offsetLeft + fireballSpeed + 'px';
                requestAnimationFrame(moveFireball);
            } else {
                // Remove the fireball when it goes out of the game area
                gameArea.removeChild(fireball);
            }
        }
        moveFireball();
    }
}

gameLoop();

