var chatNow = function() {

    $("#send-button").click(function(){
        now.distributeMessage($("#text-input").val());
        $("#text-input").val("");
        $("#text-input").focus();
    });

    $("#text-input").keypress(function (e) {
      if (e.which && e.which === 13) {
        $("#send-button").click();
        return false;
      }
    });

//  if (!now.name) {
//    now.name = prompt("What's your name?", "");
//  }

  now.receiveMessage = function(name, message){
    var text = message || "Entered Room";
    if (!nameAdded)  {
      now.addName(now.name);
      nameAdded = true;
    }


    $("#messages").prepend($('<div>' + name + ": " + text + '</div>'));
  }

  var nameAdded = false;

  if (!now.name) {
    now.name = prompt("What's your name ?", "");
//    now.addName(now.name);
  }


  $("#text-input").focus();

};
