$(function () {

    $(".header").load("public_header.html")
    $(".footer").load("public_footer.html")
    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    //接收URL中的参数goodsId
    var id = getUrlParam('goodsId');
    console.log('id:' + id);

    $.ajax({
        type: "get",
        url: "php/getGoodsInfo.php",
        async: true,
        dataType: "json",
        data: {
            goodsId: id,
        },
        success: function (data) {
            console.log(data);
            console.log(getCookie("userId"))
            createUI(data);
        }
    })


    function createUI(data) {
        var str = "";
        str += `<div class="img_container">
    <div class="left_img">
        <div class="imgbox">
            <img width=500 height=500 src="${data.goodsImg}" alt="">
        </div>
        <div class="small_img">
            <p><img class="zuojian" src="img/zuo.png" alt=""></p>
            <ul>
                <li><img width=60 height=60 src="${data.goodsImg}" /></li>
                <li><img width=60 height=60 src="img/201811100326274512.jpg" /></li>
                <li><img width=60 height=60 src="img/201811100326271481.jpg" /></li>
                <li><img width=60 height=60 src="img/201811100326275107.jpg" /></li>
            </ul>
            <p class="youjian"><img src="img/you.png" alt=""></p>
        </div>
    </div>
    <!-- 右边的信息 -->
    <div class="right_text">
        <h2>${data.goodsName}</h2>
        <div>
            <p class="g_desc">${data.goodsDesc}</p>
        </div>
        <div class="price">
            <span class="">售价</span>
            <p class="sell_price">￥${data.goodsPrice}</p>
        </div>
        <div class="huodong"></div>
        <div class="yunshu">
            <span class="yunfei">运费</span>
            <p class="baoyou">全场包邮</p>
        </div>
        <div class="version">
            <span>版本</span>
            <ul>
                <li class="one_ver"><a href="##">${data.goodsName}</a></li>
                <li><a href="##"> 55H10(送挂架)</a></li>
            </ul>
        </div>
        <div class="shuliang">
            <div class="count_tit">数量</div>
            <span id="jian">－</span>
            <input id="count" type="text" value="1">
            <span id="add">＋</span> &nbsp;&nbsp;件
        </div>
        <div class="yunshu">
            <span class="yunfei">服务</span>
            <p class="baoyou">由<a href="##">${data.beiyong1} </a>发货，并提供售后服务</p>
        </div>

        <div class="shopping">
            <a id="add_cart" href="shoppingCart.html">加入购物车</a>
            <a id="gobuy" href="shoppingCart.html">立即购买</a>
        </div>
    </div>
</div>`
        $(".info_box").append(str)

        //划过小图片让大盒子的的图片改变
        $(".small_img li img").hover(function () {
            // console.log($(this).attr('src'))
            $(".imgbox img").attr('src', $(this).attr('src'));
        })


        var count = parseInt($("#count").val())
        increase() //调用加数量
        reduce() //调用减数量

        //点击加号增加数量
        function increase() {
            $("#add").click(function () {
                count += 1
                // console.log(count)
                $("#count").val(count)
            })
        }

        //点击减号减小数量
        function reduce() {
            $("#jian").click(function () {
                if (count > 1) {
                    count -= 1
                    console.log(count)
                    $("#count").val(count)
                }
            })
        }

        //点击加入购物车保存到购物侧表里面
        $("#add_cart").click(function () {
            if (getCookie("userId") != "") {
                $.ajax({
                    type: "get",
                    url: "php/addShoppingCart.php",
                    async: true,
                    data: {
                        vipName: getCookie("userId"),
                        goodsId: id,
                        goodsCount: count
                    },
                    success: function () {
                        alert("保存成功！");
                        // location.href = "shoppingCart.html"
                    }
                })
            } else {
                alert("亲，请登录");
                // location.href = "login.html"
            }
        })
    }
})