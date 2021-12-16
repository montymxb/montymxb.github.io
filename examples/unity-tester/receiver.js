window.onload = function() {
  //window.mediaElement = document.getElementById('messages');
  //window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
   castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  
  castReceiverManager.onSenderDisconnected = function(event) {
		if(castReceiverManager.getSenders().length == 0 && event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
			close();
		}
	}
	
	var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:com.chromecastunitytester.uphouseworks.chromecastunitytester');
	customMessageBus.onMessage = function(event) {
		//document.getElementById("messages").innerHTML = event.data;
		console.log("Message received");
		
		function addContent(element, index, array) {
			
		}
		
		var contentArray = event.data.split("&");
		
		contentArray.forEach(addContent);
		
		var keyboardEvent = document.createEvent("KeyboardEvent");
		var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


		keyboardEvent[initMethod](
                   "keydown", // event type : keydown, keyup, keypress
                    true, // bubbles
                    true, // cancelable
                    window, // viewArg: should be window
                    false, // ctrlKeyArg
                    false, // altKeyArg
                    false, // shiftKeyArg
                    false, // metaKeyArg
                    38, // keyCodeArg : unsigned long the virtual key code, else 0
                    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
		);
		document.dispatchEvent(keyboardEvent);
	}
	
	castReceiverManager.start();
}