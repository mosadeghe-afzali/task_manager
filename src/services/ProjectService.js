const projectRepository = require('../repositories/ProjectRepository');

const store = (input) => {
  return projectRepository.create(input);
}
const findMany = async (options) => {
  return await projectRepository.findMany(options);
}

const findById = async (projectId) => {
  return await projectRepository.findById(projectId);
}

const update = async (projectId, data) => {
  return await projectRepository.update(projectId, data);
}

const destroy = async (projectId) => {
  return await projectRepository.delete(projectId);
}

module.exports = {
  store,
  findMany,
  findById,
  update,
  destroy
}