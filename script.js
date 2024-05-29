let gridSize = 3;

function startGame() {
    //take the game level option
    const levelSelect = document.getElementById('levels');
    gridSize = parseInt(levelSelect.value);
    const imageType = document.getElementById('imageType').value;
    //console.log(imageType);
    createPuzzle(gridSize, imageType);
    document.getElementById('success-message').classList.remove('visible');
    document.getElementById('initial-message').classList.add('hidden');
}

function createPuzzle(size, imageType) {
    const puzzleContainer = document.getElementById('puzzle-container');
    const imagePreview = document.getElementById('image-preview');
    // Clear any existing puzzle
    puzzleContainer.innerHTML = '';
    //put the number of column comptatible with size
    puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 0fr)`;

    //the preview image
    if (imageType) {
        imagePreview.src = `./images/${imageType}/${size}/${imageType}.png`;
    } else {
        imagePreview.src = '';
    }

    //create an array with length and element
    let tiles = Array.from({ length: size * size }, (_, i) => i + 1);
    // put the last case in empty
    tiles[tiles.length - 1] = ''; 

    // Shuffle tiles
    shuffle(tiles);

    //for each tile in tiles : creao te a div and put each value on it and give it a .tile classname
    tiles.forEach(tile => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        //console.log(imageType);

        if (tile) {
            let imagePath;
            if(imageType){
                imagePath = `./images/${imageType}/${size}/${tile}.png`;
                if(imageType === 'chiffre'){
                    tileElement.style.backgroundColor = '#d9cbcb';
                }
                //console.log(imagePath);
            }
            else {
                alert('imageType not found');
            }
            tileElement.style.backgroundImage = `url('${imagePath}')`;
        }else {
            tileElement.style.backgroundImage = 'none';
        }
        
        tileElement.onclick = () => moveTile(tileElement, size);
        puzzleContainer.appendChild(tileElement);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function moveTile(tile, size) {
    //get all tile from puzzle and convert it to an array for manipulation
    const tiles = Array.from(document.querySelectorAll('.tile'));
    //get the tile selected index
    const index = tiles.indexOf(tile);
    //get the empty tile index
    const emptyIndex = tiles.findIndex(t => t.style.backgroundImage === 'none');

    //test if the (voisin) of the selected tile is empty and exchange them
    const validMoves = [index - 1, index + 1, index - size, index + size];
    if (validMoves.includes(emptyIndex)) {
        [tiles[index].style.backgroundImage, tiles[emptyIndex].style.backgroundImage] = [tiles[emptyIndex].style.backgroundImage, tiles[index].style.backgroundImage];
        
        if (tile.style.backgroundColor) {
            [tiles[index].style.backgroundColor, tiles[emptyIndex].style.backgroundColor] =
                [tiles[emptyIndex].style.backgroundColor, tiles[index].style.backgroundColor];
        }

        if (isSolved(tiles)) {
            showSuccessMessage();
        }
    }

function isSolved(tiles) {
    /* const values = tiles.map(t => t.textContent);
    const correctOrder = values.slice(0, values.length - 1).every((val, i) => parseInt(val) === i + 1);
    return correctOrder && values[values.length - 1] === ''; */ 
    for ( let i=0 ; i< tiles.length - 1 ; i++){
        const tileNumber = i+1;
        const tileImage = tiles[i].style.backgroundImage;
        if (!tileImage.includes('${tileNumber}.png')){
            return false;
        }
    }
    return tiles[tiles.length-1].style.backgroundImage === '';

}

function showSuccessMessage() {
    const message = document.getElementById('success-message');
    message.classList.add('visible');
}

}
