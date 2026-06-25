const userRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt');

const register = async (req) => {
    const data = req.body;
    data.password = await userRepository.encryptPassword(data.password);
    const user = await userRepository.create(data)
    req.login(user, (err) => {
        if (err) {
            return next(err);
        }
    });

    return user;
}

module.exports = {
    register
}