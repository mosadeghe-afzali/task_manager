const { prisma } = require('../configs/db');

const ProjectRepository = {
  async create(input) {
    return await prisma.User.create({
      data: input
    });
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.Team.findUnique({
      where: { [field]: value }
    });
  },

};

module.exports = ProjectRepository;