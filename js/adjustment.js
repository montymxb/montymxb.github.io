var width = document.body.clientWidth;
var height = document.body.clientHeight;

document.getElementById("announcement").style.marginTop = height * 0.4;

if(width < 560) {
	document.getElementById("main").style.fontSize = "210%";
	document.getElementById("supMain").style.fontSize = "110%";
}

if(width < 480) {
	document.getElementById("main").style.fontSize = "165%";
	document.getElementById("supMain").style.fontSize = "90%";
}

window.onresize = function(event) {
	var width = document.body.clientWidth;
	
	if(width < 560) {
		document.getElementById("main").style.fontSize = "210%";
		document.getElementById("supMain").style.fontSize = "110%";
	} else if(width >= 560) {
		document.getElementById("main").style.fontSize = "300%";
		document.getElementById("supMain").style.fontSize = "120%";
	}
	
	if(width < 480) {
		document.getElementById("main").style.fontSize = "165%";
		document.getElementById("supMain").style.fontSize = "90%";
	}
	
};