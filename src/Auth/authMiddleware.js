class Authentication {
    isAuthentication(){
        const token = localStorage.getItem('permissionAdmin')
        return token;
    }
}

const authentication = new Authentication()
export default authentication;
