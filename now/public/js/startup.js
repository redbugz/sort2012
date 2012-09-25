
  $(document).ready(function() {
   templeSelectionStatus();
  });


  var templeSelectionStatus = function () {
    $('#temple-state').append('<iframe  sandbox="allow-same-origin allow-forms allow-scripts" src="http://localhost:8080/temple-state"></iframe>');
    $('#chat').click(function(e) {
      e.preventDefault();
      if (!now.name) {
        now.name = prompt("What's your name ?", "");
      }
      now.addName(now.name);
      $('#floater').prepend('<iframe  sandbox="allow-same-origin allow-forms allow-scripts" src="http://localhost:8080/chat/"></iframe>');
    });
    $('#play').click(function(e) {
      e.preventDefault();
      if (!now.name) {
        now.name = prompt("What's your name ?", "");
      }
      now.addName(now.name);
      $('#floater').append('<iframe  sandbox="allow-same-origin allow-forms allow-scripts" src="http://localhost:8080/play"></iframe>');
    });

    $("ol.temples .temple-selection").click(
        function (e) {
          if ($('a img.temple-image', e.currentTarget).hasClass("large")) {
            $('a img.temple-image', e.currentTarget).removeClass("large");
          } else {
            $('a img.temple-image', e.currentTarget).addClass("large");
          }
        }
    );

//    var redrawTempleStatus = function (templeStatus) {
//      $('ol.temples').empty();
//      for (var i = 0; i < templeStatus.length; i++) {
//        var d = templeStatus[i];
//        var $link = $('<a href="#"><img data-number=' + i + ' src="images/' + d.image + '" alt="temple" class="temple-image"/></a>'),
//            $name = $('<h4 class="temple-title">' + d.name + '</h4>'),
//            $li = $('<li class="temple-selection"></li>');
//        $li.append($link);
//        $li.append($name);
////        $li.append($selectList.clone());
//        $('ol.temples').append($li);
//      }
//
////      $("ol.temples .temple-selection").click(
////          function (e) {
////            $('.temple-selection a img.temple-image').removeClass('selected');
////            $('a img.temple-image', e.currentTarget).addClass("selected");
////          }
////      );
//
//      $("ol.temples .temple-selection").click(
//          function (e) {
//            if ($('a img.temple-image', e.currentTarget).hasClass("large")) {
//              $('a img.temple-image', e.currentTarget).removeClass("large");
//            } else {
//              $('a img.temple-image', e.currentTarget).addClass("large");
//            }
//          }
//      );
//    }
//
//    now.receiveTempleStatus = function(name, templeState){
//
//      if (templeState && templeState.temples){
//        redrawTempleStatus(templeState.temples)
//      }
//
////      $('a img.temple-image[data-number="' + number + '"]').attr('src',src);
////      var temple = $('a img.temple-image[data-number="' + number + '"]').text();
////      $('a img.temple-image[data-number="' + number + '"]').text(name);
//
//
//      // $("#messages").prepend("<br>" + name + ": " + message);
//    }




  }