const teamRepository = require("../repositories/TeamRepository");
const teamMembershipRepository = require("../repositories/TeamMembershipRepository");
const { prisma } = require("../configs/db");

const store = async (input) => {
  return team = await teamRepository.create(input);
};
const index = async (skip, limit) => {
  return await teamRepository.findMany({
    skip,
    limit
  });
};

const findMany = async () => {
  return await teamRepository.findMany();
};

const findById = async (teamId) => {
  return await teamRepository.findById(teamId);
}

const destroy = async (teamId) => {
  return await teamRepository.delete(teamId);
};

module.exports = {
  store,
  findMany,
  index,
  findById,
  destroy
};
