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
    $(".shuru_checkma").blur(function () {
        if ($(".shuru_checkma").val() == "") {
            alert("亲，验证码不能为空");
        } else {
            yanzhengma();
        }
    })

    function yanzhengma() {
        var isright = ($(".shuru_checkma").val() == $(".check").val());
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

    // 当输入框的值都不为空时，进行下一步
    $("#next_one").click(function () {
        if ($("#username").val() != "" && $(".shuru_checkma").val() != "") {
            $(".reg_oneStep").css({
                display: "none"
            })
            $(".reg_twoStep").css({
                display: "block"
            })

            $(".go_line").animate({
                "width": "53%"
            }, 1500)
        }
    })

    // 注册第二页开始
    $("#phone_num").blur(function () {
        if ($("#phone_num").val() == "") {
            alert("亲，手机号不能为空");
        } else {
            testF();

            //验证用户名是否存在
            $.get(
                "php/checkUser.php", {
                    "userId": $("#phone_num").val()
                },
                function (data) {
                    if (data == "1") {
    
                    } else {
                       alert("用户已经存在！")
                    }
                }
            );

        }
    })
    // 密码的验证
    $("#mima").blur(function () {
        checkMima()
    })

    function checkMima() {
        let pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^.&*? ]).*$/gi;
        let str = pattern.test($("#mima").val());
        if (!str) {
            $("#mima_error").css({
                display: "block"
            })
        } else {
            $("#mima_error").css({
                display: "none"
            })
        }
    }

    // 确认密码验证
    $("#sure_mima").blur(function () {
        if ($("#sure_mima").val() != $("#mima").val()) {
            $("#sure_error").css({
                display: "block"
            })
        } else {
            $("#sure_error").css({
                display: "none"
            })
        }
    })

    // 下一步
    $("#last_step").click(function () {
        if ($("#mima").val() != "" && $("#sure_mima").val() != "") {

            reg_succeed();


            $(".reg_twoStep").css({
                display: "none"
            })
            $(".reg_threeStep").css({
                display: "block"
            })

            $(".go_line").animate({
                "width": "100%"
            }, 1500)

        }
    })

    function reg_succeed() {
        $.post(
            "php/addUser01.php",
            {
                "userId":$("#phone_num").val(),
                "userPass":$("#mima").val()
            },
            function(data){					
    
            }
        );
    }


})