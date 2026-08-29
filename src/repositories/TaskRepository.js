const { prisma } = require('../configs/db');
const { TaskPriority } = require("@prisma/client");

const TaskRepository = {
  async create(input) {
    return await prisma.Task.create({
      data: input,
      select: {
        id: true
      }
    });
  },

  async findFirst(input) {
    return await prisma.Task.findFirst(input);
  },

  async find(input) {
    field = input.field;
    value = input.value;
    return await prisma.Task.findUnique({
      where: { [field]: value }
    });
  },

  async findById(taskId) {
    return await prisma.Task.findUniqueOrThrow({
      where: { id: taskId },
      select: {
        id: true,
        issueNumber: true,
        title: true,
        description: true,
        priority: true,
        estimatedHours: true,
        spentHours: true,
        position: true,
        startDate: true,
        dueDate: true,
        completedAt: true,
        createdAt: true,
        updatedAt: true,
        status: {
          select: {
            id: true,
            name: true,
            color: true
          }
        },
        assignee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true
          }
        },
        reporter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        project: {
          select: {
            id: true,
            name: true
          }
        },
        team: {
          select: {
            id: true,
            name: true
          }
        },
        parent: {
          select: {
            id: true,
            issueNumber: true,
            title: true
          }
        },
        children: {
          select: {
            id: true,
            issueNumber: true,
            title: true
          }
        },
        comments: true,
        _count: true
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

    console.log(prismaArgs, 'prisma arguments', countArgs);

    const [tasks, totalCount] = await Promise.all([
      prisma.Task.findMany(prismaArgs),
      prisma.Task.count(countArgs) // شمارش کل بدون اعمال take و skip
    ]);

    return {
      tasks,
      totalCount
    };
  },

  async update(taskId, data) {
    return await prisma.Task.update({
      where: {
        id: parseInt(taskId)
      },
      data: data
    });
  },
  
  async delete(taskId) {
    return await prisma.Task.delete({
      where: {
        id: parseInt(taskId)
      }
    });
  },
  async taskPriorities() {
    return TaskPriority;
  }
  
};

module.exports = TaskRepository;