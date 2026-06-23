const { prisma } = require('../configs/db');

const userRepository = {
    async create(data) {
        return await prisma.User.create({
            data: data
        });
    },

    async find(data) {
        filed: data.filed;
        value = data.value;
        return await prisma.User.findUnique({
            where: { filed: value }
        });
    }
};

module.exports = userRepository;