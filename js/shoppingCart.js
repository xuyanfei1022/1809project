$(function () {
    $(".header").load("public_header.html")
    $(".footer").load("public_footer.html")

    $.ajax({
        type: "get",
        url: "php/getShoppingCart.php",
        async: true,
        dataType: "json",
        data: {
            vipName: getCookie("userId")
        },
        success: function (data) {
            // console.log(data);
            if(getCookie("userId")!=""){
                createUI(data)
            }

        }
    })

})

function createUI(data) {
    var str = ""
    for (let i in data) {
        str += `<div class="list_goods">
        <div class="input_conteiner">
            <input type="checkbox">
        </div>
        <ul class="allInfo">
            <li class="goods_info">
                <div class="cart_left_img">
                    <img width=100 height=100 src="${data[i].goodsImg}" alt="">
                </div>
                <div class="cart_goods_desc">
                    <h5>${data[i].goodsName}</h5>
                    <p>${data[i].goodsDesc}</p>
                    <span>${data[i].beiyong1}</span>
                </div>
            </li>
            <li class="perPrice">
                <p class="shijia">￥<span>${data[i].goodsPrice}</span></p>
                <p class="zhekou">￥4999.00</p>
            </li>
            <li class="count">
                <div class="auto_box">
                    <div class="jian">－</div>
                    <input class="g_count" type="text" value="${data[i].goodsCount}">
                    <div class="add">＋</div>
                    <span id="goodsId">${data[i].goodsId}</span>
                </div>
            </li>
            <li class="jin_e g_price">￥<span></span></li>
            <li class="active delete">移除商品</li>
        </ul>
    </div>`
    }
    $("#new_list").append(str);

    // var count = parseInt($(".g_count").val())
    increase() //调用加数量
    reduce() //调用减数量
    perGoodsMoney();
    zongjia();
    //点击加号增加数量
    function increase() {
        $(".add").each(function () {
            $(this).click(function () {
                let count = parseInt($(this).prev().val())
                count += 1
                $(this).prev().val(count)
                perGoodsMoney();
                zongjia();
                $.ajax({
                    type: "get",
                    url: "php/updateGoodsCount.php",
                    async: true,
                    data: {
                        vipName: getCookie("userId"),
                        goodsId:$(this).next().html(),
                        goodsCount:count
                    }
                })
            })
        })
    }

    //点击减号减小数量
    function reduce() {
        $(".jian").each(function () {
            $(this).click(function () {
                let count = parseInt($(this).next().val())
                if (count > 1) {
                    count -= 1
                    $(this).next().val(count)
                }
                perGoodsMoney();
                zongjia();
                $.ajax({
                    type: "get",
                    url: "php/updateGoodsCount.php",
                    async: true,
                    data: {
                        vipName: getCookie("userId"),
                        goodsId:$(this).next().next().next().html(),
                        goodsCount:count
                    }
                })
            })
        })
    }

    //点击删除商品
    $(".delete").each(function () {
        $(this).click(function () {
            let sure = window.confirm("亲，确定要删除吗？");
            if (sure) {
                $(this).parent().parent().animate({
                    opacity: 0
                }, 1000, function () {
                    $(this).remove();
                    zongjia();
                    $.ajax({
                        type: "get",
                        url: "php/deleteGoods.php",
                        async: true,
                        data: {
                            vipName: getCookie("userId"),
                            goodsId:$(this).find("#goodsId").html()
                        }
                    })
                })
            }
        })
    })

    // 计算金额的函数
    function perGoodsMoney() {
        $(".g_count").each(function () {
            let perCount = parseInt($(this).val());
            let perMoney = parseInt($(this).parent().parent().prev().find(".shijia span").text());
            let totalMoney = perMoney * perCount * 1.00;
            $(this).parent().parent().next().find("span").html(totalMoney);
        })
    }

    //计算总价的额函数
    function zongjia() {
        let total = 0
        $(".g_price span").each(function () {
            total += parseInt($(this).html())
        })
        $(".totalMoney").html(`￥${total}`)
    }

    // 全选按钮的jQuery对象.函数名(所有被控制的复选框jQuery对象，反选的按钮对象)    
    //  $("#chkAll").bindCheckAll($(":checkbox").not("#chkAll"), $("#fanxuan"));


}