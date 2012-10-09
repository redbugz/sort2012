var derby = require('derby')
    , app = derby.createApp(module)
    , get = app.get
    , render
    , view = app.view
    , ready = app.ready;

require('./subnav');

require('./chat');

var play = require('./play');

require('./temple-state');

derby.use(require('derby-ui-boot'))
derby.use(require('../../ui'))

////////////////////////////////////////////////////////////


get('/lobby', function(page, model, _arg) {
  var room, roomName;
  room = _arg.room;

  if (!(room && /^[-\w ]+$/.test(room))) {
    return page.redirect('/lobby');
  }
  roomName = room.toLowerCase().replace(/[_ ]/g, '-');
  if (roomName !== room) {
    return page.redirect("/" + roomName);
  }
  return model.subscribe("rooms." + roomName, 'users', function(err, room, users) {
    var userId;
    model.ref('_room', room);
    userId = model.get('_userId');
    model.ref('_user', users.at(userId));
    if (users.get(userId)) {
      return render(page, model);
    }
    return model.async.incr('config.chat.userCount', function(err, userCount) {
      users.set(userId, {
        name: 'User ' + userCount,
      });
      return render(page, model);
    });
  });
});

render = function(page, model) {
  model.setNull('_room.messages', []);
  model.set('_newComment', '');
  model.fn('_numMessages', '_room.messages', function(messages) {
    return messages.length;
  });
  return page.render();
};


//////////////////////////////////////////////////

