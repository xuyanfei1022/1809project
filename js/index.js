$(function () {
    //移动端的二维码
    $("#mob").hover(function () {
        $(".m_erweima").css({
            display: "block"
        })
        $(".m_p").css({
            display: "block"
        })
    }, function () {
        $(".m_erweima").css({
            display: "none"
        })
        $(".m_p").css({
            display: "none"
        })
    })

    // 顶部的导航栏的固定
    $(window).scroll(function(){
        if($(document).scrollTop() > 40){
            $(".logo_container").css({
                "position":"fixed",
                "left":"50%",
                "marginLeft":"-631px",
                "top":0,
                "z-index":5
            })
        }else{
            $(".logo_container").css({
                "position":"static",
                "margin":"0 auto"
            })
        }
    })


    //向上滑出的盒子
    $(".pro_container").hover(function () {
        $(this).find(".pro_hover").stop().animate({
            bottom: 0
        }, 300)
    }, function () {
        $(this).find(".pro_hover").stop().animate({
            bottom: -96
        }, 300)
    })

    //返回顶部动画
    $(window).scroll(function () {
        if ($(document).scrollTop() < 700) {
            $("#back").css({
                "display": "none"
            })
        } else {
            $("#back").css({
                "display": "block"
            })
        }
    })
    //点击按钮返回顶部
    $("#back").click(function () {
        $("html,body").animate({
            "scrollTop": 0
        }, 800)
    })




})