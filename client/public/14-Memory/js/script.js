// Connecting to server. Don't touch this :-) 
let socket = io();

let myPlayerIndex = 0;
let playerColors = ['#7dc300', '#463ca0', '#ff6400', '#009ef5'];
let playerCount = 0;
let whosTurn = 0;
let samples = [];
let audioa;
let audiob;
let audioc;
let audiod;
let audioe;
let audiof;
let audiog;
let audioh;
let Unentschieden;
let IndexCount = [];
let cardsPlayed = [];
let sounds = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', ];
let SoundScore = [];
let ScoreP1 = [];
let ScoreP2 = [];
let ScoreP3 = [];
let ScoreP4 = [];
let Endgame = [];
let Winner = [];
let Gleichstand;
delay = 1000;

//Sounds werden geladen
function setup() {
   audioa = new Audio('Sounds/clap-808.wav');
   audiob = new Audio('Sounds/cowbell-808.wav');
   audioc = new Audio('Sounds/hihat-dist02.wav');
   audiod = new Audio('Sounds/kick-808.wav');
   audioe = new Audio('Sounds/openhat-analog.wav');
   audiof = new Audio('Sounds/ride-acoustic01.wav');
   audiog = new Audio('Sounds/snare-lofi02.wav');
   audioh = new Audio('Sounds/tom-fm.wav');
   Unentschieden = new Audio('https://www.myinstants.com/media/sounds/erro.mp3');
}


document.getElementById("Image").onclick = function () {
   this.remove();
}

//shuffle Fkt.
function shuffle(sounds) {
   var currentIndex = sounds.length,
      temporaryValue, randomIndex;

   while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = sounds[currentIndex];
      sounds[currentIndex] = sounds[randomIndex];
      sounds[randomIndex] = temporaryValue;
   }

   return sounds;
}

shuffle(sounds);
console.log(sounds);


socket.on('newUsersEvent', function (myID, myIndex, userList) {
   console.log("New users event: ");
   console.log("That's me: " + myID);
   console.log("My index in the list: " + myIndex);
   console.log("That's the new users: ");
   console.log(userList);
   $('.game-status').html("You are Player " + (myIndex + 1));


   playerCount = userList.length;
   myPlayerIndex = myIndex;

   updateStatus();
});


let gridSize = 4;
$('.wrapper').children().remove();
$('.wrapper').css("grid-template-columns", "repeat(" + gridSize + ", 100px)");
for (let i = 0; i < gridSize * gridSize; i++) {
   $('.wrapper').append('<div class="cell empty"></div>');
}


socket.on('connected', function (msg) {
   console.log(msg);
   socket.emit('serverEvent', {
      type: "reset"
   });
});

//Nachrichten kommen an und werden verarbeitet 

