export const setItem = function (name,msg) {
    window.sessionStorage.setItem(name,JSON.stringify(msg))
}
export const getItem = function (name) {
  let value = window.sessionStorage.getItem(name)
    return value ? JSON.parse(value): value
}
export const remItem = function (name) {
    window.sessionStorage.removeItem(name)
}