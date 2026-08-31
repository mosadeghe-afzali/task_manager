const taskRepository = require("../repositories/TaskRepository");
const ApiError = require("../helpers/ApiError");
const { title } = require("node:process");
const { lutimes } = require("node:fs");
const { selectFields } = require("express-validator/lib/field-selection");

const store = async (input) => {
  const lastTask = await taskRepository.findFirst({
    where: {
      projectId: input.projectId,
    },
    orderBy: { issueNumber: "desc" },
  });
  const issueNumber = lastTask ? lastTask.issueNumber + 1 : 1;
  input.issueNumber = issueNumber;

  return await taskRepository.create(input);
};
const findMany = async (input) => {
  const skip = (input.page - 1) * input.limit;
  const selectFields = [
    "id",
    "issueNumber",
    "title",
    "priority",
    "dueDate",
    "startDate",
    "completedAt",
    "createdAt",
    {
      status: ["id", "name", "color"],
    },
    {
      assignee: ["id", "firstName", "lastName"],
    },
    {
      _count: ["comments", "children"],
    },
  ];
  const orderBy = [
    { statusId: 'asc' },
    { position: 'asc' }
  ];

  const options = {
    limit: input.limit,
    skip,
    selectFields,
    orderBy
  };
  if(input.projectId) {
    options.where = {
      projectId: parseInt(input.projectId)
    }
  }
  
  console.log(options, 'opptionssssssssss')

  return await taskRepository.findMany(options);
};

const findById = async (taskId) => {
  return await taskRepository.findById(taskId);
};

const update = async (taskId, data) => {
  return await taskRepository.update(taskId, data);
};

const destroy = async (taskId) => {
  return await taskRepository.delete(taskId);
};
const taskPriorities = async () => {
  return taskRepository.taskPriorities();
};

module.exports = {
  store,
  findMany,
  findById,
  update,
  destroy,
  taskPriorities,
};
