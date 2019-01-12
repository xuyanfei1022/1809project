$(function () {
    $(".prod_container").each(function () {
        $(this).hover(function () {
            $(this).css({
                boxShadow: "-2px -2px 10px gray,2px -2px 10px gray"
            })
        }, function () {
            $(this).css({
                boxShadow: "none"
            })
        })
    })
})

$(function () {
    $.ajax({
        type: "get",
        url: "php/getGoodsList.php",
        async: true,
        dataType: "json",
        data: null,
        success: function (data) {
            console.log(data);
            createUI(data);
        }
    })
})

function createUI(data) {
    var str = "";
    for (let i in data) {
        if (data[i].goodsType == "电视") {
            str += `<div class="prod_container">
            <div class="products_box">
                <a href="goodsInfo.html?goodsId=${data[i].goodsId}">
                    <img width=250 height=250 src="${data[i].goodsImg}" alt="">
                </a>
            </div>
            <div class="prod_info">
                <div class="pprice">￥${data[i].goodsPrice}</div>
                <h5>${data[i].goodsName}</h5>
                <p>${data[i].goodsDesc}</p>
            </div>
            <div class="prod_cart">
                <div class="company">
                    <span class="rgb_company">${data[i].beiyong1}</span>
                </div>
                <a class="save_cart" href="#"><img src="img/cart.png" /> 购物车</a>
                <span class="sell">销量:${data[i].beiyong2}</span>
            </div>
        </div>`
        }
    }
    $(".pro_display").append(str);
}

/*
<div class="prod_container">
<div class="products_box">
    <a href="javascript:;">
        <img width=250 height=250 src="img/201810250250575619.jpg" alt="">
    </a>
</div>
<div class="prod_info">
    <div class="pprice">￥1488</div>
    <h5>55H6(送挂架、影视年卡)</h5>
    <p>全面屏|超解像技术|防蓝光|2+32G</p>
</div>
<div class="prod_cart">
    <div class="company">
        <span class="rgb_company">创维-RGB电子有限公司</span>
    </div>
    <a class="save_cart" href="#"><img src="img/cart.png" /> 购物车</a>
    <span class="sell">销量:56</span>
</div>
</div>
*/