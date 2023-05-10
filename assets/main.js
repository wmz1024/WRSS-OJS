function loadJSFile(url) {
    if (!document.querySelector(`script[src="${url}"]`)) {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        document.head.appendChild(script);
      }
  }

function loadPage(a) {
    function exitPage() {
        document.getElementById("Main")
            .style = "display: none;";
        document.getElementById("Setting")
            .style = "display: none;"
    };
    exitPage();
    if (a == "main") {
        document.getElementById("Main")
            .style = "display: block;";
        document.getElementById("rss-feed")
            .innerHTML = "";
        mRSSload(getListpa(localStorage.getItem("rsssubdata"), "url"))
    } else if (a == "setting") {
        document.getElementById("Setting")
            .style = "display: block;";
        loadJSFile("/assets/utils/nc.js")
    }
};
mRSSload(getListpa(localStorage.getItem("rsssubdata"), "url"));

function deLoadPage() {
    if (location.hash.substr(1) === "") {
        history.replaceState(null, null, "#page=Main")
    };
    var a = new URLSearchParams(location.hash.substr(1));
    loadPage(a.get("page")
        .toLowerCase())
};
deLoadPage();

function getListpa(a, b, c) {
    var d = [];
    var a = JSON.parse(a);
    if (a.desub && a.desub.length > 0) {
        a.desub.forEach(item => {
            if (b == "url") {
                d.push(item.url)
            } else if (b == "name") {
                d.push(item.name)
            }
        });
        let name = '';
        if (b == "utn") {
            let item = a.desub.find(item => item.url === urlca);
            if (item) {
                name = item.name;
                return name
            }
        }
    };
    return d
};

function renderRSSFeed(e) {
    for (var t = [], n = 0; n < e.length; n++) t = t.concat(e[n]);
    t.sort(function(e, t) {
        return t.pubDate - e.pubDate
    });
    var a = "";
    for (n = 0; n < t.length; n++) {
        var s = '<li class="mdui-list-item rss-item"><div class="mdui-row"><div class="mdui-col-xs-12"><div class="rss-title"><a href="'+t[n].link+'">' + t[n].title + "</a></div>",
            r = t[n].description,
            i = r.match(/<img [^>]*src="([^"]+)"[^>]*>/);
        if (null != i) s += '<div class="rss-image"><img src="' + i[1] + '"></div>';
        a += s += '<div class="rss-description">'+r +'</div><div class="rss-link"><a href="' + t[n].link + '">阅读全文</a></div><div class="rss-date">' + t[n].pubDate.toLocaleString() + "</div><div class='rss-author'>" + t[n].author + "</div></div></li>"
    }
    document.getElementById("rss-feed")
        .innerHTML = a
    if(document.getElementById("rss-feed").innerHTML==""){
        document.getElementById("rss-feed").innerHTML=`
        <div style="margin:auto;">
            <h1>_(:з」∠)_</h1>
            <p>您没有设置任何有效的RSS/Feed源, 请前去设置</p>
        </div>
        `
    }
}

function loadRSSFeed(e) {
    for (var t = [], n = 0; n < e.length; n++) {
        rsssubtev = e;
        rsssubteb = n;
        var a = new Promise(function(t, a) {
            var s = new XMLHttpRequest;
            s.onreadystatechange = function() {
                if (4 == s.readyState && 200 == s.status) {
                    var e = (new DOMParser)
                        .parseFromString(s.responseText, "text/xml");
                    switch (e.documentElement.nodeName.toLowerCase()) {
                        case "rss":
                            for (var n = e.getElementsByTagName("item"), r = [], i = 0; i < n.length; i++) {
                                var o = n[i].getElementsByTagName("title")[0].textContent,
                                    l = n[i].getElementsByTagName("link")[0].textContent,
                                    m = new Date(n[i].getElementsByTagName("pubDate")[0].textContent);
                                try {
                                    var d = n[i].getElementsByTagName("description")[0].textContent
                                } catch (e) {
                                    d = n[i].getElementsByTagName("summary")[0].textContent
                                }
                                var c = {
                                    title: o,
                                    link: l,
                                    description: d,
                                    pubDate: m
                                };
                                r.push(c)
                            }
                            t(r);
                            break;
                        case "feed":
                            for (n = e.getElementsByTagName("entry"), r = [], i = 0; i < n.length; i++) {
                                o = n[i].getElementsByTagName("title")[0].textContent, l = n[i].getElementsByTagName("link")[0].getAttribute("href");
                                if(localStorage.getItem("TSSet")&&localStorage.getItem("TSSet")=="true"){
                                    m = new Date(n[i].getElementsByTagName("published")[0].textContent);
                                }
                                else{
                                    m = new Date(n[i].getElementsByTagName("updated")[0].textContent);
                                }
                                try {
                                    d = n[i].getElementsByTagName("content")[0].textContent
                                } catch (e) {
                                    try{
                                        d = n[i].getElementsByTagName("description")[0].textContent
                                    }
                                    catch(e){
                                        d = n[i].getElementsByTagName("summary")[0].textContent
                                    }
                                    
                                }
                                c = {
                                    title: o,
                                    link: l,
                                    description: d,
                                    pubDate: m,
                                    author: rsssubtev[rsssubteb]
                                };
                                console.log(rsssubtev[rsssubteb]);
                                r.push(c)
                            }
                            t(r);
                            break;
                        default:
                            a("Unknown RSS/Atom format")
                    }
                } else 4 == s.readyState && a("Unable to load RSS feed")
            }, s.open("GET", e[n]), s.send()
        });
        t.push(a)
    };
    return Promise.all(t)
}

function mRSSload(e) {
    loadRSSFeed(e)
        .then(function(e) {
            renderRSSFeed(e)
        })
        .catch(function(e) {
            console.log(e)
        })
};

function savejsonToLocalStorage(a, b) {
    localStorage.setItem(a, JSON.stringify(b))
};

function getjsonFromLocalStorage(a) {
    const jsonString = localStorage.getItem(a);
    return JSON.parse(jsonString)
};   