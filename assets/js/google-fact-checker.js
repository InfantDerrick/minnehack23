function getFactCheck(query, callback = (printing) => {makeFactCheck(printing)}) {
    // fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=100&offset=0&query=${query}`)
    //     .then((response)) => response.json())
    //     .then((json) => console.log(json));
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
    console.log(facts);
    facts.claims.forEach((x) => {
        console.log(x.claimReview[0].textualRating);
    });
}