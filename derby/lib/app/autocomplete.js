/**
 * Created with IntelliJ IDEA.
 * User: thorntonjn
 * Date: 9/22/12
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */

var auto = function () {
  var trie =
    function(vertex) {
      this.root = vertex;
      this.addWord = function(vertex, word) {
        if(!word.length) {
          return;
        } else {
          vertex.words.push(word);
          if(!(word[0] in vertex.children)) {
            vertex.children[word[0]] = new Vertex(word[0]);
          }
          this.addWord(vertex.children[word[0]], word.substring(1));
          return;
        }
      }

      this.retrieve = function(prefix) {
        var vertex = this.root;
        while(prefix.length) {
          vertex = vertex.children[prefix[0]];
          prefix = prefix.substring(1);
          if(!vertex) {
            return '';
          }
        }
        return vertex.words;
      }
    };

  var vertex =
    function(val) {
      this.children = {};
      this.words = [];
      this.val = val;
    };

  var temples;
  var fs = require('fs');
  var rootVert = new Vertex('');
  var trie = new Trie(rootVert);
  fs.readFile('/Users/zachw/Sites/nowjs-examples/temples.txt', function(err, data) {
    temples = data.toString().split('\n');
    for(var i in temples) {
      var temple = temples[i].toLowerCase();
      trie.addWord(rootVert, temple);
    }
  });

}