var temples = [
  {name:'Aba Nigeria', hide:'hide', image:'images/aba-nigeria-214x128-050816_jrn013.jpg', playImage:'images/aba-nigeria-214x128-050816_jrn013.jpg' , foundBy:false, matched:"notMatched" },
  {name:'Accra Ghana', hide:'hide' , image:'images/accra-ghana-214x128-050816_jrn009.jpg', playImage:'images/accra-ghana-214x128-050816_jrn009.jpg', foundBy:false,  matched:"notMatched" },
  {name:'Adelaide Australia', hide:'hide' , image: 'images/adelaide-australia-214x128-CWD_bac3d5b5.jpg', playImage:'images/adelaide-australia-214x128-CWD_bac3d5b5.jpg', foundBy:false,  matched:"notMatched" },
  {name:'Albuquerque New Mexico', hide:'hide' , image: 'images/albuquerque-new-mexico-214x128-CU031224-002.jpg', playImage:'images/albuquerque-new-mexico-214x128-CU031224-002.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Anchorage Alaska', hide:'hide' , image: 'images/anchorage-alaska-214x128-av050816_jrn022.jpg', playImage:'images/anchorage-alaska-214x128-av050816_jrn022.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Apia Samoa', hide:'hide' , image: 'images/apia-samoa-214x128-AV071129cah035.jpg', playImage:'images/apia-samoa-214x128-AV071129cah035.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Asunción Paraguay', hide:'hide' , image: 'images/asuncion_paraguay-214x128-AV060103_cah012.jpg', playImage:'images/asuncion_paraguay-214x128-AV060103_cah012.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Atlanta Georgia', hide:'hide' , image: 'images/atlanta-georgia-214x128-AV110301cah0038.jpg', playImage:'images/atlanta-georgia-214x128-AV110301cah0038.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Baton Rouge Louisiana', hide:'hide' , image: 'images/baton-rouge-louisiana-214x128-0002060.jpg', playImage:'images/baton-rouge-louisiana-214x128-0002060.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Bern Switzerland', hide:'hide' , image: 'images/bern-switzerland-214x128-CWD_091110_CWills_007.jpg', playImage:'images/bern-switzerland-214x128-CWD_091110_CWills_007.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'Billings Montana', hide:'hide' , image: 'images/billings-montana-214x128-CU091208_bkf01.jpg', playImage:'images/billings-montana-214x128-CU091208_bkf01.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Birmingham Alabama', hide:'hide' , image: 'images/birmingham-alabama-214x128-0002061.jpg', playImage:'images/birmingham-alabama-214x128-0002061.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Bismarck North Dakota', hide:'hide' , image: 'images/bismarck-north-dakota-214x128-0002102.jpg', playImage:'images/bismarck-north-dakota-214x128-0002102.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Bogotá Colombia', hide:'hide' , image: 'images/bogota-colombia-214x128-0002101.jpg', playImage:'images/bogota-colombia-214x128-0002101.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Boise Idaho', hide:'hide' , image: 'images/boise-id-temple-214x128.jpg', playImage:'images/boise-id-temple-214x128.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Boston Massachusetts', hide:'hide' , image: 'images/boston-massachusetts-214x128-0001988.jpg', playImage:'images/boston-massachusetts-214x128-0001988.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Bountiful Utah', hide:'hide' , image: 'images/bountiful-utah-214x128-0001681.jpg', playImage:'images/bountiful-utah-214x128-0001681.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Brisbane Australia', hide:'hide' , image: 'images/brisbane-australia-214x128-CU080604_bkf01ext.jpg', playImage:'images/brisbane-australia-214x128-CU080604_bkf01ext.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Buenos Aires Argentina', hide:'hide' , image: 'images/buenos-aires-argentina-214x128-0001281.jpg', playImage:'images/buenos-aires-argentina-214x128-0001281.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Calgary Alberta', hide:'hide' , image: 'images/calgary-alberta-214x128-CU100212_jlm01.jpg', playImage:'images/calgary-alberta-214x128-CU100212_jlm01.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'Campinas Brazil', hide:'hide' , image: 'images/campinas-brazil-214x128-CU050202_ats03.jpg', playImage:'images/campinas-brazil-214x128-CU050202_ats03.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Caracas Venezuela', hide:'hide' , image: 'images/caracas-venezuela-214x128-0002093alt.jpg', playImage:'images/caracas-venezuela-214x128-0002093alt.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Cardston Alberta', hide:'hide' , image: 'images/cardston-alberta-214x128-VRL_68149_4845006.jpg', playImage:'images/cardston-alberta-214x128-VRL_68149_4845006.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Cebu City Philippines', hide:'hide' , image: 'images/cebu-philippines-214x128-AV100419cah007.jpg', playImage:'images/cebu-philippines-214x128-AV100419cah007.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Chicago Illinois', hide:'hide' , image: 'images/chicago-illinois-214x128-CHICAGODAS97.jpg', playImage:'images/chicago-illinois-214x128-CHICAGODAS97.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Ciudad Juárez Mexico', hide:'hide' , image: 'images/ciudad-juarez-mexico-214x128-CUR_IM030924-004.jpg', playImage:'images/ciudad-juarez-mexico-214x128-CUR_IM030924-004.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Cochabamba Bolivia', hide:'hide' , image: 'images/cochabamba-bolivia-214-128-0002054s.jpg', playImage:'images/cochabamba-bolivia-214-128-0002054s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Colonia Juárez Chihuahua Mexico', hide:'hide' , image: 'images/colonia-jurez-chihuahua-mexico-214x128-CUR_IM030924.jpg', playImage:'images/colonia-jurez-chihuahua-mexico-214x128-CUR_IM030924.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Columbia River Washington', hide:'hide' , image: 'images/columbia-river-washington-214x128-0075835.jpg', playImage:'images/columbia-river-washington-214x128-0075835.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'Columbia South Carolina', hide:'hide' , image: 'images/columbia-south-carolina-214x128-CWD_091710_MJennings.jpg', playImage:'images/columbia-south-carolina-214x128-CWD_091710_MJennings.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Columbus Ohio', hide:'hide' , image: 'images/columbus-ohio-214x128-CU070521_bkf01.jpg', playImage:'images/columbus-ohio-214x128-CU070521_bkf01.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Copenhagen Denmark', hide:'hide' , image: 'images/copenhagen-denmark-214x128-AV060609_vmh9424.jpg', playImage:'images/copenhagen-denmark-214x128-AV060609_vmh9424.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Córdoba Argentina', hide:'hide' , image: 'images/cordoba-argentina-214x128-CU101008_jlm03.jpg', playImage:'images/cordoba-argentina-214x128-CU101008_jlm03.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Curitiba Brazil', hide:'hide' , image: 'images/curitiba-brazil-214-128-AV080605_cah006.jpg', playImage:'images/curitiba-brazil-214-128-AV080605_cah006.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Dallas Texas', hide:'hide' , image: 'images/dallas-texas-214x128-0001742.jpg', playImage:'images/dallas-texas-214x128-0001742.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Denver Colorado', hide:'hide' , image: 'images/denver-colorado-214x128-CWD_091610_JPlotz.jpg', playImage:'images/denver-colorado-214x128-CWD_091610_JPlotz.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Detroit Michigan', hide:'hide' , image: 'images/detroit-michigan-214x128-0002100.jpg', playImage:'images/detroit-michigan-214x128-0002100.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Draper Utah', hide:'hide' , image: 'images/draper-utah-214x128-AV0812015cah016alt.jpg', playImage:'images/draper-utah-214x128-AV0812015cah016alt.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'Edmonton Alberta', hide:'hide' , image: 'images/edmonton-alberta-214x128-0001924.jpg', playImage:'images/edmonton-alberta-214x128-0001924.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Fort Lauderdale Florida', hide:'hide' , image: 'images/fort-lauderdale-214x128-rendering-approved.jpg', playImage:'images/fort-lauderdale-214x128-rendering-approved.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Frankfurt Germany', hide:'hide' , image: 'images/frankfurt-germany-214x128-0001277s.jpg', playImage:'images/frankfurt-germany-214x128-0001277s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Freiberg Germany', hide:'hide' , image: 'images/freiberg-germany-214x128-CU091007_bkf01.jpg', playImage:'images/freiberg-germany-214x128-CU091007_bkf01.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Fresno California', hide:'hide' , image: 'images/fresno-california-214x128-CUR_IM030916-001alt.jpg', playImage:'images/fresno-california-214x128-CUR_IM030916-001alt.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Fukuoka Japan', hide:'hide' , image: 'images/fukuoka-japan-214x128-0001842s.jpg', playImage:'images/fukuoka-japan-214x128-0001842s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Gilbert Arizona', hide:'hide' , image: 'images/gilbert-arizona-214x128-CU101008_jlm04.jpg', playImage:'images/gilbert-arizona-214x128-CU101008_jlm04.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Guadalajara Mexico', hide:'hide' , image: 'images/guadalajara-mexico-214x128-CUR-IM031005-001alt.jpg', playImage:'images/guadalajara-mexico-214x128-CUR-IM031005-001alt.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Guatemala City Guatemala', hide:'hide' , image: 'images/guatemala-city-guatemala-214x128-0001278s.jpg', playImage:'images/guatemala-city-guatemala-214x128-0001278s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Guayaquil Ecuador', hide:'hide' , image: 'images/guayaquil-ecuador-214x128-0002099.jpg', playImage:'images/guayaquil-ecuador-214x128-0002099.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Halifax Nova Scotia', hide:'hide' , image: 'images/halifax-nova-scotia-214x128-CU080407-001.jpg', playImage:'images/halifax-nova-scotia-214x128-CU080407-001.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Hamilton New Zealand', hide:'hide' , image: 'images/hamilton-new-zealand-214x128-CWD_100803_KRowley_005.jpg', playImage:'images/hamilton-new-zealand-214x128-CWD_100803_KRowley_005.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Helsinki Finland', hide:'hide' , image: 'images/helsinki-finland-214x128-AV061009_lp001.jpg', playImage:'images/helsinki-finland-214x128-AV061009_lp001.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Hermosillo Sonora Mexico', hide:'hide' , image: 'images/hermosillo-sonora-mexico-214x128-CU040825_ats02.jpg', playImage:'images/hermosillo-sonora-mexico-214x128-CU040825_ats02.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Hong Kong China', hide:'hide' , image: 'images/hong-kong-china-214x128-CWD_b24ba465.jpg', playImage:'images/hong-kong-china-214x128-CWD_b24ba465.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Houston Texas', hide:'hide' , image: 'images/houston-texas-214x128-CWD_567d8302.jpg', playImage:'images/houston-texas-214x128-CWD_567d8302.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Idaho Falls Idaho', hide:'hide' , image: 'images/idaho-falls-idaho-214x128-0001581s.jpg', playImage:'images/idaho-falls-idaho-214x128-0001581s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Johannesburg South Africa', hide:'hide' , image: 'images/johannesburg-south-africa-214x128-AV071029cah001.jpg', playImage:'images/johannesburg-south-africa-214x128-AV071029cah001.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Jordan River Utah', hide:'hide' , image: 'images/jordan-river-utah-214x128-0001762.jpg', playImage:'images/jordan-river-utah-214x128-0001762.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Kansas City Missouri', hide:'hide' , image: 'images/kansas-city-missouri-214x128-CU100524_jlm01.jpg', playImage:'images/kansas-city-missouri-214x128-CU100524_jlm01.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'Kona Hawaii', hide:'hide' , image: 'images/kona-hawaii-214x128-0001985.jpg', playImage:'images/kona-hawaii-214x128-0001985.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Kyiv Ukraine', hide:'hide' , image: 'images/kyiv-ukraine-214x128-CU101029_bkf020alt.jpg', playImage:'images/kyiv-ukraine-214x128-CU101029_bkf020alt.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Laie Hawaii', hide:'hide' , image: 'images/laie-hawaii-214x128-CWD_101022_DNorthrup.jpg', playImage:'images/laie-hawaii-214x128-CWD_101022_DNorthrup.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Las Vegas Nevada', hide:'hide' , image: 'images/las-vegas-nevada-214x128-0001776.jpg', playImage:'images/las-vegas-nevada-214x128-0001776.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Lima Peru', hide:'hide' , image: 'images/lima-peru-214x128-0001583.jpg', playImage:'images/lima-peru-214x128-0001583.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Logan Utah', hide:'hide' , image: 'images/logan-utah-214x128-CWD_101025_JOlson.jpg', playImage:'images/logan-utah-214x128-CWD_101025_JOlson.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'London England', hide:'hide' , image: 'images/london-england-214x128-CU091030_bkf01.jpg', playImage:'images/london-england-214x128-CU091030_bkf01.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Los Angeles California', hide:'hide' , image: 'images/los-angeles-california-214x128-CWD_d038c40e.jpg', playImage:'images/los-angeles-california-214x128-CWD_d038c40e.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Louisville Kentucky', hide:'hide' , image: 'images/louisville-kentucky-214x128-0001947s.jpg', playImage:'images/louisville-kentucky-214x128-0001947s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Lubbock Texas', hide:'hide' , image: 'images/lubbock-texas-214x128-LubbockTexasTmpl.jpg', playImage:'images/lubbock-texas-214x128-LubbockTexasTmpl.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Madrid Spain', hide:'hide' , image: 'images/madrid-spain-214x128-0002011s.jpg', playImage:'images/madrid-spain-214x128-0002011s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Manaus Brazil', hide:'hide' , image: 'images/manaus-brazil-214x128-CU071102_sm01.jpg', playImage:'images/manaus-brazil-214x128-CU071102_sm01.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Manhattan New York', hide:'hide' , image: 'images/manhattan-new-york-214x128-AV051230_cah005.jpg', playImage:'images/manhattan-new-york-214x128-AV051230_cah005.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Manila Philippines', hide:'hide' , image: 'images/manila-philippines-214x128-0001275s.jpg', playImage:'images/manila-philippines-214x128-0001275s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Manti Utah', hide:'hide' , image: 'images/manti-utah-214x128-0001882.jpg', playImage:'images/manti-utah-214x128-0001882.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Medford Oregon', hide:'hide' , image: 'images/medford-oregon-214x128-CUR_IM030916-002.jpg', playImage:'images/medford-oregon-214x128-CUR_IM030916-002.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Melbourne Australia', hide:'hide' , image: 'images/melbourne-australia-214x128-0002059.jpg', playImage:'images/melbourne-australia-214x128-0002059.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Memphis Tennessee', hide:'hide' , image: 'images/memphis-tennessee-214x128-0002090.jpg', playImage:'images/memphis-tennessee-214x128-0002090.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Mérida Mexico', hide:'hide' , image: 'images/merida-mexico-214x128-0002062.jpg', playImage:'images/merida-mexico-214x128-0002062.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Mesa Arizona', hide:'hide' , image: 'images/mesa-arizona-214x128-0001145salt.jpg', playImage:'images/mesa-arizona-214x128-0001145salt.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'Mexico City Mexico', hide:'hide' , image: 'images/mexico-city-mexico-214x128-AV081029_cah009.jpg', playImage:'images/mexico-city-mexico-214x128-AV081029_cah009.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Monterrey Mexico', hide:'hide' , image: 'images/monterrey-mexico-214x128-MonterreyMexicoTmplalt.jpg', playImage:'images/monterrey-mexico-214x128-MonterreyMexicoTmplalt.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Montevideo Uruguay', hide:'hide' , image: 'images/montevideo-uruguay-214x128-0002055.jpg', playImage:'images/montevideo-uruguay-214x128-0002055.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Monticello Utah', hide:'hide' , image: 'images/monticello-utah-214x128-0001878.jpg', playImage:'images/monticello-utah-214x128-0001878.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Montreal Quebec', hide:'hide' , image: 'images/montreal-quebec-214x128-0002017.jpg', playImage:'images/montreal-quebec-214x128-0002017.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Mount Timpanogos Utah', hide:'hide' , image: 'images/mount-timpanogos-utah-214x128-CWD_c8d714c9.jpg', playImage:'images/mount-timpanogos-utah-214x128-CWD_c8d714c9.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Nashville Tennessee', hide:'hide' , image: 'images/nashville-tennessee-214x128-0002014.jpg', playImage:'images/nashville-tennessee-214x128-0002014.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Nauvoo Illinois', hide:'hide' , image: 'images/nauvoo-illinois-214x128-CWD_091410_JArnesen.jpg', playImage:'images/nauvoo-illinois-214x128-CWD_091410_JArnesen.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Newport Beach California', hide:'hide' , image: 'images/newport-beach-california-214x128-N6LCA19C.jpg', playImage:'images/newport-beach-california-214x128-N6LCA19C.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Nuku alofa Tonga', hide:'hide' , image: 'images/nukualofa-tonga-214x128-AV071009cah066.jpg', playImage:'images/nukualofa-tonga-214x128-AV071009cah066.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Oakland California', hide:'hide' , image: 'images/oakland-california-214x128-0001569s.jpg', playImage:'images/oakland-california-214x128-0001569s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Oaxaca Mexico', hide:'hide' , image: 'images/oaxaca-mexico-214x128-0002053.jpg', playImage:'images/oaxaca-mexico-214x128-0002053.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Ogden Utah', hide:'hide' , image: 'images/ogden-utah-214x128-rendering.jpg', playImage:'images/ogden-utah-214x128-rendering.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Oklahoma City Oklahoma', hide:'hide' , image: 'images/oklahoma-city-oklahoma-214x128-CU031114-002.jpg', playImage:'images/oklahoma-city-oklahoma-214x128-CU031114-002.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Oquirrh Mountain Utah', hide:'hide' , image: 'images/oquirrh-mountain-utah-214x128-AV090428keh009sm.jpg', playImage:'images/oquirrh-mountain-utah-214x128-AV090428keh009sm.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Orlando Florida', hide:'hide' , image: 'images/orlando-florida-214x128-CWD_110208_RHLaw.jpg', playImage:'images/orlando-florida-214x128-CWD_110208_RHLaw.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Palmyra New York', hide:'hide' , image: 'images/palmyra-new-york-214x128-CWD_110208_RHLaw_24.jpg', playImage:'images/palmyra-new-york-214x128-CWD_110208_RHLaw_24.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Panama City Panama', hide:'hide' , image: 'images/panama-city-panama-214x128-AV080808_cah003.jpg', playImage:'images/panama-city-panama-214x128-AV080808_cah003.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Papeete Tahiti', hide:'hide' , image: 'images/papeete-tahiti-214x128-CU060516_sm001.jpg', playImage:'images/papeete-tahiti-214x128-CU060516_sm001.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Payson Utah', hide:'hide' , image: 'images/payson-utah-214x128-rendering.jpg', playImage:'images/payson-utah-214x128-rendering.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'Perth Australia', hide:'hide' , image: 'images/perth-australia-214x128-0002056.jpg', playImage:'images/perth-australia-214x128-0002056.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Philadelphia Pennsylvania', hide:'hide' , image: 'images/philadelphia-pennsylvania-214x128-rendering.jpg', playImage:'images/philadelphia-pennsylvania-214x128-rendering.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Phoenix Arizona', hide:'hide' , image: 'images/phoenix-arizona-214x128-CU100818_bkf06.jpg', playImage:'images/phoenix-arizona-214x128-CU100818_bkf06.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Portland Oregon', hide:'hide' , image: 'images/portland-oregon-214x128-CWD_091310_RKashow.jpg', playImage:'images/portland-oregon-214x128-CWD_091310_RKashow.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Porto Alegre Brazil', hide:'hide' , image: 'images/porto-alegre-brazil-214x128-0002013alt.jpg', playImage:'images/porto-alegre-brazil-214x128-0002013alt.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Preston England', hide:'hide' , image: 'images/preston-england-214x128-0001851.jpg', playImage:'images/preston-england-214x128-0001851.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Provo Utah', hide:'hide' , image: 'images/provo-utah-214x128-AV090827cah001.jpg', playImage:'images/provo-utah-214x128-AV090827cah001.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Quetzaltenango Guatemala', hide:'hide' , image: 'images/quetzaltenango-guatemala-214x128-AV110927_cah258alt.jpg', playImage:'images/quetzaltenango-guatemala-214x128-AV110927_cah258alt.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Raleigh North Carolina', hide:'hide' , image: 'images/raleigh-north-carolina-214x128-0001986.jpg', playImage:'images/raleigh-north-carolina-214x128-0001986.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Recife Brazil', hide:'hide' , image: 'images/recife-brazil-214x128-AV100326cah039.jpg', playImage:'images/recife-brazil-214x128-AV100326cah039.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Redlands California', hide:'hide' , image: 'images/redlands-california-214x128-CWD_100817_MPeterson_004.jpg', playImage:'images/redlands-california-214x128-CWD_100817_MPeterson_004.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Regina Saskatchewan', hide:'hide' , image: 'images/regina-saskatchewan-214x128-0002098.jpg', playImage:'images/regina-saskatchewan-214x128-0002098.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Reno Nevada', hide:'hide' , image: 'images/reno-nevada-214x128-CU031112-006.jpg', playImage:'images/reno-nevada-214x128-CU031112-006.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Rexburg Idaho', hide:'hide' , image: 'images/rexburg-idaho-214x128-CWD_101106_RWooley_008.jpg', playImage:'images/rexburg-idaho-214x128-CWD_101106_RWooley_008.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Rome Italy', hide:'hide' , image: 'images/rome-italy-214x128-CU101008_jlm02_Rome.jpg', playImage:'images/rome-italy-214x128-CU101008_jlm02_Rome.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Sacramento California', hide:'hide' , image: 'images/sacramento-california-214x128-CWD_101006_APerson_003.jpg', playImage:'images/sacramento-california-214x128-CWD_101006_APerson_003.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Salt Lake', hide:'hide' , image: 'images/salt-lake-214x128-SLTEMPLEKIOSK2.jpg', playImage:'images/salt-lake-214x128-SLTEMPLEKIOSK2.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'San Antonio Texas', hide:'hide' , image: 'images/san-antonio-texas-214x128-CU061214_bkf02.jpg', playImage:'images/san-antonio-texas-214x128-CU061214_bkf02.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'San Diego California', hide:'hide' , image: 'images/san-diego-california-214x128-CWD_7c8cb6ac.jpg', playImage:'images/san-diego-california-214x128-CWD_7c8cb6ac.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'San José Costa Rica', hide:'hide' , image: 'images/san-jose-costa-rica-214x128-0002091.jpg', playImage:'images/san-jose-costa-rica-214x128-0002091.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'San Salvador El Salvador', hide:'hide' , image: 'images/san-salvador-el-salvador-214x128-AV110624_cah117.jpg', playImage:'images/san-salvador-el-salvador-214x128-AV110624_cah117.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Santiago Chile', hide:'hide' , image: 'images/santiago-chile-214x128-060119_sm001.jpg', playImage:'images/santiago-chile-214x128-060119_sm001.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Santo Domingo Dominican Republic', hide:'hide' , image: 'images/santo-domingo-dominican-republic-214x128-L3DIMC16B.jpg', playImage:'images/santo-domingo-dominican-republic-214x128-L3DIMC16B.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'São Paulo Brazil', hide:'hide' , image: 'images/sao-paulo-brazil-214x128-CU050202_ats01.jpg', playImage:'images/sao-paulo-brazil-214x128-CU050202_ats01.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Seattle Washington', hide:'hide' , image: 'images/seattle-washington-214x128-0001671.jpg', playImage:'images/seattle-washington-214x128-0001671.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Seoul Korea', hide:'hide' , image: 'images/seoul-korea-214x128-AV070727_cah001extalt.jpg', playImage:'images/seoul-korea-214x128-AV070727_cah001extalt.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Snowflake Arizona', hide:'hide' , image: 'images/snowflake-arizona-214x128-CWD_ec6b9cbe.jpg', playImage:'images/snowflake-arizona-214x128-CWD_ec6b9cbe.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Spokane Washington', hide:'hide' , image: 'images/spokane-washington-214x128-CU100727_bkf01.jpg', playImage:'images/spokane-washington-214x128-CU100727_bkf01.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'St. George Utah', hide:'hide' , image: 'images/st-george-utah-214x128-AV050916_cah010.jpg', playImage:'images/st-george-utah-214x128-AV050916_cah010.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'St. Louis Missouri', hide:'hide' , image: 'images/st-louis-missouri-214x128-CWD_139bc26f.jpg', playImage:'images/st-louis-missouri-214x128-CWD_139bc26f.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'St. Paul Minnesota', hide:'hide' , image: 'images/st-paul-minnesota-214x128-0001987.jpg', playImage:'images/st-paul-minnesota-214x128-0001987.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Stockholm Sweden', hide:'hide' , image: 'images/stockholm-sweden-214x128-0001193s.jpg', playImage:'images/stockholm-sweden-214x128-0001193s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Suva Fiji', hide:'hide' , image: 'images/suva-fiji-214x128-AV060324_cah046.jpg', playImage:'images/suva-fiji-214x128-AV060324_cah046.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Sydney Australia', hide:'hide' , image: 'images/sydney-australia-214x128-0001568.jpg', playImage:'images/sydney-australia-214x128-0001568.jpg',  foundBy:false,  matched:"notMatched" },

  {name:'Taipei Taiwan', hide:'hide' , image: 'images/taipei-taiwan-214x128-0001199s.jpg', playImage:'images/taipei-taiwan-214x128-0001199s.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Tampico Mexico', hide:'hide' , image: 'images/tampico-mexico-214x128-TampicoMexicoTmpl-1.jpg', playImage:'images/tampico-mexico-214x128-TampicoMexicoTmpl-1.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Tegucigalpa Honduras', hide:'hide' , image: 'images/tegucigalpa-honduras-214x128-CU070830_sm03.jpg', playImage:'images/tegucigalpa-honduras-214x128-CU070830_sm03.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'The Gila Valley Arizona', hide:'hide' , image: 'images/the-gila-valley-arizona-214x128-AV100419cah036.jpg', playImage:'images/the-gila-valley-arizona-214x128-AV100419cah036.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'The Hague Netherlands', hide:'hide' , image: 'images/the-hague-netherlands-214x128-CU061005_sm001.jpg', playImage:'images/the-hague-netherlands-214x128-CU061005_sm001.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Tokyo Japan', hide:'hide' , image: 'images/tokyo-japan-214x128-CU100722_bkf02.jpg', playImage:'images/tokyo-japan-214x128-CU100722_bkf02.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Toronto Ontario', hide:'hide' , image: 'images/toronto-ontario-214x128-0001001.jpg', playImage:'images/toronto-ontario-214x128-0001001.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Trujillo Peru', hide:'hide' , image: 'images/trujillo-peru-214x128-rendering.jpg', playImage:'images/trujillo-peru-214x128-rendering.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Tuxtla Gutiérrez Mexico', hide:'hide' , image: 'images/tuxtla-gutierrez-mexico-214x128-0002097.jpg', playImage:'images/tuxtla-gutierrez-mexico-214x128-0002097.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Twin Falls Idaho', hide:'hide' , image: 'images/twin-falls-idaho-214x128-CU080605_bkf01.jpg', playImage:'images/twin-falls-idaho-214x128-CU080605_bkf01.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Vancouver British Columbia', hide:'hide' , image: 'images/vancouver-british-columbia-214x128-CWD_091310_SDavis_003.jpg', playImage:'images/vancouver-british-columbia-214x128-CWD_091310_SDavis_003.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Veracruz Mexico', hide:'hide' , image: 'images/veracruz-mexico-214x128-0002092.jpg', playImage:'images/veracruz-mexico-214x128-0002092.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Vernal Utah', hide:'hide' , image: 'images/vernal-utah-214x128-0001003.jpg', playImage:'images/vernal-utah-214x128-0001003.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Villahermosa Mexico', hide:'hide' , image: 'images/villahermosa-mexico-214x128-0002063.jpg', playImage:'images/villahermosa-mexico-214x128-0002063.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Washington D.C.', hide:'hide' , image: 'images/washington-dc-214x128-0001505.jpg', playImage:'images/washington-dc-214x128-0001505.jpg',  foundBy:false,  matched:"notMatched" },
  {name:'Winter Quarters Nebraska', hide:'hide' , image: 'images/winter-quarters-nebraska-214x128-CWD_101013_MPalmer.jpg', playImage:'images/winter-quarters-nebraska-214x128-CWD_101013_MPalmer.jpg',  foundBy:false,  matched:"notMatched" }

];

