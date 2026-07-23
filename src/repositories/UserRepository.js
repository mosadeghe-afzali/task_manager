const { prisma } = require('../configs/db');
const bcrypt = require('bcrypt');

const UserRepository = {
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
    async findMany() {
        return await prisma.User.findMany();
    },
    async verifyPassword(user, password) {
        return await bcrypt.compare(password, user.password)
    },
    async encryptPassword(password) {
        const saltRound = 10;
        const salt = await bcrypt.genSaltSync(saltRound);
        const hash = await bcrypt.hashSync(password, salt);

        return hash;
    },
    async findWhereIn(field, values) {
        return await prisma.User.findMany({
            where: {
                [field]: {
                    in: values
                }
            }
        });
    },
    async searchUsers({ query, excludeUserIds = [], limit = 10 }) {
        return await prisma.user.findMany({
            where: {
                id: {
                    notIn: excludeUserIds,
                },
                OR: [
                    { firstName: { contains: query, mode: 'insensitive' } },
                    { lastName: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                ],
            },
            take: limit,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            },
        });
    },
};

module.exports = UserRepository;