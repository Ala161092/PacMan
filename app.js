function init() {

    const width = 16
    // const gridCellCount = width * width 
    const cells = []
    const getGrid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    let score = 0
    const livesDisplay = document.getElementById('lives')
    let lives = 3
    let startCount = 60
    let intervalId = null
    const countdown = document.getElementById('countdown-timer')
    const startTheGame = document.getElementById('btn-start')
    const playGameAgain = document.getElementById('btn-again')
    const jonSnow = 'jon'
    const jonStartingPosition = 15
    let currentJonPosition = 15
    const iceWalls = []
    const iceBlocks = 'ice'
    // const walkerWalls = []
    // const walkerBlocks = 'walkers'
    const obstacleWalls = []
    const obstacleBlocks = 'obstacle'
    const dragonWalls = []
    const dragonBlock = 'dragon'
    const blankWalls = []
    const blankBlocks= 'blank'
    const finalResult = document.getElementById('final-result')
    const mainAudio = document.querySelector('#audio')
    const dragonAudio = document.querySelector('#dragAudio')
    // const soundBtn = document.querySelector('.play-sound-btn');
    // let myAudio = document.querySelector('#audio');
    // soundBtn.addEventListener('click',()=>{
    //     myAudio.play();
    // });

   
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
    // document.addEventListener('keyup', movingJon)

    //scoring to add points for each flake eaten
    function snowFlakeEaten() {
        if (cells[currentJonPosition].classList.contains(iceBlocks)) {
            score += 50
            console.log('i have eaten some ice')
            cells[currentJonPosition].classList.remove(iceBlocks)
            scoreDisplay.innerHTML = `Score: <span>${score}</span>`
        }
    }
    //scoring to add points and an extra life if dragon has been encountered
    function retrieveDragon() {
        if (cells[currentJonPosition].classList.contains(dragonBlock)) {
            
            dragonAudio.src = './assets/DragonCaptured.mp3'
            dragonAudio.play()
            score += 200
            lives++
            console.log('dragon conquered')
            cells[currentJonPosition].classList.remove(dragonBlock)
            livesDisplay.innerHTML = `Lives: <span>${lives}</span>`
           
            //add dragon sound audio
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

    //all my ghosts
    walkers = [
        new Walker('walkers', 17),
        new Walker('walkers', 225),
        new Walker('walkers', 238),

    ]

    //draw my ghosts onto the grid
    walkers.forEach(walker => {
        cells[walker.currentIndex].classList.add(walker.className)
        console.log(walker.className)
        console.log(walker.className)
        cells[walker.currentIndex].classList.add('walker')

    })



    function runGame() {
        document.addEventListener('keyup', movingJon)
        mainAudio.src = './assets/Got.mp3'
        mainAudio.volume = 0.2;
        mainAudio.play()
        startGame()
        walkers.forEach(walker => moveWalker(walker))
    }

    function moveWalker(walker) {
        const directions = [-1, +1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]
        // const directions = ['up', 'left', 'right', 'down']
        // const randomMovement = Math.floor(Math.random() * directions.length)
        
       
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
                console.log('i have been captured') 
                cells[walker.currentIndex].classList.remove(walker.className, 'walker')
                lives = lives - 1
                cells[walker.currentIndex].classList.add(walker.className, 'walker')
                livesDisplay.innerHTML = `Lives: <span>${lives}</span>`
                walker.currentIndex == walker.startIndex
               
                cells[walker.currentIndex].classList.remove(walker.className, 'walker')
             } if (lives < 1){
                 scoreDisplay.innerHTML = `You have FAILED! You score <span>${score}</span>`
                endTheGame()
             }       
        },200)
    }
    


    
    function endTheGame() {
        //stop the music
        // removeJon(currentJonPosition)
        clearInterval(startCount)
        clearInterval(intervalId)
        walkers.forEach(walker => clearInterval(walker.timerId))
        document.removeEventListener('keyup', movingJon)
        


    }

    function startGame() {
            intervalId = setInterval(() => {
            startCount--
            // countdown.textContent = "Timer Remaining: " + startCount
            countdown.innerHTML = `Timer: <span>${startCount}</span>`
            console.log('reducing time')
            if (startCount <= 0) {
                clearInterval(intervalId)
                endTheGame()
                finalResult.innerHTML = `Times Up! You have failed US! You score <span>${score}</span>`
            }
        }, 1000);
        //include start Audio
        //include begin moving the walkers
        //include the start timer function
    }
     



     //restart the game if player wants to - this will reload the whole page on click
     function playAgain() {
        window.location.reload()

    }



    startTheGame.addEventListener('click', runGame)
    playGameAgain.addEventListener('click', playAgain)
  


   
















    // class Walker {
    //     constructor(className, startPosition, speed){
    //         this.className = className
    //         this.startPosition = startPosition
    //         this.currentPosition = startPosition
    //         this.speed = speed
    //     }
    // }


    // walkers = [
    //     new Walker('nader', 17, 500),
    //     new Walker('ala', 225, 400),
    //     new Walker('omo', 238, 300)
    // ]

    // walkers.forEach(walker => {
    //     cells[walker.currentPosition].classList.add(walker.className)
    //     cells[walker.currentPosition].classList.add('walker')
    // })

    //    walkers.forEach(walker => {
    //        cells[walker.currentPosition].classList.add(walker.className)
    //    })


    //draw my ghosts onto the grid




    //     move() {
    //         let obstacle = obstacleBlocks
    //         let direction = randomWalkerMovement()
    //         let newPosition = this.currentWalkerIndex


    //         console.log(directions.length)
    //         console.log('i am going to move' + this.name + direction)

    //         cells[this.currentWalkerIndex].classList.remove('walker')
    //         console.log('removing walker')

    //         cells[this.currentWalkerIndex].classList.add('walker')
    //         console.log('adding walker')

    //         newPosition += getIncrement(direction)
    //         console.log(direction)
    //         // cells[newPosition].classList.add('walker')
    //         // console.log('adding walker')


    //         setInterval(function(){
    //             console.log('Inner Position', newPosition)
    //             console.log('inner direction', direction)
    //             console.log(cells[newPosition + direction])
    //             // console.log(!cells[this.currentWalkerIndex + direction].classList.contains('obstacle'))
    //             if(cells[newPosition + direction].classList.contains('obstacle')){
    //                 console.log()
    //                 console.log('contains block')
    //                 cells[this.currentWalkerIndex].classList.remove('walker') 
    //                 console.log(direction)
    //                 this.currentWalkerIndex += getIncrement(direction)
    //                 console.log(directions)
    //                 cells[this.currentWalkerIndex].classList.add('walker')
    //                 console.log(direction)
    //             } 

    //         }, 5000)

    //         // this.currentWalkerIndex += getIncrement(direction)

    //         // setInterval(() => {
    //         //     move()
    //         // }, 400)

    //     }
    // }



    //Storing the new variables into one array so it can target all rather than one individual


    //adding the white walkers into the grid. 
    // function addWhiteWalkers() {
    //     whiteWalkers.forEach(item => {
    //         cells[item.currentWalkerIndex].classList.add('walker')
    //     })
    //     console.log('i have added walkers')
    // }


    // walkerOne.move()
    // walkerTwo.move()
    // walkerThree.move()

    //Function to generate random movements based on the directions.length
    // function randomWalkerMovement() {
    //     const randomMovement = Math.floor(Math.random() * directions.length)
    //     console.log(randomMovement)
    //     return directions[randomMovement]
    // }





    //Function to determine if daenerys has been caught by white walkers {
    //to include the reduction of lives
    // include a shock noise
    // also remove current position
    //return daenrys to inital position 
    //else if 
    //lives remianing is < 1 if so endGame()
    //text to display that game has neded as you have been caught 
    //text to display the final score 


    //}


    //Starting the Game and reducing the time remaining left to play.

    // function startGame() {
    //     document.addEventListener('keyup', movingJon)
    //     intervalId = setInterval(() => {
    //         startCount--
    //         countdown.textContent = startCount
    //         console.log('reducing time')
    //         if (startCount <= 0) {
    //             clearInterval(intervalId)
    //             EndTheGame()
    //         }
    //     }, 1000);
    //     //include start Audio
    //     //include begin moving the walkers
    //     //include the start timer function
    // }



    //This function will reduce the time and once time reaches 0. Gmae will end and results appear
    // function startTimer() {

    //     intervalId = setInterval(() => {
    //         startCount--
    //         countdown.textContent = startCount
    //         console.log('reducing time')
    //         if(startCount <= 0) {
    //             clearInterval(intervalId)
    //             endGame()
    //             return
    //         }
    //     }, 1000);
    // }



    //function to end the game


    //restart the game if player wants to - this will reload the whole page on click
    function playAgain() {
        window.location.reload()

    }



    // startTheGame.addEventListener('click', startGame)
    // playGameAgain.addEventListener('click', playAgain)









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

