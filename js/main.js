var navPersonInfoBtn = document.getElementById('nav-personInfo');


navPersonInfoBtn.addEventListener('click',function () {
    window.location.href = "personInfo.html";    
  },false);

setInterval(function () {
    window.a = document.getElementById('wrap');
}, 13);

(function () {
    var lbtn = document.getElementById("lbtn");
    var rbtn = document.getElementById("rbtn");
    var img = document.getElementById("img-box").getElementsByTagName("li");
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