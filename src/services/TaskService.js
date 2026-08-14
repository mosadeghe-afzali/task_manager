const taskRepository = require("../repositories/TaskRepository");
const ApiError = require("../helpers/ApiError");

const store = async (input) => {
  console.log(input, 'input')
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
