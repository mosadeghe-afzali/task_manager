const ProjectRepository = require('../repositories/ProjectRepository');

const store = (input) => {
  return ProjectRepository.create(input);
}


module.exports = {
  store
}