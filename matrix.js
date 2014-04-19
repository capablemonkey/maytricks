ASCII_BEGIN = 33;
ASCII_END = 126;
TEXT_LENGTH = 500;
CHARS_PER_ROW = 150;
REFRESH_FREQUENCY = 200;

function initMatrix(asciiBegin, asciiEnd, textLength, charsPerRow, refreshInterval) {
	// regenerates content of the matrix
	function refresh(data) {
		for (var x=0; x < data.length; x++) {
			data[x] = String.fromCharCode(Math.floor((Math.random() * (asciiEnd - asciiBegin)) + asciiBegin))
		}
		return data.join("");
	}

	// determine how many lines we need to fill window
	h = $(window).height();
	lineheight = $(".line").first().height()
	lines = Math.ceil(h / lineheight)

	for (var y=0; y < lines; y++) {
		$("#lines").append($(".line").first().clone())
	}

	// array to contain matrix content
	data = Array(textLength);
	data.length = textLength;

	window.setInterval(function() {
		p = refresh(data);
		// give each line a random slice of the pie
		$(".line").each(function(index, ele) {
			i = Math.floor(Math.random()* (textLength - charsPerRow))
			$(ele).text(p.slice(i, i + charsPerRow))
		})
	}, refreshInterval);
}

function initConsole() {
	// TODO
}

function initAll() {
	initMatrix(ASCII_BEGIN, ASCII_END, TEXT_LENGTH, CHARS_PER_ROW, REFRESH_FREQUENCY);
	initConsole();
}

$(document).ready(initAll);

