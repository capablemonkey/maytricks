begin = 33;
end = 126;
size = 500;
cut = 150;
height = 35;
delay = 200;

function refresh(data) {
	for (var x=0; x < data.length; x++) {
		data[x] = String.fromCharCode(Math.floor((Math.random() * (end - begin)) + begin))
	}
	return data.join("");
}

function init() {
	// determine window height, width:
	h = $(window).height();
	lineheight = $(".line").first().height()
	lines = Math.ceil(h / lineheight)

	for (var y=0; y < lines; y++) {
		$("#lines").append($(".line").first().clone())
	}

	data = Array(size);
	data.length = size;

	window.setInterval(function() {
		p = refresh(data);
		$(".line").each(function(index, ele) {
			i = Math.floor(Math.random()* (size - cut))
			$(ele).text(p.slice(i, i + cut))
		})
	}, delay);
}

$(document).ready(init);

