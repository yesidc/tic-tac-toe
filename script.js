// these variable are used to set up the playHumanComputer function
  let randomNumber;
  let checkingLoserOption= false
  let avoidWinning= false
  // this variable lets me know if the computer button was clicked.
  let flagComPlaying= false
  // this variable runs only part of the funcion checkWinner
  let checkingWinnerOption= false
  // this varibale tells the winnnerMove function if whether the winner movement was found or not. 
  let rightMove= false
  // this variable stores the number of the computer winner movement, taken from the arrGameBoard
  let numIdex;
  
  let btnReset= document.getElementById('btnReset')
  // this array stores all the results so that we can assess them to determine the winner. 
  // this variable prevents the smame div being clicked more than once
  let used = 0
  // this variable let players know that none of them won the game, they drew
  let drew = true
  let arrGameBoard = ['', '', '', '', '', '', '', '', '']
  let flagFigure = 'O'
  let keepTrack = 0
  let divs = document.querySelectorAll('.block')
  let divsArr = Array.from(divs)
  let wrapperBtn = document.getElementById('wrapperBtn')
  let playAgainst = document.createElement('h2')
  playAgainst.innerHTML = 'Play Against: '
  let btnHuman = document.createElement('input')
  btnHuman.type = ('button')
  btnHuman.value = 'Human';
  btnHuman.setAttribute('class', 'btnPlayAgainst')
  
  let btnComputer = document.createElement('input')
  btnComputer.type = ('button')
  btnComputer.value = 'Computer';
  btnComputer.setAttribute('class', 'btnPlayAgainst')
  let btnPlay = document.getElementById('btnPlay')
  btnPlay.addEventListener('click', function () {
    wrapperBtn.appendChild(playAgainst)
    wrapperBtn.appendChild(btnComputer)
    wrapperBtn.appendChild(btnHuman)


  })
