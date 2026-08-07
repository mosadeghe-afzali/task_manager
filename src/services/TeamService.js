const teamRepository = require("../repositories/TeamRepository");
const teamMemberRepository = require("../repositories/TeamMembershipRepository");
const projectService = require('./ProjectService');
const { prisma } = require("../configs/db");

const store = async (input) => {
  return team = await teamRepository.create(input);
};
const index = async (projectId, skip, limit) => {
  return await teamRepository.findMany({
    skip,
    limit,
    where: {
      projectId: parseInt(projectId)
    }
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

const update = async (teamId, data) => {
  return await teamRepository.update(teamId, data);
};

const addTeamMember = async (teamId, input) => {
  const { userIds, role } = input;

  const existingMembers = await teamMemberRepository.findMany(
    {
      where: {
        teamId: teamId,
        userId: { in: userIds }
      }
    }
  )
  console.log(existingMembers.members);
  if (existingMembers.members.length > 0) {
    throw new ApiError("کاربر عضو تیم است.", 422);
  }

  const memberData = userIds.map((userId) => ({
    userId,
    teamId,
    role
  }))
  console.log(memberData, "member dataaaaaaaaaaaa")
  return await teamMemberRepository.createMany(memberData);
};

const getTeamMembers = async (options) => {
  return await teamMemberRepository.findMany({
    skip: options.skip,
    limit: options.limit,
    select: {
      id: true,
      userId: true,
      teamId: true,
      role: true,
      joinedAt: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    where: {
      teamId: parseInt(options.teamId),
    },
    orderBy: {
      joinedAt: "desc",
    },
  });
}

const findTeamMember = async (memberId) => {
  return teamMemberRepository.findById(memberId);
}

const deleteTeamMemeber = async (memberId) => {
  return teamMemberRepository.delete(memberId);
}

const searchUsersForTeam = async (projectId, teamId, query) => {
  console.log(projectId, teamId, query , 'innnnnnnnnnnnnnnn')
  const currentMembers = await teamMemberRepository.findMany({
    where: { teamId },
    select: { userId: true },
  });
  console.log(currentMembers);
  const membersList = currentMembers?.members || [];

  const existingUserIds = membersList.map((member) => member.userId);
  console.log(existingUserIds, query, 'in ssssssssssssssss')
  return await projectService.getProjectMemberForTeam({
    query,
    existingUserIds,
    projectId,
  });
};

module.exports = {
  store,
  findMany,
  index,
  findById,
  destroy,
  update,
  addTeamMember,
  getTeamMembers,
  searchUsersForTeam
};
