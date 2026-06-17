const userRepository = require('../repositories/UserRepository')
const register = (req, res) => {
    return userRepository.create(req)
}

const login = (req, res) => {
    
}

module.exports = {
    register,
    login
}