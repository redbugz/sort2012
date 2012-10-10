var express = require('express');

var app = express.createServer();

// Configure express
app.set('views', __dirname + '/views');

// Use ejs templating
app.set('view engine', 'ejs');

// setup the less compiler
app.use(express.compiler({ src : __dirname + '/public', enable: ['less']}));

// static serving of files from the public directory
app.use(express.static(__dirname + '/public'));

// Setup subnav routes allow the app to load the play, chat or both
app.get('/', function(req, res){
  res.render('index', {locals: {
    title: 'NowJS'
  }});
});

app.get('/temple-state', function(req, res){
  res.render('temple-state', {locals: {
    title: 'NowJS'
  }});
});

app.get('/chat', function(req, res){
  res.render('chat', {locals: {
    title: 'NowJS'
  }});
});

app.get('/play', function(req, res){
  res.render('play', {locals: {
    title: 'NowJS'
  }});
});

app.listen(8080);
console.log("Express server listening on port %d", app.address().port);

// Default values for temple data
var temples = [
  {name:'Aba Nigeria', image:'images/aba-nigeria-214x128-050816_jrn013.jpg', status:'UNIDENTIFIED'},
  {name:'Accra Ghana', image:'images/accra-ghana-214x128-050816_jrn009.jpg', status:'UNIDENTIFIED'},
  {name:'Adelaide Australia', image: 'images/adelaide-australia-214x128-CWD_bac3d5b5.jpg', status:'UNIDENTIFIED'},
  {name:'Albuquerque New Mexico', image: 'images/albuquerque-new-mexico-214x128-CU031224-002.jpg', status:'UNIDENTIFIED'},
  {name:'Anchorage Alaska', image: 'images/anchorage-alaska-214x128-av050816_jrn022.jpg', status:'UNIDENTIFIED'},
  {name:'Apia Samoa', image: 'images/apia-samoa-214x128-AV071129cah035.jpg', status:'UNIDENTIFIED'},
  {name:'Asunción Paraguay', image: 'images/asuncion_paraguay-214x128-AV060103_cah012.jpg', status:'UNIDENTIFIED'},
  {name:'Atlanta Georgia', image: 'images/atlanta-georgia-214x128-AV110301cah0038.jpg', status:'UNIDENTIFIED'},
  {name:'Baton Rouge Louisiana', image: 'images/baton-rouge-louisiana-214x128-0002060.jpg', status:'UNIDENTIFIED'},
  {name:'Bern Switzerland', image: 'images/bern-switzerland-214x128-CWD_091110_CWills_007.jpg', status:'UNIDENTIFIED'},
  {name:'Billings Montana', image: 'images/billings-montana-214x128-CU091208_bkf01.jpg', status:'UNIDENTIFIED'},
  {name:'Birmingham Alabama', image: 'images/birmingham-alabama-214x128-0002061.jpg', status:'UNIDENTIFIED'},
  {name:'Bismarck North Dakota', image: 'images/bismarck-north-dakota-214x128-0002102.jpg', status:'UNIDENTIFIED'},
  {name:'Bogotá Colombia', image: 'images/bogota-colombia-214x128-0002101.jpg', status:'UNIDENTIFIED'},
  {name:'Boise Idaho', image: 'images/boise-id-temple-214x128.jpg', status:'UNIDENTIFIED'},
  {name:'Boston Massachusetts', image: 'images/boston-massachusetts-214x128-0001988.jpg', status:'UNIDENTIFIED'},
  {name:'Bountiful Utah', image: 'images/bountiful-utah-214x128-0001681.jpg', status:'UNIDENTIFIED'},
  {name:'Brisbane Australia', image: 'images/brisbane-australia-214x128-CU080604_bkf01ext.jpg', status:'UNIDENTIFIED'},
  {name:'Buenos Aires Argentina', image: 'images/buenos-aires-argentina-214x128-0001281.jpg', status:'UNIDENTIFIED'},
  {name:'Calgary Alberta', image: 'images/calgary-alberta-214x128-CU100212_jlm01.jpg', status:'UNIDENTIFIED'},
  {name:'Campinas Brazil', image: 'images/campinas-brazil-214x128-CU050202_ats03.jpg', status:'UNIDENTIFIED'},
  {name:'Caracas Venezuela', image: 'images/caracas-venezuela-214x128-0002093alt.jpg', status:'UNIDENTIFIED'},
  {name:'Cardston Alberta', image: 'images/cardston-alberta-214x128-VRL_68149_4845006.jpg', status:'UNIDENTIFIED'},
  {name:'Cebu City Philippines', image: 'images/cebu-philippines-214x128-AV100419cah007.jpg', status:'UNIDENTIFIED'},
  {name:'Chicago Illinois', image: 'images/chicago-illinois-214x128-CHICAGODAS97.jpg', status:'UNIDENTIFIED'},
  {name:'Ciudad Juárez Mexico', image: 'images/ciudad-juarez-mexico-214x128-CUR_IM030924-004.jpg', status:'UNIDENTIFIED'},
  {name:'Cochabamba Bolivia', image: 'images/cochabamba-bolivia-214-128-0002054s.jpg', status:'UNIDENTIFIED'},
  {name:'Colonia Juárez Chihuahua Mexico', image: 'images/colonia-jurez-chihuahua-mexico-214x128-CUR_IM030924.jpg', status:'UNIDENTIFIED'},
  {name:'Columbia River Washington', image: 'images/columbia-river-washington-214x128-0075835.jpg', status:'UNIDENTIFIED'},
  {name:'Columbia South Carolina', image: 'images/columbia-south-carolina-214x128-CWD_091710_MJennings.jpg', status:'UNIDENTIFIED'},
  {name:'Columbus Ohio', image: 'images/columbus-ohio-214x128-CU070521_bkf01.jpg', status:'UNIDENTIFIED'},

  {name:'Copenhagen Denmark', image: 'images/copenhagen-denmark-214x128-AV060609_vmh9424.jpg', status:'UNIDENTIFIED'},
  {name:'Córdoba Argentina', image: 'images/cordoba-argentina-214x128-CU101008_jlm03.jpg', status:'UNIDENTIFIED'},
  {name:'Curitiba Brazil', image: 'images/curitiba-brazil-214-128-AV080605_cah006.jpg', status:'UNIDENTIFIED'},
  {name:'Dallas Texas', image: 'images/dallas-texas-214x128-0001742.jpg', status:'UNIDENTIFIED'},
  {name:'Denver Colorado', image: 'images/denver-colorado-214x128-CWD_091610_JPlotz.jpg', status:'UNIDENTIFIED'},
  {name:'Detroit Michigan', image: 'images/detroit-michigan-214x128-0002100.jpg', status:'UNIDENTIFIED'},
  {name:'Draper Utah', image: 'images/draper-utah-214x128-AV0812015cah016alt.jpg', status:'UNIDENTIFIED'},
  {name:'Edmonton Alberta', image: 'images/edmonton-alberta-214x128-0001924.jpg', status:'UNIDENTIFIED'},
  {name:'Fort Lauderdale Florida', image: 'images/fort-lauderdale-214x128-rendering-approved.jpg', status:'UNIDENTIFIED'},
  {name:'Frankfurt Germany', image: 'images/frankfurt-germany-214x128-0001277s.jpg', status:'UNIDENTIFIED'},
  {name:'Freiberg Germany', image: 'images/freiberg-germany-214x128-CU091007_bkf01.jpg', status:'UNIDENTIFIED'},
  {name:'Fresno California', image: 'images/fresno-california-214x128-CUR_IM030916-001alt.jpg', status:'UNIDENTIFIED'},
  {name:'Fukuoka Japan', image: 'images/fukuoka-japan-214x128-0001842s.jpg', status:'UNIDENTIFIED'},
  {name:'Gilbert Arizona', image: 'images/gilbert-arizona-214x128-CU101008_jlm04.jpg', status:'UNIDENTIFIED'},
  {name:'Guadalajara Mexico', image: 'images/guadalajara-mexico-214x128-CUR-IM031005-001alt.jpg', status:'UNIDENTIFIED'},
  {name:'Guatemala City Guatemala', image: 'images/guatemala-city-guatemala-214x128-0001278s.jpg', status:'UNIDENTIFIED'},
  {name:'Guayaquil Ecuador', image: 'images/guayaquil-ecuador-214x128-0002099.jpg', status:'UNIDENTIFIED'},
  {name:'Halifax Nova Scotia', image: 'images/halifax-nova-scotia-214x128-CU080407-001.jpg', status:'UNIDENTIFIED'},
  {name:'Hamilton New Zealand', image: 'images/hamilton-new-zealand-214x128-CWD_100803_KRowley_005.jpg', status:'UNIDENTIFIED'},

  {name:'Helsinki Finland', image: 'images/helsinki-finland-214x128-AV061009_lp001.jpg', status:'UNIDENTIFIED'},
  {name:'Hermosillo Sonora Mexico', image: 'images/hermosillo-sonora-mexico-214x128-CU040825_ats02.jpg', status:'UNIDENTIFIED'},
  {name:'Hong Kong China', image: 'images/hong-kong-china-214x128-CWD_b24ba465.jpg', status:'UNIDENTIFIED'},
  {name:'Houston Texas', image: 'images/houston-texas-214x128-CWD_567d8302.jpg', status:'UNIDENTIFIED'},
  {name:'Idaho Falls Idaho', image: 'images/idaho-falls-idaho-214x128-0001581s.jpg', status:'UNIDENTIFIED'},

  {name:'Johannesburg South Africa', image: 'images/johannesburg-south-africa-214x128-AV071029cah001.jpg', status:'UNIDENTIFIED'},
  {name:'Jordan River Utah', image: 'images/jordan-river-utah-214x128-0001762.jpg', status:'UNIDENTIFIED'},
  {name:'Kansas City Missouri', image: 'images/kansas-city-missouri-214x128-CU100524_jlm01.jpg', status:'UNIDENTIFIED'},
  {name:'Kona Hawaii', image: 'images/kona-hawaii-214x128-0001985.jpg', status:'UNIDENTIFIED'},
  {name:'Kyiv Ukraine', image: 'images/kyiv-ukraine-214x128-CU101029_bkf020alt.jpg', status:'UNIDENTIFIED'},
  {name:'Laie Hawaii', image: 'images/laie-hawaii-214x128-CWD_101022_DNorthrup.jpg', status:'UNIDENTIFIED'},
  {name:'Las Vegas Nevada', image: 'images/las-vegas-nevada-214x128-0001776.jpg', status:'UNIDENTIFIED'},
  {name:'Lima Peru', image: 'images/lima-peru-214x128-0001583.jpg', status:'UNIDENTIFIED'},

  {name:'Logan Utah', image: 'images/logan-utah-214x128-CWD_101025_JOlson.jpg', status:'UNIDENTIFIED'},
  {name:'London England', image: 'images/london-england-214x128-CU091030_bkf01.jpg', status:'UNIDENTIFIED'},
  {name:'Los Angeles California', image: 'images/los-angeles-california-214x128-CWD_d038c40e.jpg', status:'UNIDENTIFIED'},
  {name:'Louisville Kentucky', image: 'images/louisville-kentucky-214x128-0001947s.jpg', status:'UNIDENTIFIED'},
  {name:'Lubbock Texas', image: 'images/lubbock-texas-214x128-LubbockTexasTmpl.jpg', status:'UNIDENTIFIED'},
  {name:'Madrid Spain', image: 'images/madrid-spain-214x128-0002011s.jpg', status:'UNIDENTIFIED'},
  {name:'Manaus Brazil', image: 'images/manaus-brazil-214x128-CU071102_sm01.jpg', status:'UNIDENTIFIED'},
  {name:'Manhattan New York', image: 'images/manhattan-new-york-214x128-AV051230_cah005.jpg', status:'UNIDENTIFIED'},
  {name:'Manila Philippines', image: 'images/manila-philippines-214x128-0001275s.jpg', status:'UNIDENTIFIED'},
  {name:'Manti Utah', image: 'images/manti-utah-214x128-0001882.jpg', status:'UNIDENTIFIED'},
  {name:'Medford Oregon', image: 'images/medford-oregon-214x128-CUR_IM030916-002.jpg', status:'UNIDENTIFIED'},
  {name:'Melbourne Australia', image: 'images/melbourne-australia-214x128-0002059.jpg', status:'UNIDENTIFIED'},
  {name:'Memphis Tennessee', image: 'images/memphis-tennessee-214x128-0002090.jpg', status:'UNIDENTIFIED'},
  {name:'Mérida Mexico', image: 'images/merida-mexico-214x128-0002062.jpg', status:'UNIDENTIFIED'},
  {name:'Mesa Arizona', image: 'images/mesa-arizona-214x128-0001145salt.jpg', status:'UNIDENTIFIED'},
  {name:'Mexico City Mexico', image: 'images/mexico-city-mexico-214x128-AV081029_cah009.jpg', status:'UNIDENTIFIED'},
  {name:'Monterrey Mexico', image: 'images/monterrey-mexico-214x128-MonterreyMexicoTmplalt.jpg', status:'UNIDENTIFIED'},
  {name:'Montevideo Uruguay', image: 'images/montevideo-uruguay-214x128-0002055.jpg', status:'UNIDENTIFIED'},
  {name:'Monticello Utah', image: 'images/monticello-utah-214x128-0001878.jpg', status:'UNIDENTIFIED'},
  {name:'Montreal Quebec', image: 'images/montreal-quebec-214x128-0002017.jpg', status:'UNIDENTIFIED'},
  {name:'Mount Timpanogos Utah', image: 'images/mount-timpanogos-utah-214x128-CWD_c8d714c9.jpg', status:'UNIDENTIFIED'},
  {name:'Nashville Tennessee', image: 'images/nashville-tennessee-214x128-0002014.jpg', status:'UNIDENTIFIED'},
  {name:'Nauvoo Illinois', image: 'images/nauvoo-illinois-214x128-CWD_091410_JArnesen.jpg', status:'UNIDENTIFIED'},
  {name:'Newport Beach California', image: 'images/newport-beach-california-214x128-N6LCA19C.jpg', status:'UNIDENTIFIED'},
  {name:'Nuku alofa Tonga', image: 'images/nukualofa-tonga-214x128-AV071009cah066.jpg', status:'UNIDENTIFIED'},
  {name:'Oakland California', image: 'images/oakland-california-214x128-0001569s.jpg', status:'UNIDENTIFIED'},
  {name:'Oaxaca Mexico', image: 'images/oaxaca-mexico-214x128-0002053.jpg', status:'UNIDENTIFIED'},
  {name:'Ogden Utah', image: 'images/ogden-utah-214x128-rendering.jpg', status:'UNIDENTIFIED'},
  {name:'Oklahoma City Oklahoma', image: 'images/oklahoma-city-oklahoma-214x128-CU031114-002.jpg', status:'UNIDENTIFIED'},
  {name:'Oquirrh Mountain Utah', image: 'images/oquirrh-mountain-utah-214x128-AV090428keh009sm.jpg', status:'UNIDENTIFIED'},
  {name:'Orlando Florida', image: 'images/orlando-florida-214x128-CWD_110208_RHLaw.jpg', status:'UNIDENTIFIED'},
  {name:'Palmyra New York', image: 'images/palmyra-new-york-214x128-CWD_110208_RHLaw_24.jpg', status:'UNIDENTIFIED'},
  {name:'Panama City Panama', image: 'images/panama-city-panama-214x128-AV080808_cah003.jpg', status:'UNIDENTIFIED'},
  {name:'Papeete Tahiti', image: 'images/papeete-tahiti-214x128-CU060516_sm001.jpg', status:'UNIDENTIFIED'},
  {name:'Payson Utah', image: 'images/payson-utah-214x128-rendering.jpg', status:'UNIDENTIFIED'},
  {name:'Perth Australia', image: 'images/perth-australia-214x128-0002056.jpg', status:'UNIDENTIFIED'},
  {name:'Philadelphia Pennsylvania', image: 'images/philadelphia-pennsylvania-214x128-rendering.jpg', status:'UNIDENTIFIED'},
  {name:'Phoenix Arizona', image: 'images/phoenix-arizona-214x128-CU100818_bkf06.jpg', status:'UNIDENTIFIED'},
  {name:'Portland Oregon', image: 'images/portland-oregon-214x128-CWD_091310_RKashow.jpg', status:'UNIDENTIFIED'},
  {name:'Porto Alegre Brazil', image: 'images/porto-alegre-brazil-214x128-0002013alt.jpg', status:'UNIDENTIFIED'},
  {name:'Preston England', image: 'images/preston-england-214x128-0001851.jpg', status:'UNIDENTIFIED'},
  {name:'Provo Utah', image: 'images/provo-utah-214x128-AV090827cah001.jpg', status:'UNIDENTIFIED'},
  {name:'Quetzaltenango Guatemala', image: 'images/quetzaltenango-guatemala-214x128-AV110927_cah258alt.jpg', status:'UNIDENTIFIED'},
  {name:'Raleigh North Carolina', image: 'images/raleigh-north-carolina-214x128-0001986.jpg', status:'UNIDENTIFIED'},
  {name:'Recife Brazil', image: 'images/recife-brazil-214x128-AV100326cah039.jpg', status:'UNIDENTIFIED'},
  {name:'Redlands California', image: 'images/redlands-california-214x128-CWD_100817_MPeterson_004.jpg', status:'UNIDENTIFIED'},
  {name:'Regina Saskatchewan', image: 'images/regina-saskatchewan-214x128-0002098.jpg', status:'UNIDENTIFIED'},
  {name:'Reno Nevada', image: 'images/reno-nevada-214x128-CU031112-006.jpg', status:'UNIDENTIFIED'},
  {name:'Rexburg Idaho', image: 'images/rexburg-idaho-214x128-CWD_101106_RWooley_008.jpg', status:'UNIDENTIFIED'},
  {name:'Rome Italy', image: 'images/rome-italy-214x128-CU101008_jlm02_Rome.jpg', status:'UNIDENTIFIED'},
  {name:'Sacramento California', image: 'images/sacramento-california-214x128-CWD_101006_APerson_003.jpg', status:'UNIDENTIFIED'},
  {name:'Salt Lake', image: 'images/salt-lake-214x128-SLTEMPLEKIOSK2.jpg', status:'UNIDENTIFIED'},
  {name:'San Antonio Texas', image: 'images/san-antonio-texas-214x128-CU061214_bkf02.jpg', status:'UNIDENTIFIED'},
  {name:'San Diego California', image: 'images/san-diego-california-214x128-CWD_7c8cb6ac.jpg', status:'UNIDENTIFIED'},
  {name:'San José Costa Rica', image: 'images/san-jose-costa-rica-214x128-0002091.jpg', status:'UNIDENTIFIED'},
  {name:'San Salvador El Salvador', image: 'images/san-salvador-el-salvador-214x128-AV110624_cah117.jpg', status:'UNIDENTIFIED'},
  {name:'Santiago Chile', image: 'images/santiago-chile-214x128-060119_sm001.jpg', status:'UNIDENTIFIED'},
  {name:'Santo Domingo Dominican Republic', image: 'images/santo-domingo-dominican-republic-214x128-L3DIMC16B.jpg', status:'UNIDENTIFIED'},
  {name:'São Paulo Brazil', image: 'images/sao-paulo-brazil-214x128-CU050202_ats01.jpg', status:'UNIDENTIFIED'},
  {name:'Seattle Washington', image: 'images/seattle-washington-214x128-0001671.jpg', status:'UNIDENTIFIED'},
  {name:'Seoul Korea', image: 'images/seoul-korea-214x128-AV070727_cah001extalt.jpg', status:'UNIDENTIFIED'},
  {name:'Snowflake Arizona', image: 'images/snowflake-arizona-214x128-CWD_ec6b9cbe.jpg', status:'UNIDENTIFIED'},
  {name:'Spokane Washington', image: 'images/spokane-washington-214x128-CU100727_bkf01.jpg', status:'UNIDENTIFIED'},
  {name:'St. George Utah', image: 'images/st-george-utah-214x128-AV050916_cah010.jpg', status:'UNIDENTIFIED'},
  {name:'St. Louis Missouri', image: 'images/st-louis-missouri-214x128-CWD_139bc26f.jpg', status:'UNIDENTIFIED'},
  {name:'St. Paul Minnesota', image: 'images/st-paul-minnesota-214x128-0001987.jpg', status:'UNIDENTIFIED'},
  {name:'Stockholm Sweden', image: 'images/stockholm-sweden-214x128-0001193s.jpg', status:'UNIDENTIFIED'},
  {name:'Suva Fiji', image: 'images/suva-fiji-214x128-AV060324_cah046.jpg', status:'UNIDENTIFIED'},
  {name:'Sydney Australia', image: 'images/sydney-australia-214x128-0001568.jpg', status:'UNIDENTIFIED'},
  {name:'Taipei Taiwan', image: 'images/taipei-taiwan-214x128-0001199s.jpg', status:'UNIDENTIFIED'},
  {name:'Tampico Mexico', image: 'images/tampico-mexico-214x128-TampicoMexicoTmpl-1.jpg', status:'UNIDENTIFIED'},
  {name:'Tegucigalpa Honduras', image: 'images/tegucigalpa-honduras-214x128-CU070830_sm03.jpg', status:'UNIDENTIFIED'},
  {name:'The Gila Valley Arizona', image: 'images/the-gila-valley-arizona-214x128-AV100419cah036.jpg', status:'UNIDENTIFIED'},
  {name:'The Hague Netherlands', image: 'images/the-hague-netherlands-214x128-CU061005_sm001.jpg', status:'UNIDENTIFIED'},
  {name:'Tokyo Japan', image: 'images/tokyo-japan-214x128-CU100722_bkf02.jpg', status:'UNIDENTIFIED'},
  {name:'Toronto Ontario', image: 'images/toronto-ontario-214x128-0001001.jpg', status:'UNIDENTIFIED'},
  {name:'Trujillo Peru', image: 'images/trujillo-peru-214x128-rendering.jpg', status:'UNIDENTIFIED'},
  {name:'Tuxtla Gutiérrez Mexico', image: 'images/tuxtla-gutierrez-mexico-214x128-0002097.jpg', status:'UNIDENTIFIED'},
  {name:'Twin Falls Idaho', image: 'images/twin-falls-idaho-214x128-CU080605_bkf01.jpg', status:'UNIDENTIFIED'},
  {name:'Vancouver British Columbia', image: 'images/vancouver-british-columbia-214x128-CWD_091310_SDavis_003.jpg', status:'UNIDENTIFIED'},
  {name:'Veracruz Mexico', image: 'images/veracruz-mexico-214x128-0002092.jpg', status:'UNIDENTIFIED'},
  {name:'Vernal Utah', image: 'images/vernal-utah-214x128-0001003.jpg', status:'UNIDENTIFIED'},
  {name:'Villahermosa Mexico', image: 'images/villahermosa-mexico-214x128-0002063.jpg', status:'UNIDENTIFIED'},
  {name:'Washington D.C.', image: 'images/washington-dc-214x128-0001505.jpg', status:'UNIDENTIFIED'},
  {name:'Winter Quarters Nebraska', image: 'images/winter-quarters-nebraska-214x128-CWD_101013_MPalmer.jpg', status:'UNIDENTIFIED'}

];

