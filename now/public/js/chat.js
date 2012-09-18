var chatNow = function(){

//  $('.temple-selection').click(
//      function(e) {
//        if ($('a img.temple-image', e.currentTarget).hasClass("large")) {
//          $('a img.temple-image', e.currentTarget).removeClass("large");
//        } else {
//          $('a img.temple-image', e.currentTarget).addClass("large");
//        }
//      }
//  );

  var redrawTempleStatus = function (templeStatus) {

    var $selectList = $('<select name=select1><option>Select Temple</option></select>');

    if (templeStatus) {
      if (templeStatus.length) {
        $('ol.temples').empty();
        for (var i = 0; i < templeStatus.length; i++ ){
          var d = templeStatus[i];
          if (d.status === 'UNIDENTIFIED') {
            $selectList.append('<option>'+ d.name +'</option>');
          }
        }

        for (var i = 0; i < templeStatus.length; i++) {
          var d = templeStatus[i];
          var $newSelectList = $selectList.clone(),
              $link = $('<a href="#" class="cf" index="' + d.index + '"><img data-name="' + d.name + '" src="' + d.image + '" alt="temple" class="temple-image"/></a>'),
              $li = $('<li class="temple-selection"></li>');
          if (d.status === 'UNIDENTIFIED') {
            $li.append($link);

            $newSelectList.change(function (e) {
                  var str = $(e.target).val(),
                      templeStatus = {},
                      $link = $('a.selected');

                  if ($('a.selected img.temple-image').data('name') == str) {
                    templeStatus.name = str;
                    templeStatus.index = $link.attr('index');
                    templeStatus.image = $('img',$link).attr('src');
                    templeStatus.status = 'Found by ' + now.name;
                    now.distributeMessage(templeStatus);
                  }

                });
            $link.append($newSelectList);
          }
          $('ol.temples').append($li);

        }

        $("ol.temples .temple-selection").click(
            function (e) {
              $('.temple-selection a ').removeClass('selected');
              $('a ', e.currentTarget).addClass("selected");
            }
        );

        $("ol.temples .temple-selection").click(
            function (e) {
              if ($('a img.temple-image', e.currentTarget).hasClass("large")) {
                $('a img.temple-image', e.currentTarget).removeClass("large");
              } else {
                $('a img.temple-image', e.currentTarget).addClass("large");
              }
            }
        );

      } else {
        // remove the selection
        $('a[index="'+ templeStatus.index + '"]').remove();
        $('select option[value="' + templeStatus.name + '"]').remove();

      }

    }
  };


    now.receiveMessage = function(name, templeState){

      if (templeState){
        redrawTempleStatus(templeState)
      }

//      $('a img.temple-image[data-number="' + number + '"]').attr('src',src);
//      var temple = $('a img.temple-image[data-number="' + number + '"]').text();
//      $('a img.temple-image[data-number="' + number + '"]').text(name);


      // $("#messages").prepend("<br>" + name + ": " + message);
    }
    
//    $("#send-button").click(function(){
//      if ($('a img.temple-image.selected').data('number') == $("#text-input").val()) {
//        now.distributeMessage($("#text-input").val() + ":" + $('a img.temple-image.selected').attr('src'));
//        $("#text-input").val("");
//        $("#text-input").focus();
//      }
//    });
//
//    $("#text-input").keypress(function (e) {
//      if (e.which && e.which === 13) {
//        $("#send-button").click();
//        return false;
//      }
//    });
    
    now.name = prompt("What's your name?", "");
    
    $("#text-input").focus();

  
};
