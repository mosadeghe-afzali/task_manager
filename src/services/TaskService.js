const taskRepository = require("../repositories/TaskRepository");
const ApiError = require("../helpers/ApiError");

const store = async (input) => {
  const lastTask = await taskRepository.findFirst({
    where: {
      projectId: input.projectId,
    },
    orderBy: {issueNumber: 'desc'}
  });
  const issueNumber = lastTask ? lastTask.issueNumber + 1 : 1;
  input.issueNumber = issueNumber;

  return await taskRepository.create(input);
};
const findMany = async (options) => {
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

module.exports = {
  store,
  findMany,
  findById,
  update,
  destroy,
};
