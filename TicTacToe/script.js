const endpoint = 'https://raw.githubusercontent.com/fabiomaia/pokedex/master/app/src/main/assets/pokemon_cards.json'




const gameBoard =  (() => {

    const pokemonName = [];




    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => pokemonName.push(...data));
    
    function findMatches(wordToMatch, pokemonName) {
        return pokemonName.filter(results => {
            const regex = new RegExp(wordToMatch, 'gi')
            return results.name.match(regex) 
        })
    }
    
    
    function displayMatches() {
        const matchArray = findMatches(this.value, pokemonName)
        const html = matchArray.map(results => {
            const regex = new RegExp(this.value, 'gi');
            const pokiName = results.name.charAt(0).toUpperCase() + results.name.slice(1);
            return `
            <li class="pokemon--item" data-pokemon>
                <span class="name">${pokiName}</span>
                <img class="img" src=${results.spriteURI}>
                <button type="button" class="btn">Select</button>
                <div class="data">
                    <span>Type: ${results.types}</span>
                </div>
            </li>
            `
        }).join('');
        suggestions.innerHTML = html;
    }
    
    
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
    const buttons = document.querySelectorAll('.btn');
    const imageClicked = document.querySelector('.img')
    const searchFormContainer = document.querySelector('.container__pokidex')
    const searchForm = document.querySelector('.search-form')
    
    searchInput.addEventListener('change', displayMatches)
    searchInput.addEventListener('keyup', displayMatches)
    

    let imangeChoice = '';
    let pokemonChoice = '';

    function capitalizeFirstLetter(pokemonChoice) {
        return pokemonChoice.charAt(0).toUpperCase() + pokemonChoice.slice(1);
      }

    
 
    suggestions.addEventListener('click', (e) => {
        let suggestionList = e.target.parentElement.parentElement.children;
        if (e.target.classList.contains('btn')) {
            playerOneImage.style.backgroundImage = `url(${e.target.previousSibling.previousSibling.src})`
            imangeChoice = `url(${e.target.previousSibling.previousSibling.src})`
            pokemonChoice = `${e.target.previousElementSibling.previousElementSibling.innerHTML}`
            searchFormContainer.style.display = "none";
            for (let p = suggestionList.length - 1; p >= 0; --p) {
                suggestionList[p].remove();
              }
        
            searchForm.reset()
            
        }
    })
    

    // game board
    const playerOne = 'x';
    const playerTwo = 'circle';
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let playerTurn; 
    let board = [];
    let container = document.querySelector('.container');
    const winningMessageText = document.querySelector('[data-winning-message-text]')
    const winningMessageElement = document.getElementById('winning--message')
    const restartButton = document.querySelector('#restart--button')
  
    let playerOneImage = document.querySelector('.player-one--image')
    startGame();



    function createBoard() {
       
        for (let i = 0; i < 9; i++) {
            let unit = document.createElement('div')
            unit.className = 'unit';
            unit.setAttribute('data-unit', i)
            container.appendChild(unit)
          }
    }

  createBoard();

    function startGame() {
        playerTurn = false;
        [...container.children].forEach(unit => {
            unit.classList.remove(playerOne)
            unit.classList.remove(playerTwo)
            unit.style.backgroundImage = 'none'
            unit.removeEventListener('click', handleClick)
        })
        searchFormContainer.style.display = "block";
        container.addEventListener('click', handleClick)
        setBoardHoverClass();
        winningMessageElement.classList.remove('show')
    }

  

    restartButton.addEventListener('click', startGame)


    function handleClick(e) {
            if (e.target.classList.contains('unit')) {
                const unitTarget = e.target;
                const currentClass = playerTurn ? playerTwo : playerOne;
                // console.log(e.target.parentElement.classList)
                
                if ((e.target.classList.contains('x')) || (e.target.classList.contains('circle'))) {
                    return
                } else {
                    placeMark(unitTarget, currentClass);
                    // placeComputerMark();
                }                    

                if (checkWin(currentClass)) {
                    endGame(false);
                } else if (isDraw()) {
                    endGame(true)
                } else {
                    swapTurns();
                    setBoardHoverClass();
                }
             
        }
    }

    function isDraw() {
        return [...container.children].every(unit => {
            return unit.classList.contains(playerOne) ||
            unit.classList.contains(playerTwo)
        })
    }

   
  

       function placeMark(unit, currentClass) {
        
            unit.classList.add(currentClass)

            if (unit.classList.contains('x')) {
                unit.style.backgroundImage = `${imangeChoice}`
            } 

               currentClass = playerTurn ? playerTwo : playerOne;
            unit.classList.add(currentClass)
           console.log('hello')
            let random = Math.floor(Math.random() * container.children.length);
            const computerChoice = unit;
            computerChoice.dataset = `${random}`;
            if ((computerChoice.classList.contains('x')) || (computerChoice.classList.contains('circle'))){
                return
            } else {
                if ((!computerChoice.classList.contains('x')) || (!computerChoice.classList.contains('circle'))) {
                computerChoice.style.backgroundImage = "url(img/teamRocket.png)";
                console.log(this);
            } else {
                return
            }
            }


       }

     


    function swapTurns() {
        playerTurn = !playerTurn;
    }

    function setBoardHoverClass() {
        container.classList.remove(playerOne)
        container.classList.remove(playerTwo)

        if (playerTurn) {
            container.classList.add(playerOne)
        } else {
            container.classList.add(playerTwo)
        }
    }

    function checkWin(currentClass) {
        
        return winningCombos.some(combination => {
            return combination.every(index => {
                return container.children[index].classList.contains(currentClass)
            })
        })
    }

    function endGame(draw) {
        if (draw) {
            winningMessageText.innerHTML =  'Draw!'
            winningMessageElement.style.backgroundImage = "url(https://media.giphy.com/media/iLBfN2ejoHli8/giphy.gif)"
        } else {
            winningMessageText.innerHTML = `${playerTurn ? "Team Rocket" : capitalizeFirstLetter(pokemonChoice)} Wins!`
            winningMessageElement.style.backgroundImage = `${playerTurn ?  "url(https://media.giphy.com/media/uzWoRrlxnbL6TJgIbP/giphy.gif)" : "url(https://media.giphy.com/media/8UGGp7rQvfhe63HrFq/giphy.gif)"}`
        }
        winningMessageElement.classList.add('show')
        playerOneImage.style.backgroundImage = "none";
    }

})();



