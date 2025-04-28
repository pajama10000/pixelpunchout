let player;
let cursors;

function preload() {
    const selectedChar = getSelectedCharacter() || 'pajama'; // Default to pajama if none

    // Load character sprite
    this.load.spritesheet('player', 
        `assets/characters/${selectedChar}.png`, 
        { frameWidth: 32, frameHeight: 32 } // Adjust this if your character sprite size is different
    );

    // Load floor tile
    this.load.image('floor', 'assets/characters/floor.png');
}

function create() {
    // Fill the background with floor tiles
    const width = this.scale.width;
    const height = this.scale.height;
    
    const tileSize = 64;
    for (let x = 0; x < width; x += tileSize) {
        for (let y = 0; y < height; y += tileSize) {
            this.add.image(x, y, 'floor').setOrigin(0);
        }
    }

    // Add player sprite
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);

    // Setup animations (basic idle animation)
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }), 
        frameRate: 8,
        repeat: -1
    });

    player.play('idle');

    // Setup keyboard input
    cursors = this.input.keyboard.addKeys({
        up: 'W',
        down: 'S',
        left: 'A',
        right: 'D'
    });
}

function update() {
    if (!player) return;

    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(200);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-200);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(200);
    }
}

function getSelectedCharacter() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('character');
}

// Setup Phaser game config
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: { preload, create, update }
};

// Launch the game
const game = new Phaser.Game(config);