socket.on('serverEvent', function (message) {
   console.log("Incoming event: ", message);


   //Random Array wird von neusten Spierler überschrieben
   if (message.type == "RandomList") {
      sounds = message.sounds;
   }

   if (message.type == "reset") {
      whosTurn = 0;
      $('.cell').addClass("empty");
      $('.cell').css("background-color", '#e2e2e2');
      $('.turn-status').removeClass("hidden");
      $('.game-status').removeClass("hidden");
      $('.Overlay').addClass("hidden");
      $('.WinningText').addClass("hidden");
      $('.RestartButton').addClass("hidden");
      IndexCount = []
      cardsPlayed = [];
      Endgame = []
      ScoreP1 = []
      ScoreP2 = []
      ScoreP3 = []
      ScoreP4 = []
      Winner = []

      function shuffle(sounds) {
         var currentIndex = sounds.length,
            temporaryValue, randomIndex;

         while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = sounds[currentIndex];
            sounds[currentIndex] = sounds[randomIndex];
            sounds[randomIndex] = temporaryValue;
         }
         return sounds;
      }
      shuffle(sounds);
      console.log(sounds);
      updateStatus();

      socket.emit('serverEvent', {
         type: "RandomList",
         sounds
      });
   }
//Vergleichsfunktion
   if (message.type == "played") {
      console.log(sounds[message.cellIndex])

      playSoundFileByID(sounds[message.cellIndex]);


      if (cardsPlayed.length == 1) {

         let cell = $('.wrapper').children()[message.cellIndex];
         cell = $(cell);
         cell.removeClass("empty");
         cardsPlayed.push(sounds[message.cellIndex])
         cell.css("background-color", '#6b6b6b');

         if (cardsPlayed[0] === cardsPlayed[1]) {

            setTimeout(function () {

               console.log("Erfolg")
               let cell = $('.wrapper').children()[message.cellIndex];
               cell = $(cell);
               cell.css("background-color", playerColors[message.playerIndex]);

               let cellOld = $('.wrapper').children()[IndexCount[0]];
               cellOld = $(cellOld);
               cellOld.css("background-color", playerColors[message.playerIndex]);

               Endgame.push(cardsPlayed[0], cardsPlayed[1])


               if (message.playerIndex === 0) {
                  ScoreP1.push(cardsPlayed[0])

               }

               if (message.playerIndex === 1) {
                  ScoreP2.push(cardsPlayed[0])
               }

               if (message.playerIndex === 2) {
                  ScoreP3.push(cardsPlayed[0])
               }

               if (message.playerIndex === 3) {
                  ScoreP4.push(cardsPlayed[0])
               }



               if (Endgame.length === 16) {
                  Winner = [ScoreP1.length, ScoreP2.length, ScoreP3.length, ScoreP4.length]



                  let winnerIndex = 0;
                  for (let i = 1; i < Winner.length; i++) {
                     if (Winner[i] > Winner[winnerIndex]) {
                        winnerIndex = i;
                        Gleichstand = false
                     } else {
                        if (Winner[i] === Winner[winnerIndex]) {
                           console.log("Gleichstand")
                           Gleichstand = true
                        }
                     }
                  }

                  setTimeout(function () {

                     if (Gleichstand = true) {
                        winnerIndex = 5
                     }
                  }, delay / 4);

                  setTimeout(function () {

                     $('.cell').css("background-color", '#6b6b6b');
                     $('.turn-status').addClass("hidden");
                     $('.game-status').addClass("hidden");

                     setTimeout(function () {
                        $('.Overlay').removeClass("hidden");



                     }, delay / 2);
                  }, delay * 1.5);


                  if (winnerIndex === 0) {
                     console.log("Spieler 1 hat gewonnen")

                     setTimeout(function () {
                        playMelody(ScoreP1);
                     }, delay * 3);

                     setTimeout(function () {
                        $('.WinningText').removeClass("hidden");
                        $('.WinningText').html("Player 1 won the Game");
                        $('.RestartButton').removeClass("hidden");
                        $('.RestartButton').addClass("clickable");
                     }, delay * 2);
                  }
                  if (winnerIndex === 1) {
                     console.log("Spieler 2 hat gewonnen")

                     setTimeout(function () {
                        playMelody(ScoreP2);
                     }, delay * 3);

                     setTimeout(function () {
                        $('.WinningText').removeClass("hidden");
                        $('.WinningText').html("Player 2 won the Game");
                        $('.RestartButton').removeClass("hidden");
                        $('.RestartButton').addClass("clickable");
                     }, delay * 2);
                  }
                  if (winnerIndex === 2) {
                     console.log("Spieler 3 hat gewonnen")

                     setTimeout(function () {
                        playMelody(ScoreP3);
                     }, delay * 3);

                     setTimeout(function () {
                        $('.WinningText').removeClass("hidden");
                        $('.WinningText').html("Player 3 won the Game");
                        $('.RestartButton').removeClass("hidden");
                        $('.RestartButton').addClass("clickable");
                     }, delay * 2);
                  }
                  if (winnerIndex === 3) {
                     console.log("Spieler 4 hat gewonnen")

                     setTimeout(function () {
                        playMelody(ScoreP4);
                     }, delay * 3);

                     setTimeout(function () {
                        $('.WinningText').removeClass("hidden");
                        $('.WinningText').html("Player 4 won the Game");
                        $('.RestartButton').removeClass("hidden");
                        $('.RestartButton').addClass("clickable");
                     }, delay * 2);
                  }
                  if (winnerIndex === 5) {
                     console.log("Unentschieden")

                     setTimeout(function () {
                        Unentschieden.play()
                     }, delay * 5);

                     setTimeout(function () {
                        $('.RestartButton').html("Revanche!");
                        $('.WinningText').removeClass("hidden");
                        $('.WinningText').html("Unentschieden");
                        $('.RestartButton').removeClass("hidden");
                        $('.RestartButton').addClass("clickable");
                     }, delay * 2);
                  }
               }

               IndexCount = []
               cardsPlayed = [];
               updateStatus();

            }, delay);


         } else {

            setTimeout(function () {

               console.log('Kein Erfolg')
               let cell = $('.wrapper').children()[message.cellIndex];
               cell = $(cell);
               cell.addClass("empty");
               cell.css("background-color", '#e2e2e2');

               let cellOld = $('.wrapper').children()[IndexCount[0]];
               cellOld = $(cellOld);
               cellOld.addClass("empty");
               cellOld.css("background-color", '#e2e2e2');

               IndexCount = []

               whosTurn++;
               cardsPlayed = []
               if (whosTurn >= playerCount) {
                  whosTurn = 0;
               }
               updateStatus();

            }, delay);

         }

      } else {

         let cell = $('.wrapper').children()[message.cellIndex];
         cell = $(cell);
         cell.removeClass("empty");
         cell.css("background-color", '#6b6b6b');

         cardsPlayed.push(sounds[message.cellIndex])
         IndexCount.push(message.cellIndex)

      }

   }
});

