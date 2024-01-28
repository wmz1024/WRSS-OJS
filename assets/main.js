const XMLProxy4ever = "https://sv02b.awa.gs/api/feed-fetch.php?feed=";

function initApp(){
    console.log(`%c WRSS %c Made with ❤️ by Wmz1024 `,'background: #e19385; padding: 4px; border-radius: 3px 0 0 3px; color: #fff', 
    'background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff',);
    document.getElementById("app").innerHTML=`
    <header class="appbar mdui-appbar mdui-appbar-fixed">
    <div class="mdui-toolbar mdui-color-theme">
      <span class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"
        mdui-drawer="{target: '#cadrawer', swipe: true}">
        <i class="mdui-icon material-icons">menu</i>
      </span>
      <a class="mdui-typo-headline nav-title" href="#">WRSS</a>
      <div class="mdui-toolbar-spacer"></div>
  <a id="installApp" title="把WRSS安装在您的设备里" onclick="appInstallEvent.prompt()" class="mdui-btn mdui-btn-icon">
    <i class="mdui-icon material-icons">exit_to_app</i>
  </a>
    </div>
  </header>
  <div class="mdui-drawer" id="cadrawer">
    <ul class="mdui-list">
      <a href="#page=Main">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
          <div class="mdui-list-item-content">主页</div>
        </li>
      </a>
      <a href="#page=Setting">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">settings</i>
          <div class="mdui-list-item-content">设置</div>
        </li>
      </a>
      <a href="#page=Feature&feature=market">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">local_mall</i>
          <div class="mdui-list-item-content">插件市场</div>
        </li>
      </a>
      <li class="mdui-subheader">您订阅的</li>
      <div class="my-feed"></div>
    </ul>
  </div>
  <div class="mdui-container">
    <div id="Main">
      <h1 class="mdui-typo-display-1 welcome-WFeed"></h1>
      <div class="info-extra"></div>
      <ul class="mdui-list" id="rss-feed">加载中！</ul>
    </div>
    <div id="Feature" style="display: none;"><h1 class="mdui-typo-display-1 welcome-WFeed-feature"></h1><div class="feature-content"></div></div>
    <div id="Setting" style="display: none;">
      <h1 class="mdui-typo-display-1 ">设置</h1><a href="./docs/#/Setting"><button
          class="mdui-btn mdui-color-theme-accent mdui-ripple">设置文档</button></a><br>
      <div id="SettingO">设置02组件状态: 加载中</div>
      <div id="SettingI">设置01组件状态: 加载中</div>
    </div>
  </div>
    `
    console.log("[WRSS] Init App Success")
    console.log("如出现问题，可尝试在本页输入 %creloadApp()%c 然后按回车重置应用。", "background: #e19385;color:#335eea;padding: 4px 6px;border-radius:3px;", "background:unset;color:unset;")
    document.getElementById("installApp").style=`
    display:none;
    `

}

initApp()

// const XMLProxy4ever = "https://api3.wmza.cn/feed/xml.php?origin=";

