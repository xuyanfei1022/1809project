$(function () {
    //手机号码验证
    $("#username").blur(function () {
        if ($("#username").val() == "") {
            alert("亲，手机号不能为空");
        } else {
            testF();
        }
    })

    function testF() {
        let reg = /^[1][3-9]\d{8}\d$/g;
        let isit = reg.test($("#username").val());
        if (!isit) {
            $("#phone_error").css({
                display: "block"
            })
        } else {
            $("#phone_error").css({
                display: "none"
            })
        }
    }

    // 验证码
    function checkma() {
        var str1 = "";
        for (var i = 0; i < 4; i++) {
            str1 += parseInt(Math.random() * 10);
        }
        return str1;
    }

    $(".new_checkma").click(function () {
        var str = checkma();
        $(".check").val(str);
    })

    // 验证码的验证
    $("#in_check").blur(function () {
        if ($("#in_check").val() == "") {
            alert("亲，验证码不能为空");
        } else {
            yanzhengma();
        }
    })

    function yanzhengma() {
        var isright = ($("#in_check").val() == $(".check").val());
        if (!isright) {
            $("#check_error").css({
                display: "block"
            })
        } else {
            $("#check_error").css({
                display: "none"
            })
        }
    }

    // 当输入框的值都不为空时，发送ajax请求
    $("#next_one").click(function(){
        if($("#username").val() != "" && $(".shuru_checkma").val() != ""){
                //1、
                $.post(
                    "php/login.php",
                    {
                        "userId":$("#username").val(),
                        "userPass":$("#mima").val()
                    },
                    function(data){					
                        if(data=="1"){//登录成功！
                            //记录cookie
                            saveCookie("userId",$("#username").val(),1);
                            location.href="index.html";
                        }else{
                            alert("登录失败，用户名或者密码不对！");
                        }
                    }
                );
    
        }
    })
})

//后续要完善的功能：当第二次点击登录按钮时判断：
// 1.如果cookie不为空，则显示已经登录，请不要重复登录.
// 2.否则cookie为空时，可以登录，不显示任何内容