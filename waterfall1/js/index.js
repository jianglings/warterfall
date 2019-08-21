oLi = document.getElementsByTagName('li');
var flag = false;
var num =1;
function sendAjax() {
    if (!flag) {
        ajax('GET', 'http://localhost/waterfall/getPics.php', dealDate, 'cpage='+num, true);
        falg = true;
        // 发送请求后
        num++;
    }

}
sendAjax();

// var data = '[{\
// "id": "672900",\
// "title": "Cafe Racer & Scrambler on Inspirationde", \
// "width": "770", \
// "height": "770",\
// "image": "http:\/\/www.wookmark.com\/images\/original\/672900_wookmark.jpg"\
// }]';
// console.log(data);
function dealDate(data) {
    var data = JSON.parse(data);
    // console.log(data);
    // 拼接,遍历循环插入到当前height最短的一栏
    data.forEach(ele => {
        var oItem = document.createElement('div');
        oItem.className = 'item';
        var oImg = new Image();
        oImg.src = ele.image;
        // 图片可能未加载成功，但是高度可获取
        oImg.height = 230 * ele.height / ele.width;
        oItem.appendChild(oImg);
        oLi[findShortest(oLi)].appendChild(oItem);

    });
    falg = false;
}
// dealDate(data);

function findShortest(list) {
    var len = list.length;
    var min = list[0].offsetHeight;
    var index = 0;
    for (var i = 1; i < len; i++) {
        var h = list[i].offsetHeight;
        if (h < min) {
            min = h;
            index = i;
        }
    }
    return index;
}

/**
 * for 遍历很快速，图片加载速度较慢   -->
 *  上次高度是最短的，应插入一张图片，但是由于图片未加载成功
 *  导致占用高度不完全，下一次可能还是高度最短的列，会继续加载
 *  图片在该列
 *
 *
 * 利用返回数据的宽高  oImg.height = 230 * ele.height/ele.width;
 * 
 * 需要加载数据：
 *      滚动出去的高度 + 窗口的高度 > 最短列的高度 
 */

window.onscroll = function () {
    var index = findShortest(oLi);
    var h = oLi[index].offsetHeight;

    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;


    if (h < scrollHeight + clientHeight) {
        sendAjax();
    }
}

/**
 * 滚动条滚到底  满足 滚动出去的高度 + 窗口的高度 > 最短列的高度
 * 会发送请求，但是图片还未加载成功时，一直继续滚动滚动条
 * 会多次处罚window.onscroll ，会多次发送Ajax请求
 *
 *
 * 当正在发送Ajax请求时，不应该再发送Ajax请求   falg
 */