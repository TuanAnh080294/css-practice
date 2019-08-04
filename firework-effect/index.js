document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.createElement("canvas");
    var brush = canvas.getContext("2d");

    var resetConfig, size, number, fill;
    resetConfig = document.getElementById("reset-config");
    size = document.getElementById("size");
    number = document.getElementById("number");
    fill = document.getElementById("fill");

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

    const config = {
        number: 10,
        size: 5,
        fill: 0.1
    }

    resetConfig.addEventListener("click", function() {
        config.number = number.value = 10;
        config.size = size.value = 5;
        config.fill =0.1;
        fill.value = 1;
    });

    size.addEventListener("click", function() {
        config.size = size.value;
    });

    number.addEventListener("click", function() {
        config.number = number.value;
    });

    fill.addEventListener("click", function() {
        config.fill = "." + fill.value;
    });

    function Firework() {
        this.radius = config.size;
        this.x = canvas.width / 2;
        this.y = canvas.height;
        this.color = arrayColor[Math.floor(Math.random() * arrayColor.length)];
        this.velocity = {
            x: Math.random() * 6 - 3,
            y: Math.random() * 3 + 3
        }
        this.maxY = Math.random() * canvas.height / 4 + canvas.height / 10;
        this.life = false;
    }

    Firework.prototype.maximumY = function() {
        if(this.y <= this.maxY) {
            this.life = true;
        }
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
        if(this.y <= this.maxY) {
            this.life = true;
            for(let i=1; i < config.number; i++) {
                arrSpark.push(new Spark(this.x, this.y, this.radius, this.color));
            }
        }
        this.draw();
    }
    //end fire work

    function Spark(x, y, radius, color) {
        this.radius = radius / 2;
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
           x: Math.random() * 3 - 1,
           y: Math.random() * 3 - 1
        }
        this.friction = 0.015;
        this.life = 150;
   }

   Spark.prototype.draw = function() {
       brush.beginPath();
       brush.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
       brush.fillStyle = this.color;
       brush.fill();
       brush.closePath();
   }

   Spark.prototype.update = function() {
       this.velocity.y -= this.friction;
       this.x += this.velocity.x;
       this.y -= this.velocity.y;
       this.life -= 1;
       this.draw();
   }

    var arrFirework = [];
    var arrSpark = [];
    function init() {
        if(arrFirework.length < 20)
            arrFirework.push(new Firework());
    }

    function animate() {
        window.requestAnimationFrame(animate);
        brush.fillStyle = `rgba(0, 0, 0, ${config.fill})`;
        brush.fillRect(0, 0, canvas.width, canvas.height);

        arrFirework.forEach(function(firework, index) {
            firework.update();
            if(firework.life) {
                arrFirework.splice(index, 1);
            }            
        });

        arrSpark.forEach(function(s, index) {
            if(this.life <= 0) {
                arrSpark.splice(index, 1);
            }
            if(arrSpark.length > 1000) {
                arrSpark.splice(0, 500);
            }
           s.update();
           
        });
        init();
        console.log(arrSpark.length);
    }

    animate();
});