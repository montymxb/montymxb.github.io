var width = document.body.clientWidth;
var height = document.body.clientHeight;

if(height < 400) {
	document.getElementById("titlePiece").style.height = "320px";
}

if(width < 640) {
	document.getElementById("main").style.fontSize = "280%";
	document.getElementById("supMain").style.fontSize = "110%";
	document.getElementById("supMain").style.marginTop = "30px";
	document.getElementById("assetTxt").style.fontSize = "30px";
	document.getElementById("workTxt").style.fontSize = "30px";
}

if(width < 540) {
	document.getElementById("main").style.fontSize = "165%";
	document.getElementById("supMain").style.fontSize = "90%";
	document.getElementById("supMain").style.marginTop = "21px";
	document.getElementById("assetTxt").style.fontSize = "30px";
	document.getElementById("workTxt").style.fontSize = "30px";
	
	document.getElementById("app1").style.display = "table";
	document.getElementById("app1").style.marginLeft = "auto";
	document.getElementById("app1").style.marginRight = "auto";
	
	document.getElementById("app2").style.display = "table";
	document.getElementById("app2").style.marginLeft = "auto";
	document.getElementById("app2").style.marginRight = "auto";
	
	document.getElementById("app3").style.display = "table";
	document.getElementById("app3").style.marginLeft = "auto";
	document.getElementById("app3").style.marginRight = "auto";
	
	document.getElementById("app4").style.display = "table";
	document.getElementById("app4").style.marginLeft = "auto";
	document.getElementById("app4").style.marginRight = "auto";
}

if(width < 400) {
	document.getElementById("bakeImg").style.width = "150px";
	document.getElementById("bakeImg").style.height = "150px";
	document.getElementById("pencilImg").style.width = "150px";
	document.getElementById("pencilImg").style.height = "100px";
}

window.onresize = function(event) {
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	
	if(height < 400) {
		document.getElementById("titlePiece").style.height = "320px";
	} else {
		document.getElementById("titlePiece").style.height = "80%";
	}
	
	if(width < 640) {
		document.getElementById("main").style.fontSize = "280%";
		document.getElementById("supMain").style.fontSize = "110%";
		document.getElementById("supMain").style.marginTop = "30px";
		document.getElementById("assetTxt").style.fontSize = "30px";
		document.getElementById("workTxt").style.fontSize = "30px";
	
	} else if(width >= 640) {
		document.getElementById("main").style.fontSize = "375%";
		document.getElementById("supMain").style.fontSize = "120%";
		document.getElementById("supMain").style.marginTop = "35px";
		document.getElementById("assetTxt").style.fontSize = "60px";
		document.getElementById("workTxt").style.fontSize = "60px";
	}
	
	if(width < 540) {
		document.getElementById("main").style.fontSize = "165%";
		document.getElementById("supMain").style.fontSize = "90%";
		document.getElementById("supMain").style.marginTop = "21px";
		document.getElementById("assetTxt").style.fontSize = "30px";
		document.getElementById("workTxt").style.fontSize = "30px";
		
		document.getElementById("app1").style.display = "table";
		document.getElementById("app1").style.marginLeft = "auto";
		document.getElementById("app1").style.marginRight = "auto";
	
		document.getElementById("app2").style.display = "table";
		document.getElementById("app2").style.marginLeft = "auto";
		document.getElementById("app2").style.marginRight = "auto";
	
		document.getElementById("app3").style.display = "table";
		document.getElementById("app3").style.marginLeft = "auto";
		document.getElementById("app3").style.marginRight = "auto";
	
		document.getElementById("app4").style.display = "table";
		document.getElementById("app4").style.marginLeft = "auto";
		document.getElementById("app4").style.marginRight = "auto";
	} else {
		document.getElementById("app1").style.display = "inline";
		document.getElementById("app1").style.margin = "10px";
	
		document.getElementById("app2").style.display = "inline";
		document.getElementById("app2").style.margin = "10px";
	
		document.getElementById("app3").style.display = "inline";
		document.getElementById("app3").style.margin = "10px";
	
		document.getElementById("app4").style.display = "inline";
		document.getElementById("app4").style.margin = "10px";
	}
	
	if(width < 400) {
		document.getElementById("bakeImg").style.width = "150px";
		document.getElementById("bakeImg").style.height = "150px";
		document.getElementById("pencilImg").style.width = "150px";
		document.getElementById("pencilImg").style.height = "100px";
	} else {
		document.getElementById("bakeImg").style.width = "300px";
		document.getElementById("bakeImg").style.height = "300px";
		document.getElementById("pencilImg").style.width = "300px";
		document.getElementById("pencilImg").style.height = "200px";
	}
	
};