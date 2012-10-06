var templeState = function(){

  var addTemple = function (temple) {
    if (temple && temple.index) {
      var $link = $('<a href="#" class="cf" index="' + temple.index + '"><img data-name="' + temple.name + '" src="' + temple.image + '" alt="temple" class="temple-image"/></a>'),
          $nameStatus= $('<h4>' + temple.name + ' ' + temple.status + '</h4>');
          $li = $('<li class="temple-selection"></li>');
      $li.append($link);
      $li.append($nameStatus);
      $('ul.temple-results').prepend($li);
    }
  }

  var redrawTempleStatus = function (temples) {
    if (temples && temples.length) {
      $('ul.temple-results').empty();
      for (var i = 0; i < temples.length; i++) {
        var temple = temples[i];
        if (temple.status !== "UNIDENTIFIED") {
          addTemple(temple);
        }
      }
    }
  };

  var redrawContributions = function (scores) {
    var $scores = $('ul.scores');
    if (scores) {
      $scores.empty();
      for (var key in scores) {
        var score = scores[key],
          name = score.name || '',
          count = score.count || '0';
        if (name) {
          $('<li class="' + name + '"><a href="#">'+ name + ':' + count + '</a></li>').appendTo($scores);
          if (name === now.name) {
              $('.myScore').html("You've Matched " + count);
          }
        }
      }
    }
  }

  var addScore = function (name) {
    var $scores = $('ul.scores');
    var $score = $('li.' + name);
    if ($score.length > 0) {
      var oldScore = $score.text().split(":");
      oldScore[1] = parseInt(oldScore[1]) + 1;
      $score.html(name + ":" + oldScore[1]);
      if (name === now.name) {
        $('.myScore').html("You've Matched " + oldScore[1]);
      }
    } else {
      $('<li class="' + name + '"><a href="#">'+ name + ': 1</a></li>').appendTo($scores);
      if (name === now.name) {
        $('.myScore').html("You've Matched 1");
      }

    }

  }

  var receiveMessage = function(name, templeState){
    if (templeState){
      redrawTempleStatus(templeState.temples);
      addTemple(templeState);
    }

  }

  var receiveTempleStatus = function(name, templeState){
    if (templeState){
      if (templeState.temples || templeState.scores) {
        redrawTempleStatus(templeState.temples);
        redrawContributions(templeState.scores);
      } else {
        addTemple(templeState);
        addScore(name);
      }
    }
  }

  return ({receiveMessage:receiveMessage, receiveTempleStatus:receiveTempleStatus});

};
