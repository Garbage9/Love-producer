
(function() {
    // 获取DOM元素
    var prev      = getEl(".prev"),
        next      = getEl(".next"),
        imgBox    = getEl(".img-box"),
        content = getEl(".content");
    // 定义变量
    var curIndex = 0,
        maxIndex = 5,
        isAnimating = false,
        timer = null;
    // 添加点击事件
    prev.onclick = function() {
        if(isAnimating) {return;}
        if(curIndex == 0) {
            curIndex = maxIndex
        }else {
            --curIndex;
        }
        tab(+content.offsetWidth);
    };
    next.onclick = function() {
        if(isAnimating) {return;}
        if(curIndex == maxIndex) {
            curIndex = 0
        }else {
            ++curIndex;
        }
        tab(-content.offsetWidth)
    }
    play();
    content.onmouseenter = stop;
    content.onmouseleave = play;

    // 封装
    function tab(offset) {
        // 更新动画状态
        isAnimating = true;
        // 帧动画
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
                // 清除定时器
                clearInterval(t);
                t = null;
                isAnimating = false;
                // 更新位置
                imgBox.style.left = tarLeft + "px";
                // 处理边界值
                var imgW = content.offsetWidth;
                if(parseInt(imgBox.style.left) < -4 * imgW) {
                    imgBox.style.left = -imgW + "px";
                }else if(parseInt(imgBox.style.left) > -imgW) {
                    imgBox.style.left = -4 * imgW + "px";
                }
            }
        }, interval);
    }
    function play() {
        timer = setInterval(function(){
            next.onclick();
        }, 3000);
    }
    function stop() {
        clearInterval(timer);
        timer = null;
    }
    //下载
    downloadShow();
    roleBtnClick();    
    //角色跳转
    covers();
})();