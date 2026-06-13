const prisma = require('../configs/db');

const createUser = (input) => {
    return prisma.User.create(input);
}