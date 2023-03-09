(() => {
  // <stdin>
  window.onload = function() {
    castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    castReceiverManager.onSenderDisconnected = function(event) {
      if (castReceiverManager.getSenders().length == 0 && event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
        close();
      }
    };
    var customMessageBus = castReceiverManager.getCastMessageBus("urn:x-cast:uphouseworks.rentchecka");
    customMessageBus.onMessage = function(event) {
      var content = document.getElementById("loaded_content").innerHTML;
      function addUtil(element, index, array) {
        if (element == "")
          return;
        var inArray = element.split(":");
        var nameId = "util";
        nameId = nameId + index;
        var costId = "util";
        costId = costId + index;
        costId = costId + "+";
        content += "		<div class='utilBlue item'>			<h2 id='" + nameId + "' class='itemLeft'>" + inArray[0] + "</h2>			<h2 id='" + costId + "' class='itemRight'>" + inArray[1] + "</h2>		</div>		";
      }
      function addTenant(element, index, array) {
        if (element == "")
          return;
        var inArray = element.split(":");
        var nameId = "user";
        nameId = nameId + index;
        var costId = "user";
        costId = costId + index;
        costId = costId + "+";
        content += "		<div class='tenantOrange item'>			<h2 id='" + nameId + "' class='itemLeft'>" + inArray[0] + "</h2>			<h2 id='" + costId + "' class='itemRight'>" + inArray[1] + "</h2>		</div>		";
      }
      var seperateComponents = event.data.split("===SPLIT-SECTION-HERE===");
      var utilData = seperateComponents[0].split("&");
      var rentData = seperateComponents[1].split("&");
      content += "	<!--Main Content Container--> 	<div style='float: left; width: 45%;'>		<!-- ========================================================== -->		<!--  Utilities  -->		<div id = 'subTitle'>			<h1 style = 'margin-left: 20px;'>Utilities</h1>		</div>	";
      utilData.forEach(addUtil);
      content += "	</div>	<div style = 'float: right; width: 45%;'>		<!-- ========================================================== -->		<!--  Rent  -->		<div id = 'subTitle'>			<h1 style = 'margin-left: 20px;'>Rent</h1>		</div>	";
      rentData.forEach(addTenant);
      content += "</div>";
      document.getElementById("loaded_content").innerHTML = content;
    };
    castReceiverManager.start();
  };
})();
