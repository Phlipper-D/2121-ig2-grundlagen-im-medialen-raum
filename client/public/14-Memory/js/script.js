// Connecting to server. Don't touch this :-) 
let socket = io();

let myPlayerIndex = 0;
let playerColors = ['#7dc300', '#463ca0', '#ff6400', '#009ef5']
let playerCount = 0;
let whosTurn = 0;
let samples = [];
let audioa
let audiob
let audioc
let audiod
let audioe
let audiof
let audiog
let audioh

let IndexCount = [];

let cardsPlayed = []

let sounds = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', ]



let ScoreP1 = []
let ScoreP2 = []
let ScoreP3 = []
let ScoreP4 = []
let Endgame = []
let Winner = []

delay = 1000



function setup() {
   audioa = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-win.mp3');
   audiob = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-ahahah.ogg');
   audioc = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-egg.mp3');
   audiod = new Audio('assets/PatchArena_marimba-063.mp3');
   audioe = new Audio('assets/PatchArena_marimba-064.mp3');
   audiof = new Audio('assets/PatchArena_marimba-065.mp3');
   audiog = new Audio('assets/PatchArena_marimba-066.mp3');
   audioh = new Audio('assets/PatchArena_marimba-067.mp3');
}


document.getElementById("Image").onclick = function () {
   this.remove();
}


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

   socket.emit('serverEvent', {
      type: "RandomList",
      sounds
   });

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


   //SOund wird durch Buchstaben abgespielt



   //Random Array wird von neusten Spierler überschrieben
   if (message.type == "RandomList") {
      sounds = message.sounds;

   }

   if (message.type == "reset") {
      whosTurn = 0;
      $('.cell').addClass("empty");
      $('.cell').css("background-color", '#e2e2e2');
      IndexCount = []
      cardsPlayed = [];
      Endgame = []
      ScoreP1 = []
      ScoreP2 = []
      ScoreP3 = []
      ScoreP4 = []
      updateStatus();

   }

   if (message.type == "played") {
      console.log(sounds[message.cellIndex])


         if (sounds[message.cellIndex] == 1) {
                  console.log('Sound A abgespielt')
                  audioa.play();
         }
         if (sounds[message.cellIndex] == 2) {
            console.log('Sound B abgespielt')
            audiob.play();
         }
         if (sounds[message.cellIndex] == 3) {
            console.log('Sound c abgespielt')
            audioc.play();
         }
         if (sounds[message.cellIndex] == 4) {
            console.log('Sound d abgespielt')
            audiod.play();
         }
         if (sounds[message.cellIndex] == 5) {
            console.log('Sound e abgespielt')
            audioe.play();
         }
         if (sounds[message.cellIndex] == 6) {
            console.log('Sound f abgespielt')
            audiof.play();
         }
         if (sounds[message.cellIndex] == 7) {
            console.log('Sound g abgespielt')
            audiog.play();
         }
         if (sounds[message.cellIndex] == 8) {
            console.log('Sound h abgespielt')
            audioh.play();
         }

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
                  ScoreP1.push(cardsPlayed[0], cardsPlayed[1])
               }

               if (message.playerIndex === 1) {
                  ScoreP2.push(cardsPlayed[0], cardsPlayed[1])
               }

               if (message.playerIndex === 2) {
                  ScoreP3.push(cardsPlayed[0], cardsPlayed[1])
               }

               if (message.playerIndex === 3) {
                  ScoreP4.push(cardsPlayed[0], cardsPlayed[1])
               }

              

               if (Endgame.length === 4) {
                  Winner.push(ScoreP1.length, ScoreP2.length, ScoreP3.length, ScoreP4.length)

                  console.log(Winner)
                  console.log(Math.max(...Winner))

                  //$('.RestartButton').removeClass("hidden");

                  setTimeout(function () {

                     $('.cell').addClass("Ending");

                  }, delay * 1.5);

                  if (ScoreP1.length === Math.max(...Winner)) {
                     console.log("Spieler 1 hat gewonnen")


                  }
                  if (ScoreP2.length === Math.max(...Winner)) {
                     console.log("Spieler 2 hat gewonnen")
                  }
                  if (ScoreP3.length === Math.max(...Winner)) {
                     console.log("Spieler 3 hat gewonnen")
                  }
                  if (ScoreP4.length === Math.max(...Winner)) {
                     console.log("Spieler 4 hat gewonnen")
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
      // console.log(this);
      socket.emit('serverEvent', {
         type: "played",
         playerIndex: myPlayerIndex,
         cellIndex: $(this).index()
      });
      //  socket.emit('serverEvent', {type:"sound", playerIndex:myPlayerIndex, cellIndex:$(this).index()});
   }
});


function getMaxOfArray(Winner) {
   return Math.max.apply(null, Winner);
}

//Animationen 
//Spielende? (Sounds werden in Score.Array gepackt und ausgelesen)
//Replay Button?



function updateStatus() {

   // if (Endgame.length === 16) {
   //    socket.emit('serverEvent', {
   //       type: "reset"
   //    });
   // }


   $('#playcolor').css("background-color", playerColors[myPlayerIndex]);
   $('body').css("background-color", playerColors[myPlayerIndex] + "4"); // background color like playing color but less opacity

   $('#ScoreP1').html(ScoreP1.length);
   $('#ScoreP2').html(ScoreP2.length);
   $('#ScoreP3').html(ScoreP3.length);
   $('#ScoreP4').html(ScoreP4.length);

   if (whosTurn == myPlayerIndex) {
      $('.turn-status').html("It's your turn");
   } else {
      $('.turn-status').html("Waiting for Player " + (whosTurn + 1));
   }
}