var loginBtn = document.getElementById("login-btn");
var signinBtn = document.getElementById("signin-btn");
var navsigninBtn = document.getElementById("nav-signIn");
var navloginBtn = document.getElementById("nav-login");
var signinNow = document.getElementById("signinNow");
var div = document.getElementById("warning");
var userInfoBtn = document.getElementById("userInfo-btn");
var personInfobtn = document.getElementsByClassName("personInfo-btn");
var changePwdbtn = document.getElementsByClassName("changePwd-btn");
var myArticlebtn = document.getElementsByClassName("myArticle-btn");
window.location.hash = "loginPage";
window.oldUrl = window.location.hash;

//为信息界面按钮添加事件
for(let i=0;i<personInfobtn.length;i++){
    personInfobtn[i].addEventListener("click",function(){
        window.location.hash = "userInfoPage";
    },false);
}
for(let i=0;i<changePwdbtn.length;i++){
    personInfobtn[i].addEventListener("click",function(){
        window.location.hash = "changePwdPage";
    },false);
}
for(let i=0;i<myArticlebtn.length;i++){
    personInfobtn[i].addEventListener("click",function(){
        window.location.hash = "myArticlePage";
    },false);
}

//立即注册按钮事件
signinNow.addEventListener("click",function(){
    window.location.hash = "signInPage";
},false);

//导航栏登录按钮事件
navloginBtn.addEventListener("click", function () {
    window.location.hash = "loginPage";
}, false);

//导航栏注册按钮事件
navsigninBtn.addEventListener("click", function () {
    window.location.hash = "signInPage";
}, false);

//注册按钮事件
signinBtn.addEventListener("click", function () {
    var signInPwd = document.getElementById("password-signIn");
    var signInPwd2 = document.getElementById("password-signIn2");
    if (signInPwd.value != signInPwd2.value) {
        showMsg("两次输入的密码不一致");
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
    var userName = document.getElementById("username");
    var passWord = document.getElementById("password");

    //判断用户名密码是否为空
    if (userName.value == "" || passWord.value == "") {
        showMsg("请输入用户名和密码");
    } else {
        //如果用户名密码不为空则发送请求
        var res;
        var request = new XMLHttpRequest();
        var loginData = {
            "mobile": userName.value,
            "pwd": passWord.value,
        };
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

//判断是否注册成功
function ifSignin(obj){
    if(obj.status == 1){
        showMsg("注册成功,请登录");
        window.location.hash = "loginPage";
    }else{
        showMsg(obj.info);
    }
}


//判断登录是否成功
function ifLogin(obj) {
    if (obj.status == 1) {
        // let navLogin = document.querySelector("#nav-login");
        // let navSignIn = document.querySelector("#nav-signIn");
        // let navWrite = document.querySelector("#nav-write");   
        // navLogin.classList.add("hide");
        // navSignIn.classList.add("hide");
        // navWrite.classList.remove("hide");
        // navWrite.classList.add("cur");
        exUserInfo(obj.data);
        window.location.hash = "personInfo";
    } else {
        showMsg(obj.info);
    }
}

//填写用户信息
function exUserInfo(obj) {
    let photo = document.getElementById("personPhoto-img");
    let tel = document.getElementById("phoneNumber");
    let name = document.getElementById("personName");
    let sex = document.getElementsByClassName("sex");
    let changePwdTel = document.getElementById("changePwd-tel");
    changePwdTel.innerHTML = obj.mobile;
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

//显示登录信息动画
function showMsg(info) {
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
    goPage();
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
