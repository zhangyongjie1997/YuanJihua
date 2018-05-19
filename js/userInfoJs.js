var photo = document.getElementById("personPhoto-img");
var tel = document.getElementById("phoneNumber");
var name = document.getElementById("personName");
var sex = document.getElementsByClassName("sex");
var changePwdTel = document.getElementById("changePwd-tel");
var changePwdBtn = document.querySelectorAll(".changePwd-btn");
var userInfoBtn = document.querySelectorAll(".personInfo-btn");
var myNoteBtn = document.querySelectorAll(".myNote-btn");
var myCollectionBtn = document.querySelectorAll(".myCollection-btn");
var myInfoBtn = document.querySelectorAll(".myInfo-btn");
var myTaskBtn = document.querySelectorAll(".myTask-btn");
var photoInfoBtn = document.getElementById('photo-nav-list-personInfo');
var photoChangePwdBtn = document.getElementById('photo-nav-list-changePwd');
var photoMyCollectionBtn = document.getElementById('photo-nav-list-myCollection');
var photoMyNoteBtn = document.getElementById('photo-nav-list-myNote');
var photoMyTaskBtn = document.getElementById('photo-nav-list-myTask');
var photoExitBtn = document.getElementById('photo-nav-list-exit');
var main = document.getElementById('nav-main');
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