var loginBtn = document.getElementById("login-btn");
var signinBtn = document.getElementById("nav-signIn");
var navloginBtn = document.getElementById("nav-login");
var div = document.getElementById("warning");
window.location.hash = "loginPage";
window.oldUrl = window.location.hash;
var res;

//注册按钮事件
navloginBtn.addEventListener("click",function(){
    window.location.hash = "loginPage";
},false);
signinBtn.addEventListener("click", function () {
    window.location.hash = "signInPage";
},false);

//登录按钮事件
loginBtn.addEventListener("click", function () {
    var userName = document.getElementById("username");
    var passWord = document.getElementById("password");
    var request = new XMLHttpRequest();
    var loginData = {
        "mobile": userName.value,
        "pwd": passWord.value,
    };
    //转换json字符串
    // var dataJson = JSON.stringify({
    //     "mobile":"13011072992",    //手机号
    //     "pwd":"123456",            //密码
    //     });


    //判断用户名密码是否为空
    if (userName.value == "" || passWord.value == "") {
        showFailMsg("请输入用户名和密码");
    } else {
        //如果用户名密码不为空则发送请求
        request.open('POST', 'http://yjhapi.agxx.club/iweb/login/check');
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState == 4 & request.status == 200) {
                res = request.responseText;
                res = JSON.parse(res.substring(1));
                //登录成功判断
                ifLogin(res);
                console.log(res);
            }
        };
        request.send(JSON.stringify(loginData));
    }
}, false);

//判断登录是否成功
function ifLogin(obj) {
    if (obj.status == 1) {
        let navLogin = document.querySelector("#nav-login");
        let navSetup = document.querySelector("#nav-setup");
        let navWrite = document.querySelector("#nav-write");
        navLogin.classList.add("hide");
        navSetup.classList.add("hide");
        navWrite.classList.remove("hide");
        navWrite.classList.add("cur");
        exUserInfo(obj.data);
        window.location.hash = "userInfoPage";
    } else {
        showFailMsg(obj.info);
    }
}

//填写用户信息
function exUserInfo(obj) {
    let photo = document.getElementById("personPhoto-img");
    let tel = document.getElementById("phoneNumber");
    let name = document.getElementById("personName");
    let sex = document.getElementsByClassName("sex");
    photo.src = obj.avatar;
    tel.innerHTML = obj.mobile;
    name.value = obj.nick_name;
    if (obj.sex == 0) {
        sex[0].checked = true;
        sex[1].checked = false;
    } else {
        sex[1].checked = true;
        sex[0].checked = false;
    }
}

//登录失败显示登录失败信息
function showFailMsg(info) {
    var top = -45;
    console.log("进入动画函数");
    div.innerHTML = info;
    var time1 = setInterval(function () {
        top = top + 4;
        if (top > 100) {
            clearInterval(time1);
            var time3 = setTimeout(function () {
                var nowtop = 100;
                var time2 = setInterval(function () {
                    nowtop = nowtop - 4;
                    if (nowtop < -45) {
                        clearInterval(time2);
                        clearTimeout(time3);
                    }
                    div.style.top = nowtop + "px";
                }, 13);
            }, 1000);
        }
        div.style.top = top + "px";
    }, 13);
    // window.location.href = "./loginSuccess.html";
}

//onhashchange事件
window.addEventListener("hashchange", function () {
    console.log("进入onhashchange    " + window.location.hash);
    switch (window.location.hash) {
        case "#userInfoPage":
            {
                goPage();
            }
        case "#loginPage":
            {
                goPage();
            }
        case "#signInPage":
            {
                goPage();
            }
    }
}, false);

//页面跳转方法
function goPage() {
    let nowPage = this.document.getElementById(window.oldUrl.substring(1));
    let goPage = this.document.getElementById(window.location.hash.substring(1));
    window.oldUrl = window.location.hash;
    nowPage.classList.remove("cur");
    nowPage.classList.add("hide");
    goPage.classList.remove("hide");
    goPage.classList.add("cur");
}