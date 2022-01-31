# Game of Thrones | Welcome To The Targaryen House

# Overview

This was my first project from the General Assembly course. We were given 8 days to build a classic JavaScript-grid based arcade game. My project was built on a modern twist of the original Pacman.

# Brief
• Render a game in the browser.  
• Design logic for winning and visually display which player won.   
• Include separate HTML, CSS and JavaScript files.  
• The game must be deployed online.  
• Use semantic markup for HTML and CSS.  


# Site Preview

![Screen Recording 2022-01-31 at 21 47 10](https://user-images.githubusercontent.com/77459312/151878592-8b0f5d0e-7bed-41f2-bd28-57dfd94a2670.gif)

# Deployment
This game has been deployed using GitHub pages and can be found here. 
https://ala161092.github.io/PacMan/

  ## How To Play:
  • Use the arrow functions on your keyboard to navigate your way through the maze.  
  • You must gather all the fire embers before you run out of time.  
  • For each ember you collect you will gain 50-points.  
  • Be sure to avoid those white walkers! If you get to your dragon in time you will gain an extra life!  
  • Hurry now! Time is of the essence! Click the start button to get things moving.  

# My process

## Built with

#### Front-End:
- JavaScript(ES6)
- HTML5
- CSS3 with multiple animatios.

#### Dev Tools:
- GitHub
- Figma
- Photoshop
- Firefox Developer Edition
- VSCode


# Getting Started

 ### Planning:
 
 To ensure I didn't get overwhelmed with the process, I started out with a short wireframe. I wrote out the logic of the game and included where I would be adding   any sounds or animations.
![Screenshot 2022-01-31 at 21 36 31](https://user-images.githubusercontent.com/77459312/151877088-eb295700-eccc-4f67-9f35-d64c05ae6f67.png)

I also used Figma, to draw up a quick visual representation of what I wanted the game to look like.

![Screenshot 2022-01-31 at 21 37 07](https://user-images.githubusercontent.com/77459312/151877184-3c8d88ec-79d8-4657-b4da-f25ddebe45b0.png)

#

# Development

### Creating The Grid
To create the grid I used an array, with each item in the array labelled as a number from 0-2, I found this to be the easiest and cleanest method.
I then created a function that would iterate through each item in the array and assign a class to it, depending on what number the cell was. Each class represented a different aspect of the grid i.e. the obstacle block, the blocks that contained the white walkers etc.


```
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
 
           } else if (layout[i] == 0) {
               blankWalls.push(cells[i])
               blankWalls.forEach(blankWall => {
                   blankWall.classList.add(blankBlocks)
               })
 
           } else if (layout[i] == 1) {
               iceWalls.push(cells[i])
               iceWalls.forEach(iceWall => {
                   iceWall.classList.add(iceBlocks)
               })
           }
       }
       addJon(jonStartingPosition)
   }

```

### Collision Detection 
Next I worked on the logic that allows the player to use the keyboard arrows to move the main character around the board freely without hitting the ice blocks and ensuring that the player stays within the area of the maze and not move off board or move behind the ‘ice-blocks’. The switch statement helped keep the code clean and less repetitive.

https://user-images.githubusercontent.com/77459312/151878967-7de50555-860b-4bc7-8761-e23bbc31dfea.mov

```
 // MVP can only enter cells that contain snowflakes. If obstacles are encountered the player cannot move. 
 
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

```

### Game Scoring
The scoring of the game was determined by checking whether the grid cells contained an ice block. If so 50 points would be added.

```
//scoring to add points for each flake eaten
   function snowFlakeEaten() {
       if (cells[currentJonPosition].classList.contains(iceBlocks)) {
           score += 50
           cells[currentJonPosition].classList.remove(iceBlocks)
           scoreDisplay.innerHTML = `Score: <span>${score}</span>`
       } if (cells[currentJonPosition].classList.contains(dragonBlock)) {
           score += 200
           scoreDisplay.innerHTML = `Score: <span>${score}</span>`
       } if (score >= 7400) {
           endTheGame()
           winnerScoreDisplay()
       }
   }
```
If the player manages to retrieve the dragon 200 points + an extra life would be added. A short animation of a dragon will also appear. 

https://user-images.githubusercontent.com/77459312/151879285-55f4dae1-a00a-41ef-865a-4ab85c20b002.mov

```
//scoring to add points and an extra life if dragon has been encountered
  function retrieveDragon() {
       if (cells[currentJonPosition].classList.contains(dragonBlock)) {
           dragonAudio.play()
           dragonAudio.volume = 0.4;
           lives++
           dragonHit()
           cells[currentJonPosition].classList.remove(dragonBlock)
           livesDisplay.innerHTML = `Lives: <span>${lives}</span>`
       }
   }
```
![Screenshot 2022-01-31 at 21-55-06 Game of Thrones Welcome To The Targaryen House](https://user-images.githubusercontent.com/77459312/151879538-f3fbf361-4120-40fc-a876-ebdcc7ab9e0a.png)

# Future Improvments
  • With more time, I would like to make the game have multiple levels. At each level the time to clear the board will shorten.   
  • I would also like to improve the white walker movement, the current movement is random, I would ideally like to add some logic where the walkers would scope out the main character based on their current coordinates in the grid. 

# Wins & Key Learnings:
  • As this was my first project during my time at General Assembly after only three weeks of learning, I am extremely proud of what I was able to achieve. Not having much knowledge of JavaScript, before starting this course - this project was a great way for me to cement all the learning I had done so far. 



