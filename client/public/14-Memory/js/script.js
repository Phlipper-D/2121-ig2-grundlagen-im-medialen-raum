// Connecting to server. Don't touch this :-) 
let socket = io();



$('.button').click(clickedButton);

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
});


// Incoming events 
socket.on('serverEvent', function (message) {
 console.log(message)

 let Button1 = document.getElementById("Button1")

 if (message == "süd") {
    let y = Button1.offsetTop;
    y = y + 20;
    Button1.style.top = y + "px";
 }
 if (message == "ost") {
    let y = Button1.offsetLeft;
    y = y + 20;
    Button1.style.left = y + "px";
 }
 if (message == "nord") {
    let y = Button1.offsetTop;
    y = y - 20;
    Button1.style.top = y + "px";
 }
 if (message == "west") {
    let y = Button1.offsetLeft;
    y = y - 20;
    Button1.style.left = y + "px";
 }
});
