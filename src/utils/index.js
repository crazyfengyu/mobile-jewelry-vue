import axios from "axios";
// axios.defaults.baseURL = "http://192.168.50.165:3100";
axios.defaults.baseURL = "https://101.132.146.119:3100";



import crypto from "crypto";
import { Toast } from "mint-ui";

// 加密函数
export function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
export function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function tip(msg) {
    let instance = Toast(msg);
    setTimeout(() => {
        instance.close();
    }, 1500);
}

export function pHttp(id, i, url, that, cb) {
    var obj = {};
    obj._id = id;
    obj.num = that.datas[i].num;
    obj.username = aesDecrypt(localStorage.username, "fengyu");
    http.post(url, { params: obj }).then(res => {
        if (res.data.type == "0") {
            tip(res.data.msg);
            cb;
        }
    });
}

export const http = axios;