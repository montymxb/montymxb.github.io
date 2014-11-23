function onMailSendSelected() {

    var msg = document.getElementById("msg").value;
    var name =  document.getElementById("name").value;
    var email =  document.getElementById("email").value;

    Parse.initialize("EOUXlaVdr0lLaamDLAxCkhXwZvNa1VFHmtxDJA9X", "9USSi7LxJ013no5e3NNO4qJ8MS4YiFnL1EhuCMUm");
    //todo send json with msg, name & email, from which Parse will then construct and send an email with!
    Parse.Cloud.run('send_mail', { message: msg, fromEmail: email, fromName: name }, {
      success: function(ratings) {
        // ratings should be 4.5
        alert("Thank you for sending a message! I'll be sure to get back to you soon.");
      },
      error: function(error) {
        alert(":( There was an error sending you message. Please try again!");
      }
    });
}