window.onload = function() {
//window.mediaElement = document.getElementById('messages');
//window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
castReceiverManager.onSenderDisconnected = function(event) {
	if(castReceiverManager.getSenders().length == 0 && event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
		close();
	}
}

var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:uphouseworks.rentchecka');
customMessageBus.onMessage = function(event) {

	var content = document.getElementById("loaded_content").innerHTML;

	function addUtil(element, index, array) {
		var inArray = element.split(":");
		var nameId = "util";
		nameId = nameId + index;
		
		var costId = "util";
		costId = costId + index;
		costId = costId + "+";
		content+="\
		<div class='utilBlue item'>\
			<h2 id='" + nameId + "' class='itemLeft'>" + inArray[0] + "</h2>\
			<h2 id='" + costId + "' class='itemRight'>" + inArray[1] + "</h2>\
		</div>\
		";
	}
	
	function addTenant(element, index, array) {
		var inArray = element.split(":");
		var nameId = "user";
		nameId = nameId + index;
		
		var costId = "user";
		costId = costId + index;
		costId = costId + "+";

		content+="\
		<div class='tenantOrange item'>\
			<h2 id='" + nameId + "' class='itemLeft'>" + inArray[0] + "</h2>\
			<h2 id='" + costId + "' class='itemRight'>" + inArray[1] + "</h2>\
		</div>\
		";
	}
	
	var seperateComponents = event.data.split("===SPLIT-SECTION-HERE===");
	var utilData = seperateComponents[0].split("&");
	var rentData = seperateComponents[1].split("&");

	//Print out the start of our container div, to hold UTILITIES
	content+="\
	<!--Main Content Container--> \
	<div style='float: left; width: 45%;'>\
		<!-- ========================================================== -->\
		<!--  Utilities  -->\
		<div id = 'subTitle'>\
			<h1 style = 'margin-left: 20px;'>Utilities</h1>\
		</div>\
	";
	
	//Loops through array and will write out (in html) each utility item
	utilData.forEach(addUtil);
	
	//Print out the end & start of our container div, to hold TENANTS
	content+="\
	</div>\
	<div style = 'float: right; width: 45%;'>\
		<!-- ========================================================== -->\
		<!--  Rent  -->\
		<div id = 'subTitle'>\
			<h1 style = 'margin-left: 20px;'>Rent</h1>\
		</div>\
	";
	rentData.forEach(addTenant);
	content+="</div>";
	
	//set the view back to our loaded content!
	document.getElementById("loaded_content").innerHTML = content;
}
castReceiverManager.start();
}