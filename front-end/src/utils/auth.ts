export const checkLogined = () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
        return true
    } else {
        return false
    }
}