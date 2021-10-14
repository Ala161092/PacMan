 function init() {

//Load Screen 
const enterGameBtn = document.getElementById('enterBtn')
let loadScreenNow = document.querySelector('.loadScreen')
enterGameBtn.addEventListener('click', enterGame)
 
function enterGame(){
    loadScreenNow.classList.toggle('hideLoadScreen')
 }

//Walker hit ice function
let iceFade = document.querySelector('.iceHit')
 
function removeIce(){
    iceFade.classList.remove('walkerIceHit')
}

 function snowHit(){
     iceFade.classList.add('walkerIceHit')
     setTimeout(removeIce, 2000)
 }

//Dragon captured function

let dragonFade = document.querySelector('.dragonHit')

function dragonHit() {
    dragonFade.classList.add('dragonHitHide')
}

//functionPopUpDisplay
function finalScoreDisplay() {
    finalScoreBoard.classList.add('finalBoxShow')
    scoreOne.innerHTML = `Times Up! You have failed US! You score <br><span>${score}</span>`
}


//const variables
const width = 16
const cells = []
const getGrid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const livesDisplay = document.getElementById('lives')
const countdown = document.getElementById('countdown-timer')
const startTheGame = document.getElementById('btn-start')
const playGameAgain = document.getElementById('btn-again')
const jonSnow = 'jon'
const jonStartingPosition = 15
const iceWalls = []
const iceBlocks = 'ice'
const obstacleWalls = []
const obstacleBlocks = 'obstacle'
const dragonWalls = []
const dragonBlock = 'dragon'
const blankWalls = []
const blankBlocks= 'blank'
const mainAudio = document.querySelector('#audio')
const dragonAudio = document.querySelector('#dragAudio')
const walkerAudio = document.querySelector('#walkerAudio')
const finalScoreBoard = document.querySelector('.finalBox')
const scoreOne = document.querySelector('.scoreOne')

//let variables
let score = 0
let lives = 3
let startCount = 60
let intervalId = null
let currentJonPosition = 15

   
//Grid Layout Array
    const layout = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
        2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2,
        2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2,
        2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
        2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
        2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 1, 2, 2, 2, 1, 2,
        2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2,
        2, 1, 1, 2, 1, 1, 1, 2, 4, 2, 1, 1, 2, 1, 1, 2,
        2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2,
        2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 2, 1, 1, 2,
        2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
        2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2,
        2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2,
        2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    ]

//Looping through the cells in the above array and assinging each labelled cell a class
    function createGrid() {
        for (let i = 0; i < layout.length; i++) {
            const cell = document.createElement('div')
            cell.setAttribute('data-index', i)
            cells.push(cell)
            getGrid.appendChild(cell)
            if (layout[i] == 2) {
                obstacleWalls.push(cells[i])
                obstacleWalls.forEach(obstacleWall => {
                    obstacleWall.classList.add(obstacleBlocks)
                })
            } else if (layout[i] == 4) {
                dragonWalls.push(cells[i])
                dragonWalls.forEach(dragonWall => {
                    dragonWall.classList.add(dragonBlock)
                })

            } else if(layout[i] == 0){
                blankWalls.push(cells[i])
                blankWalls.forEach(blankWall =>{
                    blankWall.classList.add(blankBlocks)
                })

            }else if (layout[i] == 1) {
                iceWalls.push(cells[i])
                iceWalls.forEach(iceWall => {
                    iceWall.classList.add(iceBlocks)
                })
            } 
        }
        addJon(jonStartingPosition)
    }

//add MVP player onto the board 
    function addJon(position) {
        cells[position].classList.add(jonSnow)
    }
//remove MVP player from the board 
    function removeJon(position) {
        cells[position].classList.remove(jonSnow)
    }

