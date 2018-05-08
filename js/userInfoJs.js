
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
//  .......

initInfo();
window.location.hash = "userInfoPage";
window.oldUrl = window.location.hash;



photoInfoBtn.addEventListener('click',function(){
    window.location.hash = "userInfoPage";    
},false);
photoChangePwdBtn.addEventListener('click',function(){
    window.location.hash = "changePwdPage";    
},false);
photoMyCollectionBtn.addEventListener('click',function(){
    window.location.hash = "myCollectionPage";    
},false);
photoMyNoteBtn.addEventListener('click',function(){
    window.location.hash = "myNotePage";    
},false);
photoMyTaskBtn.addEventListener('click',function(){
    window.location.hash = "myTaskPage";    
},false);
photoExitBtn.addEventListener('click',function(){
    window.location.href = "index.html";    
},false);

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
    myTaskBtn[i].addEventListener("click",function(){
        window.location.hash = "myTaskPage";
    },false);
}


//onhashchange事件
window.addEventListener("hashchange", function () {
    $.goPage();
}, false);



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

 
