const { prisma } = require('../configs/db');
const bcrypt = require('bcrypt');

const userRepository = {
    async create(data) {
        return await prisma.User.create({
            data: data
        });
    },

    async find(data) {
        field = data.field;
        value = data.value;
        return await prisma.User.findUnique({
            where: { [field]: value }
        });
    },
    async verifyPassword(user, password) {
        return await bcrypt.compare(password, user.password)
    },
    async encryptPassword(password)  {
        const saltRound = 10;
        const salt = await bcrypt.genSaltSync(saltRound);
        const hash = await bcrypt.hashSync(password, salt);

        return hash;
    }
};

module.exports = userRepository;