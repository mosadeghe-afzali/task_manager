const { prisma } = require('../configs/db');
const { findMany } = require('./TeamRepository');

const ProjectRepository = {
  async create(input) {
    return await prisma.Project.create({
      data: input
    });
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.Project.findUnique({
      where: { [field]: value }
    });
  },

  async findById(projectId) {
    return await prisma.Project.findUniqueOrThrow({
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
      prisma.project.findMany(prismaArgs),
      prisma.project.count(countArgs) // شمارش کل بدون اعمال take و skip
    ]);

    return {
      projects,
      totalCount
    };
  },

  async update(projectId, data) {
    return await prisma.project.update({
      where: {
        id: projectId
      },
      data: data
    });
  },
  async delete(projectId) {
    return await prisma.project.delete({
      where: {
        id: projectId
      }
    });
  }
  
};

module.exports = ProjectRepository;