// Connecting to server. Don't touch this :-) 
let socket = io();

 let myPlayerIndex = 0;
// let playerColors = ['#f80', '#08f', '#80f', '#0f8', '#8f0', '#f08']
// let playerCount = 0;
 let whosTurn = 0;


let gridSize = 4;
$('.wrapper').children().remove();
$('.wrapper').css("grid-template-columns", "repeat(" + gridSize + ", 130px)");
for (let i = 0; i < gridSize*gridSize; i++) {
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


$('.cell').click(function() {
   console.log(myPlayerIndex)
   if (whosTurn == myPlayerIndex && $(this).hasClass("empty")) {
       // console.log(this);
       socket.emit('serverEvent', {type:"played", playerIndex:myPlayerIndex, cellIndex:$(this).index()});
   }
});




// function updateStatus() {
//    $('#player-status').html("There are " + playerCount + " players connected");

//    $('#playcolor').css("background-color", playerColors[myPlayerIndex]);
//    $('body').css("background-color", playerColors[myPlayerIndex]+"4"); // background color like playing color but less opacity

//    if (whosTurn == myPlayerIndex) {
//        $('.turn-status').html("It's your turn.");
//    } else {
//        $('.turn-status').html("Waiting for player " + (whosTurn+1) + ".");        
//    }
// }


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
