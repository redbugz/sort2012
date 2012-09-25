var playNow = function() {

  var drawScores = function(scores) {
    if (scores) {

    }
  }

  var redrawTemples = function (temples) {
    var $selectList;
    if (temples) {
      $selectList = $('<select name=select1><option>Select Temple</option></select>');
        $('ol.temples').empty();
        for (var i = 0; i < temples.length; i++ ){
          var d = temples[i];
          if (d.status === 'UNIDENTIFIED') {
            $selectList.append('<option>'+ d.name +'</option>');
          }
        }

        for (var i = 0; i < temples.length; i++) {
          var d = temples[i];
          var $newSelectList2 = $selectList.clone(),
             $newSelectList = $('<input id="autocomplete_1' + i + '" type="text">');
              $link = $('<a href="#" class="cf" index="' + d.index + '"><img data-name="' + d.name + '" src="' + d.image + '" alt="temple" class="temple-image"/></a>'),
              $li = $('<li class="temple-selection"></li>');
          if (d.status === 'UNIDENTIFIED') {
            $li.append($link);

            $newSelectList2.change(function (e) {
              removeTextMatch($(e.target).val());
            });

            $newSelectList.click(function (e) {
              removeTextMatch($(e.target).val());
            });

            $newSelectList.keyup(function autocomplete(event) {
              //checking if the delete key was pressed
              if(event.which == 8) {
                event.preventDefault();
                return;
              }
              now.getGuess($(event.currentTarget).val());
            });

            $link.append($newSelectList);
            $link.append($newSelectList2);

          }
          $('ol.temples').append($li);

        }

        $("ol.temples .temple-selection").click(
            function (e) {
              var $img = $('a img.temple-image', e.currentTarget);

              $('.temple-selection a ').removeClass('selected');
              $('a ', e.currentTarget).addClass("selected");

              if ($img.hasClass("large")) {
                $img.removeClass("large");
              } else {
                $img.addClass("large");
              }
              removeMatches(e);
              return false;
            }
        );
      }

    };

  var removeMatches = function(e) {
    if (!removeTextMatch($('input', $(e.currentTarget)).val())) {
      removeTextMatch($('select', $(e.currentTarget)).val());
    }
  };

  var removeTextMatch = function (str) {
    var temple = {},
        $link = $('a.selected');
    if ($('a.selected img.temple-image').data('name') && $('a.selected img.temple-image').data('name').toLowerCase() === str.toLowerCase()){
      temple.name = $('a.selected img.temple-image').data('name');
      temple.index = $link.attr('index');
      temple.image = $('img',$link).attr('src');
      temple.status = 'Found by ' + now.name;
      now.distributeTempleStatus(temple);
      return true;
    }
    return false;
  };


  var updateTemples = function (templeStatus) {
    if (templeStatus) {
      // remove the selection
      $('a[index="'+ templeStatus.index + '"]').remove();
      $('select option[value="' + templeStatus.name + '"]').remove();
    }
  }

  now.receiveTempleStatus = function(name, state){

    if (!nameAdded)  {
      now.addName(now.name);
      nameAdded = true;

    }

    if (state){
        drawScores(state.scores);
        redrawTemples(state.temples);
        updateTemples(state);
    }
  }

  now.receiveGuess = function(guess) {
    var val =  $('a.selected input').val();
//  var subGuess = guess.substring(val.length);
    if(guess) {
      $('a.selected input').val(val + guess);
      $('a.selected input')[0].selectionStart = val.length;
      $('a.selected input')[0].selectionEnd = guess.length + val.length;
    }
  };

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

//  if (!now.name) {
//    now.name = prompt("What's your name?", "");
//  }

  if (!now.name) {
    now.name = prompt("What's your name ?", "");
//    now.addName(now.name);
  }

  var nameAdded = false;

  $("#text-input").focus();

};
