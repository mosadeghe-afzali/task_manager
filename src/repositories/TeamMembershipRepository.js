const { prisma } = require('../configs/db');

const TeamMembershipRepository = {
  async create(input) {
    return await prisma.User.create({
      data: input
    });
  },
  async createMany(data) {
    return await prisma.TeamMember.createMany({
      data,
      skipDuplicates: true,
    });
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.TeamMember.findUnique({
      where: { [field]: value },
    });
  },

  async findFirst(input) {
    return prisma.TeamMember.findFirst({
      where: input,
    });
  },

  async findById(teamId) {
    return await prisma.TeamMember.findUniqueOrThrow({
      where: { id: teamId },
    });
  },

  async findMany(options = {}) {
    const prismaArgs = {};
    if (options?.select) {
      prismaArgs.select = options.select;
    }
    const countArgs = {};

    if (options?.skip) {
      prismaArgs.skip = options.skip;
    }

    if (options?.limit) {
      prismaArgs.take = options.limit;
    }

    if (options?.where) {
      prismaArgs.where = options.where;
      countArgs.where = options.where;
    }

    if (options?.orderBy) {
      prismaArgs.orderBy = options.orderBy;
    }
    const [members, totalCount] = await Promise.all([
      prisma.TeamMember.findMany(prismaArgs),
      prisma.TeamMember.count(countArgs),
    ]);

    return {
      members,
      totalCount,
    };
  },


  async delete(memberId) {
    return await prisma.TeamMember.delete({
      where: {
        id: parseInt(memberId),
      },
    });
  },


};

module.exports = TeamMembershipRepository;