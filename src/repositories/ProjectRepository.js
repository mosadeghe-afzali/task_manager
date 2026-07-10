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

  async findMany(options = {}) {
    const prismaArgs = {};

    if (options?.limit) {
      prismaArgs.take = options.limit;
    }

    if (options?.selectFields && options.selectFields.length > 0) {
      prismaArgs.select = {};
      options.selectFields.forEach(field => {
        prismaArgs.select[field] = true;
      });
    }
    console.log(prismaArgs, 'pris argssssssss')
    return await prisma.project.findMany(prismaArgs);
  }

};

module.exports = ProjectRepository;