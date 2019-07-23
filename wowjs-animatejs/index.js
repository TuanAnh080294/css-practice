new WOW().init();
var listItem = document.querySelectorAll(".item");
var arrayColor = ["rgba(192, 44, 44, 0.9)", "rgba(121, 176, 75, 0.6)", "rgba(121, 176, 231, 0.6)", "rgba(121, 81, 168, 0.6)", "rgba(121, 190, 168, 0.6)", "rgba(218, 226, 55, 0.6)", "rgba(224, 117, 160, 0.7)"];
var arrayAnimation = ["bounce", "flash", "shake", "swing", "heartBeat", "zoomOutUp", "jackInTheBox", "rollIn", "hinge", "rollOut"];
listItem.forEach(function(i) {
    i.classList.add('wow', arrayAnimation[Math.floor(Math.random() * arrayAnimation.length)]);
    i.setAttribute("data-wow-duration", "1s");
    i.setAttribute("data-wow-delay", "1s");
    i.setAttribute("data-wow-iteration", "3");
    // i.setAttribute("data-wow-offset", "200");
    i.style.background = "linear-gradient(to right top," + arrayColor[Math.floor(Math.random() * arrayColor.length)] + "," + arrayColor[Math.floor(Math.random() * arrayColor.length)] + "," + arrayColor[Math.floor(Math.random() * arrayColor.length)] + ")";
});

