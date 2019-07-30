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
        this.radius = Math.random() * 5;
        this.x = Math.random() * canvas.width;
        this.y = -this.radius;
        this.color = "#FFF";
        this.velocity = {
            x: Math.random() * 4 - 2,
            y: Math.random() * 3 + 2
        }; 
    }

    Snow.prototype.draw = function(brush) {
        brush.beginPath();
        brush.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        brush.fillStyle = this.color;
        // brush.shadowColor = this.color;
        // brush.shadowBlur = 1;
        brush.fill();
        brush.closePath();
    }

    Snow.prototype.update = function() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if(this.y >= canvas.height) {
            this.velocity.y = 0;
        }
        this.draw(brush);
    }

    var arraySnow = [];
    function init() {
        arraySnow.push(new Snow());
    }

    function animate() {
        window.requestAnimationFrame(animate);
        brush.clearRect(0, 0, canvas.width, canvas.height);
        arraySnow.forEach(function(snow) {
            snow.update();
         });
        if(arraySnow.length > 1000) {
            arraySnow.splice(0, 1);
        }
        init();
    }

    animate();
});