// MVP can only enter cells that contain snowflakes. If obstacles encountered player cannot move.
    function movingJon(event) {
        console.log('old position', currentJonPosition)
        removeJon(currentJonPosition)
        
        switch (event.keyCode) {
            case 39: //move right
                if (currentJonPosition % width < width - 1 && !cells[currentJonPosition + 1].classList.contains(obstacleBlocks))
                    currentJonPosition++
                break
            case 37: //move left
                if (currentJonPosition % width !== 0 && !cells[currentJonPosition - 1].classList.contains(obstacleBlocks))
                    currentJonPosition--
                break
            case 38: //move up
                if (currentJonPosition - width >= 0 && !cells[currentJonPosition - width].classList.contains(obstacleBlocks))
                    currentJonPosition -= width
                break
            case 40: //move down 
                if (currentJonPosition + width < width * width && !cells[currentJonPosition + width].classList.contains(obstacleBlocks))
                    currentJonPosition += width
                break
        }
        addJon(currentJonPosition)
        snowFlakeEaten()
        retrieveDragon()
    }
    

    //scoring to add points for each flake eaten
    function snowFlakeEaten() {
        if (cells[currentJonPosition].classList.contains(iceBlocks)) {
            score += 50
            cells[currentJonPosition].classList.remove(iceBlocks)
            scoreDisplay.innerHTML = `Score: <span>${score}</span>`
        }
    }
    //scoring to add points and an extra life if dragon has been encountered
    function retrieveDragon() {
        if (cells[currentJonPosition].classList.contains(dragonBlock)) { 
            dragonAudio.play()
            dragonAudio.volume = 0.4;
            score += 200
            lives++
            dragonHit()
            cells[currentJonPosition].classList.remove(dragonBlock)
            livesDisplay.innerHTML = `Lives: <span>${lives}</span>`  
        }
    }
    createGrid()
    //Creating a constructor for the white walkers with two arguments name and index of walker
    class Walker {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.currentIndex = startIndex
            this.timerId = NaN
        }
    }

    //All walkers and starting position 
    walkers = [
        new Walker('walkers', 17),
        new Walker('walkers', 225),
        new Walker('walkers', 238),
    ]

    //adding walkers onto the grid 
    walkers.forEach(walker => {
        cells[walker.currentIndex].classList.add(walker.className)
        cells[walker.currentIndex].classList.add('walker')

    })
                       
    function runGame() {
        document.addEventListener('keyup', movingJon)
        mainAudio.volume = 0.7;
        mainAudio.play()
        if (typeof mainAudio.loop == 'boolean')
    {
    mainAudio.loop = true;
    }
        startGame()
        walkers.forEach(walker => moveWalker(walker))
    }

    function moveWalker(walker) {
        const directions = [-1, +1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]
       
        walker.timerId = setInterval(function() {
            if (!cells[walker.currentIndex + direction].classList.contains(obstacleBlocks) &&
                !cells[walker.currentIndex + direction].classList.contains('walker') && 
                !cells[walker.currentIndex + direction].classList.contains(blankBlocks)) {
                cells[walker.currentIndex].classList.remove(walker.className)
                cells[walker.currentIndex].classList.remove('walker')
                //move into that space
                walker.currentIndex += direction
                cells[walker.currentIndex].classList.add(walker.className, 'walker')
            } else direction = directions[Math.floor(Math.random() * directions.length)]

            if(cells[walker.currentIndex].classList.contains('jon')){
                cells[walker.currentIndex].classList.remove(walker.className, 'walker')
                lives = lives - 1
                snowHit() 
                walkerAudio.play()
                walkerAudio.volume = 1;      
                cells[walker.currentIndex].classList.add(walker.className, 'walker')
                livesDisplay.innerHTML = `Lives: <span>${lives}</span>`
                walker.currentIndex == walker.startIndex
                cells[walker.currentIndex].classList.remove(walker.className, 'walker')
             } if (lives < 1){
                scoreOne.innerHTML = `Times Up! You have failed US! You score <span>${score}</span>`
                endTheGame()
             }       
        },300)
    }
//function to end the game and clear board
    function endTheGame() {
        clearInterval(startCount)
        clearInterval(intervalId)
        walkers.forEach(walker => clearInterval(walker.timerId))
        document.removeEventListener('keyup', movingJon)
        finalScoreDisplay()
    }

//start gamne function 
    function startGame() {
            intervalId = setInterval(() => {
            startCount--
            countdown.innerHTML = `Timer: <span>${startCount}</span>`
            if (startCount <= 0) {
                clearInterval(intervalId)
                endTheGame()
            }
        }, 1000);
    }
     
//restart the game if player wants to - this will reload the whole page on click
     function playAgain() {
        window.location.reload()
    }
    
//eventlisteners
    startTheGame.addEventListener('click', runGame)
    playGameAgain.addEventListener('click', playAgain)
}

window.addEventListener('DOMContentLoaded', init)

