const userRepository = require('../repositories/UserRepository')

const findMany = async () => {
    return await userRepository.findMany();
}

module.exports = {
    findMany
}