const userRepository = require('../repositories/UserRepository')

const register = async (userData) => {
    userData = {
        ...userData,
        password: await userRepository.encryptPassword(userData.password)
    };
    const user = await userRepository.create(userData)

    return user;
}

module.exports = {
    register
}