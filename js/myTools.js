((w) => {
    const Tools = {

        setCookie(key, val, time) { //设置cookie方法
            var date = new Date(); //获取当前时间
            var expiresDays = time; //将date设置为n天以后的时间
            date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
            document.cookie = key + "=" + val + ";expires=" + date.toGMTString(); //设置cookie
        },
        getCookie(key) { //获取cookie方法
            /*获取cookie参数*/
            var getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
            var arrCookie = getCookie.split(";") //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
            var tips; //声明变量tips
            for (var i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
                var arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
                if (key == arr[0]) { //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                    tips = arr[1]; //将cookie的值赋给变量tips
                    break; //终止for循环遍历
                }
            }
            return tips;
        },
        // trim()
        trim(str) {
            if (!str) {
                return false;
            }
            return str.trim ?
                str.trim() :
                str.replace(/(^\s)|(\s$)/, '');
        },
        //显示登录信息动画
        showMsg(info) {
            console.log(info);
            var msg = info || 'none';
            var div = document.getElementById("warning");
            if (!top) {
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
                                    top = undefined;
                                    clearInterval(time2);
                                    clearTimeout(time3);
                                }
                                div.style.top = nowtop + "px";
                            }, 13);
                        }, 1000);
                    }
                    div.style.top = top + "px";
                }, 13);
            }
        },
        //页面跳转方法
        goPage() {
            console.log('go' + window.oldUrl + window.location.hash);
            let nowPage = document.getElementById(window.oldUrl.substring(1));
            let goPage = document.getElementById(window.location.hash.substring(1));
            window.oldUrl = window.location.hash;
            nowPage.classList.remove("cur");
            nowPage.classList.add("hide");
            goPage.classList.remove("hide");
            goPage.classList.add("cur");
        },
        clickHash(btn, newHash) {
            btn.addEventListener("click", function () {
                window.location.hash = newHash;
            }, false);
        },
        clickHref(btn, newHref, newHash) {
            btn.addEventListener("click", function () {
                window.location.href = newHref;
                window.location.hash = newHash;
            }, false);
        },
        // ajax
        ajax(mJson) {
            /*
                method : 访问方式（选填），默认'get',
		        url : 访问地址（必填）,
		        data : 传输数据（选填），需要传数据时才填,
		        aysn : 是否异步（选填），默认true,
		        success : 请求成功后执行的函数，第一个形参代表返回的数据,
		        error : 请求失败后执行的函数，第一个形参代表错误状态码
            */
            var res;
            var request = new XMLHttpRequest();
            var method = mJson.method || 'get';
            console.log(method);
            var url = mJson.url;
            console.log(url);
            var data = '';
            var aysn = mJson.aysn || true;
            console.log(aysn);
            var success = mJson.success;
            var error = mJson.error;
            if (mJson.data) {
                data = JSON.stringify(mJson.data);
            }
            console.log(data);
            request.open(method, url, aysn);
            request.setRequestHeader("Content-Type", "application/json");
            request.onreadystatechange = function () {
                if (request.status == 200 & request.readyState == 4) {
                    res = request.responseText;
                    console.log("请求成功" + res)
                    success && success(res);
                }
            };
            request.send(data);
        },
        //填写用户信息
        exUserInfo(data) {
            localStorage.setItem("oldUserName", userName.value); //保存此次登录的账号
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user_id", data.user_id);
            sessionStorage.setItem("tel", data.mobile);
            sessionStorage.setItem("photo", data.avatar);
            sessionStorage.setItem("sex", data.sex);
            sessionStorage.setItem("name", data.nick_name);
        },
        ifStatus(value, btn) {
            try {
                var obj = JSON.parse(value.trim());
                switch (btn) {
                    case 'login':
                        if (obj.status == 1) {
                            console.log(obj.data[0] + '登录成功');
                            console.log(obj.data[0].avatar);
                            this.exUserInfo(obj.data[0]);
                            window.location.href = "personInfo.html";
                        } else {
                            $.showMsg(obj.info);
                        }
                        break;
                    case 'signin':
                        if (obj.status == 1) {
                            $.showMsg("注册成功,请登录");
                            window.location.hash = "loginPage";
                        } else {
                            $.showMsg(obj.info);
                        }
                        break;
                    case 'updateInfo':
                        if (obj.status == 1) {
                            alert('修改成功');
                            this.exUserInfo(obj.data[0])
                        } else {
                            alert('修改失败');
                            $.showMsg(obj.info);
                        }
                        break;
                    case 'changepwd':
                        if (obj.status == 1) {
                            $.showMsg(obj.info);
                        } else {
                            $.showMsg(obj.info);
                        }
                        break;
                    case 'changepho':
                        if (obj.status == 1) {
                            this.exUserInfo;
                            console.log("修改成功");
                        } else {
                            console.log(obj.info);
                        }
                        break;
                    case 'mynote':
                        if (obj.status == 1) {
                            console.log("wenzhang成功");
                        } else {
                            console.log(obj.info);
                        }
                        break;
                }
            } catch {
                console.log(value);
            }
        },
    };
    w.$ = Tools;
})(window);