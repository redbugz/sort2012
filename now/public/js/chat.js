var chatNow = function() {

    $("#send-button").click(function(){
        now.distributeMessage($("#text-input").val());
        $("#text-input").val("");
    });

    $("#text-input").keypress(function (e) {
      if (e.which && e.which === 13) {
        $("#send-button").click();
        return false;
      }
    });

  var receiveMessage = function(name, message){
    var text = message || "Entered Room";
    if (!nameAdded)  {
      now.addName(now.name);
      nameAdded = true;
    }


    $("#messages").prepend($('<div>' + name + ": " + text + '</div>'));
  }

  $("#text-input").focus();

  return {receiveMessage:receiveMessage}

};
