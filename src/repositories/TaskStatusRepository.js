const { name } = require('ejs');
const { prisma } = require('../configs/db');

const TaskStatusRepository = {
  async create(input) {
    return await prisma.TaskStatus.create({
      data: input,
      select: {
        id: true,
        name: true,
        color: true,
        sortOrder: true
      }
    });
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.TaskStatus.findUnique({
      where: { [field]: value }
    });
  },

  async findById(statusId) {
    return await prisma.TaskStatus.findUniqueOrThrow({
      where: { id: statusId },
      select: {
        id: true,
        projectId: true,
        name: true,
        color: true,
        sortOrder: true
      }
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
    const [statuses, totalCount] = await Promise.all([
      prisma.TaskStatus.findMany(prismaArgs),
      prisma.TaskStatus.count(countArgs) // شمارش کل بدون اعمال take و skip
    ]);

    return {
      statuses,
      totalCount
    };
  },

  async update(statusId, data) {
    return await prisma.TaskStatus.update({
      where: {
        id: parseInt(statusId)
      },
      data: data
    });
  },
  async delete(statusId) {
    return await prisma.TaskStatus.delete({
      where: {
        id: parseInt(statusId)
      }
    });
  }
  
};

module.exports = TaskStatusRepository;