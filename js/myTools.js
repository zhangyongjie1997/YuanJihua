((w) => {
    const Tools = {


        // trim()
        trim(str) {
            if (!str) {
                return false;
            }
            return str.trim ?
                str.trim() :
                str.replace(/(^\s)|(\s$)/, '');
        },
        // ajax
        ajax(option) {
            /*
                type: GET/POST
                url
                data
                success
                error
                complete
            **/
            const promise = new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                if (option.type.toLowerCase() === 'get') {
                    if (option.data) {
                        option.url += '?';
                        for (let k in option.data) {
                            option.url += `${k}=${option[data][k]}&`
                        }
                        option.url = option.url.replace(/&$/, '');
                        xhr.open('GET', option.url);
                    } else {
                        xhr.open('GET', option.url);
                    }

                } else if (option.type.toLowerCase() === 'post') {
                    xhr.open('POST', option.url);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                }
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                            resolve(JSON.parse(this.trim(xhr.responseText)));
                        }

                        reject('fail');
                    }
                };
                if (option.type.toLowerCase() === 'get') {
                    xhr.send(null);
                } else if (option.type.toLowerCase() === 'post') {
                    if (option.data) {
                        let str = '';
                        let data = option.data;
                        for (let k in data) {
                            str += `${k}=${data[k]}&`;
                        }
                        str = str.replace(/&$/, '');
                        xhr.send(str);
                    } else {
                        xhr.send(null);
                    }
                }
            });
            promise.then((data) => {
                option.success && option.success(data);
            }).catch((error) => {
                option.error && option.error(error);
            }).finally(() => {
                option.finally && option.finally();
            });
        },
        css(ele, value) {
            for (let k in value) {
                ele.style.cssText += `${k}: ${value[k]};`;
            }
        },
        //显示登录信息动画
        showMsg(info) {
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
            let nowPage = document.getElementById(window.oldUrl.substring(1));
            let goPage = document.getElementById(window.location.hash.substring(1));
            window.oldUrl = window.location.hash;
            nowPage.classList.remove("cur");
            nowPage.classList.add("hide");
            goPage.classList.remove("hide");
            goPage.classList.add("cur");
        }
        //     /*
        //     @ 调用方法   ajax( 对象实参 );
        //     @ 对象实参需要传的属性：
        // 	method : 访问方式（选填），默认'get',
        // 	url : 访问地址（必填）,
        // 	data : 传输数据（选填），需要传数据时才填,
        // 	aysn : 是否异步（选填），默认true,
        // 	success : 请求成功后执行的函数，第一个形参代表返回的数据,
        // 	error : 请求失败后执行的函数，第一个形参代表错误状态码
        //     */
        //     ajax(mJson) {
        //         var method = mJson.method || 'get';
        //         var url = mJson.url;
        //         var data = '';
        //         var aysn = mJson.aysn || true;
        //         var success = mJson.success;
        //         var error = mJson.error;
        //         if (mJson.data) {
        //             var arr = [];
        //             for (var key in mJson.data) {
        //                 arr.push(key + '=' + mJson.data[key]);
        //             };
        //             data = arr.join('&');
        //         };
        //         if (data && method.toLowerCase() == 'get') url += '?' + data;
        //         var xhr = new XMLHttpRequest();
        //         xhr.open(method, url, aysn);
        //         xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        //         xhr.send(data);
        //         xhr.onreadystatechange = function () {
        //             if (xhr.readyState == 4) {
        //                 if (xhr.status >= 200 && xhr.status < 300) {
        //                     success && success(xhr.responseText);
        //                 } else {
        //                     error && error(xhr.status);
        //                 };
        //             }
        //         };
        //     },
    };
    w.$ = Tools;
})(window);