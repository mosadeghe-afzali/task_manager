const getRegister = (req, res) => {
    res.render('auth/register.ejs', {
        title: "ثبت نام"
    })
}

const getLogin = (req, res) => {
    res.render('auth/login.ejs', {
        title: "ورود"
    })
}

const register = (req, res) => {

}

const login = (req, res) => {
    
}
module.exports = {
    getRegister,
    getLogin,
    login,
    register
};