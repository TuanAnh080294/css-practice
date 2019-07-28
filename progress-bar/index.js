document.addEventListener("DOMContentLoaded", function() {
	var progressBar = document.querySelectorAll('.progress-bar');
	const time = 1500;

	function calculateTime(time, dataCount) {
		return time/dataCount;
	}

	progressBar.forEach(function(i) {
		let count = 0;
		let label = i.children[0];
		let line = i.children[1];

		let lineCount = line.children[0];
		let dataCount = lineCount.getAttribute("data-count");
		
		let value = line.style.width.substring(0, line.style.width.length - 2) / 100;
		let runTime = calculateTime(time, dataCount);
		let animationLineCount = setInterval(function() {
			if(count < dataCount) {
				count ++;
				label.innerHTML = count + "%";
				lineCount.style.width = count * value + "px";
				if(count <= 25) {
					lineCount.style.background = "red";
				}
				else if(count > 25 && count <= 50) {
					lineCount.style.background = 'orange';
				}
				else if(count > 50 && count <= 75) {
					lineCount.style.background = 'blue';
				}
				else {
					lineCount.style.background = 'green';
				}
			};	
		}, runTime)
		
	});
});