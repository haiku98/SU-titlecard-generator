var bgcanvas = document.getElementById("ep-canvas");
var bgctx = bgcanvas.getContext("2d");

var txtcanvas = document.getElementById("text-canvas");
var txtctx = txtcanvas.getContext("2d");

var credcanvas = document.getElementById("credits-canvas");
var credctx = credcanvas.getContext("2d");

var inputText = document.getElementById("input-text"); // main textarea
var inputX = document.getElementById("input-x");
var inputY = document.getElementById("input-y");
var maskX = document.getElementById("mask-x");
var maskY = document.getElementById("mask-y");
var calcMaskPos = document.getElementById("auto-calc-mask-pos");
var fontSize1 = document.getElementById("font-size-1");
var fontSize2 = document.getElementById("font-size-2");
var fontSize3 = document.getElementById("font-size-3");
var lineSpacing = document.getElementById("line-spacing");
var strokeWidth = document.getElementById("stroke-width");
var shadowOffset = document.getElementById("shadow-offset");
var useRandMask = document.getElementById("random-text-mask");
var useRandBg = document.getElementById("random-background");
var useRandHue = document.getElementById("random-hue");
var hueDeg = document.getElementById("hue-degrees");

var useCreditsBox = document.getElementById("use-credits-box");
var useDoublesBox = document.getElementById("use-double-credits-box");
var creditsText = document.getElementById("credits-box-text");
var creditsX = document.getElementById("credits-x");
var creditsY = document.getElementById("credits-y");
var creditsWidth = document.getElementById("credits-width");
var swapCreditsTextColors = document.getElementById("swap-credits-text-colors");

var submitButton = document.getElementById('submit-button');

var userBackground = document.createElement("img");
var userMask = document.createElement("img");

var maskArray, bgArray, mask;

function drawCreditsText() {
	if(!useCreditsBox.checked) return;
	var colors1 = ["#f485a1", "#0a6e9b", "#f49677", "#d0424b", "#d673c8", "#879d50", "#7193b5", "#918ac6", "#f2549b", "#20536f", "#6ba3d3", "#e8b0ca", "#f49174", "#f26d77"];
	var colors2 = ["#6483a4", "#8f8bc6", "#ed6d8b", "#f4955d", "#e686b9", "#598392", "#f591c1", "#0a6e99", "#d22eac", "#98a1ba", "#ba9fd6", "#d6a2da", "#ed6d8a", "#7f6977"];
	var overlaysCount = 14; // TODO: make this automatic
	for (var i = 0; i < overlaysCount; i++) {
		if(mask.src.includes("overlays/" + (i + 1) + ".png")) {
			color1 = colors1[i];
			color2 = colors2[i];
		}
	}
	var padding = 25;
	var x = parseInt(creditsX.value) + padding;
	var y = parseInt(creditsY.value) + padding;
	formatCreditsText(x, y, color1, color2);
}

function formatCreditsText(x, y, color1, color2) {
	var font1 = "15pt crewniverse_font";
	var font2 = "7pt crewniverse_font";
	var text = creditsText.value;
	var lines = text.split("\n");
	if(swapCreditsTextColors.checked) {
		let temp = color1;
		color1 = color2;
		color2 = temp;
	}
	for (var i = 0; i < lines.length; i++) {
		if(i == 0) {
			credctx.font = font2;
			credctx.fillStyle = color2;
			credctx.fillText(lines[0], x, y);
			y += parseInt(credctx.font) + 20;
		} else {
			credctx.font = font1;
			var temp_count = 0;
			var and = false;
			var line = lines[i];
			var x2 = x + 20;
			for(var ii = 0; ii <= line.length; ++ii) {
				var ch = line.charAt(ii);
				if(!and) {
					credctx.fillStyle = color1;
					credctx.font = font1;
				} else {
					credctx.fillStyle = color2;
					credctx.font = font2;
				}
				if(line[ii+1] == "a" && line[ii+2] == "n" && line[ii+3] == "d" && line[ii+4] == " ")
				// TODO: make it check for uppercase as well
				and = true;
				if(and == true)
					temp_count++;
				if(temp_count == 4) {
					and = false;
					temp_count = 0;
				}
				//console.log(ch);
				//if(line[ii-1] == " ") x2 = x2 - 10;
				credctx.fillText(ch, x2, y);
				x2 += credctx.measureText(ch).width;
				if(ii == line.length) {
					var lineheight = parseInt(credctx.font);
					y = (parseInt(y) + parseInt(lineheight)) + 5;
					x = parseInt(x) + 80;
					//console.log(x);
					//cctx.fillText(ch, x, y);
				}
			}
		}
	}
	credctx.restore();
}

