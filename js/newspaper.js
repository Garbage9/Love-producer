
var url = window.location.search;
var num = url.slice((url.indexOf("num"))+4,(url.indexOf("num"))+10);
$(function () {
    //轮播图
    roll();
    //详情页
    var data = null;
    $.ajax({
        url:"../JSON/details.json",
        type:"GET",
        success:function (response) {
            data = response.caption;
            detailsShow();
        }
    })
    //内容
    function detailsShow() {
        for(var i = 0,len = data.length;i < len;i++){
            if(num-1 == i){
                var htmlStr = `
                        <ul>
                            <li>${data[i].ifcos.title}</li>
                            <li></li>
                        </ul>
                        <div class="times">${data[i].ifcos.time}</div>
                        <div class="cont">${data[i].ifcos.content}</div>
                        <div class="introduce">${data[i].ifcos.introduce}</div>
                        <div class="details">
                            <img src="${data[i].ifcos.detailsOne}" alt="">
                            <img src="${data[i].ifcos.detailsTwo}" alt="">
                        </div>
                        <div class="way">${data[i].ifcos.way}</div>
                    `
                $(".contentBox").html(htmlStr);
            }
        }
    }
    //下载
    downloadShow();
    //角色跳转
    covers();
})