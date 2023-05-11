function XMLProxySubmit(){
    localStorage.setItem("XMLProxyURL", document.getElementById("XMLProxyinput").value);
    mdui.snackbar({
      message: 'XMLProxy设置成功',
      position: 'right-bottom'
    });
}
function ImageProxySubmit(){
    localStorage.setItem("ImageProxyURL", document.getElementById("ImageProxyinput").value);
    mdui.snackbar({
      message: 'ImageProxy设置成功',
      position: 'right-bottom'
    });
}

function LoadNC(){
    document.getElementById("SettingO").innerHTML =`
    <p>备注：目前WRSS并没有官方Proxy服务器 某些订阅<strong>可能不能加载</strong>，解决办法请查看设置文档</p>
    <div class="mdui-typo-headline" style="padding-left: 0.5rem;padding-top: 0.5rem;"><strong>通用</strong></div>
    <div id="SettingO-MainA" class="mdui-card-content">
    <div class="cadata01"><strong>订阅时间排序</strong>  <span>更新时间排序&nbsp;&nbsp;<label class="mdui-switch">
    <input type="checkbox" id="TSSet" />
    <i class="mdui-switch-icon"></i>
</label>&nbsp;&nbsp;发布时间排序</span></div>
<div class="cadata01"><strong>XML订阅代理</strong>
<div class="mdui-textfield">
<label class="mdui-textfield-label">链接</label>
<input class="mdui-textfield-input" type="text" id="XMLProxyinput">
</div>
<button class="mdui-btn mdui-color-theme-accent mdui-ripple" id="XMLProxyinputsubmit" onclick="XMLProxySubmit()">提交</button>
</div>

<div class="cadata01"><strong>图片获取代理</strong>
<div class="mdui-textfield">
<label class="mdui-textfield-label">链接</label>
<input class="mdui-textfield-input" type="text" id="ImageProxyinput">
</div>
<button class="mdui-btn mdui-color-theme-accent mdui-ripple" id="ImageProxyinputsubmit" onclick="ImageProxySubmit()">提交</button>
</div>

</div>
    `
    if(localStorage.getItem("XMLProxyURL")){
        document.getElementById("XMLProxyinput").value = localStorage.getItem("XMLProxyURL");
    }
    if(localStorage.getItem("ImageProxyURL")){
        document.getElementById("ImageProxyinput").value = localStorage.getItem("ImageProxyURL");
    }
}
function bindSwitchStateWithLocalStorage(switchElement, localStorageKey) {
    const switchInput = switchElement.querySelector('input[type="checkbox"]');

    // 将 Switch 的状态初始化为 localstorage 中保存的值
    if (localStorage.getItem(localStorageKey) === 'true') {
      switchInput.checked = true;
    } else {
      switchInput.checked = false;
    }

    // 监听 Switch 的变化，如果变化了就将新的状态保存到 localstorage 中
    switchInput.addEventListener('change', () => {
      localStorage.setItem(localStorageKey, switchInput.checked);
    });
  }

LoadNC()
bindSwitchStateWithLocalStorage(document.querySelector('#TSSet').parentNode, 'TSSet');

var setjsa = {
    data: {
        "desub": []
    },
    init: function() {
        var b = localStorage.getItem('rsssubdata');
        if (b !== null) {
            this.data = JSON.parse(b)
        }
        this.renderList();
        var c = document.getElementById('add-form');
        c.addEventListener('submit', function(a) {
            a.preventDefault();
            setjsa.addItem()
        })
    },
    renderList: function() {
        var a = '';
        for (var i = 0; i < this.data.desub.length; i++) {
            a += '<div class="mdui-list-item">';
            a += '<div class="mdui-list-item-content">';
            a += '<div class="mdui-list-item-title">' + this.data.desub[i].name + '</div>';
            a += '<div class="mdui-list-item-text">';
            a += '<a href="' + this.data.desub[i].url + '" target="_blank">' + this.data.desub[i].url + '</a>';
            a += '</div>';
            a += '</div>';
            a += '<div class="mdui-list-item-action">';
            a += '<button class="mdui-btn mdui-ripple" onclick="setjsa.deleteItem(this.parentNode.parentNode)"><i class="mdui-icon material-icons">&#xe92b;</i></button>';
            a += '</div>';
            a += '</div>'
        }
        document.getElementById('list')
            .innerHTML = a
    },
    addItem: function() {
        var a = document.getElementsByName('name')[0];
        var b = document.getElementsByName('url')[0];
        var c = a.value;
        var d = b.value;
        for (var i = 0; i < this.data.desub.length; i++) {
            if (this.data.desub[i].name === c) {
                mdui.snackbar({
                    message: '该站点名称已存在',
                    position: 'right-bottom'
                });
                return
            }
            if (this.data.desub[i].url === d) {
                mdui.snackbar({
                    message: '该RSS/ATOM链接已存在',
                    position: 'right-bottom'
                });
                return
            }
        }
        if (c === '' || d === '') {
            mdui.snackbar({
                message: '不能为空！',
                position: 'right-bottom'
            })
        } else {
            var e = {
                "name": c,
                "url": d
            };
            this.data.desub.push(e);
            localStorage.setItem('rsssubdata', JSON.stringify(this.data));
            this.renderList();
            a.value = '';
            b.value = '';
            renderFeedList()
            mdui.snackbar({
                message: '已添加：' + c,
                position: 'right-bottom'
            })
        }
    },
    deleteItem: function(a) {
        var b = Array.prototype.indexOf.call(a.parentNode.children, a);
        this.data.desub.splice(b, 1);
        localStorage.setItem('rsssubdata', JSON.stringify(this.data));
        a.remove();
        renderFeedList()
        mdui.snackbar({
            message: '已删除',
            position: 'right-bottom',
        })
    }
};
function LoadNS(){
    document.getElementById("SettingI").innerHTML = `
    <form id="add-form" class="">
    <div class="mdui-typo-headline" style="padding-left: 0.5rem;padding-top: 0.5rem;"><strong>订阅管理</strong></div>
    <div class="mdui-card-content">
        <div class="mdui-textfield">
            <label class="mdui-textfield-label">站点名</label>
            <input class="mdui-textfield-input" type="text" name="name">
        </div>
        <div class="mdui-textfield">
            <label class="mdui-textfield-label">RSS/ATOM链接</label>
            <input class="mdui-textfield-input" type="text" name="url">
        </div>
    </div>
    <div class="mdui-card-actions">
        <button class="mdui-btn mdui-color-theme-accent mdui-ripple" type="submit">添加</button>
    </div>
</form>
<div class="">
    <div class="mdui-card-header"><strong>目前已有</strong></div>
    <div class="mdui-card-content">
        <div id="list"></div>
    </div>
</div>
    `
}
LoadNS()
setjsa.init()
