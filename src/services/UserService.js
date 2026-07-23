const userRepository = require('../repositories/UserRepository')

const findMany = async () => {
    return await userRepository.findMany();
}
const find = async (input) => {
    return await userRepository.find(input)
}
const searchUsers = async (query, excludeUserIds = [], limit = 10) => {
    if (!query || query.trim() === '') {
        return [];
    }
    return await userRepository.searchUsers({
        query: query.trim(),
        excludeUserIds: excludeUserIds,
        limit: 10,
    });
};

module.exports = {
    findMany,
    find,
    searchUsers
}