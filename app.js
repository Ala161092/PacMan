function init() {

    const width = 16
    // const gridCellCount = width * width 
    const cells = []
    const getGrid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    let score = 0
    const livesDisplay = document.getElementById('lives')
    let lives = 3
    let startCount = 5
    let intervalId = null
    const countdown = document.getElementById('countdown-timer')
    const startTheGame = document.getElementById('btn-start')
    const playGameAgain = document.getElementById('btn-again')
    const jonSnow = 'jon'
    const jonStartingPosition = 15
    let currentJonPosition = 15
    const iceWalls = []
    const iceBlocks = 'ice'
    const walkerWalls = []
    const walkerBlocks = 'walker'
    const obstacleWalls = []
    const obstacleBlocks = 'obstacle'
    const dragonWalls = []
    const dragonBlock = 'dragon'

    const directions = ['up', 'right', 'down', 'left']

    const layout = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, ,
        2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
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
        2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    ]

    //Creating a grid using a forloop


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

            } else if (layout[i] == 1) {
                iceWalls.push(cells[i])
                iceWalls.forEach(iceWall => {
                    iceWall.classList.add(iceBlocks)
                })
            }
        }
        addJon(jonStartingPosition)
        addWhiteWalkers()

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
            case 39:
                if (currentJonPosition % width < width - 1 && !cells[currentJonPosition + 1].classList.contains(obstacleBlocks))
                    currentJonPosition++
                console.log('i have moved right')
                break
            case 37:
                if (currentJonPosition % width !== 0 && !cells[currentJonPosition - 1].classList.contains(obstacleBlocks))
                    currentJonPosition--
                console.log('i have moved left')
                break
            case 38:
                if (currentJonPosition - width >= 0 && !cells[currentJonPosition - width].classList.contains(obstacleBlocks))
                    currentJonPosition -= width
                console.log('i have moved up')
                break
            case 40:
                if (currentJonPosition + width < width * width && !cells[currentJonPosition + width].classList.contains(obstacleBlocks))
                    currentJonPosition += width
                console.log('i have moved down')
                break
        }
        console.log('new position', currentJonPosition)
        addJon(currentJonPosition)
        snowFlakeEaten()
        retrieveDragon()
        

    }
    document.addEventListener('keyup', movingJon)

    //scoring to add points for each flake eaten
    function snowFlakeEaten() {
        if (cells[currentJonPosition].classList.contains(iceBlocks)) {
            score += 50
            console.log('i have eaten some ice')
            cells[currentJonPosition].classList.remove(iceBlocks)
            scoreDisplay.innerHTML = "Score: " + score
        }
    }
    //scoring to add points and an extra life if dragon has been encountered
    function retrieveDragon() {
        if (cells[currentJonPosition].classList.contains(dragonBlock)) {
            score += 200
            lives++
            console.log('dragon conquered')
            cells[currentJonPosition].classList.remove(dragonBlock)
            livesDisplay.innerHTML = "Lives: " + lives
        }

    }

    //Creating a constructor for the white walkers with two arguments name and index of walker
    class whiteWalker {
        constructor(name, startingIndex) {
            this.name = name
            this.startingindex = startingIndex
            this.currentWalkerIndex = startingIndex
           

        }

        move() {
            let obstacle = obstacleBlocks
            let direction = randomWalkerMovement()
            console.log(directions.length)
            console.log('i am going to move' + this.name + direction)

            cells[this.currentWalkerIndex].classList.remove('walker')
            console.log('removing walker')

            // cells[this.currentWalkerIndex].classList.add('walker')
            console.log('adding walker')

            this.currentWalkerIndex += getIncrement(direction)
            console.log(direction)
            cells[this.currentWalkerIndex].classList.add('walker')
            console.log('adding walker')


            setInterval(function(){
                console.log(!cells[this.currentWalkerIndex + direction].classList.contains('obstacles'))
                if(!cells[this.currentWalkerIndex + direction].classList.contains('obstacles')){
                    console.log()
                    console.log('contains block')
                    cells[this.currentWalkerIndex].classList.remove('walker') 
                    console.log(direction)
                    this.currentWalkerIndex += getIncrement(direction)
                    console.log(directions)
                    cells[this.currentWalkerIndex].classList.add('walker')
                    console.log(direction)
                } 
               
            }, 10000)

            // this.currentWalkerIndex += getIncrement(direction)

            // setInterval(() => {
            //     move()
            // }, 400)

        }
    }

    const walkerOne = new whiteWalker('omneya', 17)
    const walkerTwo = new whiteWalker('doaa', 225)
    const walkerThree = new whiteWalker('esra', 238)
    
    //Storing the new variables into one array so it can target all rather than one individual
    const whiteWalkers = [walkerOne, walkerTwo, walkerThree]
    
    //adding the white walkers into the grid. 
    function addWhiteWalkers() {
        whiteWalkers.forEach(item => {
            cells[item.currentWalkerIndex].classList.add('walker')
        })
        console.log('i have added walkers')
    }
    
    createGrid()
    walkerOne.move()
    // walkerTwo.move()
    // walkerThree.move()

    //Function to generate random movements based on the directions.length
    function randomWalkerMovement() {
        const randomMovement = Math.floor(Math.random() * directions.length)
        console.log(randomMovement)
        return directions[randomMovement]
    }
 
    console.log(direction.length)

    //Get walkers to move randomly across the grid only if there are no obstacles in that cell
    function getIncrement(direction) {
        


        switch (direction) {
            case 'up':
                return (- width)
            case 'left':
                return - 1
            case 'down':
                return (+ width)
            case 'right':
                return + 1
        }

    }


    //Starting the Game and reducing the time remaining left to play.

    function startGame() {
        
        intervalId = setInterval(() => {
            startCount--
            countdown.textContent = startCount
            console.log('reducing time')
            if(startCount <= 0) {
                clearInterval(intervalId)
                endGame()
                return
            }
        }, 1000);
    }
    


    //function to end the game
    function endGame(){
        clearInterval(startCount)
        scoreDisplay.innerHTML = `You have FAILED! You score ${score}`
        removeJon(currentJonPosition)
       

    }

    //restart the game if player wants to
     function playAgain() {
        window.location.reload()

    }



    startTheGame.addEventListener('click', startGame)
    playGameAgain.addEventListener('click', playAgain)









}







































