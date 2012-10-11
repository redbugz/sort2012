var words;
var socket;
var models;
var sockets = {};
var initialWordsLoaded = true

function init(webServer, _words, _models) {
  models = _models;
  words = _words;
  socket = require('socket.io').listen(webServer, {
    log: false
  });
  bindEvents();
}

function loadWords() {
  models.Word.find(function(err, _words) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < _words.length; ++i) {
        var newWord = words.addWord(_words[i].word, _words[i]._id, _words[i].position);
        sendAll(null, {
          word: newWord,
          count: _words.length
        }, "newWord");
      }
      var initialWordCount = Object.keys(words.words).length;
  console.log("# words", initialWordCount, Object.keys(words.words));
  if (!initialWordCount && !initialWordsLoaded) {
    initialWordsLoaded = true;
    loadInitialWords();
  }
    }
  });
}

function loadInitialWords() {
  var fs = require('fs');
  fs.readFile( __dirname + '/../aof.txt', function (err, data) {
    if (err) {
      throw err;
    }
    var string = data.toString();
    console.log(string);
    var articles = string.split(/[\n\r]+/);
    console.log(articles);
    var thirteen = articles[12].split(/\s+/);
    var _words = thirteen;//string.split(/\s+/);
    console.log(_words.length, _words);

    for (var i = 0; i < _words.length; ++i) {
      var newWord = words.createWord(_words[i]);
      storeWord(newWord);
      words.addWord(newWord.word, newWord.id, newWord.position);
    }

    loadWords();
  });
}

function bindEvents() {
  socket.sockets.on('connection', function(socket) {
    var _id             = socket.id;
    sockets[_id]        = socket;
    sockets[_id].canAdd = true

    sendAll(null, Object.keys(sockets).length, "peopleOnline");

    socket.on('update', function(data) {
      words.updatePosition(data);
      sendAll(_id, data, "pieceMoved");
    });

    socket.on('remove_word', function(data) {
      console.log("remove word:", data);
      models.Word.find({
        _id: data.word
      }, function(err, d) {
        console.log("remove word d:", d);
        if (!err && d.length) {
          d[0].remove();
          words.removeWord(d[0]._id);
          sendAll(_id, data, "pieceRemoved");
        }
      });
    });

    socket.on('remove_all_words', function(data) {
      models.Word.find({}, function(err, d) {
        console.log("remove all", d);
        if (!err && d.length) {
          d[0].remove();
          words.removeWord(d.id);
          sendAll(_id, data, "pieceRemoved");
        }
      });
    });

    socket.on('stop_update', function(data) {
      words.updatePosition(data);
      models.Word.find({
        word: data.word
      }, function(err, d) {
        if (!err && d.length) {
          d[0].position = data.position;
          d[0].save();
        }
      });
      sendAll(_id, data, "pieceMoved");
    });

    socket.on('newWord', function(data) {
      if (sockets[_id].canAdd) {
        var newWord = words.createWord(data.word);
//        sockets[_id].canAdd = false;
//        setTimeout(function rateLimit(){
//          sockets[_id].canAdd = true;
//        }, 5000);

        storeWord(newWord);
        words.addWord(newWord.word, newWord.id, newWord.position);

        sendAll(null, {
          word: newWord,
          count: Object.keys(words.words()).length
        }, "newWord");
      }
    });

    socket.on('disconnect', function(data) {
      delete sockets[_id];
      sendAll(null, Object.keys(sockets).length, "peopleOnline");
    });
  });
}

function storeWord(newWord) {
  console.log("storing word: ", newWord);
  var instance = new models.Word({
    word: newWord.word,
    position: newWord.position
  });
  instance.save();
  console.log("save result:", instance._id);
  newWord.id = instance._id;
  return newWord;
}

function sendAll(id, data, key) {
  for (socket in sockets) {
    socket != id && sockets[socket].emit(key, data);
  }
}

exports.init = init;
exports.loadWords = loadWords;