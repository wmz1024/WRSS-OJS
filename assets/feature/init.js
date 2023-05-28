function featFileNF(){
    document.querySelector(".welcome-WFeed-feature").innerHTML = "Feature - Not Found";
}

function featFileF(filename){
    loadJSFile("/assets/feature/"+filename+".js")
    document.querySelector(".welcome-WFeed-feature").innerHTML = "Feature - "+filename;
}

function initFeature() {
    document.querySelector(".feature-content").innerHTML='';
    var featInitP = new URLSearchParams(location.hash.substr(1)).get("feature");
    fetch('/assets/feature/'+featInitP+".js")
        .then(response => {
            if (response.status === 200) {
                featFileF(featInitP)
            } else if (response.status === 404) {
                featFileNF()
            } else {
                featFileNF()
            }
        })
        .catch(error => console.error(error));
}

initFeature()

window.addEventListener('popstate', function () {
    initFeature()
}, false);