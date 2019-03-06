require('es6-promise').polyfill();
require('whatwg-fetch');
Object.assign = require('object-assign');

class Http {
    constructor() {
        this.requestConfig = {
            method: "get",
            body: undefined,
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "application/json"
            }
        }
    }
    get(url, data, fn) { return this.handle(url, 'get', data, fn) }
    post(url, data, fn) { return this.handle(url, 'post', data, fn) }
    upload(url, data, fn) { return this.handle(url, 'upload', data, fn) }
    // 主方法
    handle(url, method, data = {}, fn) {
        const _this = this;
        const requestConfig = { ...{}, ...this.requestConfig };
        typeof data === "function" ? fn = data : !1;
        requestConfig.method = method;
        if (method == 'get') {
            url += this.transGetParams(data);
        } else if (method === 'upload' || (FormData && data instanceof FormData)) {
            requestConfig.method = 'post';
            requestConfig.body = data;
            requestConfig.headers = {};
        } else {
            requestConfig["body"] = JSON.stringify(data);
        }

        return fetch(url, requestConfig).then(response => {
            if (response.status === 200) return response.json();
            return {
                resultCode: response.status,
                success: !1,
                errMsg: '网络异常！'
            }
        }).then(json => {
            return fn.call(_this, json);
        })
    }
    // 修改请求头
    setRequestHeader(object) {
        const isObj = typeof object === 'object'
        if (isObj) {
            if (object instanceof Array) {
                throw Error("参数不可以是Array类型");
            } else {
                this.requestConfig.headers = Object.assign(this.requestConfig.headers, object);
                return this;
            }
        } else {
            throw Error("参数必须为OBJECT类型");
        }
    }
    // 将对象转URL后拼接
    transGetParams(params) {
        let resultParams = "";
        for (let key in params) {
            resultParams += '&' + key + '=' + params[key];
        }
        return resultParams.replace('&', '?');
    }
    // 获取某个cookie
    getCookie(key) {
        var cArray = document.cookie.split(';'),
            newObj = key ? !1 : {};
        for (var i = 0, e; (e = cArray[i]) != undefined; i++) {
            var item = e.split('=');
            if (key) {
                if (key === item[0].trim()) {
                    newObj = item[1];
                    break;
                }
            } else {
                newObj[item[0].trim()] = item[1];
            }
        }
        return newObj;
    }

    // 获取URL(某个或所有)参数
    getQueryValue(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let subString = location.href.split('?')[1] || '';
        let r = subString.match(reg);
        let newObj = {};
        let urlArr = subString.length ? subString.replace(/\=|\&/g, ',').split(',') : [];
        if (name) {
            if (r != null) return decodeURI(r[2]); return null;
        } else {
            urlArr.forEach((e, i) => { !(i % 2) ? newObj[e] = urlArr[i + 1] : !1 })
            return newObj;
        }
    }

};


module.exports = new Http();