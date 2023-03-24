function validateName(rule, value, callback) {
    let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,11}$/
    if(!value) {
        callback(new Error("请输入用户名"))
    } else if(!reg.test(value)) {
        callback("请输入2-11位用户名")
    } else {
        callback()
    }
}

function validatePassword(rule, value, callback) {
    let reg = /^\S*(?=\S{8,20})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    if(!value) {
        callback(new Error("请输入密码"))
    } else if(!reg.test(value)) {
        callback("请输入8-20位密码，需要包含大小写字母数字及特殊符号")
    } else {
        callback()
    }
}

export {
    validateName,
    validatePassword
}