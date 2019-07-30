document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.querySelector("canvas");
    var brush = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function Snow() {
        this.x = 10;
        this.y = 10;
        this.radius = 10;
        this.color = "#FFF";   
    }

    Snow.prototype.draw = function() {
        brush.beginPath();
        brush.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        brush.fillStyle(this.color);
        brush.fill();
        brush.closePath();
    }

    function init() {
        
    }

    function update() {

    }

});