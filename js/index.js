var video = getEl(".video"),
    news = getEl(".news"),
    role = getEl(".role"),
    hide = getEl(".hide"),
    download = getEl(".download"),
    group    = getEl(".group")
    explain  = getEl(".explain"),
    videoBg = getEl(".video_bg"),
    shut    = getEl(".shut"),
    myVideo = getEl("#myVideo");

(function () {
    var url = window.location.search;
    var num = url.slice((url.indexOf("num"))+4,(url.indexOf("num"))+10);
    //视频
    myVideo.pause();
    video.onclick = function () {
        videoBg.style.display = "block";
        myVideo.play();
    }
    shut.onclick = function () {
        videoBg.style.display = "none";
        myVideo.pause();
    }
    //轮播图
    roll();
    //下载按钮
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
    //群信息
    group.onmouseover = function () {
        explain.style.display = "block"
    }
    group.onmouseout = function () {
        explain.style.display = "none"
    }
})();
//新闻
$(function () {
    var data = null;
    $.ajax({
        url:"./JSON/data.json",
        type:"GET",
        success:function (response) {
            data = response.news;
            updateHtml();
        }
    })
    function updateHtml() {
        var htmlStr = "";
        var index = 5;
        for(var i = 0;i < index - 1;i++){
            htmlStr +=`
            <li>
                        <a href="../pages/newspaper.html?num=${data[i].id}">
                            <h4>${data[i].title}</h4>
                            <span>${data[i].time}</span>
                        </a>
                    </li>
            `;
        }
        $(".list").html(htmlStr);
    }
    //角色跳转
    covers();
    //下载
    roleBtnClick();    
});