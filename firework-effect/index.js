document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.createElement("canvas");
    var brush = canvas.getContext("2d");
    document.body.appendChild(canvas);
    const arrayColor = [
        "#845EC2",
        "#D65DB1",
        "#FF6F91",
        "#FF9671",
        "#FFC75F",
        "#F9F871"
    ];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function Firework() {
        this.radius = Math.random() * 5;
        this.x = canvas.width / 2;
        this.y = canvas.height + this.radius;
        this.color = arrayColor[Math.floor(Math.random() * arrayColor.length)];
        this.velocity = {
            x: Math.random() * 6 - 3,
            y: Math.random() * 3 + 3
        }
        this.maxY = Math.random() * canvas.height / 4 + canvas.height / 10;
        this.life = false;
    }

    Firework.prototype.draw = function() {
        brush.beginPath();
        brush.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        brush.fillStyle = this.color;
        brush.fill();
        brush.closePath();
    }

    Firework.prototype.update = function() {
        this.x -= this.velocity.x;
        this.y -= this.velocity.y;
        console.log(this.y);
        if(this.y <= this.maxY) {
            this.life = true;
        }
        this.draw();
    }

    var arrFirework = [];
    function init() {
        if(arrFirework.length < 20)
            arrFirework.push(new Firework());
    }

    function animate() {
        window.requestAnimationFrame(animate);
        brush.fillStyle = "rgba(0, 0, 0, 0.1)";
        brush.fillRect(0, 0, canvas.width, canvas.height);

        arrFirework.forEach(function(firework, index) {
            firework.update();
            if(firework.life) {
                arrFirework.splice(index, 1);
            }            
        });
        init();
        console.log(arrFirework.length);
    }

    animate();
});