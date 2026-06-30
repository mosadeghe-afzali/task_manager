const teamRepository = require("../repositories/TeamRepository");
const teamMembershipRepository = require("../repositories/TeamMembershipRepository");
const { prisma } = require("../configs/db");
const store = async (input) => {
  const { userIds, ...teamData } = input;

  return prisma.$transaction(async (tx) => {
    const team = await teamRepository.create(tx, teamData);

    if (userIds?.length) {
      const teamMemberData = userIds.map((id) => ({
        teamId: team.id,
        userId: Number(id),
      }));
      await teamMembershipRepository.createMany(tx, teamMemberData);
    }

    return team;
  });
};
const findMany = async () => {
  return await teamRepository.findMany();
};
module.exports = {
  store,
  findMany
};
