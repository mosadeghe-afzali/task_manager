const { prisma } = require('../configs/db');

const TeamMembershipRepository = {
  async create(input) {
    return await prisma.User.create({
      data: input
    });
  },
  async createMany(tx, input) {
    return await tx.TeamMembership.createMany({
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

module.exports = TeamMembershipRepository;