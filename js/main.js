const navPersonInfoBtn = document.getElementById('nav-personInfo');
const mainHotBtn = document.getElementsByClassName('main-hot-btn');
const mainHtmlBtn = document.getElementsByClassName('main-html-btn');
const mainCssBtn = document.getElementsByClassName('main-css-btn');
const photoPersonInfoBtn = document.getElementById('photo-nav-list-personInfo');
const photoChangePwdBtn = document.getElementById('photo-nav-list-changePwd');
const photoMyCollectionBtn = document.getElementById('photo-nav-list-myCollection');
const photoMyNoteBtn = document.getElementById('photo-nav-list-myNote');
const photoMyTaskBtn = document.getElementById('photo-nav-list-myTask');
const photoExitBtn = document.getElementById('photo-nav-list-exit');
const navPhoto = document.getElementById("nav-photo");
const exit = document.getElementById('photo-nav-list-exit');

//.......................................................................................
window.location.hash = "mainHotSectionPage";
window.oldUrl = window.location.hash;

window.onload = function () {  
    $.ajax({
        method: 'post',
        url: 'http://www.ftusix.com/static/data/topicList.php',
        data: {
            "type":'0',    //类型，0为全部 ，如果index为true则1.html 2.php 3.java     index为false则 1.经验分享 2.入门学习 3.成果分享,
            "sort":"new",  //排序
            "page":'1',   //页码 null则为第一页默认页
            "index":'ture',  //是否为首页列表


        },
        aysn: 'ture',
        success: function (value) {
            console.log(value);
        },
        error: function (value) {
            console.log(value);
        }

    });
};

$.clickHref(navPersonInfoBtn, "personInfo.html");
$.clickHref(exit, "login.html");
$.clickHref(photoPersonInfoBtn, "personInfo.html");
$.clickHref(photoChangePwdBtn, "personInfo.html", "changePwdPage");
$.clickHash(photoMyCollectionBtn, "myCollectionPage");
$.clickHash(photoMyNoteBtn, "myNotePage");
$.clickHash(photoMyTaskBtn, "myTaskPage");
$.clickHref(photoExitBtn, "index.html");

for (let i = 0; i < mainHotBtn.length; i++) {
    $.clickHash(mainHotBtn[i], "mainHotSectionPage");
    $.clickHash(mainHtmlBtn[i], "mainHtmlPage");
    $.clickHash(mainCssBtn[i], "mainCssPage");
}

var photoUrl = 'http://www.ftusix.com/static/data/upload/' + sessionStorage.photo;
navPhoto.style.backgroundImage = "url(" + photoUrl + ")";
//onhashchange事件
window.addEventListener("hashchange", function () {
    $.goPage();
}, false);

setInterval(function () { //不断获取轮播图大小，来保证当窗口缩小时正常   
    window.a = document.getElementById('wrap');
}, 13);

(function () {
    const lbtn = document.getElementById("lbtn");
    const rbtn = document.getElementById("rbtn");
    const img = document.getElementById("img-box").getElementsByTagName("li");
    var n = 0;
    var x = 0;
    img[n].style.display = 'block';
    img[n].style.left = x + 'px';
    for (var i = 0; i <= img.length - 1; i++) {
        img.index = i;
    }
    autoWrap();

    function autoWrap() {

        window.autoW = setInterval(function () {
            var left = 0;
            var left1 = a.offsetWidth;
            var ln = n;
            //当前图片左移   
            var time1 = setInterval(function () {
                left = left - 20;
                if (left < -1100) { //此处应该为图片实际宽度
                    left = -1100;
                    clearInterval(time1);
                }
                img[ln].style.left = left + 'px';
            }, 13);
            n++;
            if (n >= img.length) {
                n = 0;
            }
            var time2 = setInterval(function () {
                left1 = left1 - 20;
                if (left1 <= 0) {
                    left1 = 0;
                    clearInterval(time2);
                }
                img[n].style.left = left1 + 'px';
            }, 13);
        }, 4000);
    }
    rbtn.onclick = function () {
        clearInterval(autoW);
        var left = 0;
        var left1 = a.offsetWidth;
        var ln = n;
        //当前图片左移   
        var time1 = setInterval(function () {
            left = left - 20;
            if (left < -1100) {
                left = -1100;
                clearInterval(time1);
            }
            img[ln].style.left = left + 'px';
        }, 13);
        n++;
        if (n >= img.length) {
            n = 0;
        }
        var time2 = setInterval(function () {
            left1 = left1 - 20;
            if (left1 <= 0) {
                left1 = 0;
                clearInterval(time2);
            }
            img[n].style.left = left1 + 'px';
        }, 13);
        autoWrap();
    };

    lbtn.onclick = function () {
        clearInterval(autoW);
        var left = 0;
        var left1 = -a.offsetWidth;
        var ln = n;
        var time1 = setInterval(function () {
            left = left + 20;
            if (left > a.offsetWidth) {
                left = a.offsetWidth;
                clearInterval(time1);
            }
            img[ln].style.left = left + 'px';
        }, 13);
        n--;
        if (n <= 0) {
            n = 4;
        }
        var time2 = setInterval(function () {
            left1 = left1 + 20;
            if (left1 >= 0) {
                left1 = 0;
                clearInterval(time2);
            }
            img[n].style.left = left1 + 'px';
        }, 13);
        autoWrap();
    };
})();