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
    
    for (let i = 1; i < 6; i++){
        ti = "title" + i.toString()
        const e = document.getElementById(ti)
        d = "desc" + i.toString()
        const f = document.getElementById(d)
        console.log(e)
        console.log(f)
    }
    
  }