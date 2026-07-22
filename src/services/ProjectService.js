const projectRepository = require("../repositories/ProjectRepository");
const projectMemberRepository = require("../repositories/ProjectMemberRepository");
const ApiError = require("../helpers/ApiError");

const store = async (input) => {
  return await projectRepository.create(input);
};
const findMany = async (options) => {
  return await projectRepository.findMany(options);
};

const findById = async (projectId) => {
  return await projectRepository.findById(projectId);
};

const update = async (projectId, data) => {
  return await projectRepository.update(projectId, data);
};

const destroy = async (projectId) => {
  return await projectRepository.delete(projectId);
};

const findFirstProjectMember = async (input) => {
  return await projectMemberRepository.findFirst(input);
};

const addProjectMember = async (projectId, input) => {
  const userId = input.userId;
  const exists = await projectMemberRepository.findFirst({
    projectId,
    userId,
  });

  if (exists) {
    throw new ApiError("کاربر عضو پروژه است.", 422);
  }

  input.projectId = projectId;
  return  await projectMemberRepository.create(input);
};

const getProjectMembers = async (options) =>  {
  return await projectMemberRepository.findMany(options);
}

const findProjectMember = async (memberId) => {
  return projectMemberRepository.findById(memberId);
}

module.exports = {
  store,
  findMany,
  findById,
  update,
  destroy,
  addProjectMember,
  getProjectMembers,
  findProjectMember
};
