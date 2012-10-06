
 var started=false,
     myTempleState,
     myPlay,
     myChat;

//  $(document).ready(function() {
//    if (started === false) {
//       started = true;
//       templeSelectionStatus();
//    }
//  });

  var nameAdded = false;

  // Create WebSocket now connection before gathering name
//  now.connectComplete = function () {
//    if (!nameAdded && now.addName)  {
//      now.name = prompt("What's your name ?", "");
//      now.addName(now.name);
//      nameAdded = true;
//      $('.navbar-link').text(now.name);
//    }
//  }

  var templeSelectionStatus = function () {
    myTempleState = templeState();
    myChat = chatNow();
    myPlay = playNow();

    var showTab = function (name){
      $('ul.nav li').removeClass('active');
      $('#' + name).addClass('active');
      $('div.results').addClass('hide');
      $('div.play').addClass('hide');
      $('div.chat').addClass('hide');
      $('div.' + name).removeClass('hide');

    }

    $('#results').click(function(e) {
      e.preventDefault();
      showTab('results');
      templeState();
    });

    $('#chat').click(function(e) {
      e.preventDefault();
      showTab('chat');
    });
    $('#play').click(function(e) {
      e.preventDefault();
      showTab('play');
    });

    $('#all').click(function(e) {
      $('ul.nav li').removeClass('active');
      $('#all').addClass('active');
      $('div.results').removeClass('hide');
      $('div.play').removeClass('hide');
      $('div.chat').removeClass('hide');
    });

    now.receiveTempleStatus = function(name, state){
      myTempleState.receiveTempleStatus(name, state);
      myPlay.receiveTempleStatus(name,state);
    },

    now.receiveMessage = function(name, message) {
       myChat.receiveMessage(name, message);
    },

    now.receiveGuess = function (guess) {
      myPlay.receiveGuess(guess);
    }

  }