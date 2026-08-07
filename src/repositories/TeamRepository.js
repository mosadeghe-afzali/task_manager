const { prisma } = require("../configs/db");

const TeamRepository = {
  async create(input) {
    return await prisma.Team.create({
      data: input,
      select: {
        id: true,
        name: true,
      },
    });
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.Team.findUnique({
      where: { [field]: value },
    });
  },

  async findById(teamId) {
    return await prisma.Team.findUniqueOrThrow({
      where: { id: teamId },
    });
  },

  async findMany(options = {}) {
    const prismaArgs = {};
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

    if (options?.select) {
      prismaArgs.select = options.select;
    }

    console.log(prismaArgs, 'prisma arguments', countArgs);

    const [teams, totalCount] = await Promise.all([
      prisma.Team.findMany(prismaArgs),
      prisma.Team.count(countArgs) // شمارش کل بدون اعمال take و skip
    ]);

    return {
      teams,
      totalCount,
    };
  },

  async search(input) {
    return await prisma.Team.findFirst(input);
  },
  async update(teamId, data) {
    return await prisma.Team.update({
      where: {
        id: parseInt(teamId)
      },
      data: data
    });
  },

  async delete (teamId) {
  return await prisma.Team.delete({
    where: {
      id: parseInt(teamId),
    },
  });
},
};

module.exports = TeamRepository;