//     function developGrid () {
//         for(let i = 0; i < cells.length; i++) {
//             if((i <= 14) || (i % 16 === 0) || (i > 240 && i < 256) || (i == 47) || (i == 63) || (i==79) || (i==95) || (i==111) || (i==127) || (i==143) || (i==159) || (i==175) || 
//             (i ==191) || (i==207) || (i==223) || (i==239)) {
//                 borderWalls.push(cells[i])
//                 borderWalls.forEach(borderWall => {
//                     borderWall.classList.add(borderBlocks)
//                 })
//             } else if ((i == 17) || (i == 225) || (i == 238)) {
//                 walkerWalls.push(cells[i])
//                 walkerWalls.forEach(walkerWall => {
//                 walkerWall.classList.add(walkerBlocks)
//                 })
//             } else if ((i > 98 && i < 102) || (i == 115) || (i == 131) || (i == 147) || (i >= 163 && i < 166) || (i == 149) || (i == 135) || (i == 151) || (i > 166 && i <= 168) ||
//              (i == 137) || (i == 121) || (i <= 105 && i >= 104) || (i >= 107 && i <= 109) || (i == 124) || (i == 140) || (i == 156) || (i == 172) || (i == 211) || (i >=195 && i <= 198)
//              || (i >= 218 && i <= 221) || (i == 205) || (i >=54 && i <= 57) || (i == 38) || (i == 41) || (i >= 44 && i <= 46) || (i == 60) || (i == 62) || (i >= 65 && i <= 66) || (i == 49)){
//                 obstacleWalls.push(cells[i])
//                 obstacleWalls.forEach(obstacleWall => {
//                     obstacleWall.classList.add(obstacleBlocks)
//                 })
//             } else if ((i == 136)) {
//                 dragonWalls.push(cells[i])
//                 dragonWalls.forEach(dragonWall => {
//                     dragonWall.classList.add(dragonBlock)
//                 })

//             } else {
//                 iceWalls.push(cells[i])
//                 iceWalls.forEach(iceWall => {
//                 iceWall.classList.add(iceBlocks)
//             })
//         }

//     }

//     // function addJon(position) {
//     //     cells[position].classList.add(jonSnowImage)
//     // }
//     // addJon(jonStartingPosition)
// }

// developGrid()




// 











































































window.addEventListener('DOMContentLoaded', init)

