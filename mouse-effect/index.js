document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.createElement("canvas");
	var brush = canvas.getContext("2d");
	var arrColor = [
		"132, 94, 194",
		"214, 93, 178",
		"255, 111, 145",
		"255, 150, 113",
		"255, 199, 95",
		"249, 248, 113"
	];

	var mouse = {
		x: undefined,
		y: undefined
	}

	var mouseClick = 1;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	document.addEventListener("resize", function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

	document.body.appendChild(canvas);

	document.addEventListener("mousemove", function(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	document.addEventListener("click", function() {
		mouseClick += 1;
	});

	function Circle(x, y) {
		this.opacity = 0.9;
		this.x = mouse.x;
		this.y = mouse.y;
		this.radius = Math.random() * 3 + 2;
		this.color = arrColor[Math.floor(Math.random() * arrColor.length)];
		this.velocity = {
			x: Math.random() * 4 - 2,
			y: Math.random() * 4 - 2
		}
		this.life = 60;
		
	}

	Circle.prototype.draw = function() {
		brush.beginPath();
		brush.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		brush.fillStyle = `rgba(${this.color}, ${this.opacity}`;
		brush.fill();
		brush.closePath();
	}

	Circle.prototype.update = function() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.life -= 1;
		this.opacity -= 0.015;
		this.draw();
	}

	var arrCircle = [];

	function init() {
		for(let i = 1; i <= 10; i++) {
			arrCircle.push(new Circle(100, 100));
		}
		
	}

	function animate() {
		window.requestAnimationFrame(animate);
		if(mouseClick % 2 == 0) {
			brush.fillStyle = "rgba(0, 0, 0, 0.1)";
			brush.fillRect(0, 0, canvas.width, canvas.height);
		}
		else {
			brush.clearRect(0, 0, canvas.width, canvas.height);
		}
		
		init();
		arrCircle.forEach(function(circle, index) {
			if(circle.life <= 0) {
				arrCircle.splice(index, 1);
			}
			circle.update();
		});
		console.log(arrCircle.length);
	}

	animate();
});