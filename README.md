# Love-producer

之前玩~~四个野男人~~的游戏，闲的时候用原生仿了官网，活动公告用Ajax导入本地JSON文件

![Q截图2018081418344](C:\Users\admin\Desktop\QQ截图20180814183449.png)

官网的UI很强大，画面感很好！

![Q截图2018081418405](C:\Users\admin\Desktop\QQ截图20180814184054.png)

![Q截图2018081418430](C:\Users\admin\Desktop\QQ截图20180814184304.png)

这里使用了jQuery控制@keyframes、animation等的效果。

> 官网没有登陆注册页面，做了一个Bmob云服务的登陆注册

![Q截图2018081418475](C:\Users\admin\Desktop\QQ截图20180814184753.png)

```js
$(function () {
    //Loading
    window.onload = function () {
        setTimeout(function () {
            $(".loading").hide();
        },1500)
    }
    //注册页面点击显示
    pswd();

    $(".username").bind('input propertychange',function() {
        var getUser = JSON.parse(localStorage.getItem("user"));
        var userName = $(".username").val();
        for (var i in getUser){
            if(userName == getUser[i].name){
                $(".password").val(getUser[i].password);
                $(".remember").prop("checked",true);
            }
        }
    });
    function pswd() {
        var getUser = JSON.parse(localStorage.getItem("user"));
        for (var i in getUser){
            $(".username").val(getUser[i].name);
            $(".password").val(getUser[i].password);
            $(".remember").prop("checked",true);
        }
    }
    Bmob.initialize("00979c17cf62b143c7bd2d87caa95571","2cb5d20b756acb9ea89be715247e6e34");
    var isLogin = true;
    $(".go_register").on("click", function(){
        isLogin = false;
        $(".register").removeClass("hidden");
        $(".login").addClass("hidden");
        $(".btn").text("注册")
    });
    //登陆页面点击显示
    $(".go_login").on("click", function(){
        isLogin = true;
        $(".login").removeClass("hidden");
        $(".register").addClass("hidden");
        $(".btn").text("登陆")
    });
    //blur -> 当元素失去焦点时事件
    $(".input_box input").on("blur", (e) => {
        let $target = $(e.target);
        if(!isLogin) {
            if(!Validate.test($target.prop("className"), $target.val())) {
                $target.parent().addClass("error");
            }else {
                $target.parent().removeClass("error");
            }
        }
    });
    $(".btn").on("click",function () {
        if(isLogin){
            if(!$(".username").val() || !$(".password").val()){
                alert("请输入账号或密码！")
            }else {
                //登陆
                Bmob.User.logIn($(".username").val(),$(".password").val(),{
                    success:function (user) {
                        //记住密码
                        if($(".remember").prop("checked") == true){
                            var rootArr = [],
                                obj     = {};
                            obj.name = $(".username").val();
                            obj.password = $(".password").val();
                            obj.checked = true;
                            rootArr.push(obj);
                            localStorage.setItem("user",JSON.stringify(rootArr));
                        }else if($(".remember").prop("checked") == false){
                            var getUser = JSON.parse(localStorage.getItem("user"));
                            for (var i = 0,len = getUser.length;i <len;i++){
                                    localStorage.removeItem("user");
                                if(getUser[i].checked){
                                    $(".remember").prop("checked") == false;
                                }
                            }
                        }
                        location.href = "../index.html";
                    },
                    error:function () {
                        alert("请输入正确的账号或密码！");
                    }
                });
            }
        }else {
            let isThough = true, isEmpty = false;
            //验证
            $(".input_box").each((index,el) => {
                if($(el).hasClass("error")){
                    isThough = false;
                    return false;
                }
            });
            //信息是否完善
            $(".input_box input").each((index, el) => {
                if(!$(el).val()) {
                    isEmpty = true;
                    return false;
                }
            });
            if(isEmpty){
                alert("请完善信息！")
            }else if(!isThough){
                alert("信息不正确！");
            }else {
                //注册用户
                let user = new Bmob.User();
                user.set("username",$(".username").val());
                user.set("password",$(".password").val());
                user.set("email",$(".email").val());
                user.set("tel",$(".tel").val());
                user.set("idCare",$(".idCare").val());
                user.save(null,{
                    success:function(user) {
                        alert("注册成功！");
                        location.href = "../index.html";
                    },
                    error:function(model,error) {
                        switch(error.code) {
                            case 202: {
                                alert("用户名已存在！");
                            } break;
                            case 203: {
                                alert("邮箱已被注册！");
                            } break;
                        }
                    }
                });
            }
        }
    });
});
```

