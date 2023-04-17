class Authentication {
    isAuthentication(){
        const token = localStorage.getItem('access_token')
        return token
    }
}

const authentication = new Authentication()
export default authentication;
