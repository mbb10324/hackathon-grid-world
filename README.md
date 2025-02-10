# DEATH WALK

## Quick Start

#### `npm i`

#### `npm run dev`

## Description

- This game was created for the purposes of learning and growing as a developer. I utilized React Typescript (more information below) to develop the logic behind the game to excercise/showcase my development capabilities with these technologies.

- The game is called death crawl, and it is played on a 50 x 50 grid. Starting from the top left a player will attempt to traverse the grid, and if they make it to the bottom right they win the game. A player is given pre-define health and moves to attempt there journey to the other side of the game board. Throughout the grid; there is equal parts 'blank', 'lava', 'speeder', and 'mud' squares. There is varying reprecussions for landing on each square, and those reprecussions are defined as such:

  - blank: health = 0 / moves = -1
  - speeder: health = -5 / moves = 0
  - lava: health = -50 / moves = -10
  - mud: health = -10 / moves = -5
