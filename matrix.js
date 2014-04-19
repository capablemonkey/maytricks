ASCII_BEGIN = 33;
ASCII_END = 126;
TEXT_LENGTH = 300;
CHARS_PER_ROW = 150;
REFRESH_FREQUENCY = 500;

INPUT_HEAD = 'gordn:~ user$ ';

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
	$("#console").on('click', function(e) {

	})

	// handle special keys:
	$(document).keydown(function(e) {
		key = e.which || e.keyCode;

		// if backspace
		if (key === 8 || key === 46) {
			return backspace();
		}
	})

	// handle letter keys:
	$(document).keypress(function(e){
		key = e.which || e.keyCode;

		// if enter/return
		if (key === 13) {
			return enter();
		}

		// otherwise, insert char into console
		letter = String.fromCharCode(key)
		lastLine = getLastLine();
		lastLine.html(lastLine.html() + letter)

		// TODO: add blinking cursor
	})

	function backspace() {
		k = getLastLine();
		if (k.html().length > INPUT_HEAD.length) {
			k.html(k.html().slice(0, -1));
		}
	}

	function enter() {
		lastLine = getLastLine()
		input = lastLine.html().slice(INPUT_HEAD.length);
		processInput(input);
		newLine(INPUT_HEAD);
	}
	function processInput(input) {
		console.log(input);

		// TODO: implement line break

		commands = {
			'help': 'Welcome to the console.  Available commands: <br>&nbsp;about: give bio info of Gordon <br>&nbsp;help: commands <br>&nbsp;contact: get contact info',
			'contact': 'Twitter: @capable_monkey <br>Email: technix1@gmail.com <br>',
			'bio': "My name's Gordon.  I'm a developer evangelist at Dwolla."
		}

		if (input in commands) {
			newLine(commands[input]);
		}
		else if (input.length > 0) {
			newLine('-bash(ish): ' + input + ': command not found');
		}
	}
	function newLine(output) {
		k = getLastLine().clone();
		k.html(output);
		$("#console").append(k);
		// auto scroll down
		$("#console").scrollTop($("#console")[0].scrollHeight)
	}
	function getLastLine() {
		return $("#console").find(".consoleLine").last();
	}
}

function initAll() {
	initMatrix(ASCII_BEGIN, ASCII_END, TEXT_LENGTH, CHARS_PER_ROW, REFRESH_FREQUENCY);
	initConsole();
}

$(document).ready(initAll);

