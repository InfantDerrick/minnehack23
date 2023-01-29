function getFactCheck(query, callback = (printing) => {makeFactCheck(printing);}) {
    // fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=100&offset=0&query=${query}`)
    //     .then((response)) => response.json())
    //     .then((json) => console.log(json));
    console.log(query);
    theUrl = `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=100&offset=0&query=${query}&key=AIzaSyBC0im9IZ8UfIFW9AkdW6q41XpCfL9z-CM`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

const makeFactCheck = (checks) => {
    const facts = JSON.parse(checks);
    var arr = [];
    if(facts['claims']){
        facts.claims.forEach((x) => {
            arr.push(x.claimReview[0].textualRating);
            console.log(x.claimReview[0].textualRating);
        });
    }
    
    var score = 0;
    var counter = 0;
    for(rating in arr){
        counter = counter + 1;
        if(rating.includes("true"))
            score = score + 1;
        else if(rating.includes("false"))
            score = score;
        else if(!rating.includes("false"))
            score = score + 0.5;
    }

    score = parseFloat(score) / counter;
    score = score * 100;
    document.getElementById("reply1").style = "width: " + score + "%";
    document.getElementById("reply1num").innerHTML = `${score}%`;
}