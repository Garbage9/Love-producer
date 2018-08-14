
$(function () {
    var data  = null;
    var total = 0;
    var pageIndex = 1;
    $.ajax({
        url: "../JSON/data.json",
        type:"GET",
        success: function (response) {
            data = response.news;
            total = Math.ceil(data.length / 10);
            $(".page").text(total);
            updateHtml(pageIndex);
        }
    })
    //上一页
    $(".front").on("click", function(){
        if(pageIndex == 1) {
            return;
        }else {
            pageIndex--;
        }
        updateHtml(pageIndex);
    });
    //下一页
    $(".later").on("click", function(){
        if(pageIndex == total) {
            return;
        }else {
            pageIndex++;
        }
        updateHtml(pageIndex);
    });
    function updateHtml(page) {
        $(".curPageIndex").text(pageIndex);
        if(page > total || page < 1) {
            alert("页码出现问题!");
            return;
        }else {
            var starIndex = (page - 1) * 10;
            var endIndex = starIndex + 9;
            if(page == total) {
                endIndex = starIndex + data.length % 10 - 1;
            }
            var htmlStrl = "";
            for(var i = starIndex; i <= endIndex; i++) {
                htmlStrl += `
                    <li>
                        <a href="../pages/newspaper.html?num=${data[i].id}">
                            <h4>${data[i].title}</h4>
                            <span>${data[i].time}</span>
                        </a>
                    </li>
                `;
            }
            $(".list").html(htmlStrl);
        }
    }
    //轮播图
    roll();
    //下载
    downloadShow();
    roleBtnClick();
    //角色跳转
    covers();
});