function drawCreditsBox() {
	credctx.clearRect(0, 0, txtcanvas.width, txtcanvas.height);
	credctx.save();
	credctx.fillStyle = "#ffffff";
	roundRect(credctx, parseInt(creditsX.value), parseInt(creditsY.value), parseInt(creditsWidth.value), 80, 50, true, false);
	if(useDoublesBox.checked) {
		credctx.fillStyle = "#ffffff";
		roundRect(credctx, parseInt(creditsX.value) + 50, parseInt(creditsY.value) + 65, parseInt(creditsWidth.value), 80, 50, true, false);
	}
	drawCreditsText();
}

// http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
function roundRect(cotx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
		} else {
			var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
			for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	cotx.beginPath();
	cotx.moveTo(x + radius.tl, y);
	cotx.lineTo(x + width - radius.tr, y);
	cotx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	cotx.lineTo(x + width, y + height - radius.br);
	cotx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	cotx.lineTo(x + radius.bl, y + height);
	cotx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	cotx.lineTo(x, y + radius.tl);
	cotx.quadraticCurveTo(x, y, x + radius.tl, y);
	cotx.shadowOffsetX = 0;
	cotx.shadowOffsetY = 10;
	cotx.shadowBlur = 0;
	cotx.shadowColor = "#d5efed";
	cotx.closePath();
	if (fill) {
		cotx.fill();
	}
	if (stroke) {
		cotx.stroke();
	}
	cotx.shadowColor = "#ffffff"; // bugfix
	cotx.restore();
}

function selectUserImage(image, type) {
	var userImage = image.childNodes[1];
	var path = userImage.src;
	var filename = path.substr(path.length - 4);
	var index = filename.charAt(0);
	var array = [];
	if(type === "background") {
		array = bgArray;
		userBackground.src = userImage.src;
	} else if(type === "overlay") {
		array = maskArray;
		userMask.src = userImage.src;
	}
	path = "assets/" + type + "s/";
	var images = [];
	for (var i = 0; i < array.length; i++) {
		images[i] = document.querySelectorAll('#' + type + ' div img')[i];
	}
	// TODO: find a faster way to do this
	for (var i = 0; i < array.length; i++) {
		for (img of images) {
			if(img.style.boxShadow !== "none" && img.src !== userImage.src) {
				img.style.boxShadow = "none";
			} else if(img.src === userImage.src) {
				userImage.style.boxShadow = "0 0 15px 2px rgba(0, 0, 0, .5)";
			}
		}
	}
}

// https://gist.github.com/chriskoch/366054
function drawCanvasText(x, y, doStroke) {
	var lines = inputText.value.split("\n");
	var padding = parseInt(lineSpacing.value);
	//ctx.save();
	//ctx.translate(posX, posY);
	txtctx.fillStyle = "black";
	txtctx.textBaseline = "top";
	for (i = 0; i < lines.length; i++) {
		switch(i) {
			case 0:
				txtctx.font = fontSize1.value + "pt crewniverse_font";
				var lineHeight1 = parseInt(txtctx.font);
				break;
			case 1:
				txtctx.font = fontSize2.value + "pt crewniverse_font";
				var lineHeight2 = parseInt(txtctx.font);
				y = parseInt(y) + lineHeight1 + padding;
				break;
			case 2:
				txtctx.font = fontSize3.value + "pt crewniverse_font";
				y = parseInt(y) + lineHeight2 + padding;
				break;
		}
		if(doStroke) txtctx.strokeText(lines[i], x, y);
		else txtctx.fillText(lines[i], x, y);
	}
}

function updateCanvasText() {
	var x = inputX.value;
	var y = inputY.value;
	var mask_X = (calcMaskPos.checked) ? inputX.value : maskY.value;
	var mask_Y = (calcMaskPos.checked) ? 450 - (inputY.value * 1.5) : maskY.value;
	txtctx.clearRect(0, 0, txtcanvas.width, txtcanvas.height);
	txtctx.save();
	drawCanvasText(x, y, false);
	txtctx.globalCompositeOperation = "source-in";
	txtctx.drawImage(mask, mask_X, mask_Y, 1200, mask.height, 0, 0, bgcanvas.width, bgcanvas.height);
	txtctx.globalCompositeOperation = "destination-over";
	txtctx.strokeStyle = 'white';
	txtctx.lineWidth = strokeWidth.value;
	txtctx.lineJoin = 'round';
	drawCanvasText(x, y, true);
	txtctx.shadowColor = "#d5efed";
	txtctx.shadowOffsetX = 0;
	txtctx.shadowOffsetY = shadowOffset.value;
	txtctx.shadowBlur = 0;
	drawCanvasText(x, y, true);
	txtctx.restore();
}


function getRandomImage(array, path) {
	return path + array[Math.floor(Math.random() * array.length)];
}