//     if ((i = 0, computerChoice >= container.children.length, i++) && (!unit.classList.contains('x')) || (!unit.classList.contains('circle'))) {
//         unit.style.backgroundImage = "url(img/teamRocket.png)"
//         console.log('correct')
//     } else {
//        return
//     }
    
// }




    // function createBoard() {
    //     for (let i = 0; i < 9; i++) {
    //         board.push('');
       
    //     }
    //     board.forEach((i) => {
    //         const unit = document.createElement('div');
    //         unit.className = 'unit';
    //         // unit.setAttribute('data-unit', i)
    //         unit.dataset.unit = i;
    //         container.appendChild(unit);
    //     })
      
    // }


       // function placeComputerMark(unit, currentClass) {
        //    currentClass = playerTurn ? playerTwo : playerOne;
        //     unit.classList.add(currentClass)
        //    console.log('hello')
        //     let random = Math.floor(Math.random() * container.children.length);
        //     const computerChoice = unit;
        //     computerChoice.dataset = `${random}`;
        //     if ((computerChoice.classList.contains('x')) || (computerChoice.classList.contains('circle'))){
        //         return
        //     } else {
        //         if ((!computerChoice.classList.contains('x')) || (!computerChoice.classList.contains('circle'))) {
        //         computerChoice.style.backgroundImage = "url(img/teamRocket.png)";
        //         console.log(this);
        //     } else {
        //         return
        //     }
        //     }
        // }
