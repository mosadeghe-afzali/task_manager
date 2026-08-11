const taskStatusRepository = require("../repositories/TaskStatusRepository");
const ApiError = require("../helpers/ApiError");

const store = async (input) => {
  
};
const findMany = async (options) => {
  return await taskStatusRepository.findMany(options);
};

const findById = async (taskId) => {
  return await taskStatusRepository.findById(taskId);
};

const update = async (taskId, data) => {
  return await taskStatusRepository.update(taskId, data);
};

const destroy = async (taskId) => {
  return await taskStatusRepository.delete(taskId);
};

module.exports = {
  store,
  findMany,
  findById,
  update,
  destroy,
};
