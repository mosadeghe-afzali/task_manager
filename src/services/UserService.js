const userRepository = require('../repositories/UserRepository')

const findMany = async () => {
    return await userRepository.findMany();
}
const find = async (input) => {
    return await userRepository.find(input)
}

module.exports = {
    findMany,
    find
}