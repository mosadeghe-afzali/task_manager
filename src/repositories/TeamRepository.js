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
      totalCount
    };
  },
};

module.exports = TeamRepository;