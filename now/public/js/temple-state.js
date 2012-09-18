var templeState = function(){

//  $('.temple-selection').click(
//      function(e) {
//        if ($('a img.temple-image', e.currentTarget).hasClass("large")) {
//          $('a img.temple-image', e.currentTarget).removeClass("large");
//        } else {
//          $('a img.temple-image', e.currentTarget).addClass("large");
//        }
//      }
//  );

  function addTemple(templeStatus) {
    var $link = $('<a href="#" class="cf" index="' + templeStatus.index + '"><img data-name="' + templeStatus.name + '" src="' + templeStatus.image + '" alt="temple" class="temple-image"/></a>'),
        $nameStatus= $('<h4>' + templeStatus.name + ' ' + templeStatus.status + '</h4>');
        $li = $('<li class="temple-selection"></li>');
    $li.append($link);
    $li.append($nameStatus);
    $('ol.temples').append($li);
    $li.click(
        function (e) {
          if ($('a img.temple-image', e.currentTarget).hasClass("large")) {
            $('a img.temple-image', e.currentTarget).removeClass("large");
          } else {
            $('a img.temple-image', e.currentTarget).addClass("large");
          }
        }
    );

  }

  var redrawTempleStatus = function (templeStatus) {
    if (templeStatus) {
      if (templeStatus.length) {
        $('ol.temples').empty();
        for (var i = 0; i < templeStatus.length; i++) {
          var d = templeStatus[i];
          if (d.status !== "UNIDENTIFIED") {
            addTemple(d);
          }
        }



      } else {
        addTemple(templeStatus);
      }

    }
  };


  now.receiveMessage = function(name, templeState){
    if (templeState){
      redrawTempleStatus(templeState)
    }
  }



};
