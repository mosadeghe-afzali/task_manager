const { prisma } = require("../configs/db");

const ProjectMemberRepository = {
  async create(input) {
    return await prisma.ProjectMember.create({
      data: input,
      select: {
        id: true,
        projectId: true,
        userId: true,
        role: true,
        createdAt: true,
      },
    });
  },

  async createMany(data) {
    return await prisma.projectMember.createMany({
      data,
      skipDuplicates: true,
    });
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.ProjectMember.findUnique({
      where: { [field]: value },
    });
  },

  async findFirst(input) {
    return prisma.projectMember.findFirst({
      where: input,
    });
  },

  async findById(projectId) {
    return await prisma.ProjectMember.findUniqueOrThrow({
      where: { id: projectId },
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
      prisma.ProjectMember.findMany(prismaArgs),
      prisma.ProjectMember.count(countArgs),
    ]);

    return {
      members,
      totalCount,
    };
  },


  async delete(memberId) {
    return await prisma.ProjectMember.delete({
      where: {
        id: parseInt(memberId),
      },
    });
  },
};

module.exports = ProjectMemberRepository;
