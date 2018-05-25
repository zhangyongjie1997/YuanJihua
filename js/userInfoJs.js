const photo = document.getElementById("personPhoto-img");
const navPhoto = document.getElementById("nav-photo");
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
const changePhotoBtn = document.getElementById('changePhoto');
const photoFile = document.querySelector('.load-img');
const changePwd = document.getElementById('changePwd-btn');
const exit = document.getElementById('photo-nav-list-exit');
//  ...............................................................................
initInfo();
window.location.hash = "userInfoPage";
window.oldUrl = window.location.hash;

window.onload = function(){
    console.log(sessionStorage.user_id);
    $.ajax({
        method: 'get',
        url: 'http://www.ftusix.com/static/data/myNote.php',
        data: {
            "user_id":"44",
            "page":"1",
        },
        aysn: 'ture',
        success: function (value) {
            $.ifStatus(value, 'mynote');
        },
        error: function (value) {
            console.log(value);
        }

    });
};
$.clickHref(exit, "login.html");
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
//更新个人信息
updateInfoBtn.addEventListener('click', function () {
    let newSex = 1;
    if (sex[0].checked == true && sex[1].checked == false) {
        newSex = 0;
    }
    // var mdata = {
    //     "sex": newSex,
    //     "nick_name": name.value,
    //     "token": sessionStorage.token,
    // };
    // mdata = JSON.stringify(mdata);
    // var request = new XMLHttpRequest();
    // request.open('post', 'http://www.ftusix.com/static/data/update.php', true);
    // request.setRequestHeader("Content-Type", "application/json");
    // request.onreadystatechange = function () {
    //     if (request.readyState == 4 & request.status == 200) {
    //         res = request.responseText;
    //         console.log(res.trim());
    //     } else {

    //     }
    // };
    // request.send(mdata);
    $.ajax({
        method: 'post',
        url: 'http://www.ftusix.com/static/data/update.php',
        data: {
            "sex": newSex,
            "nick_name": name.value,
            "token": sessionStorage.token,
        },
        aysn: 'ture',
        success: function (value) {
            $.ifStatus(value, 'updateInfo');
            initInfo();
        },
        error: function (value) {
            console.log(value);
        }

    });
}, false);

//修改密码
changePwd.addEventListener('click', function () {
    let pwd = document.getElementById('newPwd');
    let pwd2 = document.getElementById('newPwd2');
    if (pwd.value != pwd2.value) {
        $.showMsg("两次输入的密码不一致");
    } else {
        $.ajax({
            method: 'post',
            url: 'http://www.ftusix.com/static/data/update.php',
            data: {
                "mobile": sessionStorage.tel,
                "pwd": pwd.value,
                "pwd2": pwd2.value,
                "sms_code": "123456",
            },
            aysn: 'ture',
            success: function (value) {
                $.ifStatus(value, 'changepwd');
            },
            error: function (value) {
                console.log(value);
            }

        });
    }
}, false);
//修改头像
changePhotoBtn.addEventListener('click', function () {
    photoFile.click();
}, false);


photoFile.onchange = function () {
    var formdata = new FormData(document.getElementById('photoForm'));
    formdata.append('id',sessionStorage.user_id);
    $.ajax({
        method: 'post',
        url: 'http://www.ftusix.com/static/data/upload.php',
        data: formdata,
        aysn: 'ture',
        success: function (value) {
            $.ifStatus(value, 'changepho');
            console.log(value.info);
            
        },
        error: function (value) {
            console.log(value.info);
        }

    });

};
//onhashchange事件
window.addEventListener("hashchange", function () {
    $.goPage();
}, false);

function initInfo() {
    var nickname = sessionStorage.name;
    console.log(sessionStorage.token);
    var photoUrl = 'http://www.ftusix.com/static/data/upload/' + sessionStorage.photo;
    navPhoto.style.backgroundImage = "url(" + photoUrl + ")";
    photo.src = photoUrl;
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