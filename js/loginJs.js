
var loginBtn = document.getElementById("login-btn");
var signinBtn = document.getElementById("signin-btn");
var navsigninBtn = document.getElementById("nav-signIn");
var navloginBtn = document.getElementById("nav-login");
var signinNow = document.getElementById("signinNow");
var alredySignIn = document.getElementById("alredySignIn");
//............................................................................
window.location.hash = "loginPage";
window.oldUrl = window.location.hash;


$.clickHash(alredySignIn, "loginPage");

//立即注册按钮事件
$.clickHash(signinNow, "signInPage");

//导航栏登录按钮事件
$.clickHash(navloginBtn, "loginPage");

//导航栏注册按钮事件
$.clickHash(navsigninBtn, "signInPage");

//注册按钮事件
signinBtn.addEventListener("click", function () {
    var signInPwd = document.getElementById("password-signIn");
    var signInPwd2 = document.getElementById("password-signIn2");
    if (signInPwd.value != signInPwd2.value) {
        $.showMsg("两次输入的密码不一致");
    } else {
        var res;
        var request = new XMLHttpRequest();
        var signInName = document.getElementById("username-signIn");
        var msgCode = document.getElementById("code-number");
        var signinData = {
            "mobile": signInName.value.substring(1), //  注册手机号
            "pwd": signInPwd.value, //  注册密码
            "sms_code": msgCode.value,
        };
        request.open('POST', 'http://yjhapi.agxx.club/iweb/regist/index');
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState == 4 & request.status == 200) {
                res = request.responseText;
                res = JSON.parse(res.substring(1));
                ifSignin(res);
            }
        };
        request.send(JSON.stringify(signinData));
    }
}, false);

//登录按钮事件
loginBtn.addEventListener("click", function () {
    window.location.href = "personInfo.html";
    
    var userName = document.getElementById("username");
    var passWord = document.getElementById("password");

    //判断用户名密码是否为空
    if (userName.value == "" || passWord.value == "") {
        $.showMsg("请输入用户名和密码");
    } else {
        //如果用户名密码不为空则发送请求
        var res;
        var request = new XMLHttpRequest();
        var loginData = {
            "mobile": userName.value,
            "pwd": passWord.value,
        };
        loginData = JSON.stringify(loginData);
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
        request.send(loginData);
    }
}, false);

//判断是否注册成功
function ifSignin(obj){
    if(obj.status == 1){
        $.showMsg("注册成功,请登录");
        window.location.hash = "loginPage";
    }else{
        $.showMsg(obj.info);
    }
}
//判断登录是否成功
function ifLogin(obj) {
    if (obj.status == 1) {

        exUserInfo(obj.data);
    } else {
        $.showMsg(obj.info);
    }
}

//填写用户信息
function exUserInfo(data) {
    sessionStorage.setItem("tel",data.mobile);
    sessionStorage.setItem("photo",data.avatar);
    sessionStorage.setItem("sex",data.sex);
    sessionStorage.setItem("name",data.nick_name);
}



//onhashchange事件
window.addEventListener("hashchange", function () {
    $.goPage();
}, false);