btnHuman.setAttribute('onclick', 'loadEvents()')
// this function loads the events of every single div element so that when user clicks on it, it'll fire the click event. 
  function loadEvents(){
     for (let i = 0; i <= 8; i++) {
      divsArr[i].setAttribute('onclick', 'figure(this);')
      divsArr[i].setAttribute('data-used', '0')
    }
  }
 
  function figure(divn) {
    used = parseInt(divn.getAttribute('data-used'))
    if (used == 0) {

      keepTrack += 1;
      var dataNum = parseInt(divn.getAttribute('data-num'))
      divn.parentNode.parentNode;
      var paragraph = document.createElement('p');
      paragraph.innerHTML = flagFigure
      divn.appendChild(paragraph)
      divn.setAttribute('style', 'color:blue')
      console.log(divn)
      arrGameBoard[dataNum] = flagFigure;
      checkWinner();
     
      if (flagFigure === 'O') {
        flagFigure = 'X'

      } else {
        flagFigure = 'O'
      }


      divn.setAttribute('data-used', '1')

    }
    // the code withing this if statement chooses and checks the computer movements
    if((flagComPlaying==true)&& (drew==true)){
      // this function sets a randomNumber for the fisrt two movements. it'll be called as well if none of the spots left is a feasible move leading to a computer win
      function calculateRandom(){
          randomNumber= Math.floor(Math.random() * Math.floor(9))
          used= parseInt(divsArr[randomNumber].getAttribute('data-used'))
          if(used==1){
            do{
              randomNumber= Math.floor(Math.random() * Math.floor(9))
              used= parseInt(divsArr[randomNumber].getAttribute('data-used'))
            }
            while(used==1)
        }

      }
      function loserMove(){
        
        for(let x=0; x<=8; x++){
          if(arrGameBoard[x] === ''){
            arrGameBoard[x]='X'
            checkingWinnerOption=true;
            checkingLoserOption= true;
            numIdex=x
            checkWinner()
            // this conditional deletes the values added to the array.
            arrGameBoard[x]=''
            
            if(avoidWinning===true){
              break
            }
            
          }
          
        }
      }
    
      function winnnerMove(){
        
        for(let i=0; i<=8; i++){
          if(arrGameBoard[i] === ''){
            arrGameBoard[i]='O'
            checkingWinnerOption=true;
            checkingLoserOption= true
            numIdex=i
            checkWinner()
            // this conditional deletes the values added to the array.
            arrGameBoard[i]=''
            
            if(rightMove===true){
              break
            }
            
          }
          
        }
      }
      function playHumanComp(){
        checkingLoserOption=false;
        winnnerMove()
        checkingWinnerOption=false;
        
        if(rightMove=== true){
          
          divsArr[numIdex].click();
        }else if(rightMove==false){
          loserMove()
          if(avoidWinning===true){
            
            divsArr[numIdex].click()
          }
        }
        if(rightMove === false && avoidWinning=== false){
          calculateRandom()
          divsArr[randomNumber].click();
        }
        avoidWinning=false
      }
  



      // the first movement is made by the computer, since keepTrack keeps track of the numner of grids used, if keepTrack == 2, it means both the computer and the human have had their turns, so it would be the computers turn again and so on  and so on
      if(keepTrack==2){
        
        calculateRandom()
        divsArr[randomNumber].click();
      }

      if(keepTrack==4){
       playHumanComp();
      }
      
      if(keepTrack==6){
        playHumanComp();
      }
      if(keepTrack==8){
        playHumanComp();
      }
    }

  }
  // this function checks, after one of the players has clicked more than twice on any of the divs, to see if any of them has won.
  function checkWinner() {
    function manageCheckWinner(){
      rightMove= true;
        avoidWinning= true;
        if(checkingWinnerOption===false){
          alert(`${flagFigure} you are a winner!`)
        }
        if(checkingLoserOption== true){
          drew= true
        }else{
          drew = false
        }
    }
    if (keepTrack >= 3) {
      if ((arrGameBoard[0] !== '') && (arrGameBoard[0] === arrGameBoard[1]) && (arrGameBoard[1] === arrGameBoard[2])) {
        manageCheckWinner()
      } else if ((arrGameBoard[3] !== '') && (arrGameBoard[3] === arrGameBoard[4]) && (arrGameBoard[4] === arrGameBoard[5])) {
        manageCheckWinner()
      } else if ((arrGameBoard[6] !== '') && (arrGameBoard[6] === arrGameBoard[7]) && (arrGameBoard[7] === arrGameBoard[8])) {
        manageCheckWinner()
      } else if ((arrGameBoard[0] !== '') && (arrGameBoard[0] === arrGameBoard[3]) && (arrGameBoard[3] === arrGameBoard[6])) {
        manageCheckWinner()
      } else if ((arrGameBoard[1] !== '') && (arrGameBoard[1] === arrGameBoard[4]) && (arrGameBoard[4] === arrGameBoard[7])) {
        manageCheckWinner()
      } else if ((arrGameBoard[2] !== '') && (arrGameBoard[2] === arrGameBoard[5]) && (arrGameBoard[5] === arrGameBoard[8])) {
        manageCheckWinner()
      } else if ((arrGameBoard[0] !== '') && (arrGameBoard[0] === arrGameBoard[4]) && (arrGameBoard[4] === arrGameBoard[8])) {
        manageCheckWinner()
      } else if ((arrGameBoard[2] !== '') && (arrGameBoard[2] === arrGameBoard[4]) && (arrGameBoard[4] === arrGameBoard[6])) {
        manageCheckWinner()
      }

    }
    if ((drew === true) && (keepTrack === 9)) {
      alert('The game was a drew')
    }

  }
btnReset.setAttribute('onclick', 'mouseClicked()')
  mouseClicked = function() {
    // Restart the program whenever the user clicks the mouse
   location.reload();
};
btnComputer.setAttribute('onclick', 'playComputer()')
function playComputer(){
  loadEvents()
   flagComPlaying=true
  randomNumber= Math.floor(Math.random() * Math.floor(9))
  divsArr[randomNumber].click();
 
}

