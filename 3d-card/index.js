document.addEventListener("DOMContentLoaded", function() {
    var card = document.querySelector(".card");
    var maxX = 25;
    var maxY = 20;

    card.addEventListener("mousemove", function(e) {
        var x = e.offsetX / this.offsetWidth;
        var y = e.offsetY / this.offsetHeight;
        this.style.transform = `rotateY(${(x > 0.5) ? `-` + x*maxY :  ((1-x) * maxY)}deg) 
                                rotateX(${(y > 0.5) ? y*maxX : '-' + (1-y) * maxX}deg)`;
        
    });
})