
var datavc = {
    ipu: localStorage.getItem("ImageProxyURL")
}

if(!localStorage.getItem('rsssubdata')){localStorage.setItem("rsssubdata",'{"desub":[]}')}

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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(function(registration) {
        console.log('Service worker registration successful!');
        navigator.serviceWorker.controller.postMessage(datavc)
      })
      .catch(function(err) {
        console.error('Service worker registration failed:', err);
      });
  }
function loadJSFile(url) {
    if (!document.querySelector(`script[src="${url}"]`)) {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        document.head.appendChild(script);
      }
  }

function loadPage(a,urlcb) {
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
        document.getElementById("rss-feed").innerHTML = "加载中！";
        document.querySelector(".welcome-WFeed").innerHTML = "👋 欢迎来到WFeed";
        document.querySelector(".info-extra").innerHTML=``
        mRSSload(getListpa(localStorage.getItem("rsssubdata"), "url"))
    } else if (a == "setting") {
        document.getElementById("Setting")
            .style = "display: block;";
            document.querySelector(".info-extra").innerHTML=``
        loadJSFile("/assets/utils/nc.js")
    }else if (a == "loadfeed"){
        document.getElementById("Main")
            .style = "display: block;";
        document.getElementById("rss-feed").innerHTML = "加载中！";
        if (getListpa(localStorage.getItem("rsssubdata"), "utn",urlcb)!=""){
            document.querySelector(".welcome-WFeed").innerHTML = getListpa(localStorage.getItem("rsssubdata"), "utn",urlcb)+" 的订阅";
            document.querySelector(".info-extra").innerHTML=``
        }
        else{
            document.querySelector(".welcome-WFeed").innerHTML = "陌生订阅";
            document.querySelector(".info-extra").innerHTML=`
<span>订阅地址: ${urlcb} </span><a>添加到WRSS （暂不支持）</a>
            `
        }
        mRSSload([urlcb])
    }
};

function deLoadPage() {
    if (location.hash.substr(1) === "") {
        mRSSload(getListpa(localStorage.getItem("rsssubdata"), "url"));
        history.replaceState(null, null, "#page=Main")
    };
    var a = new URLSearchParams(location.hash.substr(1));
    if(a.get("page").toLowerCase()=="loadfeed"){
        loadPage(a.get("page")
        .toLowerCase(),a.get("url"))
    }else{
        loadPage(a.get("page")
        .toLowerCase())
    }
};
deLoadPage();
window.addEventListener('hashchange', function() {
    deLoadPage();
  }, false);

function renderFeedList(){
    document.querySelector(".my-feed").innerHTML=""
    for (let i = 0; i < getListpa(localStorage.getItem("rsssubdata"), "url").length; i++) {
        var FeedListData=`
        <a href="#page=LoadFeed&url=${getListpa(localStorage.getItem("rsssubdata"), "url")[i]}">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">account_circle</i>
          <div class="mdui-list-item-content">${getListpa(localStorage.getItem("rsssubdata"), "utn",getListpa(localStorage.getItem("rsssubdata"), "url")[i])}</div>
        </li>
      </a>
        `
        document.querySelector(".my-feed").innerHTML+=FeedListData
    }
}

renderFeedList()

function renderRSSFeed(e) {
    for (var t = [], n = 0; n < e.length; n++) t = t.concat(e[n]);
    t.sort(function(e, t) {
        return t.pubDate - e.pubDate
    });
    var a = "";
    for (n = 0; n < t.length; n++) {
        var s = '<li class="mdui-list-item rss-item"><div class="mdui-row"><div class="mdui-col-xs-12"><div class="rss-title"><a href="'+t[n].link+'">' + t[n].title + "</a></div>"+`
        <div class="rss-item-info"><span class="rss-date">${t[n].pubDate.toLocaleString()}</span><span class='rss-author'>&nbsp;作者: ${t[n].author}</span></div>
        `,
            r = t[n].description,
            i = r.match(/<img [^>]*src="([^"]+)"[^>]*>/);
        if (null != i) s += '<div class="rss-image"><img src="' + i[1] + '"></div>';
        a += s += '<div class="rss-description">'+r +'</div><div class="rss-link"><a href="' + t[n].link + '">阅读全文</a></div></li>'
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
    }else{
        const iframes = document.getElementsByTagName('iframe');
for (let i = 0; i < iframes.length; i++) {
  iframes[i].setAttribute('sandbox', '');
}
    }
}

