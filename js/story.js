var blue = getEl("#blue"),
    red  = getEl("#red"),
    content   = getEl(".content"),
    blueWord  = getEl(".word"),
    redWord   = getEl(".red_word"),
    redWorld  = getEl(".red_world"),
    imgs = getEl(".imgs",true),
    on   = getEl(".on",true),
    worldCt  = getEl(".world_ct"),
    imgs_box = getEl(".imgs_box"),
    flower   = getEl(".flower"),
    circle   = getEl(".circle"),
    bgCircle = getEl(".bg_circle",true),
    ring = getEl(".rings",true);

(function () {
    //一级标题点击事件
    bgBlue();
    blueWord.onclick = function () {
        if(blue.classList.contains("show")){
            blue.classList.add("hide");
            blue.classList.remove("show");
            red.classList.add("show");
            red.classList.remove("hide");
        }
        bgRed();
        petal();
    }
    function redBtn() {
        redWorld.onclick = function () {
            if(red.classList.contains("show")){
                red.classList.add("hide");
                red.classList.remove("show");
                blue.classList.add("show");
                blue.classList.remove("hide");
            }
            bgBlue();
        }
    }
    redBtn();
    redWord.onclick = function () {
        imgs_box.style.display = "none";
        worldCt.style.display = "block";
        petal();
    }
    //二级标题点击事件
    function wordImg(wordImgCentent) {
        for(var i = 0,len = on.length;i < len;i++){
            (function (index) {
                on[index].onclick = function () {
                    imgs_box.style.display = "block";
                    for(var i = 0;i< imgs.length;i++){
                        imgs[i].style.display = "none";
                    }
                    imgs[index].style.display = "block";
                    worldCt.style.display = "none";
                    petal();
                }
            })(i);
        }
    }
    wordImg();
    //花瓣效果
    function petal() {
        var htmlStr = "";
        htmlStr = `
    <div class="flower_one"></div>
    <div class="flower_tow"></div>
        `;
        flower.innerHTML = htmlStr;
    }
    //背景颜色切换
    function bgRed() {
        circle.style.cssText = `
            box-shadow: 0 0 240px #bb2c3d;
    `;
        for (var i = 0,len = ring.length;i < len;i++){
            ring[i].style.cssText = `
                box-shadow: 0 0 25px #bb2c3d;
                opacity: 1;
                background:rgba(0,0,0,0.6);
        `
        }
        for(var i = 0,len = bgCircle.length;i < len;i++){
            bgCircle[i].style.cssText = `
                box-shadow: 0 0 240px #bb2c3d;
                opacity: .5;
            `
        }
    }
    function bgBlue() {
        circle.style.cssText = `
            box-shadow: 0 0 240px #a5a8ec;
    `;
        for (var i = 0,len = ring.length;i < len;i++){
            ring[i].style.cssText = `
                box-shadow: 0 0 25px #a5a8ec;
        `
        }
        for(var i = 0,len = bgCircle.length;i < len;i++){
            bgCircle[i].style.cssText = `
                box-shadow: 0 0 240px #a5a8ec;
                opacity: .1;
                background: #ffffff;
            `
        }
    }
    //角色跳转
    covers();
})();