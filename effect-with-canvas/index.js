document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.querySelector("canvas");
    var c = canvas.getContext('2d');
    var cadic = new Image();
    cadic.src = "cadic.png";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var mouse = {
        x: undefined,
        y: undefined
    }

    const arrayColor = [
        "#845EC2", 
        "#D65DB1", 
        "#FF6F91", 
        "#FF9671", 
        "#FFC75F", 
        "#F9F871"];
    
    const maxRadius = 50;
    const minRadius = 5;
    
    document.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    document.addEventListener("mousemove", function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    function Circle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: Math.random() * 4 - 2,
            y: Math.random() * 4 - 2
        };
    }

    function createX() {
        return Math.floor(Math.random() * canvas.width);
    }

    function createY() {
        return Math.floor(Math.random() * canvas.height);
    }

    function randomColor() {
        return arrayColor[Math.floor(Math.random() * arrayColor.length)];
    }

    Circle.prototype.draw = function() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        
        c.fill();
        c.closePath();
        
        c.beginPath();
        // c.font = "30px source sans-serif";
        // c.fillStyle = "red";
        // c.shadowColor = "white";
        // c.shadowBlur = 5;
        // c.textAlign = "center";
        // c.fillText("T.A", mouse.x, mouse.y);
        c.drawImage(cadic, mouse.x - 50, mouse.y - 100, 100, 200);
        c.fill();
        c.closePath();
        c.restore();
    }

    Circle.prototype.update = function() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if(mouse.x - this.x < 75 && mouse.x - this.x > -75 && mouse.y - this.y < 75 && mouse.y - this.y > -75) {
            if(this.radius < maxRadius) {
                this.radius += 5;
            }
        }
        else {
            if(this.radius > minRadius) {
                this.radius -= 2;
                this.x += this.velocity.x * 4;
                this.y += this.velocity.y * 4;
            }
        }
        this.colision();
        this.draw();
    }

    Circle.prototype.colision = function() {
        if(this.x >= canvas.width || this.x <= 0)
            this.velocity.x = -this.velocity.x;
        if (this.y >= canvas.height || this.y <= 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

    let arrayCircle;

    function init() {
        arrayCircle = [];
        for(let i = 0; i < 300; i++) {
            arrayCircle.push(new Circle(createX(), createY(), 5, randomColor()));
        }
    }

    function animate() {
        window.requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        arrayCircle.forEach(function(circle) {
            circle.update();
            
        });
    }

    init();
    animate();
});