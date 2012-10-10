$(document).ready(function(){	
	// this is the number of matches the user needs to get on the board to win.
	// there are 25 pieces/slots for each puzzle hence the number is set to 25.
	const NUM_TO_WIN = 25; 
	
	// the "preview" and "winner" divs are hidden at the beginning of the game
	$(".preview").hide();
	$(".winner").hide();
	
	// this function loads the pieces for the puzzle specified by the parameter imgType
	// onto the screen randomly. it generates numbers randomly between 25 and stores them in an array in order to ensure 
	// the numbers genrated are unique.
  function loadImages(imgType, rand) {
    jQuery.each(rand, function (i, val) {  // the images are created and added to the pieces div
      addPieceImage(imgType, val);
    });
    setPiecesDraggable();
  };

  function addPieceImage(imgType, pieceId) {
    img = "images/" + imgType +"/" + imgType + "_" + pieceId +".gif"; // the image path is set
    pic = new Image();
    $(pic).addClass("piece");
    $(pic).data("piece-id", pieceId);
    console.log("piece id", pieceId);
    $(pic).attr({value:imgType});
    pic.src = img;
    $(".pieces").append(pic);
  }
    	
    	//sets the images in the pieces div as draggable objects
    function setPiecesDraggable(){
        $(".piece").draggable({
                cursor: "url(images/grab.cur), auto", //the cursor is a transparent so it looks like piece becomes the cursor
                opacity: 0.5,
                scroll: false,
                snap: ".drop",
                snapMode: "inner",
                drag: sendUpdate,
                stop: sendStopUpdate
        });
    };
var dragging = false;
  sendUpdate = function(e, ui) {
    var params;
    dragging = e.target;
    var pieceData = {
      pieceId: $(e.target).data("piece-id"),
      pieceOffset: ui.offset,
      piecePosition: ui.position
    }
    console.log("piece moved send update: " + JSON.stringify(pieceData));
    ss.rpc('puzzle.pieceMoved', pieceData);
  };

  sendStopUpdate = function(e) {
    var params;
    dragging = false;
    params = {
      id: $(e.target).data('word'),
      offset: $(e.target).offset(),
      position: $(e.target).position()
    };
    console.log("piece stopped moving send update: " + params);
//    return socket.emit('stop_update', params);
  };



  // this controls what happens when the user selects a jigsaw puzzle by clicking on it
	$(".imgs").click(function (){
		// the preview and winner divs are emptied and hidden
		$(".preview").empty();
		$(".preview").hide();
		$(".winner").empty();
		$(".winner").hide();

		// calls for the pieces to be loaded and then sets them as draggables
		var picID = $(this).attr("id");
		var turl = "index.html";
		$(".instructions").empty();
		$(".instructions").append("Drag the puzzle pieces onto the board. Move your cursor over the menu thumbnail to see what the finished image is supposed to look like.");
		$(".pieces").empty();
    ss.rpc("puzzle.choosePuzzle", picID);
//    console.log("sending choosePuzzle event: " + picID);
//    ss.rpc('demo.choosePuzzle', picID);
	});
	// controls what happens when the user hovers over the menu pic(a preview of the image is shown)
	$(".imgs").hover(function(){
		$(".winner").empty();
		$(".winner").hide();
		$(".preview").show();
		var picID = $(this).attr("id");
		var img = new Image();
		img.src = "images/"+picID+"/"+picID+".jpg";
		$(img).attr({width:604}); // this is being set manually because the css seems to fail on some browsers
		$(img).attr({height:403}); // this is being set manually because the css seems to fail on some browsers
		$(".preview").append(img);
		},function(){				// this function controls what happens when the user moves the cursor off the image
			$(".preview").empty();
			$(".preview").hide();
	});
		
	// this function sets up the droppables in the main table
	$(".drop").droppable({
	// a droppable will truly "accept" only the one piece that belongs there but the "snap" feature of 
	//the draggables gives the user the illusion that all the pieces can fit everywhere
		accept: function(draggable){		
			var droppableId = $(this).attr("id");
			var imageId = $(draggable).data("piece-id");
      console.log("accept?", droppableId, imageId, droppableId == imageId);
			return (droppableId == imageId);  // compares ids of the piece and the and droppable
		},
		out:function(draggable){	//if the user moves the piece out of the draggable, the class "correct" is removed if it has been added to the draggable
			$(this).removeClass("correct");	
		},
		tolerance: 'intersect',
		activeClass: 'droppable-active',
		hoverClass: 'droppable-hover',
		drop: function(ev,ui){		// controls what happens when an "acceptable" piece is put on the draggable
      console.log("dropped acceptable!", ui, ev);
			$(this).addClass("correct");	// the "correct" class is added to this draggable
			var numberCorrect = $(".correct").size();	// the total number of correct pieces is calculated
			if(numberCorrect == NUM_TO_WIN){		// if the total number is 25(meaning all 25 pieces are in the right place)
				$(".instructions").empty();	
				$(".pieces").empty();
				$(".instructions").append("<b>Congratulations! YOU GOT IT! Now try another puzzle!</b>");
				var imgType =$(ui.draggable).attr("value");
				var imgSrc = "images/" + imgType +"/" + imgType + ".jpg";
				var img = new Image();
				img.src = imgSrc;
				$(img).attr({width:604});
				$(img).attr({height:403});
				$(".winner").append(img);
				$(".winner").show();
				$(".correct").removeClass("correct");	// the draggables are reset
			}
		}
	});

  ss.event.on("choosePuzzle", function(puzzleData) {
    console.log("client received choosePuzzle: ", JSON.stringify(puzzleData));
    loadImages(puzzleData.puzzleId, puzzleData.piecesOrder);
  });
  ss.event.on("addPiece", function(pieceData) {
    console.log("client received addPiece: ", JSON.stringify(pieceData));
    if (pieceData && pieceData.imgName && pieceData.pieceId) {
      addPieceImage(pieceData.imgName, pieceData);
    }
  });
  ss.event.on("pieceMoved", function(pieceData) {
    console.log("client received pieceMoved: ", JSON.stringify(pieceData));
//    var selector = cached[data.id] || (function() {
//      cached[data.id] = $("[data-word='" + data.id + "']");
//      return cached[data.id];
//    })();
    // don't update position if we're the one dragging
    if (!dragging || $(dragging).data("piece-id") !== pieceData.pieceId) {
      $('.piece').filter(function() {
        console.log("updating piece position: " + pieceData.pieceId);
        return $(this).data('piece-id') === pieceData.pieceId;
      }).offset(pieceData.pieceOffset);
    }
  });
});
