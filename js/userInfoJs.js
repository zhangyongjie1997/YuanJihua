
var photo = document.getElementById("personPhoto-img");
    tel = document.getElementById("phoneNumber");
    name = document.getElementById("personName");
    sex = document.getElementsByClassName("sex");
    changePwdTel = document.getElementById("changePwd-tel");
    changePwdBtn = document.querySelectorAll(".changePwd-btn");
    userInfoBtn = document.querySelectorAll(".personInfo-btn");
    myNoteBtn = document.querySelectorAll(".myNote-btn");
    myCollectionBtn = document.querySelectorAll(".myCollection-btn");
    myInfoBtn = document.querySelectorAll(".myInfo-btn");
//  .......

initInfo();
window.location.hash = "userInfoPage";
window.oldUrl = window.location.hash;

for(i = 0 ; i < userInfoBtn.length ; i++){
    userInfoBtn[i].addEventListener("click",function(){
        window.location.hash = "userInfoPage";
    },false);
    changePwdBtn[i].addEventListener("click",function(){
        window.location.hash = "changePwdPage";
    },false);
    myNoteBtn[i].addEventListener("click",function(){
        window.location.hash = "myNotePage";
    },false);
    myCollectionBtn[i].addEventListener("click",function(){
        window.location.hash = "myCollectionPage";
    },false);
    myInfoBtn[i].addEventListener("click",function(){
        window.location.hash = "myInfoPage";
    },false);
}


//onhashchange事件
window.addEventListener("hashchange", function () {
    goPage();
}, false);

//页面跳转方法
function goPage() {
    let nowPage = document.getElementById(window.oldUrl.substring(1));
    let goPage = document.getElementById(window.location.hash.substring(1));
    window.oldUrl = window.location.hash;
    nowPage.classList.remove("cur");
    nowPage.classList.add("hide");
    goPage.classList.remove("hide");
    goPage.classList.add("cur");
}

function initInfo(){
    let name = localStorage.name;
    console.log(localStorage.name);
    //photo.src = localStorage.photo;
    tel.innerHTML = localStorage.tel;
    changePwdTel.innerHTML = localStorage.tel;
    name.value = name;
    if (localStorage.sex == 0) {
        sex[0].checked = true;
        sex[1].checked = false;
    } else {
        sex[1].checked = true;
        sex[0].checked = false;
    }
}

 
