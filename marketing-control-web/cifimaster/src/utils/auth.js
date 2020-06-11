import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const mTokenKey = 'mytoken'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function mgetToken() {
    return Cookies.get(mTokenKey)
}

export function msetToken(token) {
    return Cookies.set(mTokenKey, token)
}

export function mremoveToken() {
    return Cookies.remove(mTokenKey)
}