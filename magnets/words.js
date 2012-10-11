var words = {};
var canSave = true;

function generatePosition() {
  return {
    top: Math.floor(Math.random() * 600),
    left: Math.floor(Math.random() * 900)
  };
}


exports.removeWord = function(id) {
  delete words[id];
}

exports.words = function() {
  return words;
}

exports.updatePosition = function(word) {
  if (words[word.id]) {
    console.log("updating position old:", words[word.id].position);
    console.log("updating position new:", word.position);
    words[word.id].position = word.position;
  } else {
    console.log("couldn't find word to update position", word, Object.keys(words));
  }
}

exports.addWord = function(word, id, pos) {
  var newWord = {
    'id': id,
    'word': word,
    'position': pos || generatePosition()
  };
  console.log("adding word to words", id, newWord);
  words[id] = newWord;
  console.log("word added", newWord, Object.keys(words).length);
  return newWord;
}

exports.createWord = function(word) {
  var newWord = {
    'id': null,
    'word': word,
    'position': generatePosition()
  };
  console.log("created word", newWord);
  return newWord;
}