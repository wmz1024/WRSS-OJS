function featFileNF(){
    document.querySelector(".welcome-WFeed-feature").innerHTML = "Feature - Not Found";
}

function initFeature() {
    document.querySelector(".feature-content").innerHTML='';
    var featInitP = new URLSearchParams(location.hash.substr(1)).get("feature");
        
        const featureContentElement = document.querySelector('.feature-content');

        fetch('/assets/feature/html/'+featInitP+".html")
        .then(response => {
          if (!response.ok) {
            throw new Error('文件未找到');
          }
          return response.text();
        })
        .then(html => {
          featureContentElement.innerHTML = html;
        })
        .catch(error => {
          console.error('发生错误:', error);
          featFileNF()
        });
        
}

initFeature()

window.addEventListener('popstate', function () {
    initFeature()
}, false);