for (var i=0; i < temples.length; i++) {
  temples[i].index = i;
}

var scores = [{name:'Arnold', count:1}];

var chats = [
//  {name:'Arnold', message:"Hello"},
//  {name:'Betty', message:"How are you ?"}
];

var localPage;

var templeModel = function(page, model) {
  console.log(model.get());
  return model.subscribe('state', function(err, state) {
    state.setNull('temples', temples)
    state.setNull('scores', scores)
    state.setNull('chats', chats)
    state.setNull('color', 'Purple')
    state.setNull('myScore', 0);
    state.setNull('teamScore', 0)
    state.setNull('individualScores', 0)
    localPage = page;
    page.render()
  })

};

var chatModel = function(page, model) {
  //  if (!(room && /^[-\w ]+$/.test(room))) {
//    return page.redirect('/lobby');
//  }
//  roomName = room.toLowerCase().replace(/[_ ]/g, '-');
//  if (roomName !== room) {
//    return page.redirect("/" + roomName);
//  }
  var roomName = "lobby";
  var room = "lobby";
  return model.subscribe("rooms." + roomName, 'users', function(err, room, users) {
    var userId;
    model.ref('_room', room);
    userId = model.get('_userId');
    model.ref('_user', users.at(userId));
    if (users.get(userId)) {
      return render(page, model);
    }
    return model.async.incr('config.chat.userCount', function(err, userCount) {
      users.set(userId, {
        name: 'User ' + userCount
      });
      return render(page, model);
    });
  });

}