function loadRSSFeed(e) {
    for (var t = [], n = 0; n < e.length; n++) {
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
                                    author: e.getElementsByTagName("author")[0].getElementsByTagName("name")[0].textContent
                                };
                                r.push(c)
                            }
                            t(r);
                            break;
                        default:
                            a("Unknown RSS/Atom format")
                    }
                } else 4 == s.readyState && a("Unable to load RSS feed")
            };
            
            if(localStorage.getItem("XMLProxyURL")){
                s.open("GET", localStorage.getItem("XMLProxyURL")+e[n]);
            }else{
                s.open("GET", e[n]);
            }
            s.send();
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

//!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).DisableDevtool=t()}(this,function(){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t,n){t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1})}function e(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function q(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");t=e;if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=c(n);return q(this,o?(e=c(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function s(e,t){var n,o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length)return o&&(e=o),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,u=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return r=e.done,e},e:function(e){u=!0,i=e},f:function(){try{r||null==o.return||o.return()}finally{if(u)throw i}}}}var d=!1,t={};function v(e){t[e]=!1}function z(){for(var e in t)if(t[e])return d=!0;return d=!1}function h(){return(new Date).getTime()}function B(e){var t=h();return e(),h()-t}function W(n,o){function e(t){return function(){n&&n();var e=t.apply(void 0,arguments);return o&&o(),e}}var t=window.alert,i=window.confirm,r=window.prompt;try{window.alert=e(t),window.confirm=e(i),window.prompt=e(r)}catch(e){}}var p={iframe:!1,pc:!1,qqBrowser:!1,firefox:!1,macos:!1,edge:!1,oldEdge:!1,ie:!1,iosChrome:!1,iosEdge:!1,chrome:!1,seoBot:!1};function U(){function e(e){return-1!==t.indexOf(e)}var t=navigator.userAgent.toLowerCase(),n=!!window.top&&window!==window.top,o=!/(iphone|ipad|ipod|ios|android)/i.test(t),i=e("qqbrowser"),r=e("firefox"),u=e("macintosh"),c=e("edge"),a=c&&!e("chrome"),l=a||e("trident")||e("msie"),f=e("crios"),s=e("edgios"),d=e("chrome")||f,v=/(googlebot|baiduspider|bingbot|applebot|petalbot|yandexbot|bytespider|chrome\-lighthouse)/i.test(t);Object.assign(p,{iframe:n,pc:o,qqBrowser:i,firefox:r,macos:u,edge:c,oldEdge:a,ie:l,iosChrome:f,iosEdge:s,chrome:d,seoBot:v})}function H(){for(var e=function(){for(var e={},t=0;t<500;t++)e["".concat(t)]="".concat(t);return e}(),t=[],n=0;n<50;n++)t.push(e);return t}var K="",V=!1;function F(){var e=b.ignore;if(e){if("function"==typeof e)return e();if(0!==e.length){var t=location.href;if(K===t)return V;K=t;var n,o=!1,i=s(e);try{for(i.s();!(n=i.n()).done;){var r=n.value;if("string"==typeof r){if(-1!==t.indexOf(r)){o=!0;break}}else if(r.test(t)){o=!0;break}}}catch(e){i.e(e)}finally{i.f()}return V=o}}}var M=0,X=0,N=[],$=0;function G(i){function e(){l=!0}function t(){l=!1}var n,o,r,u,c,a,l=!1;function f(){(a[u]===r?o:n)()}W(e,t),n=t,o=e,void 0!==(a=document).hidden?(r="hidden",c="visibilitychange",u="visibilityState"):void 0!==a.mozHidden?(r="mozHidden",c="mozvisibilitychange",u="mozVisibilityState"):void 0!==a.msHidden?(r="msHidden",c="msvisibilitychange",u="msVisibilityState"):void 0!==a.webkitHidden&&(r="webkitHidden",c="webkitvisibilitychange",u="webkitVisibilityState"),a.removeEventListener(c,f,!1),a.addEventListener(c,f,!1),M=window.setInterval(function(){if(!(i.isSuspend||l||F())){var e,t,n=s(N);try{for(n.s();!(e=n.n()).done;){var o=e.value;v(o.type),o.detect($++)}}catch(e){n.e(e)}finally{n.f()}T(),"function"==typeof b.ondevtoolclose&&(t=d,!z()&&t&&b.ondevtoolclose())}},b.interval),X=setTimeout(function(){p.pc||y()},b.stopIntervalTime)}function y(){window.clearInterval(M)}function Y(){if(y(),b.url)window.location.href=b.url;else{try{window.opener=null,window.open("","_self"),window.close(),window.history.back()}catch(e){console.log(e)}setTimeout(function(){window.location.href="https://theajack.github.io/disable-devtool/404.html?h=".concat(encodeURIComponent(location.host))},500)}}var b={md5:"",ondevtoolopen:Y,ondevtoolclose:null,url:"",tkName:"ddtk",interval:200,disableMenu:!0,stopIntervalTime:5e3,clearIntervalWhenDevOpenTrigger:!1,detectors:"all",clearLog:!0,disableSelect:!1,disableCopy:!1,disableCut:!1,disablePaste:!1,ignore:null,disableIframeParents:!0,seo:!0},J=["detectors","ondevtoolclose","ignore"];function Q(e){var t,n=0<arguments.length&&void 0!==e?e:{};for(t in b){var o=t;void 0===n[o]||i(b[o])!==i(n[o])&&-1===J.indexOf(o)||(b[o]=n[o])}"function"==typeof b.ondevtoolclose&&!0===b.clearIntervalWhenDevOpenTrigger&&(b.clearIntervalWhenDevOpenTrigger=!1,console.warn("【DISABLE-DEVTOOL】clearIntervalWhenDevOpenTrigger 在使用 ondevtoolclose 时无效"))}var w,g,Z,m=window.console||{log:function(){},table:function(){},clear:function(){}};function T(){b.clearLog&&Z()}var ee=function(){return!1};function O(n){var e,o=74,i=73,r=85,u=83,c=123,a=p.macos?function(e,t){return e.metaKey&&e.altKey&&(t===i||t===o)}:function(e,t){return e.ctrlKey&&e.shiftKey&&(t===i||t===o)},l=p.macos?function(e,t){return e.metaKey&&e.altKey&&t===r||e.metaKey&&t===u}:function(e,t){return e.ctrlKey&&(t===u||t===r)};n.addEventListener("keydown",function(e){var t=(e=e||n.event).keyCode||e.which;if(t===c||a(e,t)||l(e,t))return te(n,e)},!0),e=n,b.disableMenu&&D(e,"contextmenu"),e=n,b.disableSelect&&D(e,"selectstart"),e=n,b.disableCopy&&D(e,"copy"),e=n,b.disableCut&&D(e,"cut"),e=n,b.disablePaste&&D(e,"paste")}function D(t,e){t.addEventListener(e,function(e){return te(t,e)})}function te(e,t){if(!F()&&!ee())return(t=t||e.event).returnValue=!1,t.preventDefault(),!1}var S=8;function ne(e){for(var t=function(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,o=-271733879,i=-1732584194,r=271733878,u=0;u<e.length;u+=16){var c=n,a=o,l=i,f=r;n=P(n,o,i,r,e[u+0],7,-680876936),r=P(r,n,o,i,e[u+1],12,-389564586),i=P(i,r,n,o,e[u+2],17,606105819),o=P(o,i,r,n,e[u+3],22,-1044525330),n=P(n,o,i,r,e[u+4],7,-176418897),r=P(r,n,o,i,e[u+5],12,1200080426),i=P(i,r,n,o,e[u+6],17,-1473231341),o=P(o,i,r,n,e[u+7],22,-45705983),n=P(n,o,i,r,e[u+8],7,1770035416),r=P(r,n,o,i,e[u+9],12,-1958414417),i=P(i,r,n,o,e[u+10],17,-42063),o=P(o,i,r,n,e[u+11],22,-1990404162),n=P(n,o,i,r,e[u+12],7,1804603682),r=P(r,n,o,i,e[u+13],12,-40341101),i=P(i,r,n,o,e[u+14],17,-1502002290),o=P(o,i,r,n,e[u+15],22,1236535329),n=x(n,o,i,r,e[u+1],5,-165796510),r=x(r,n,o,i,e[u+6],9,-1069501632),i=x(i,r,n,o,e[u+11],14,643717713),o=x(o,i,r,n,e[u+0],20,-373897302),n=x(n,o,i,r,e[u+5],5,-701558691),r=x(r,n,o,i,e[u+10],9,38016083),i=x(i,r,n,o,e[u+15],14,-660478335),o=x(o,i,r,n,e[u+4],20,-405537848),n=x(n,o,i,r,e[u+9],5,568446438),r=x(r,n,o,i,e[u+14],9,-1019803690),i=x(i,r,n,o,e[u+3],14,-187363961),o=x(o,i,r,n,e[u+8],20,1163531501),n=x(n,o,i,r,e[u+13],5,-1444681467),r=x(r,n,o,i,e[u+2],9,-51403784),i=x(i,r,n,o,e[u+7],14,1735328473),o=x(o,i,r,n,e[u+12],20,-1926607734),n=j(n,o,i,r,e[u+5],4,-378558),r=j(r,n,o,i,e[u+8],11,-2022574463),i=j(i,r,n,o,e[u+11],16,1839030562),o=j(o,i,r,n,e[u+14],23,-35309556),n=j(n,o,i,r,e[u+1],4,-1530992060),r=j(r,n,o,i,e[u+4],11,1272893353),i=j(i,r,n,o,e[u+7],16,-155497632),o=j(o,i,r,n,e[u+10],23,-1094730640),n=j(n,o,i,r,e[u+13],4,681279174),r=j(r,n,o,i,e[u+0],11,-358537222),i=j(i,r,n,o,e[u+3],16,-722521979),o=j(o,i,r,n,e[u+6],23,76029189),n=j(n,o,i,r,e[u+9],4,-640364487),r=j(r,n,o,i,e[u+12],11,-421815835),i=j(i,r,n,o,e[u+15],16,530742520),o=j(o,i,r,n,e[u+2],23,-995338651),n=I(n,o,i,r,e[u+0],6,-198630844),r=I(r,n,o,i,e[u+7],10,1126891415),i=I(i,r,n,o,e[u+14],15,-1416354905),o=I(o,i,r,n,e[u+5],21,-57434055),n=I(n,o,i,r,e[u+12],6,1700485571),r=I(r,n,o,i,e[u+3],10,-1894986606),i=I(i,r,n,o,e[u+10],15,-1051523),o=I(o,i,r,n,e[u+1],21,-2054922799),n=I(n,o,i,r,e[u+8],6,1873313359),r=I(r,n,o,i,e[u+15],10,-30611744),i=I(i,r,n,o,e[u+6],15,-1560198380),o=I(o,i,r,n,e[u+13],21,1309151649),n=I(n,o,i,r,e[u+4],6,-145523070),r=I(r,n,o,i,e[u+11],10,-1120210379),i=I(i,r,n,o,e[u+2],15,718787259),o=I(o,i,r,n,e[u+9],21,-343485551),n=E(n,c),o=E(o,a),i=E(i,l),r=E(r,f)}return Array(n,o,i,r)}(function(e){for(var t=Array(),n=(1<<S)-1,o=0;o<e.length*S;o+=S)t[o>>5]|=(e.charCodeAt(o/S)&n)<<o%32;return t}(e),e.length*S),n="0123456789abcdef",o="",i=0;i<4*t.length;i++)o+=n.charAt(t[i>>2]>>i%4*8+4&15)+n.charAt(t[i>>2]>>i%4*8&15);return o}function k(e,t,n,o,i,r){return E((t=E(E(t,e),E(o,r)))<<i|t>>>32-i,n)}function P(e,t,n,o,i,r,u){return k(t&n|~t&o,e,t,i,r,u)}function x(e,t,n,o,i,r,u){return k(t&o|n&~o,e,t,i,r,u)}function j(e,t,n,o,i,r,u){return k(t^n^o,e,t,i,r,u)}function I(e,t,n,o,i,r,u){return k(n^(t|~o),e,t,i,r,u)}function E(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}(C=_=_||{})[C.Unknown=-1]="Unknown",C[C.RegToString=0]="RegToString",C[C.DefineId=1]="DefineId",C[C.Size=2]="Size",C[C.DateToString=3]="DateToString",C[C.FuncToString=4]="FuncToString",C[C.Debugger=5]="Debugger",C[C.Performance=6]="Performance",C[C.DebugLib=7]="DebugLib";var _,A=function(){function n(e){var t=e.type,e=e.enabled,e=void 0===e||e;o(this,n),this.type=_.Unknown,this.enabled=!0,this.type=t,this.enabled=e,this.enabled&&(t=this,N.push(t),this.init())}return u(n,[{key:"onDevToolOpen",value:function(){var e;console.warn("You ar not allow to use DEVTOOL! 【type = ".concat(this.type,"】")),b.clearIntervalWhenDevOpenTrigger&&y(),window.clearTimeout(X),b.ondevtoolopen(this.type,Y),e=this.type,t[e]=!0}},{key:"init",value:function(){}}]),n}(),C=function(){n(t,A);var e=l(t);function t(){return o(this,t),e.call(this,{type:_.RegToString,enabled:p.qqBrowser||p.firefox})}return u(t,[{key:"init",value:function(){var t=this;this.lastTime=0,this.reg=/./,w(this.reg),this.reg.toString=function(){var e;return p.qqBrowser?(e=(new Date).getTime(),t.lastTime&&e-t.lastTime<100?t.onDevToolOpen():t.lastTime=e):p.firefox&&t.onDevToolOpen(),""}}},{key:"detect",value:function(){w(this.reg)}}]),t}(),oe=function(){n(t,A);var e=l(t);function t(){return o(this,t),e.call(this,{type:_.DefineId})}return u(t,[{key:"init",value:function(){var e=this;this.div=document.createElement("div"),this.div.__defineGetter__("id",function(){e.onDevToolOpen()}),Object.defineProperty(this.div,"id",{get:function(){e.onDevToolOpen()}})}},{key:"detect",value:function(){w(this.div)}}]),t}(),ie=function(){n(t,A);var e=l(t);function t(){return o(this,t),e.call(this,{type:_.Size,enabled:!p.iframe&&!p.edge})}return u(t,[{key:"init",value:function(){var e=this;this.checkWindowSizeUneven(),window.addEventListener("resize",function(){setTimeout(function(){e.checkWindowSizeUneven()},100)},!0)}},{key:"detect",value:function(){}},{key:"checkWindowSizeUneven",value:function(){var e=function(){if(re(window.devicePixelRatio))return window.devicePixelRatio;var e=window.screen;return!(re(e)||!e.deviceXDPI||!e.logicalXDPI)&&e.deviceXDPI/e.logicalXDPI}();if(!1!==e){var t=200<window.outerWidth-window.innerWidth*e,e=300<window.outerHeight-window.innerHeight*e;if(t||e)return this.onDevToolOpen(),!1;v(this.type)}return!0}}]),t}();function re(e){return null!=e}var R,ue=function(){n(t,A);var e=l(t);function t(){return o(this,t),e.call(this,{type:_.DateToString,enabled:!p.iosChrome&&!p.iosEdge})}return u(t,[{key:"init",value:function(){var e=this;this.count=0,this.date=new Date,this.date.toString=function(){return e.count++,""}}},{key:"detect",value:function(){this.count=0,w(this.date),T(),2<=this.count&&this.onDevToolOpen()}}]),t}(),ce=function(){n(t,A);var e=l(t);function t(){return o(this,t),e.call(this,{type:_.FuncToString,enabled:!p.iosChrome&&!p.iosEdge})}return u(t,[{key:"init",value:function(){var e=this;this.count=0,this.func=function(){},this.func.toString=function(){return e.count++,""}}},{key:"detect",value:function(){this.count=0,w(this.func),T(),2<=this.count&&this.onDevToolOpen()}}]),t}(),ae=function(){n(t,A);var e=l(t);function t(){return o(this,t),e.call(this,{type:_.Debugger,enabled:p.iosChrome||p.iosEdge})}return u(t,[{key:"detect",value:function(){var e=h();100<h()-e&&this.onDevToolOpen()}}]),t}(),le=function(){n(t,A);var e=l(t);function t(){return o(this,t),e.call(this,{type:_.Performance,enabled:p.chrome})}return u(t,[{key:"init",value:function(){this.maxPrintTime=0,this.largeObjectArray=H()}},{key:"detect",value:function(){var e=this,t=B(function(){g(e.largeObjectArray)}),n=B(function(){w(e.largeObjectArray)});if(this.maxPrintTime=Math.max(this.maxPrintTime,n),T(),0===t||0===this.maxPrintTime)return!1;t>10*this.maxPrintTime&&this.onDevToolOpen()}}]),t}(),fe=function(){n(t,A);var e=l(t);function t(){return o(this,t),e.call(this,{type:_.DebugLib})}return u(t,[{key:"init",value:function(){}},{key:"detect",value:function(){var e;(!0===(null==(e=null==(e=window.eruda)?void 0:e._devTools)?void 0:e._isShow)||window._vcOrigConsole&&window.document.querySelector("#__vconsole.vc-toggle"))&&this.onDevToolOpen()}}]),t}(),se=(e(R={},_.RegToString,C),e(R,_.DefineId,oe),e(R,_.Size,ie),e(R,_.DateToString,ue),e(R,_.FuncToString,ce),e(R,_.Debugger,ae),e(R,_.Performance,le),e(R,_.DebugLib,fe),R);var L=Object.assign(function(e){if(U(),Z=p.ie?(w=function(){return m.log.apply(m,arguments)},g=function(){return m.table.apply(m,arguments)},function(){return m.clear()}):(w=m.log,g=m.table,m.clear),Q(e),!(b.md5&&ne(function(e){var t=window.location.search,n=window.location.hash;if(""!==(t=""===t&&""!==n?"?".concat(n.split("?")[1]):t)&&void 0!==t){n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),e=t.substr(1).match(n);if(null!=e)return unescape(e[2])}return""}(b.tkName))===b.md5||b.seo&&p.seoBot)){L.isRunning=!0,G(L);var t=L,n=(ee=function(){return t.isSuspend},window.top),o=window.parent;if(O(window),b.disableIframeParents&&n&&o&&n!==window){for(;o!==n;)O(o),o=o.parent;O(n)}("all"===b.detectors?Object.keys(se):b.detectors).forEach(function(e){new se[e]})}},{isRunning:!1,isSuspend:!1,md5:ne,version:"0.3.4",DetectorType:_,isDevToolOpened:z});C=function(){if(!window||!window.document)return null;var n=document.querySelector("[disable-devtool-auto]");if(!n)return null;var o=["disable-menu","disable-select","disable-copy","disable-cut","disable-paste","clear-log"],i=["interval"],r={};return["md5","url","tk-name","detectors"].concat(o,i).forEach(function(e){var t=n.getAttribute(e);null!==t&&(-1!==i.indexOf(e)?t=parseInt(t):-1!==o.indexOf(e)?t="false"!==t:"detector"===e&&"all"!==t&&(t=t.split(" ")),r[function(e){if(-1===e.indexOf("-"))return e;var t=!1;return e.split("").map(function(e){return"-"===e?(t=!0,""):t?(t=!1,e.toUpperCase()):e}).join("")}(e)]=t)}),r}();return C&&L(C),L});