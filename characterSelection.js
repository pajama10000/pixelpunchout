document.getElementById('man').onclick = function() {
    localStorage.setItem('character', 'man');
    window.location.href = 'game.html';
}

document.getElementById('zombie').onclick = function() {
    localStorage.setItem('character', 'zombie');
    window.location.href = 'game.html';
}
