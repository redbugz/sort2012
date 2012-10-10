// Server-side Code

// Define actions which can be called from the client using ss.rpc('puzzle.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    choosePuzzle: function(puzzleId) {
      console.log("server received choosePuzzle: ", puzzleId);
      if (puzzleId && puzzleId.length > 0) {         // Check for blank messages
        var rand = [];			// this array holds the 25 ids before they are randomized
        for(i = 1; i < 26; i++){
          rand.push(i);
        }

        // this algorithm for randomizing the array was taken from the article "Extending JavaScript Arrays" @ http://www.go4expert.com/forums/showthread.php?t=606
        var tmp, num1, i = rand.length;
        while(i--)
        {
          num1=Math.floor((i+1)*Math.random());
          tmp=rand[i];
          rand[i]=rand[num1];
          rand[num1]=tmp;
        }

        ss.publish.all('choosePuzzle', {puzzleId: puzzleId, piecesOrder: rand});     // Broadcast the message to everyone
        return res(true);                          // Confirm it was sent to the originating client
      } else {
        return res(false);
      }
    },

    addPiece: function(imgName, pieceId) {
      if (pieceId && pieceId.length > 0) {         // Check for blank messages
        ss.publish.all('addPiece', {imgName: imgName, pieceId: pieceId});     // Broadcast the message to everyone
        return res(true);                          // Confirm it was sent to the originating client
      } else {
        return res(false);
      }
    },

    pieceMoved: function(pieceData) {
      console.log("server received pieceMoved: ", JSON.stringify(pieceData));
      if (pieceData) {         // Check for blank messages
        console.log("redistributing pieceMoved: ", JSON.stringify(pieceData));
        ss.publish.all('pieceMoved', pieceData);     // Broadcast the message to everyone
        return res(true);                          // Confirm it was sent to the originating client
      } else {
        return res(false);
      }
    },

    gameFinished: function(data) {
      console.log("gameFinished: "+JSON.stringify(data));
      if (data) {         // Check for blank messages
        ss.publish.all('gameFinished', data);     // Broadcast the message to everyone
        return res(true);                          // Confirm it was sent to the originating client
      } else {
        return res(false);
      }
    }

  };

};