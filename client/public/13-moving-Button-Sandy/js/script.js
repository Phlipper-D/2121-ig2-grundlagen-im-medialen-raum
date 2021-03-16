// Connecting to server. Don't touch this :-) 
let socket = io();

function clickedButton() {
   // console.log("Click auf Button")

    socket.emit('serverEvent', "süd");
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