pa = new URLSearchParams(location.hash.substr(1));
var datavc = {
    ipu: localStorage.getItem("ImageProxyURL")
}
if (!localStorage.getItem('rsssubdata')) { localStorage.setItem("rsssubdata", '{"desub":[]}') }
function getListpa(a, b, urlca) {
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
function loadJSFile(url) {
    if (!document.querySelector(`script[src="${url}"]`)) {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        document.head.appendChild(script);
    }
}

function loadCSSFile(url) {
    if (!document.querySelector(`link[rel="${url}"]`)) {
        const script = document.createElement('link');
        script.setAttribute('rel', 'stylesheet');
        script.setAttribute('href', url);
        document.head.appendChild(script);
    }
}

function loadPage(a, urlcb) {
    function exitPage() {
        document.getElementById("Main")
            .style = "display: none;";
        document.getElementById("Setting")
            .style = "display: none;"
        document.getElementById("Feature")
            .style = "display: none;"
    };
    exitPage();
    if (a == "main") {
        document.getElementById("Main")
            .style = "display: block;";
        document.getElementById("rss-feed").innerHTML = "加载中！";
        document.querySelector(".welcome-WFeed").innerHTML = "👋 欢迎来到WFeed";
        document.querySelector(".info-extra").innerHTML = ``
        mRSSload(getListpa(localStorage.getItem("rsssubdata"), "url"))
        if (localStorage.getItem("FBSet") && localStorage.getItem("FBSet") == "true") { loadJSFile("https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"); loadCSSFile("https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css"); loadJSFile("/assets/utils/fbextra.js") }
        if (localStorage.getItem("HLSet") && localStorage.getItem("HLSet") == "true") {
            loadJSFile("/assets/utils/highlight-extra.js")
        }

    } else if (a == "setting") {
        document.getElementById("Setting")
            .style = "display: block;";
        document.querySelector(".info-extra").innerHTML = ``
        loadJSFile("/assets/utils/nc.js")
    } else if (a == "loadfeed") {
        document.getElementById("Main")
            .style = "display: block;";
        document.getElementById("rss-feed").innerHTML = "加载中！";
        if (getListpa(localStorage.getItem("rsssubdata"), "utn", urlcb) != "") {
            document.querySelector(".welcome-WFeed").innerHTML = getListpa(localStorage.getItem("rsssubdata"), "utn", urlcb) + " 的订阅";
            document.querySelector(".info-extra").innerHTML = ``
        }
        else {
            document.querySelector(".welcome-WFeed").innerHTML = "陌生订阅";
            document.querySelector(".info-extra").innerHTML = `
<span>订阅地址: ${urlcb} </span><a>添加到WRSS （暂不支持）</a>
            `
        }
        mRSSload([urlcb])
    }else if(a == "feature"){document.querySelector(".info-extra").innerHTML = ``;
    document.getElementById("Feature")
    .style = "display: block;";
    console.log(urlcb);
    loadJSFile("/assets/feature/init.js");
}
};

function deLoadPage() {
    if (location.hash.substr(1) === "") {
        mRSSload(getListpa(localStorage.getItem("rsssubdata"), "url"));
        history.replaceState(null, null, "#page=Main")
    };
    var a = new URLSearchParams(location.hash.substr(1));
    if (a.get("page").toLowerCase() == "loadfeed") {
        loadPage(a.get("page")
            .toLowerCase(), a.get("url"))
    }
    else if (a.get("page").toLowerCase() == "feature") {
        if(a.get("feature")==null || a.get("feature")==""){
        loadPage(a.get("page")
        .toLowerCase(), "Not Found")}
        else{loadPage(a.get("page")
        .toLowerCase(), a.get("feature"))}
    } else {
        loadPage(a.get("page")
            .toLowerCase())
    }
};

deLoadPage();
window.addEventListener('popstate', function () {
    deLoadPage();
    onlinetest()
}, false);

function renderFeedList() {
    document.querySelector(".my-feed").innerHTML = ""
    for (let i = 0; i < getListpa(localStorage.getItem("rsssubdata"), "url").length; i++) {
        var FeedListData = `
        <a href="#page=LoadFeed&url=${getListpa(localStorage.getItem("rsssubdata"), "url")[i]}">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">account_circle</i>
          <div class="mdui-list-item-content">${getListpa(localStorage.getItem("rsssubdata"), "utn", getListpa(localStorage.getItem("rsssubdata"), "url")[i])}</div>
        </li>
      </a>
        `
        document.querySelector(".my-feed").innerHTML += FeedListData
    }
}

renderFeedList()

function renderRSSFeed(e) {
    for (var t = [], n = 0; n < e.length; n++) t = t.concat(e[n]);
    t.sort(function (e, t) {
        return t.pubDate - e.pubDate
    });
    var a = "";
    for (n = 0; n < t.length; n++) {
        var s = '<li class="mdui-list-item rss-item"><div class="mdui-row"><div class="mdui-col-xs-12"><div class="rss-title"><a href="' + t[n].link + '" target="_blank">' + t[n].title + "</a></div>" + `
        <div class="rss-item-info"><span class="rss-date">${t[n].pubDate.toLocaleString()}</span><span class='rss-author'>&nbsp;作者: ${t[n].author}</span></div>
        `,
            r = t[n].description,
            i = r.match(/<img [^>]*src="([^"]+)"[^>]*>/);
        if (null != i) s += '<div class="rss-image"><img src="' + i[1] + '"></div>';
        a += s += '<div class="rss-description">' + r + '</div><div class="rss-link"><a href="' + t[n].link + '" target="_blank">阅读全文</a></div></li>'
    }
    document.getElementById("rss-feed")
        .innerHTML = a
    if (document.getElementById("rss-feed").innerHTML == "") {
        document.getElementById("rss-feed").innerHTML = `
        <div style="margin:auto;">
            <h1>_(:з」∠)_</h1>
            <p>您没有设置任何有效的RSS/Feed源, 请前去设置</p>
        </div>
        `
    } else {
        const iframes = document.getElementsByTagName('iframe');
        for (let i = 0; i < iframes.length; i++) {
            iframes[i].setAttribute('sandbox', '');
        }
    }
}