get('/', templeModel);
get('/chat', chatModel);
get('/play', templeModel);


//var animateSuccess = function ($li) {
//  var $img = $(".temple-image", $li);
//
//  $img.attr('src', 'images/success.jpg');
//  $li.animate({
//    width: ['toggle', 'swing'],
//    height: ['toggle', 'swing'],
//    opacity: 'toggle'
//  }, 4000, 'linear', function() {
//    $li.css('opacity', '');
//    $li.css('width', '');
//    $li.css('height', '');
//
////    localModel.remove('state.temples.' + $li.attr("index"));
////    $li.remove();
//  });
//
//};

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
  var $link = $($(e.target).parent());
  if (textMatches($link, $(e.target).val()) ||
      textMatches($link, $(e.target).val())) {
    updateStateFromLink($link);
//    animateSuccess($link);
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

var myName = "";

var getScore = function (name, scores) {
  if (scores) {
    for (var i=0;i< scores.length;i++) {
      if (scores[i].name === name) {
        return scores[i].name;
      }
    }
  }
  return null;
}

var incrementScore = function(name) {
  var score = localModel.get(name);

  if (score) {
    console.log('increment score for ' + name + ' from '  + score + ' to ' + (score + 1) ) ;
    localModel.set(name, score + 1);
  } else {
    console.log('initializing new score for ' + name + ' to 1' ) ;
    localModel.set(name, 1);
  }

  $('.hero-unit h2').text("My Score: " + localModel.get(name));

};

var myScore = 0;

var updateTemple = function(templeState) {
  var path;
  var scores;
  console.log('updateTemple:' + JSON.stringify(templeState));
  if (templeState && templeState.index) {
    path = 'state.temples.' + templeState.index;
        console.log('Setting Temples.state[' + templeState.index + '] to ' + JSON.stringify(templeState));
//    temples[templeState.index] = templeState;
//    localModel.set('temples', temples);
    myScore +=1;
    localModel.set('state.teamScore', localModel.get('state.teamScore') + 1 )
    localModel.set('state.myScore', myScore);
    localModel.set('state.scores', scores);
    localModel.set(path, templeState);
//    localModel.set(path + ".matched", templeState.matched);
//    localPage.render();
  }
}


var updateStateFromLink = function ($link) {
  var temple = {},
      $img = $('img.temple-image', $link);
  temple.hide = ""
  temple.name = $img.data('name');
  temple.index = $link.attr('index');
  temple.image = $img.attr('src');
  temple.playImage = "images/success.jpg";
  temple.foundBy = 'Found by ' + myName;
  temple.matched = 'matched';

  console.log('updateStateFromLink:' + JSON.stringify(temple));

  // set the model for this new temple status
  incrementScore(myName)
  updateTemple(temple);

}

var addName = function (newName) {
 var score = getScore(newName);

 if (!score) {
   console.log('initializing new score for ' + newName + ' to 0' ) ;
   scores.push([{name:newName, count: 0}]);
 }
}

var localModel;


app.ready(function(model) {
  console.log("ready");
  localModel = model;
  myName = prompt("What's your name ?", "");
  console.log("name:" + myName);
  app.on('create:testModal', function(modal) {
    modal.on('close', function(action, cancel) {
      if (!window.confirm('Action: ' + action + '\n\nContinue to close?')) {
        cancel()
      }
    })

  })
  app.showModal = function() {
    model.set('_showModal', true)
  },

  app.checkForMatch = function (e) {
    checkForMatch(e);
  }

  ///////////////////////////////////////////
  var atBottom, displayTime, messageList, messages, months;
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  displayTime = function(time) {
    var hours, minutes, period;
    time = new Date(time);
    hours = time.getHours();
    period = hours < 12 ? ' am, ' : ' pm, ';
    hours = (hours % 12) || 12;
    minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes + period + months[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear();
  };
  this.on('render', function() {
    var i, message, _i, _len, _ref1, _results;
    _ref1 = model.get('_room.messages');
    _results = [];
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      message = _ref1[i];
      _results.push(model.set("_room.messages." + i + "._displayTime", displayTime(message.time)));
    }
    return _results;
  });
  model.set('_showReconnect', true);
  exports.connect = function() {
    model.set('_showReconnect', false);
    setTimeout((function() {
      return model.set('_showReconnect', true);
    }), 1000);
    return model.socket.socket.connect();
  };
  exports.reload = function() {
    return window.location.reload();
  };
  messages = document.getElementById('messages');
  messageList = document.getElementById('messageList');
  atBottom = true;
  model.on('pre:push', '_room.messages', function() {
    var bottom, containerHeight, scrollBottom;
    bottom = messageList.offsetHeight;
    containerHeight = messages.offsetHeight;
    scrollBottom = messages.scrollTop + containerHeight;
    return atBottom = bottom < containerHeight || scrollBottom === bottom;
  });
  model.on('push', '_room.messages', function(message, len, isLocal) {
    if (isLocal || atBottom) {
      messages.scrollTop = messageList.offsetHeight;
    }
    return model.set("_room.messages." + (len - 1) + "._displayTime", displayTime(message.time));
  });
  return exports.postMessage = function() {
    model.push('_room.messages', {
      userId: model.get('_userId'),
      comment: model.get('_newComment'),
      time: +(new Date)
    });
    return model.set('_newComment', '');
  };



})
