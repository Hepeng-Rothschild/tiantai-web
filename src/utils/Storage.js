export const setItem = function (name,msg) {
    window.sessionStorage.setItem(name,JSON.stringify(msg))
}
export const getItem = function (name) {
    return JSON.parse(window.sessionStorage.getItem(name))
}
export const remItem = function (name) {
    window.sessionStorage.removeItem(name)
}