

const env = {
    BACKEND_BASEURL: "http://"+process.env.REACT_APP_BACKEND_HOST+":"+process.env.REACT_APP_BACKEND_PORT || 'http://localhost:8080',
}

export default env