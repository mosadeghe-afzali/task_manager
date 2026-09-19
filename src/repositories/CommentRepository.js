const { prisma } = require('../configs/db');

const CommentRepository = {
  async create(input) {
    return await prisma.Comment.create({
      data: input,
      select: {
        id: true
      }
    });
  },

  async findFirst(input) {
    return await prisma.Comment.findFirst(input);
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.Comment.findUnique({
      where: { [field]: value }
    });
  },

  async findById(taskId) {
    return await prisma.Comment.findUniqueOrThrow({
      where: { id: taskId }
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
        if (typeof field === 'string') {
          prismaArgs.select[field] = true;
        } else if (typeof field === 'object' && field !== null) {
          const key = Object.keys(field)[0];

          const subFields = field[key];
          
          prismaArgs.select[key] = {
            select: subFields.reduce((acc, subField) => {
              acc[subField] = true;
              return acc;
            }, {})
          };
        }
      });
    }
    if (options?.orderBy && options.orderBy.length > 0) {
      prismaArgs.orderBy = options.orderBy
    }

    const [comments, totalCount] = await Promise.all([
      prisma.Comment.findMany(prismaArgs),
      prisma.Comment.count(countArgs)
    ]);

    return {
      comments,
      totalCount
    };
  },

  async update(taskId, data) {
    return await prisma.Comment.update({
      where: {
        id: parseInt(taskId)
      },
      data: data
    });
  },
  
  async delete(taskId) {
    return await prisma.Comment.delete({
      where: {
        id: parseInt(taskId)
      }
    });
  },
  
};

module.exports = CommentRepository;