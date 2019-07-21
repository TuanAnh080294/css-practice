document.addEventListener("DOMContentLoaded", function() {
	var body = document.body;
	var arrayColor = ["#FF6600", "#FF0000", "#880000", "#FF9933", "#ff3300", "#FF3366"];

	setInterval(createStar, 50);

	function createStar() {
		var right = Math.floor(Math.random() * 500);
		var top = Math.floor(Math.random() * screen.height);
		var star = document.createElement("div");
		star.classList.add("star");
		body.appendChild(star);

		setInterval(runStar, 10);
		star.style.top = top + "px";
		star.style.background = arrayColor[Math.floor(Math.random() * 5)];
		function runStar() {
			if(right >= screen.width) {
				star.remove();
			}
			right += 4;
			star.style.right =  right + "px";
			setTimeout(function() {
				star.remove();
			}, 6000)
		}
	}
	
});

