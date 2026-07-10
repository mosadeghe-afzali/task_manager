const ProjectRepository = require('../repositories/ProjectRepository');

const store = (input) => {
  return ProjectRepository.create(input);
}
const findMany = async (options) => {
  return await ProjectRepository.findMany(options);
}

module.exports = {
  store,
  findMany
}