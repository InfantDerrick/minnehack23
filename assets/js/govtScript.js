const loc = "Acton, MA";
let allPols = [];

getPoliticians(loc);

class Politician{
  constructor(name, position, level, power, party, address, city, state, zip, phone, wikipedia){
    this.name = name;
    this.position = position;
    this.level = level;
    this.power = power;
    this.party = party;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
    this.wikipedia = wikipedia;
    if(wikipedia != ""){
      
      let wikiName = wikipedia.substring(wikipedia.lastIndexOf('/') + 1);
      wikiImageQuery(wikiName, this); 
      wikiDescQuery(wikiName, this);      
      // let key = Object.keys(imageReq.query.pages)[0];
      // this.image = imageReq.query.pages[key].thumbnail.source;
      // const descReq = wikiDescQuery(wikiName);
      // key = Object.keys(descReq.query.pages)[0];
      // this.desc = descReq.query.pages[key].extract;
    }else{
      this.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa67U8mBFqJ5DLUJPWbWMJ5QUBMCwlyvJEvkIKSCr8Hw&s"
      this.desc = name;
    }
      
    //TODO wikipedia
  }
  setImage(img){

    let key = Object.keys(img.query.pages)[0];
    if(img.query.pages[key].thumbnail['source'])
      this.image = img.query.pages[key].thumbnail.source;
  }
  setDesc(desc){
    let key = Object.keys(desc.query.pages)[0];
    this.desc = desc.query.pages[key].extract;
  }
}

const comparePols = (pola, polb) => {
  if(pola.power < polb.power) return -1;
  if(pola.power > polb.power) return 1;
  return 0;
}
function getPoliticians(query, callback = (printing) => {makePoliticians(printing, allPols)}) {
  theUrl = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${query}&key=AIzaSyBC0im9IZ8UfIFW9AkdW6q41XpCfL9z-CM`
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}
function wikiImageQuery(query, pol, callback = (res, pol) => {pol.setImage(res)}) {
  var url = "https://en.wikipedia.org/w/api.php"; 

  var params = {
      action: "query",
      prop: "pageimages",
      titles: query,
      format: "json"
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
      callback(response, pol);
    })
    .catch(function(error){console.log(error);});
}
function wikiDescQuery(query, pol, callback = (res, pol) => {pol.setDesc(res)}) {
  var url = "https://en.wikipedia.org/w/api.php"; 

  var params = {
      action: "query",
      prop: "extracts",
      exlimit: "1",
      titles: query,
      explaintext: 1,
      format: "json"
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  fetch(url)
      .then(function(response){return response.json();})
      .then(function(response) {
        callback(response, pol);
      })
      .catch(function(error){console.log(error);});
}

const makePoliticians = (pol) => {
  let constructedPols = allPols;
  const pols = JSON.parse(pol);
  for(division in pols.divisions){
    if(pols.divisions[division]['officeIndices']){
      pols.divisions[division].officeIndices.forEach((office) => {
        pols.offices[office].officialIndices.forEach((official) => {
          let name = pols.officials[official].name;
          let position = pols.offices[office].name;
          let level = pols.divisions[division].name;
          let power = pols.offices[office].officialIndices[0];
          let party = pols.officials[official].party;
          let address = '';
          let city = '';
          let zip = '';
          let state = '';
          if(pols.officials[official]['address']){
            address = pols.officials[official].address.line1;
            if(pols.officials[official].address['line2']) address += " " + pols.officials[official].line2;
            if(pols.officials[official].address['line3']) address += " " + pols.officials[official].line3;
            city = pols.officials[official].address.city;
            state = pols.officials[official].address.state;
            zip = pols.officials[official].address.zip;
          }
          let phone = '';
          if(pols.officials[official]['phones'])
            phone = pols.officials[official].phones[0];
          let wikipedia = ""
          if(pols.officials[official]['urls'])
            pols.officials[official].urls.forEach((url) => {if(url.includes('wikipedia')) wikipedia = url});
          constructedPols.push(new Politician(name, position, level, power, party, address, city, state, zip, phone, wikipedia));
        });
      })
    }
  }
  constructedPols.sort(comparePols);
}