// the index provides direct access without looping through the array to find a temple
for (var i=0; i < temples.length; i++) {
  temples[i].index = i;
}

var scores = {};


// NowJS components
var nowjs = require("now");
var everyone = nowjs.initialize(app);

// Initialize everyone state with temples and scores
everyone.state = {temples:temples, scores:scores};


// method to update server state in the everyone object
var updateEveryoneState = function(newName, templeStatus) {

  if (!scores[newName]) {
    scores[newName] = {name:newName, count: 0};
  }

  if (templeStatus && templeStatus.index) {
   if (newName) {
     scores[newName].count += 1;
   }
   console.log('Setting everyone.state[' + templeStatus.index + '] to ' + JSON.stringify(templeStatus));
   temples[templeStatus.index] = templeStatus;
  }

}

// handle new connections by listening on the connect event
// track the user's successful temple matches by name
nowjs.on('connect', function(){

  if (everyone.newName) {
    console.log('everyone.newName:' + everyone.newName);
    this.now.name = everyone.newName;
    everyone.newName = undefined;
  }

  if (this.now.name) {
    console.log("Joined: " + this.now.name);
    updateEveryoneState(this.now.name);

    if (this.now.receiveMessage) {
      console.log('Sending new name through now.receiveMessage !' );
      this.now.receiveMessage(this.now.name, "Joined");
    }
    if (this.now.receiveTempleStatus && everyone.state) {
      console.log('Sending Temple Status in everyone.state through now.receiveTempleStatus' );
      this.now.receiveTempleStatus(this.now.name, everyone.state);
    }
  } else {

    if (this.now.connectComplete) {
      console.log("Sending Connection confirmation through now.connectComplete");
      this.now.connectComplete();
    }
  }

});

