function setToken(token){
    localStorage.setItem('token', token)
}

function getToken(){
    return localStorage.getItem('token')
}

module.exports = {setToken, getToken}