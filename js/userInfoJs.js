const photo = document.getElementById("personPhoto-img");
const tel = document.getElementById("phoneNumber");
const name = document.getElementById("personName");
const sex = document.getElementsByClassName("sex");
const changePwdTel = document.getElementById("changePwd-tel");
const changePwdBtn = document.querySelectorAll(".changePwd-btn");
const userInfoBtn = document.querySelectorAll(".personInfo-btn");
const myNoteBtn = document.querySelectorAll(".myNote-btn");
const myCollectionBtn = document.querySelectorAll(".myCollection-btn");
const myInfoBtn = document.querySelectorAll(".myInfo-btn");
const myTaskBtn = document.querySelectorAll(".myTask-btn");
const photoInfoBtn = document.getElementById('photo-nav-list-personInfo');
const photoChangePwdBtn = document.getElementById('photo-nav-list-changePwd');
const photoMyCollectionBtn = document.getElementById('photo-nav-list-myCollection');
const photoMyNoteBtn = document.getElementById('photo-nav-list-myNote');
const photoMyTaskBtn = document.getElementById('photo-nav-list-myTask');
const photoExitBtn = document.getElementById('photo-nav-list-exit');
const main = document.getElementById('nav-main');
const updateInfoBtn = document.getElementById('updateInfo-btn');
//  ...............................................................................
initInfo();
window.location.hash = "userInfoPage";
window.oldUrl = window.location.hash;

$.clickHref(main, "main.html");
$.clickHash(photoInfoBtn, "userInfoPage");
$.clickHash(photoChangePwdBtn, "changePwdPage");
$.clickHash(photoMyCollectionBtn, "myCollectionPage");
$.clickHash(photoMyNoteBtn, "myNotePage");
$.clickHash(photoMyTaskBtn, "myTaskPage");
$.clickHref(photoExitBtn, "index.html");

for (let i = 0; i < userInfoBtn.length; i++) {
    $.clickHash(userInfoBtn[i], "userInfoPage");
    $.clickHash(changePwdBtn[i], "changePwdPage");
    $.clickHash(myNoteBtn[i], "myNotePage");
    $.clickHash(myCollectionBtn[i], "myCollectionPage");
    $.clickHash(myInfoBtn[i], "myInfoPage");
    $.clickHash(myTaskBtn[i], "myTaskPage");
}

//更新个人信息按钮(提交)
updateInfoBtn.addEventListener('click',function(){
    
},false);

//onhashchange事件
window.addEventListener("hashchange", function () {
    $.goPage();
}, false);

function initInfo() {
    var nickname = sessionStorage.name;
    console.log(nickname);
    photo.src = sessionStorage.photo;
    tel.innerHTML = sessionStorage.tel;
    changePwdTel.innerHTML = sessionStorage.tel;
    document.getElementById("personName").value = nickname;
    if (sessionStorage.sex == 0) {
        sex[0].checked = true;
        sex[1].checked = false;
    } else {
        sex[1].checked = true;
        sex[0].checked = false;
    }
}