// on disconnect event remove the user's name entry
nowjs.on('disconnect', function(){
  console.log("Left: " + this.now.name);
  if (this.now.name) {
    if (updateEveryoneState && updateEveryoneState.scores && updateEveryoneState.scores[this.now.name]) {
      delete updateEveryoneState.scores[this.now.name];
      updateEveryoneState.scores[this.now.name] = undefined;
    }
  }
});

// the client calls this method to notify the server of a new chat message
// the server replies back to all chat clients with the new message
everyone.now.distributeMessage = function(message){
  console.log('Updating all clients through everyone.now.receiveMessage');
  everyone.now.receiveMessage(this.now.name, message);
};

// the client calls this method to notify the server of a succesful temple match
// we record the match for everyone and then send the status to all of the clients
everyone.now.distributeTempleStatus = function(templeStatus){
  updateEveryoneState(this.now.name, templeStatus);
  console.log('Updating all clients through everyone.now.receiveTempleStatus');
  everyone.now.receiveTempleStatus(this.now.name, templeStatus);
};

// the client calls this method to update the name entry in everyone and
// to synchronize it with all of the other clients
everyone.now.addName = function(newName) {
  console.log('New Name:' + newName);
  everyone.newName = newName;
  if (everyone.now.receiveTempleStatus) {
    console.log('sending everyone.state through receiveTempleStatus');
    everyone.now.receiveTempleStatus(null, everyone.state);
  }
};


// create a fast lookup Trie for matching partial words
function Trie(vertex) {
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

  // fast lookup for auto-complete
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
}

function Vertex(val) {
  this.children = {};
  this.words = [];
  this.val = val;
}

// List of Temples read from text file
var countries;
var fs = require('fs');
var rootVert = new Vertex('');
var trie = new Trie(rootVert);
fs.readFile('./public/temples.txt', function(err, data) {
  countries = data.toString().split('\n');
  for(var i in countries) {
    var country = countries[i].toLowerCase();
    trie.addWord(rootVert, country);
  }
});

// Method the client calls to determine Auto-complete matches
// This is an example of calling directly back to the client
everyone.now.getGuess = function(val) {
  val = val.toLowerCase();
  var guesses = trie.retrieve(val);
  this.now.receiveGuess(guesses[0]);
};

