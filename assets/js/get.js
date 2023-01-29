function getFactCheck(callback = (printing) => {render(printing)}) {
    // fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=100&offset=0&query=${query}`)
    //     .then((response)) => response.json())
    //     .then((json) => console.log(json));
    theUrl = `http://127.0.0.1:2000/result`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
    console.log("hello");
    
}

const render = (pol) => {
    const pols = JSON.parse(pol);
    
    for (let i = 0; i < 5; i++){
        ti = "title" + (i+1).toString();
        const e = document.getElementById(ti);
        d = "desc" + (i+1).toString();
        img = "img" + (i+1).toString();
        document.getElementById(d).innerText = pols["descriptions"][i];
        document.getElementById(ti).innerText = pols["titles"][i];
        document.getElementById(img).innerHTML = '<img src= ' + pols["images"][i] + " alt='img-blur-shadow' class='img-fluid shadow border-radius-lg'" + ">\n"
        console.log(e);
        
        console.log(d);
    }
    
  }