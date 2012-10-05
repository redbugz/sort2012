var playNow = function() {
  var myCount = 0;

  var drawScores = function(scores) {
    var score, name, count = 0, totalCount = 0;
    if (scores) {
      if (scores && now.name) {
        myCount = 0;

        for (var key in scores) {
          score = scores[key],
          name = score.name || '',
          count = score.count || 0;
          if (name === now.name) {
            myCount = score.count;
          }
          totalCount += count;
        }

      }
      $('.myScore').html("You've Matched " + count);
    }
    if (now.name) {
      $('.navbar-link').text(now.name);
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
             $newSelectList = $('<input id="autocomplete_1' + i + '" type="text">'),
              $link = $('<a href="#" class="cf" index="' + d.index + '"><img data-name="' + d.name + '" src="' + d.image + '" alt="temple" class="temple-image cf"/></a>'),
              $li = $('<li class="temple-selection"></li>');
          if (d.status === 'UNIDENTIFIED') {
            $li.append($link);

            $newSelectList2.change(checkForMatch);

            $newSelectList.click(checkForMatch);

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
              $('ol.temples .temple-selection a ').removeClass('selected');
              $('a ', e.currentTarget).addClass("selected");
              return false;
            }
        );


        $('ol.temples input[type="text"]').keypress(function (e) {
          if (e.which && e.which === 13) {
            checkForMatch(e);
            return false;
          }
        });

      }

    };

  var animateSuccess = function ($li) {
    var $img = $(".temple-image", $li);

        $img.attr('src', 'images/success.jpg');
        $li.animate({
          width: ['toggle', 'swing'],
          height: ['toggle', 'swing'],
          opacity: 'toggle'
        }, 4000, 'linear', function() {
          $li.css('opacity', '');
          $li.css('width', '');
          $li.css('height', '');
          $li.remove();
        });

  };

  var animateError = function ($link) {
    var $img = $('img', $link),
        saveSrc = $img.attr("src");
    $img.attr('src', 'images/error.jpeg');
    $link.animate({
      opacity: 'toggle'
    }, 500, 'linear', function() {
      $link.css('display','');
      $img.attr('src', saveSrc);
    });
  };

  var checkForMatch = function(e) {
    var $link = $($(e.currentTarget).parent());
    if (textMatches($link, $(e.currentTarget).val()) ||
          textMatches($link, $(e.currentTarget).val())) {
      distributeTempleStatus($link);
      animateSuccess($link);
    } else {
      animateError($link);
    }
  };

  var textMatches = function ($link, str) {
    var $img = $('img.temple-image', $link);
    if ($img.data('name') && $img.data('name').toLowerCase() === str.toLowerCase()){
      return true;
    }
    return false;
  }

  var distributeTempleStatus = function ($link) {
    var temple = {},
        $img = $('img.temple-image', $link);
    temple.name = $img.data('name');
    temple.index = $link.attr('index');
    temple.image = $img.attr('src');
    temple.status = 'Found by ' + now.name;
    now.distributeTempleStatus(temple);
  }

  var updateTemples = function (templeStatus) {
    var $link, $img;

    if (templeStatus) {
      // remove the selection
      $link = $('.temples a[index="'+ templeStatus.index + '"]');
      $img = $('img', $link);

      if ($img && $img.attr('src') !== "images/success.jpg") {
          $link.remove();
      }
      $('.temples select option[value="' + templeStatus.name + '"]').remove();
    }
  }

  var receiveTempleStatus = function(name, state){
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

  var receiveGuess = function(guess) {
    var val =  $('a.selected input').val();
    if(guess) {
      $('ol.temples a.selected input').val(val + guess);
      $('ol.temples a.selected input')[0].selectionStart = val.length;
      $('ol.temples a.selected input')[0].selectionEnd = guess.length + val.length;
    }
  };

  $("#text-input").focus();

  return ({receiveTempleStatus:receiveTempleStatus, receiveGuess:receiveGuess});

};