$('.cell').click(function () {
   console.log(myPlayerIndex)
   if (whosTurn == myPlayerIndex && $(this).hasClass("empty")) {
      socket.emit('serverEvent', {
         type: "played",
         playerIndex: myPlayerIndex,
         cellIndex: $(this).index()
      });
   }
});


function getMaxOfArray(Winner) {
   return Math.max.apply(null, Winner);
}


$('.RestartButton').click(function () {

   if (Endgame.length === 16) {
      console.log("Restart")
      socket.emit('serverEvent', {
         type: "reset",
      });
   }
});


function updateStatus() {

   $('#playcolor').css("background-color", playerColors[myPlayerIndex]);
   $('body').css("background-color", playerColors[myPlayerIndex] + "4"); 

   $('#ScoreP1').html(ScoreP1.length * 2);
   $('#ScoreP2').html(ScoreP2.length * 2);
   $('#ScoreP3').html(ScoreP3.length * 2);
   $('#ScoreP4').html(ScoreP4.length * 2);

   if (whosTurn == myPlayerIndex) {
      $('.turn-status').html("It's your turn");
   } else {
      $('.turn-status').html("Waiting for Player " + (whosTurn + 1));
   }
}

// Melody
function playMelody(soundIDs) {
   let soundID = soundIDs.shift();
   playSoundFileByID(soundID);

   if (soundIDs.length > 0) {
      setTimeout(function () {
         playMelody(soundIDs);
      }, 1000);
   }
}


function playSoundFileByID(soundID) {

   if (soundID == 1) {
      console.log('Sound A abgespielt')
      audioa.play();
   }
   if (soundID == 2) {
      console.log('Sound B abgespielt')
      audiob.play();
   }
   if (soundID == 3) {
      console.log('Sound c abgespielt')
      audioc.play();
   }
   if (soundID == 4) {
      console.log('Sound d abgespielt')
      audiod.play();
   }
   if (soundID == 5) {
      console.log('Sound e abgespielt')
      audioe.play();
   }
   if (soundID == 6) {
      console.log('Sound f abgespielt')
      audiof.play();
   }
   if (soundID == 7) {
      console.log('Sound g abgespielt')
      audiog.play();
   }
   if (soundID == 8) {
      console.log('Sound h abgespielt')
      audioh.play();
   }
}