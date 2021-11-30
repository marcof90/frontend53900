const key = 'key_param'

function setToken(token){
    localStorage.setItem(key, token)
}

function getToken(){
    return localStorage.getItem(key)
}

module.exports = {setToken, getToken}