const taskStatusRepository = require("../repositories/TaskStatusRepository");
const ApiError = require("../helpers/ApiError");

const store = async (input) => {
  return await taskStatusRepository.create(input);
};
const findMany = async (options) => {
  return await taskStatusRepository.findMany(options);
};

const findById = async (statusId) => {
  return await taskStatusRepository.findById(statusId);
};

const update = async (statusId, data) => {
  return await taskStatusRepository.update(statusId, data);
};

const destroy = async (statusId) => {
  return await taskStatusRepository.delete(statusId);
};

module.exports = {
  store,
  findMany,
  findById,
  update,
  destroy,
};
