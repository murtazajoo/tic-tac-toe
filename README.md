# Tic Tac Toe

This is a tic tac toe game, you can either play with your friend or computer

## Authors

- [@murtazajoo](https://www.github.com/murtazajoo)

## Assignment

- [x] Create Tic-Tac-Toe game in RAW / Vanilla JavaScript

- [x] 2 players can play
- [x] put values in the boxes
- [x] The final result should be stored in the local storage.
- [x] When the user re-opens or comes back to play game you will first show him the past match leader board
- [x] Try to make the game automated by making second player as computer which
- [x] can play with 1 player.

#### methods used

- document.getelementsbyid
- document.getelementsbyclassName
- document.queryselectorAll

#### Technologies to used

- HTML, CSS, Java Script

# function()

#### begin()

- clears the board and sets the values to defaut

#### toogleTurn()

- gets the index of the clicked box/button and add the value to the board array , it also checks for the winner and chnages the turn of player and updates the Dom by invoking another functions

#### render()

- updates DOM

#### getWinner()

- checks for the winner by using an array of winning ways

#### setTurn()

- changes the turn of player

#### computer()

- it is invoked if the user wants to play with a computer, it gets a random number and check if the index is emoty in the board array and then retruns the random number as an index to the toogleTurn() functions

#### choose()

- checks wether user wants to play with a friend or computer

#### showLeader()

- shows the leaderboard , it gets the data from the localStorage and checks who has more wins and sets the html accordingly

#### closeLeader()

-closes leaderboard

#### updateLocal()

-updates the wins in the localStorage leaderboard
