const { prisma } = require('../configs/db');

const userRepository = {
    async create(data) {
        return await prisma.User.create({
            data: data
        });
    }
};

module.exports = userRepository;