// Connecting to server. Don't touch this :-) 
let socket = io();

let myPlayerIndex = 0;
let playerColors = ['#cc0000', '#70a500', '#cc9710', '#008fcc']
let playerCount = 0;
let whosTurn = 0;
let samples = [];
let audio
let IndexCount = [];

let cardsPlayed = []

let sounds = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h', ]


// let mySound;
// function preload() {
//   soundFormats('mp3', 'ogg');
//   mySound = loadSound('assets/PatchArena_marimba-060.mp3/');
// }
function setup() {
   audio = new Audio('assets/PatchArena_marimba-060.mp3');
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
$('.wrapper').css("grid-template-columns", "repeat(" + gridSize + ", 130px)");
for (let i = 0; i < gridSize * gridSize; i++) {
   $('.wrapper').append('<div class="cell empty"></div>');
}


$('.wrapper').click(clickedButton);

function clickedButton(ev) {
   console.log(ev.target)

   let element = $(ev.target);

   if (element.hasClass('border')) {
      element.removeClass('border');
   } else {
      element.addClass('border')
   }

   //  socket.emit('serverEvent', "süd");
}




socket.on('connected', function (msg) {
   console.log(msg);
   socket.emit('serverEvent', {
      type: "reset"
   });
});


socket.on('serverEvent', function (message) {


})


socket.on('serverEvent', function (message) {
   console.log("Incoming event: ", message);


   if (sounds[message.cellIndex]) {
      console.log('Sound abgespielt')
      // mySound.play();
      audio.play();

   }

   if (message.type == "RandomList") {
      sounds = message.sounds;

   }

   if (message.type == "reset") {
      whosTurn = 0;
      $('.cell').addClass("empty");
      $('.cell').css("background-color", "white");
   }

   if (message.type == "played") {
      console.log(sounds[message.cellIndex])

      if (cardsPlayed.length == 1) {
         let cell = $('.wrapper').children()[message.cellIndex];
         cell = $(cell);
         cell.removeClass("empty");
         //cell.css("background-color", playerColors[message.playerIndex]);
         //cell.css("background-color", '#6b6b6b');

         if (cardsPlayed[0] == cardsPlayed[1]) {
            console.log("Erfolg")
            let cell = $('.wrapper').children()[message.cellIndex];
                  cell = $(cell);
                  //cell.removeClass("empty");
                  cell.css("background-color", playerColors[message.playerIndex]);

            let cellOld = $('.wrapper').children()[IndexCount[0]];
                  cellOld = $(cellOld);
                  //cell.removeClass("empty");
                  cell.css("background-color", playerColors[message.playerIndex]);

               IndexCount = []
               
         } else {
            console.log('Kein Erfolg')
            let cell = $('.wrapper').children()[message.cellIndex];
                  cell = $(cell);
                  cell.addClass("empty");
                  cell.css("background-color", '#e2e2e2');

                  IndexCount = []

            whosTurn++;
            cardsPlayed = []
            if (whosTurn >= playerCount) {
               whosTurn = 0;
            }
            updateStatus();
         }

      } else {

         let cell = $('.wrapper').children()[message.cellIndex];
         cell = $(cell);
         cell.removeClass("empty");
         //cell.css("background-color", '#6b6b6b');

         cardsPlayed.push('sounds[message.cellIndex]')
         IndexCount.push('message.cellIndex')
         
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




// function Card(){
//    let cell = $('.wrapper').children()[message.cellIndex];
//    cell = $(cell);
//    cell.removeClass("empty");
//    cell.css("background-color", playerColors[message.playerIndex]);
// }





function updateStatus() {
   //$('#player-status').html("There are " + playerCount + " players connected");

   $('#playcolor').css("background-color", playerColors[myPlayerIndex]);
   $('body').css("background-color", playerColors[myPlayerIndex] + "4"); // background color like playing color but less opacity

   if (whosTurn == myPlayerIndex) {
      $('.turn-status').html("It's your turn.");
   } else {
      $('.turn-status').html("Waiting for player " + (whosTurn + 1) + ".");
   }
}


// socket.on('connected', function (msg) {
//     console.log(msg);
// });


// // Incoming events 
// socket.on('serverEvent', function (message) {
//  console.log(message)

//  let Button1 = document.getElementById("Button1")

//  if (message == "süd") {
//     let y = Button1.offsetTop;
//     y = y + 20;
//     Button1.style.top = y + "px";
//  }
//  if (message == "ost") {
//     let y = Button1.offsetLeft;
//     y = y + 20;
//     Button1.style.left = y + "px";
//  }
//  if (message == "nord") {
//     let y = Button1.offsetTop;
//     y = y - 20;
//     Button1.style.top = y + "px";
//  }
//  if (message == "west") {
//     let y = Button1.offsetLeft;
//     y = y - 20;
//     Button1.style.left = y + "px";
//  }
// });