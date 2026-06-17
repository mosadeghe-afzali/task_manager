const prisma = require('../configs/db');


const userRepository = {
    create(data) { 
        return prisma.User.create(data);
    }
};

module.exports = userRepository;