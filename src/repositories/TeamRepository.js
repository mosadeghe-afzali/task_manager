const { prisma } = require('../configs/db');

const TeamRepository = {
  async create(data) {
    return await prisma.User.create({
      data: data
    });
  },

  async find(data) {
    field = data.field;
    value = data.value;
    return await prisma.Team.findUnique({
      where: { [field]: value }
    });
  },

};

module.exports = TeamRepository;