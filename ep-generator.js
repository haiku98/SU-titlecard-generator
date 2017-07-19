var canvas = document.getElementById("ep-canvas");
var ctx = canvas.getContext("2d");

var ccanvas = document.getElementById("text-canvas");
var cctx = ccanvas.getContext("2d");

var cccanvas = document.getElementById("credits-canvas");
var ccctx = cccanvas.getContext("2d");

var inputText = document.getElementById("input-text"); // main textarea
var inputX = document.getElementById("input-x");
var inputY = document.getElementById("input-y");
var maskX = document.getElementById("mask-x");
var maskY = document.getElementById("mask-y");
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

var userBackground = document.createElement("img");
var userMask = document.createElement("img");

var maskArray, bgArray, temp_mask, temp_background, mask;

/* CREDITS */

function drawCreditsText() {
	if(!useCreditsBox.checked)
		return;

	var color1, color2;

	console.log(temp_mask);

	if(temp_mask.includes("overlays/1.png")) {
		color1 = "#f485a1";
		color2 = "#6483a4";
	} else if(temp_mask.includes("overlays/2.png")) {
		color1 = "#0a6e9b";
		color2 = "#8f8bc6";
	} else if(temp_mask.includes("overlays/3.png")) {
		color1 = "#f49677";
		color2 = "#ed6d8b";
	} else if(temp_mask.includes("overlays/4.png")) {
		color1 = "#d0424b";
		color2 = "#f4955d";
	} else if(temp_mask.includes("overlays/5.png")) {
		color1 = "#d673c8";
		color2 = "#e686b9";
	} else if(temp_mask.includes("overlays/6.png")) {
		color1 = "#879d50";
		color2 = "#598392";
	} else if(temp_mask.includes("overlays/7.png")) {
		color1 = "#7193b5";
		color2 = "#f591c1";
	} else if(temp_mask.includes("overlays/8.png")) {
		color1 = "#918ac6";
		color2 = "#0a6e99";
	} else if(temp_mask.includes("overlays/9.png")) {
		color1 = "#f2549b";
		color2 = "#d22eac";
	} else if(temp_mask.includes("overlays/10.png")) {
		color1 = "#20536f";
		color2 = "#98a1ba";
	} else if(temp_mask.includes("overlays/11.png")) {
		color1 = "#6ba3d3";
		color2 = "#ba9fd6";
	} else if(temp_mask.includes("overlays/12.png")) {
		color1 = "#e8b0ca";
		color2 = "#d6a2da";
	} else if(temp_mask.includes("overlays/13.png")) {
		color1 = "#f49174";
		color2 = "#ed6d8a";
	} else if(temp_mask.includes("overlays/14.png")) {
		color1 = "#f26d77";
		color2 = "#7f6977";
	}

	var x = parseInt(creditsX.value) + 25;
	var y = parseInt(creditsY.value) + 25;
	formatCreditsText(x, y, color1, color2);
}

