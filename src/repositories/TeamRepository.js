const { prisma } = require("../configs/db");

const TeamRepository = {
  async create(tx, input) {
    return await tx.Team.create({
      data: input,
    });
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.Team.findUnique({
      where: { [field]: value },
    });
  },

  async findMany() {
    return await prisma.Team.findMany();
  },
};

module.exports = TeamRepository;