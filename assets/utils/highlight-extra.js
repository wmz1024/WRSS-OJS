function loadHL(){
    if(localStorage.getItem("HLTheme")==undefined || localStorage.getItem("HLTheme")==null || localStorage.getItem("HLTheme")==""){
        var dHLTheme = "vs2015"
    }else{
        var dHLTheme = localStorage.getItem("HLTheme")
    }
    loadJSFile("https://unpkg.com/@highlightjs/cdn-assets@11.8.0/highlight.min.js")
    loadJSFile("/assets/utils/hlextra2.js")
    loadCSSFile("https://unpkg.com/@highlightjs/cdn-assets@11.8.0/styles/"+dHLTheme+".min.css")
}

loadHL()