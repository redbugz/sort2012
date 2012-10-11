cached = {}
dragging = false
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

submitWord = (e) ->
  closeModel()
  socket.emit "newWord",
    'word' : $('#add_word_form input').val()
  $('#add_word_form input').val ''

submitAoF = (e) ->
  closeModel()
  words = aof[$(e.target).data("aof")].match(/\w+|[—\.,:;\(\)]+/g)
  console.log words
  for newWord in words
    if (newWord)
      socket.emit("newWord",
        'word' : newWord
      )
  $('#add_word_form input').val ''

closeModel = () ->
  $('#add_word_form').hide().addClass 'inactive'

setListeners = () ->
  $(window).on 'keydown', (e) ->
    if e.keyCode == 68 && dragging != false
      removeWord dragging
  $('#add_word').on 'click', ->
    $('#add_word_form').show().removeClass 'inactive'
  $('#add_word_form .close').on 'click', closeModel
  $('#add_word_form .add').on 'click', submitWord
  $('#add_word_form .aof-buttons').on 'click', submitAoF
  $('#add_word_form input').on 'keydown', (e) ->
    if e.keyCode == 13
      submitWord e
    if e.keyCode == 32
      e.preventDefault()
  $('#clear_words').on 'click', removeAllWords

escapeHTML = (string) ->
  return $('<pre>').text(string).html()

removeWord = () ->
  socket.emit 'remove_word',
    word: $(dragging).data('word')
  $(dragging).remove()
  dragging = false

removeAllWords= () ->
  socket.emit 'remove_all_words',

createAWord = (word) ->
  $('#hold').append "<div class='magnet no_select' style='left: "+ word.position.left+"px; top: "+word.position.top+"px;' data-word='"+word.id+"'>"+escapeHTML(word.word)+"</div>"

socketListeners = () ->
  socket.on 'newWord', (data) ->
    createAWord(data.word)
    setupMagnets()

  socket.on 'pieceRemoved', (data) ->
    $('[data-word="'+data.id+'"]').remove();

  socket.on 'pieceMoved', (data) ->
    selector =  cached[data.id] || ( ->
                                          cached[data.id] = $("[data-word='" + data.id + "']")
                                          return cached[data.id]
                                      )()
    selector.offset(data.offset).css
      "z-index": 999

  socket.on 'peopleOnline', (data) ->
        $('#people_online .count').html(data);

setupMagnets = () ->
  $(".magnet").draggable
      drag: sendUpdate,
      stop: sendStopUpdate

sendUpdate = (e) ->
  dragging = e.target
  params =
            id: $(e.target).data('word'),
            offset: $(e.target).offset(),
            position: $(e.target).position()
  socket.emit 'update', params

sendStopUpdate = (e) ->
  dragging = false
  params =
            id: $(e.target).data('word'),
            offset: $(e.target).offset(),
            position: $(e.target).position()
  socket.emit 'stop_update', params
$ ->
  setListeners()
  socketListeners()
  setupMagnets()