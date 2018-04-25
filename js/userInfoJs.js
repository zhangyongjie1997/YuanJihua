
var photo = document.getElementById("personPhoto-img");
    tel = document.getElementById("phoneNumber");
    name = document.getElementById("personName");
    sex = document.getElementsByClassName("sex");
    changePwdTel = document.getElementsByClassName("changePwd-tel");
    changePwdBtn = document.querySelector(".changePwd-btn");
    personInfoBtn = document.querySelector(".personInfo-btn");

//  .......

initInfo();
window.location.hash = "personInfoPage";
window.oldUrl = window.location.hash;

changePwdBtn.addEventListener("click",function(){
    window.location.hash = "changePwdPage";
},false);

//onhashchange事件
window.addEventListener("hashchange", function () {
    goPage();
}, false);

//页面跳转方法
function goPage() {
    let nowHash = window.oldUrl.substring(1);
    let nowPage = document.getElementById(nowHash);
    console.log(nowPage+"222"+nowHash);
    let goPage = document.getElementById(window.location.hash.substring(1));
    window.oldUrl = window.location.hash;
    nowPage.classList.remove("cur");
    nowPage.classList.add("hide");
    goPage.classList.remove("hide");
    goPage.classList.add("cur");
}

function initInfo(){
    console.log(localStorage.name);
    //photo.src = localStorage.photo;
    tel.innerHTML = localStorage.tel;
    name.value = localStorage.name;
    if (localStorage.sex == 0) {
        sex[0].checked = true;
        sex[1].checked = false;
    } else {
        sex[1].checked = true;
        sex[0].checked = false;
    }
}

 
