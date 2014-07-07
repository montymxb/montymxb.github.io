var width = document.body.clientWidth;
var height = document.body.clientHeight;

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

window.onresize = function(event) {
	var width = document.body.clientWidth;
	
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
	
};