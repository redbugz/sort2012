Words = new Meteor.Collection('words');
// {_id: 10, word: 'hello', position: {top: 200, left: 200}}

cached = {}
dragging = false;
users = 0;

aof = [ 'Articles of Faith',
  '1 We believe in God, the Eternal Father, and in His Son, Jesus Christ, and in the Holy Ghost.',
  '2 We believe that men will be punished for their own sins, and not for Adam’s transgression.',
  '3 We believe that through the Atonement of Christ, all mankind may be saved, by obedience to the laws and ordinances of the Gospel.',
  '4 We believe that the first principles and ordinances of the Gospel are: first, Faith in the Lord Jesus Christ; second, Repentance; third, Baptism by immersion for the remission of sins; fourth, Laying on of hands for the gift of the Holy Ghost.',
  '5 We believe that a man must be called of God, by prophecy, and by the laying on of hands by those who are in authority, to preach the Gospel and administer in the ordinances thereof.',
  '6 We believe in the same organization that existed in the Primitive Church, namely, apostles, prophets, pastors, teachers, evangelists, and so forth.',
  '7 We believe in the gift of tongues, prophecy, revelation, visions, healing, interpretation of tongues, and so forth.',
  '8 We believe the Bible to be the word of God as far as it is translated correctly; we also believe the Book of Mormon to be the word of God.',
  '9 We believe all that God has revealed, all that He does now reveal, and we believe that He will yet reveal many great and important things pertaining to the Kingdom of God.',
  '10 We believe in the literal gathering of Israel and in the restoration of the Ten Tribes; that Zion (the New Jerusalem) will be built upon the American continent; that Christ will reign personally upon the earth; and, that the earth will be renewed and receive its paradisiacal glory.',
  '11 We claim the privilege of worshiping Almighty God according to the dictates of our own conscience, and allow all men the same privilege, let them worship how, where, or what they may.',
  '12 We believe in being subject to kings, presidents, rulers, and magistrates, in obeying, honoring, and sustaining the law.',
  '13 We believe in being honest, true, chaste, benevolent, virtuous, and in doing good to all men; indeed, we may say that we follow the admonition of Paul—We believe all things, we hope all things, we have endured many things, and hope to be able to endure all things. If there is anything virtuous, lovely, or of good report or praiseworthy, we seek after these things.' ]

function generatePosition() {
  return {
    top: 50+Math.floor(Math.random() * 500),
    left: 50+Math.floor(Math.random() * 800)
  };
}

if (Meteor.isClient) {
  Template.header.wordCount = function () {
    return Words.find({}).count();
  };
  Template.header.connected = function () {
    return Meteor.status().status;
  };
  Template.header.connectedCount = function () {
    return users;
  };
  createWord = function(word, position) {
    return Words.insert({
      word: word,
      position: position || generatePosition()
    });
  }

  submitWord = function(e) {
    closeModal();
    createWord($('#add_word_form input').val());
    $('#add_word_form input').val('');
  };

  submitAoF = function(e) {
    closeModal();
    var wordList = aof[$(e.target).data("aof")].match(/[\w\'’]+|[—\.,:;\(\)]+/g);
    console.log(wordList);
    for (var i = 0, len = wordList.length; i < len; i++) {
      createWord(wordList[i]);
    }
    $('#add_word_form input').val('');
  };

  removeWord = function() {
    Words.remove({
      word: $(dragging).data('word')
    });
    dragging = false;
  };

  closeModal = function() {
    return $('#add_word_form').hide().addClass('inactive');
  }

  Template.header.events({
    'click #add_word' : function () {
      $('#add_word_form').show().removeClass('inactive');
    },
    'click #clear_words' : function () {
      Words.remove({});
    }
  });

  Template["add-word-form"].events({
    'click #add_word_form .close' : closeModal,
    'click #add_word_form .add' : submitWord,
    'click #add_word_form .aof-buttons' : submitAoF,
    'keydown #add_word_form input' : function (e) {
      if (e.keyCode === 13) {
        submitWord(e);
      }
      if (e.keyCode === 32) {
        return e.preventDefault();
      }
    },
    'keydown window' : function (e) {
      if (e.keyCode === 68 && dragging !== false) {
        removeWord(dragging);
      }
    }
  });

  Template.wordBoard.words = function() {
    return Words.find({});
  }

  setupMagnets = function() {
    $('#hold').delegate('.magnet', 'mouseenter', function() {
      var $this = $(this);
      if(!$this.is(':data(draggable)')) {
//        console.log("magnet mouseenter making draggable", $this);
        $this.draggable({
          drag: sendUpdate,
          stop: sendStopUpdate
        });
      }
    });
  };
  Meteor.startup(function () {
    console.log("client startup");
    setupMagnets();
    Meteor.subscribe("users", function() {
      console.log("subscribe users");
    });
    Meteor.call("adduser", users);
  });

    sendUpdate = function(e, ui) {
//      console.log("update position final", JSON.stringify(ui.position));
      Words.update({_id: $(e.target).data("word")}, { $set: { position: ui.position } });
//      }
  };

  sendStopUpdate = function(e) {
    var params;
    dragging = false;
    params = {
      id: $(e.target).data('word'),
      offset: $(e.target).offset(),
      position: $(e.target).position()
    };
//    socket.emit('stop_update', params);
  };
}

Meteor.methods({
  keepalive: function (player_id) {
    Players.update({_id: player_id},
        {$set: {last_keepalive: (new Date()).getTime(),
          idle: false}});
  },
  adduser: function (fred) {
    console.log("adduser", fred);//, data);
    users++;
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("client startup");
    // code to run on server at startup

    // publish all my words and opponents' words that the server has
    // scored as good.
    Meteor.publish('words', function () {
      return Words.find({});
    });

    Meteor.publish('users', function () {
      this.session.socket.on("open", function() {
        users++;
      });
      this.session.socket.on("close", function() {
        users--;
      });
      return users++;
    });

    // send keepalives so the server can tell when we go away.
    //
    // this is not a great idiom. meteor server does not yet have a
    // way to expose connection status to user code. Once it does, this
    // code can go away.
//    Meteor.setInterval(function() {
//      if (Meteor.status().connected)
//        Meteor.call('keepalive', Session.get('player_id'));
//    }, 20*1000);
  });
}