function loadRSSFeed(e) {
    for (var t = [], n = 0; n < e.length; n++) {
        var a = new Promise(function (t, a) {
            var s = new XMLHttpRequest;
            s.onreadystatechange = function () {
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
                                if (localStorage.getItem("TSSet") && localStorage.getItem("TSSet") == "true") {
                                    m = new Date(n[i].getElementsByTagName("published")[0].textContent);
                                }
                                else {
                                    m = new Date(n[i].getElementsByTagName("updated")[0].textContent);
                                }
                                try {
                                    d = n[i].getElementsByTagName("content")[0].textContent
                                } catch (e) {
                                    try {
                                        d = n[i].getElementsByTagName("description")[0].textContent
                                    }
                                    catch (e) {
                                        d = n[i].getElementsByTagName("summary")[0].textContent
                                    }

                                }
                                c = {
                                    title: o,
                                    link: l,
                                    description: d,
                                    pubDate: m,
                                    author: e.getElementsByTagName("author")[0].getElementsByTagName("name")[0].textContent
                                };
                                r.push(c)
                            }
                            t(r);
                            break;
                        default:
                            a("Unknown RSS/Atom format")
                    }
                } else {
                    //n++
                }
            };
            try {
                if (localStorage.getItem("XMLProxyURL")) {
                    s.open("GET", localStorage.getItem("XMLProxyURL") + e[n]);
                } else {
                    if (localStorage.getItem("XPSet") == undefined || localStorage.getItem("XPSet") == null || localStorage.getItem("XPSet") == 'false') {
                        s.open("GET", XMLProxy4ever + e[n]);
                    } else {
                        s.open("GET", e[n]);
                    }
                }
            }
            catch (err) {
                console.log(err)
            }
            try {
                s.send();
            }
            catch (err) {

            }
        });
        t.push(a)
    };
    return Promise.all(t)
}


function mRSSload(e) {
    loadRSSFeed(e)
        .then(function (e) {
            renderRSSFeed(e)
        })
        .catch(function (e) {
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
function checkUpdate(){
    fetch('https://api3.wmza.cn/feed/check/update.php').then(function(response) {
        return response.json();
      }).then(function(data) {
        if (data[0].sha !== localStorage.version) {
          localStorage.version = data[0].sha;
          navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
              registration.unregister();
            }
          });
          // 删除名为 my-cache 的缓存
caches.delete('app-cache')
.then(() => {
  console.log('Cache deleted successfully!');
})
.catch(error => {
  console.error('Failed to delete cache:', error);
});

          mdui.snackbar({
            message: '🎆 WRSS有新版本',
            position: 'right-bottom',
            buttonText: '更新',
            onButtonClick: function(){
                location.reload();
              },
          });
        }
      }).catch(function(error) {
        console.error(error);
      });
}
  setInterval(function() {
    checkUpdate()
  }, 600000);
checkUpdate()

var onlinetestd = true;
function onlinetest(){if (navigator.onLine) {
    console.log('[WRSS-OnlineTest] Online!');
   if(onlinetestd==false){
    mdui.snackbar({
          message: '🎆 WRSS恢复互联网连接',
          position: 'right-bottom',
        });
    onlinetestd=true;
    document.getElementById("rss-feed").innerHTML = `
    <p><a onclick="reloadApp()">刷新页面</a></p>
      `
   }
  } else {
      console.log('[WRSS-OnlineTest] Not Online!');
      document.getElementById("rss-feed").innerHTML = `
      <div style="margin:auto;">
          <h1>_(:з」∠)_</h1>
          <p>您的设备无法访问互联网 无法使用WRSS的大部分功能！</p>
      </div>
      `
      if(onlinetestd==true){
        onlinetestd=false;
    mdui.snackbar({
          message: '🎆 WRSS失去互联网连接',
          position: 'right-bottom',
        });
   }

  }}
  onlinetest()
setInterval(function() {onlinetest()
}, 30000);
function reloadApp(){
  window.location.reload();
}

var appInstallEvent=null
window.addEventListener("beforeinstallprompt" , e=>{
appInstallEvent=e;
document.getElementById("installApp").style=`
display:block;
`;
})
