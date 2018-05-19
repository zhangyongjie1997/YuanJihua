const loginBtn = document.getElementById("login-btn");
const signinBtn = document.getElementById("signin-btn");
const navsigninBtn = document.getElementById("nav-signIn");
const navloginBtn = document.getElementById("nav-login");
const signinNow = document.getElementById("signinNow");
const alredySignIn = document.getElementById("alredySignIn");
const userName = document.getElementById("username");
const passWord = document.getElementById("password");
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
    const signInPwd = document.getElementById("password-signIn");
    const signInPwd2 = document.getElementById("password-signIn2");
    if (signInPwd.value != signInPwd2.value) {
        $.showMsg("两次输入的密码不一致");
    } else {
        const signInName = document.getElementById("username-signIn");
        const msgCode = document.getElementById("code-number");
        $.ajax({
            method: 'post',
            url: 'http://www.ftusix.com/static/data/register.php',
            aysn: 'ture',
            data: {
                "mobile": signInName.value, //  注册手机号
                "pwd": signInPwd.value, //  注册密码
                "sms_code": msgCode.value,
            },
            aysn: 'ture',
            success: function (value) {
                console.log(value);
                var res = JSON.parse(value.trim());
                //注册成功判断
                ifSignin(res);
            }

        });
    }
}, false);

//登录按钮事件
loginBtn.addEventListener("click", function () {

    //判断用户名密码是否为空
    if (userName.value == "" || passWord.value == "") {
        $.showMsg("请输入用户名和密码");
    } else {
        //如果用户名密码不为空则发送请求
        $.ajax({
            method: 'post',
            url: 'http://www.ftusix.com/static/data/login.php',
            data: {
                "mobile": userName.value,
                "pwd": passWord.value,
            },
            aysn: 'ture',
            success: function (value) {
                console.log(value);
                var res = JSON.parse(value.trim());
                //登录成功判断
                ifLogin(res);
            }

        });
    }
}, false);

//判断保存的用户账号,自动填充登录账号
(function () {
    if (localStorage.oldUserName) {
        userName.value = localStorage.oldUserName;
        passWord.value = '546456';
    }
})();
//判断是否注册成功
function ifSignin(obj) {
    if (obj.status == 1) {
        $.showMsg("注册成功,请登录");
        window.location.hash = "loginPage";
    } else {
        $.showMsg(obj.info);
    }
}
//判断登录是否成功
function ifLogin(obj) {
    if (obj.status == 1) {
        console.log(obj.data[0] + '登录成功');
        console.log(obj.data[0].avatar);
        exUserInfo(obj.data[0]);
        //window.location.href = "personInfo.html";
    } else {
        $.showMsg(obj.info);
    }
}

//填写用户信息
function exUserInfo(data) {
    localStorage.setItem("oldUserName", userName.value); //保存此次登录的账号
    sessionStorage.setItem("tel", data.mobile);
    sessionStorage.setItem("photo", data.avatar);
    sessionStorage.setItem("sex", data.sex);
    sessionStorage.setItem("name", data.nick_name);
}



//onhashchange事件
window.addEventListener("hashchange", function () {
    $.goPage();
}, false);