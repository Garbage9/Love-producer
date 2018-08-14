function getEl(Sel, isAll) {
    if(isAll) {
        return document.querySelectorAll(Sel);
    }else {
        return document.querySelector(Sel);
    }
}
function getStyle(el, attr) {
    if(el.currentStyle) {
        return el.currentStyle[attr];
    }else {
        return getComputedStyle(el, null)[attr];
    }
}
    //获取DOM元素
var role = getEl(".role"),
    download = getEl(".download"),
    group = getEl(".group"),
    explain = getEl(".explain"),
    shutBtn = getEl(".shutBtn"),
    cover = getEl("#cover"),
    coverBtn = getEl(".coverBtn"),
    publicity = getEl(".publicity"),
    img  = getEl(".img",true),
    idot = getEl(".idot",true),
    imgBox = getEl(".img_box"),
    loading = getEl(".loading");

    //下载按钮
function downloadShow() {
    download.style.display = "none";
    role.classList.add("hide");
    role.classList.remove("pull");
}
function roleBtnClick(){
    role.onclick = function () {
        if(role.classList.contains("pull")){
            download.style.display = "none";
            role.classList.add("hide");
            role.classList.remove("pull");
        }else if(role.classList.contains("hide")){
            download.style.display = "block";
            role.classList.add("pull");
            role.classList.remove("hide");
        }
    }
    group.onmouseover = function () {
        explain.style.display = "block"
    }
    group.onmouseout = function () {
        explain.style.display = "none"
    }
}
//群信息

function covers() {
    //角色点击事件
    coverBtn.onclick = function () {
        cover.classList.remove("hide");
        cover.classList.add("show");
    }
    shutBtn.onclick = function () {
        cover.classList.add("hide");
        cover.classList.remove("show");
    }
}


//小轮播图
function roll() {
    var curIndex = 0,
        maxIndex = 1,
        isAnimating = false,
        timer = null;
    for(var i = 0, len = idot.length; i < len; i++) {
        // 动态设置小圆点下标
        idot[i].dataset.index = i;
        idot[i].onclick = function() {
            var tarIndex = this.dataset.index;
            if(tarIndex == curIndex || isAnimating) {
                return;
            }
            var offset = -publicity.offsetWidth * (tarIndex - curIndex);
            // 更新当前下标位置
            curIndex = tarIndex;
            tab(offset);
            changeIdot();
        }
    }

    play();
    publicity.onmouseenter = stop;
    publicity.onmouseleave = play;
    // 封装
    function tab(offset) {
        isAnimating = true;
        var interval = 15,
            duration = 600,
            frames   = duration / interval,
            speed    = Math.ceil(offset / frames);

        var curLeft  = parseInt(getStyle(imgBox, "left"));
        tarLeft  = curLeft + offset;
        var t = setInterval(function() {
            // 更新当前值
            curLeft  = parseInt(getStyle(imgBox, "left"));
            if((offset < 0 && curLeft > tarLeft) || (offset > 0 && curLeft < tarLeft)) {
                imgBox.style.left = curLeft + speed + "px";
            }else {
                clearInterval(t);
                t = null;
                isAnimating = false;
                imgBox.style.left = tarLeft + "px";
                var imgW = publicity.offsetWidth;
                if(parseInt(imgBox.style.left) < -2 * imgW) {
                    imgBox.style.left = -imgW + "px";
                }else if(parseInt(imgBox.style.left) > -imgW) {
                    imgBox.style.left = -2 * imgW + "px";
                }
            }
        }, interval);
    }
    //小圆点
    function changeIdot() {
        for(var i = 0, len = idot.length; i < len; i++) {
            if(idot[i].classList.contains("show")) {
                idot[i].classList.remove("show")
                break;
            }
        }
        idot[curIndex].classList.add("show");
    }
    function play() {
        timer = setInterval(function(){
            if(isAnimating) {return;}
            if(curIndex == maxIndex) {
                curIndex = 0
            }else {
                ++curIndex;
            }
            tab(-publicity.offsetWidth);
            changeIdot();
        }, 2800);
    }
    function stop() {
        clearInterval(timer);
        timer = null;
    }
}
//Loading
window.onload = function () {
    setTimeout(function () {
        loading.style.display = "none";
    },1500)
}
