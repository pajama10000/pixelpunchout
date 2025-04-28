const characters = [
    { 
        id: 'pajama',
        name: 'Pajama',
        img: 'assets/characters/pajama.png'

    },
    { 
        id: 'mage',
        name: 'Sorcerer',
        img: 'assets/characters/mage/idle.png'
    }
    // Add more characters as needed
];

let selectedCharacter = null;

function initCharacterSelection() {
    const grid = document.getElementById('characterGrid');
    
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <div class="character-sprite" 
                 style="background-image: url('${character.img}')"></div>
            <h3>${character.name}</h3>
        `;
        card.addEventListener('click', () => selectCharacter(character.id));
        grid.appendChild(card);
    });
}

function selectCharacter(characterId) {
    selectedCharacter = characterId;
    document.getElementById('startButton').disabled = false;
    
    // Remove previous selections
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Find and highlight selected card
    const selectedCard = Array.from(document.querySelectorAll('.character-card'))
        .find(card => card.querySelector('.character-sprite').style.backgroundImage.includes(characterId));
    selectedCard.classList.add('selected');
}

document.getElementById('startButton').addEventListener('click', () => {
    if (selectedCharacter) {
        // Redirect to the game page with the selected character info
        window.location.href = `game.html?character=${selectedCharacter}`;
    }
});
