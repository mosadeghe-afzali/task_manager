const userRepository = require('../repositories/UserRepository')
const register = async (req, res) => {
    return await userRepository.create(req)
}

const login = (req, res) => {
    
}

module.exports = {
    register,
    login
}