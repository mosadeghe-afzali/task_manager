const { prisma } = require('../configs/db');

const TaskStatusRepository = {
  async create(input) {
    return await prisma.TaskStatus.create({
      data: input
    });
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.TaskStatus.findUnique({
      where: { [field]: value }
    });
  },

  async findById(projectId) {
    return await prisma.TaskStatus.findUniqueOrThrow({
      where: { id: projectId }
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

    if (options?.selectFields && options.selectFields.length > 0) {
      prismaArgs.select = {};
      options.selectFields.forEach(field => {
        prismaArgs.select[field] = true;
      });
    }

    console.log(prismaArgs, 'prisma arguments', countArgs);

    const [projects, totalCount] = await Promise.all([
      prisma.TaskStatus.findMany(prismaArgs),
      prisma.TaskStatus.count(countArgs) // شمارش کل بدون اعمال take و skip
    ]);

    return {
      projects,
      totalCount
    };
  },

  async update(projectId, data) {
    return await prisma.TaskStatus.update({
      where: {
        id: parseInt(projectId)
      },
      data: data
    });
  },
  async delete(projectId) {
    return await prisma.TaskStatus.delete({
      where: {
        id: parseInt(projectId)
      }
    });
  }
  
};

module.exports = TaskStatusRepository;