const projectRepository = require("../repositories/ProjectRepository");
const projectMemberRepository = require("../repositories/ProjectMemberRepository");
const ApiError = require("../helpers/ApiError");
const { check } = require("express-validator");
const ProjectMemberRepository = require("../repositories/ProjectMemberRepository");
const userService = require('./UserService');
const { CodeSquare } = require("lucide-static");

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
  const { userIds, role } = input;

  const existingMembers = await projectMemberRepository.findMany(
    {
      where: {
        projectId: projectId,
        userId: { in: userIds }
      }
    }
  )

  if (existingMembers.members.length > 0) {
    throw new ApiError("کاربر عضو پروژه است.", 422);
  }

  const memberData = userIds.map((userId) => ({
    userId,
    projectId,
    role
  }))
  console.log(memberData, "member dataaaaaaaaaaaa")
  return await projectMemberRepository.createMany(memberData);
};

const getProjectMembers = async (options) => {
  const where = {
    projectId: Number(options.projectId),
  };

  if (options.search?.trim()) {
    where.user = {
      OR: [
        {
          firstName: {
            contains: options.search.trim(),
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: options.search.trim(),
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: options.search.trim(),
            mode: "insensitive",
          },
        },
      ],
    };
  }

  return await ProjectMemberRepository.findMany({
    skip: options.skip,
    limit: options.limit,
    select: {
      id: true,
      userId: true,
      projectId: true,
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
    where: where,
    orderBy: {
      joinedAt: "desc",
    },
  });
}

const findProjectMember = async (memberId) => {
  return projectMemberRepository.findById(memberId);
}

const deleteProjectMemeber = async (memberId) => {
  return projectMemberRepository.delete(memberId);
}

const searchUsersForProject = async (projectId, query) => {
  if (!query || query.trim() === '') {
    return [];
  }
  console.log(projectId, query, 'in ppppppppppppp')

  const currentMembers = await projectMemberRepository.findMany({
    where: { projectId },
    select: { userId: true },
  });
  console.log(currentMembers);
  const membersList = currentMembers?.members || [];

  const existingUserIds = membersList.map((member) => member.userId);
  console.log(existingUserIds, query, 'in ssssssssssssssss')
  return await userService.searchUsers(
    query.trim(),
    existingUserIds,
    10,
  );
};

const getProjectMemberForTeam = async (options) => {
  const where = {
    projectId: Number(options.projectId),
    userId: {
      notIn: options.excludeUserIds,
    },
  };

  if (options.query?.trim()) {
    where.user = {
      OR: [
        {
          firstName: {
            contains: options.query.trim(),
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: options.query.trim(),
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: options.query.trim(),
            mode: "insensitive",
          },
        },
      ],
    };
  }

  return await ProjectMemberRepository.findMany({
    select: {
      id: true,
      userId: true,
      projectId: true,
      role: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    where: where,
    orderBy: {
      joinedAt: "desc",
    },
  });
}

module.exports = {
  store,
  findMany,
  findById,
  update,
  destroy,
  addProjectMember,
  getProjectMembers,
  findProjectMember,
  deleteProjectMemeber,
  searchUsersForProject,
  getProjectMemberForTeam
};