function formatCreditsText(x, y, color1, color2) {
	var font1 = "15pt crewniverse_font"; //this has to be in pt instead of px for some reason..
	var font2 = "7pt crewniverse_font";

	var text = creditsText.value;
	var lines = creditsText.value.split("\n");
	for (var i = 0; i < lines.length; i++) {
		if(i == 0) {
			ccctx.font = font2;
			(swapCreditsTextColors.checked) ? ccctx.fillStyle = color1 : ccctx.fillStyle = color2;
			ccctx.fillText(lines[0], x, y);
			y += parseInt(ccctx.font) + 20;
		} else {
			ccctx.font = font1;
			var temp_count = 0;
			var and = false;
			var line = lines[i];
			var x2 = x + 20;

		    for(var ii = 0; ii <= line.length; ++ii) {
		        var ch = line.charAt(ii);
				if(and == false) {
					(swapCreditsTextColors.checked) ? ccctx.fillStyle = color2 : ccctx.fillStyle = color1;
					ccctx.font = font1;
				} else {
					(swapCreditsTextColors.checked) ? ccctx.fillStyle = color1 : ccctx.fillStyle = color2;
					ccctx.font = font2;
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
		        ccctx.fillText(ch, x2, y);
		        x2 += ccctx.measureText(ch).width;
				if(ii == line.length) {
					var lineheight = parseInt(ccctx.font);

					y = (parseInt(y) + parseInt(lineheight)) + 5;
					x = parseInt(x) + 80;
					//console.log(x);
					//cctx.fillText(ch, x, y);
				}
		    }
		}
	}
	ccctx.restore();
}

function drawCreditsBox() {
	ccctx.clearRect(0, 0, ccanvas.width, ccanvas.height);
	ccctx.save();
	ccctx.fillStyle = "#ffffff";
	roundRect(ccctx, parseInt(creditsX.value), parseInt(creditsY.value), parseInt(creditsWidth.value), 80, 50, true, false);
	if(useDoublesBox.checked) {
		ccctx.fillStyle = "#ffffff";
		roundRect(ccctx, parseInt(creditsX.value) + 50, parseInt(creditsY.value) + 65, parseInt(creditsWidth.value), 80, 50, true, false);
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


/* MAIN TEXT AND BACKGROUND */

var temp_first_b = true;
var currentImg_b;

function selectUserBackground(image) {
	userImage = image.childNodes[1];

	if(temp_first_b == true) {
		userImage.style.boxShadow = "0 0 15px 2px rgba(0, 0, 0, .5)";
		temp_first_b = false;
	} else {
		currentImg_b.style.boxShadow = "none";
	}
	currentImg_b = temp_background = userImage;
	userImage.style.boxShadow = "0 0 15px 2px rgba(0, 0, 0, .5)";

	userBackground.src = userImage.src;
}

var temp_first_m = true;
var currentImg_m;

function selectUserMask(image) {
	userImage = image.childNodes[1];

	if(temp_first_m == true) {
		userImage.style.boxShadow = "0 0 15px 2px rgba(0, 0, 0, .5)";
		temp_first_m = false;
	} else {
		currentImg_m.style.boxShadow = "none";
	}
	currentImg_m = temp_mask = userImage;
	userImage.style.boxShadow = "0 0 15px 2px rgba(0, 0, 0, .5)";

	userMask.src = userImage.src;
}

// https://gist.github.com/chriskoch/366054
function drawCanvasText(x, y, doStroke) {
	var lines = inputText.value.split("\n");
	var padding;
	(lineSpacing.value == null || lineSpacing.value == "") ? padding = 45 : padding = parseInt(lineSpacing.value);
	//ctx.save();
	//ctx.translate(posX, posY);
	cctx.fillStyle = "black";
	for (i = 0; i < lines.length; i++) {
		switch(i) {
			case 0:
				cctx.font = fontSize1.value + "pt crewniverse_font";
			break;
			case 1:
				var lineHeight = parseInt(fontSize2.value);
				cctx.font = fontSize2.value + "pt crewniverse_font";
				y = (parseInt(y) + lineHeight) + padding;
				//console.log("padding: " + padding + "\nlineheight: " + lineheight + "\nfontsize2: " + fontSize2.value);
			break;
			case 2:
				var lineHeight = parseInt(fontSize3.value);
				cctx.font = fontSize3.value + "pt crewniverse_font";
				y = (parseInt(y) + lineHeight) + padding + 10;
			break;
		}

        if(doStroke) cctx.strokeText(lines[i], x, y);
		else cctx.fillText(lines[i], x, y);
	}
}

function updateCanvasText() {
	cctx.clearRect(0, 0, ccanvas.width, ccanvas.height);
	cctx.save();

    var x = inputX.value;
    var y = inputY.value;
    var mask_X = maskX.value;
    var mask_Y = maskY.value;

    //ctx.beginPath();

	//console.log("- image src: " + mask.src);

	drawCanvasText(x, y, false);

	cctx.globalCompositeOperation = "source-in";
	cctx.drawImage(mask, mask_X, mask_Y, 1200, mask.height, 0, 0, canvas.width, canvas.height);

	//console.log("[debug] mask successfully drawn");

    cctx.globalCompositeOperation = "destination-over";

    cctx.strokeStyle = 'white';
    cctx.lineWidth = strokeWidth.value;
    cctx.lineJoin = 'round';
	drawCanvasText(x, y, true);

    cctx.shadowColor = "#d5efed";
    cctx.shadowOffsetX = 0;
    cctx.shadowOffsetY = shadowOffset.value;
    cctx.shadowBlur = 0;
	drawCanvasText(x, y, true);
	//console.log("[debug] text successfully drawn.");
	cctx.restore();
}


function getRandomImage(array, path) {
    var index = Math.floor(Math.random() * array.length);
    var temp = array[index];
	//console.log("path: " + path + temp_ + "\npath specified: " + path);
    return path + temp;
}

function updateCanvas(caller) {
	if(caller == "input") {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		cctx.clearRect(0, 0, canvas.width, canvas.height);
		ccctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	var backgroundImage = new Image();
	mask = new Image();

	if(useRandBg.checked) {
		if(caller == "button") backgroundImage.src = temp_background = getRandomImage(bgArray, 'assets/titlecards/');
		else backgroundImage.src = temp_background;
	} else {
		backgroundImage.src = temp_background = userBackground.src;
	}

	if(useRandMask.checked) {
		if(caller == "button") mask.src = temp_mask = getRandomImage(maskArray, "assets/overlays/");
		else mask.src = temp_mask;
	} else {
		mask.src = temp_mask = userMask.src;
	}

	if(backgroundImage.complete) {
		/*
			The reason for me doing it this weird way is because,
			if i put the text function after the image's onload
			function, the text would draw before the image has
			actually loaded, resulting in the image being drawn
			over the text.
		*/

		ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
		if(mask.complete) {
			updateCanvasText();
		} else {
			mask.onload = function() {
				updateCanvasText();
			};
		}
		if(useCreditsBox.checked) drawCreditsBox();
		ctx.drawImage(cccanvas, 0, 0);
		ctx.drawImage(ccanvas, 0, 0);
	} else {
		backgroundImage.onload = function() {
			ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
			if(mask.complete) {
				updateCanvasText();
			} else {
				mask.onload = function() {
					updateCanvasText();
				};
			}
			if(useCreditsBox.checked) drawCreditsBox();
			ctx.drawImage(cccanvas, 0, 0);
			ctx.drawImage(ccanvas, 0, 0);
		};
	}
	updateCanvasHue();
	//drawCreditsBox();
	//drawCreditsText();
}

function updateCanvasHue() {
	if(useRandHue.checked) {
        var deg = Math.floor(Math.random() * 360);
		ctx.filter = "hue-rotate(" + deg + "deg)";
		cctx.filter = "hue-rotate(" + deg + "deg)";
		ccctx.filter = "hue-rotate(" + deg + "deg)";
    } else {
        var deg = hueDeg.value;
		if(hueDeg.value == null || hueDeg.value == "") deg = 0;
        ctx.filter = "hue-rotate(" + deg + "deg)";
		cctx.filter = "hue-rotate(" + deg + "deg)";
		ccctx.filter = "hue-rotate(" + deg + "deg)";
    }
}

function initArrays() {
    maskArray = new Array(14);
	for (var i = 0; i < maskArray.length; i++) {
		var a = i + 1;
		maskArray[i] = a + '.png';
	}

    bgArray = new Array(20);
	for (var i = 0; i < bgArray.length; i++) {
		var a = i + 1;
		bgArray[i] = a + '.png';
	}
}

// main function
function init() {
	initArrays();
	window.onload = function() {
		//hideFontsizeInputs();
		var count = 0;
        inputText.onkeyup = function(evt) {
            evt = evt || window.event;
			if(evt.keyCode != 46 && evt.keyCode != 8 && evt.keyCode != 17) { // delete; backspace; ctrl
				var temp_count = count + 1;
				if(temp_count < 4)
					document.getElementById("fontsize" + temp_count).style.display = "block";
			}

			if(evt.keyCode == 13) { // enter key
				if(count == 4) {
					count = 0;
					return;
				}
				count++;
			}
        };
    };

    submitButton = document.getElementById('submit-button');
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

	var mask = document.getElementById("overlay");
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
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