function updateCanvas(caller) {
	bgctx.clearRect(0, 0, bgcanvas.width, bgcanvas.height);
	txtctx.clearRect(0, 0, bgcanvas.width, bgcanvas.height);
	credctx.clearRect(0, 0, bgcanvas.width, bgcanvas.height);
	var backgroundImage = new Image();
	mask = new Image();
	mask.src = (userMask.src == "") ? getRandomImage(maskArray, "assets/overlays/") : userMask.src;
	backgroundImage.src = (userBackground.src == "") ? getRandomImage(bgArray, 'assets/titlecards/') : userBackground.src;
	if(useRandBg.checked && caller === "button") {
		backgroundImage.src = getRandomImage(bgArray, 'assets/titlecards/');
	}
	if(useRandMask.checked && caller === "button") {
		mask.src = getRandomImage(maskArray, "assets/overlays/");
	}
	if(backgroundImage.complete) {
		bgctx.drawImage(backgroundImage, 0, 0, bgcanvas.width, bgcanvas.height);
		if(mask.complete) {
			updateCanvasText();
		} else {
			mask.onload = function() {
				updateCanvasText();
			};
		}
		if(useCreditsBox.checked) drawCreditsBox();
		bgctx.drawImage(credcanvas, 0, 0);
		bgctx.drawImage(txtcanvas, 0, 0);
	} else {
		backgroundImage.onload = function() {
			bgctx.drawImage(backgroundImage, 0, 0, bgcanvas.width, bgcanvas.height);
			if(mask.complete) {
				updateCanvasText();
			} else {
				mask.onload = function() {
					updateCanvasText();
				};
			}
			if(useCreditsBox.checked) drawCreditsBox();
			bgctx.drawImage(credcanvas, 0, 0);
			bgctx.drawImage(txtcanvas, 0, 0);
		};
	}
	if(caller === "button") updateCanvasHue();
	//drawCreditsBox();
	//drawCreditsText();
}

function updateCanvasHue() {
	if(useRandHue.checked) {
		var deg = Math.floor(Math.random() * 360);
		bgctx.filter = "hue-rotate(" + deg + "deg)";
		txtctx.filter = "hue-rotate(" + deg + "deg)";
		credctx.filter = "hue-rotate(" + deg + "deg)";
	} else {
		var deg = hueDeg.value;
		bgctx.filter = "hue-rotate(" + deg + "deg)";
		txtctx.filter = "hue-rotate(" + deg + "deg)";
		credctx.filter = "hue-rotate(" + deg + "deg)";
	}
}

function initArrays() {
	maskArray = new Array(14);
	for (var i = 1; i <= maskArray.length; i++) {
		maskArray[i-1] = i + '.png';
	}
	bgArray = new Array(20);
	for (var i = 1; i <= bgArray.length; i++) {
		bgArray[i-1] = i + '.png';
	}
}

function init() {
	initArrays();
	window.onload = function() {
		//hideFontsizeInputs();
		var tempcount = 0;
		var maxlines = 3;
		inputText.onkeyup = function(evt) {
			//evt = evt || window.event;
			linebreaks = (inputText.value.match(/\n/g)||[]).length;
			if(linebreaks > 0 && linebreaks < maxlines) {
				if(linebreaks === maxlines - 1) {
					document.getElementById("fontsize2").style.display = "block";
					document.getElementById("fontsize3").style.display = "block";
				} else if(linebreaks > tempcount) {
					document.getElementById("fontsize" + (linebreaks + 1)).style.display = "block";
				} else if(linebreaks < tempcount) {
					document.getElementById("fontsize" + (tempcount + 1)).style.display = "none";
				}
			} else if(linebreaks === 0 && linebreaks < tempcount) {
				document.getElementById("fontsize2").style.display = "none";
				document.getElementById("fontsize3").style.display = "none";
			}
			tempcount = linebreaks;
		};
	};
	submitButton.addEventListener('click', function() {
		updateCanvas("button");
	});
}

init();

function toggleElement(e) {
	var element = document.getElementById(e);
	if(element.style.display === "none") {
		element.style.display = "block";
	} else {
		element.style.display = "none";
	}
	var overlay = document.getElementById("overlay");
	var background = document.getElementById("background");
	if(overlay.style.display === "none" && background.style.display === "none") document.getElementById("choose").style.display = "none";
	else document.getElementById("choose").style.display = "inline-block";
}

//http://stackoverflow.com/questions/18071046/smooth-scroll-to-specific-div-on-click
window.smoothScroll = function(target) {
	var scrollContainer = target;
	do { //find scroll container
		scrollContainer = scrollContainer.parentNode;
	if (!scrollContainer) return;
		scrollContainer.scrollTop += 1;
	}
	while (scrollContainer.scrollTop == 0);
	var targetY = 0;
	do { //find the top of target relatively to the container
		if (target == scrollContainer) break;
			targetY += target.offsetTop;
	}
	while (target = target.offsetParent);
	scroll = function(c, a, b, i) {
		i++; if (i > 30) return;
		c.scrollTop = a + (b - a) / 30 * i;
		setTimeout(function(){ scroll(c, a, b, i); }, 20);
	}
	// start scrolling
	scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
