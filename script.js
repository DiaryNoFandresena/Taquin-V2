let gridSize = 3;

function startGame() {
    const levelSelect = document.getElementById('levels');
    gridSize = parseInt(levelSelect.value);
    const imageType = document.getElementById('imageType').value;
    createPuzzle(gridSize, imageType);
    document.getElementById('success-message').classList.remove('visible');
    document.getElementById('initial-message').classList.add('hidden');
}

function createPuzzle(size, imageType) {
    const puzzleContainer = document.getElementById('puzzle-container');
    const imagePreview = document.getElementById('image-preview');
    puzzleContainer.innerHTML = '';
    puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    if (imageType) {
        imagePreview.src = `./images/${imageType}/${size}/${imageType}.png`;
    } else {
        imagePreview.src = '';
    }

    let tiles = Array.from({ length: size * size }, (_, i) => i + 1);
    tiles[tiles.length - 1] = ''; 
    shuffle(tiles);

    tiles.forEach(tile => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';

        if (tile) {
            let imagePath = `./images/${imageType}/${size}/${tile}.png`;
            tileElement.style.backgroundImage = `url('${imagePath}')`;
        } else {
            tileElement.style.backgroundImage = 'none';
        }

        tileElement.onclick = () => moveTile(tileElement, size);
        puzzleContainer.appendChild(tileElement);
    });

    adjustTileSizes(size);
}

function adjustTileSizes(size) {
    const puzzleContainer = document.getElementById('puzzle-container');
    const tileElements = document.querySelectorAll('.tile');
    const containerWidth = puzzleContainer.offsetWidth;
    const tileSize = containerWidth / size;

    tileElements.forEach(tile => {
        tile.style.width = `${tileSize-6}px`;
        tile.style.height = `${tileSize}px`;
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function moveTile(tile, size) {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const index = tiles.indexOf(tile);
    const emptyIndex = tiles.findIndex(t => t.style.backgroundImage === 'none');

    const validMoves = [index - 1, index + 1, index - size, index + size];
    if (validMoves.includes(emptyIndex)) {
        [tiles[index].style.backgroundImage, tiles[emptyIndex].style.backgroundImage] = [tiles[emptyIndex].style.backgroundImage, tiles[index].style.backgroundImage];

        if (isSolved(tiles)) {
            showSuccessMessage();
        }
    }
}

function isSolved(tiles) {
    for (let i = 0; i < tiles.length - 1; i++) {
        const tileNumber = i + 1;
        const tileImage = tiles[i].style.backgroundImage;
        if (!tileImage.includes(`${tileNumber}.png`)) {
            return false;
        }
    }
    return tiles[tiles.length - 1].style.backgroundImage === '';
}

function showSuccessMessage() {
    const message = document.getElementById('success-message');
    message.classList.add('visible');
}

window.addEventListener('resize', () => adjustTileSizes(gridSize));
