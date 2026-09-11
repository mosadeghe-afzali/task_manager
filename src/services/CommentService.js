const commentRepository = require("../repositories/CommentRepository");
const ApiError = require("../helpers/ApiError");

const store = async (input) => {
  return await commentRepository.create(input);
};

const findMany = async (input) => {
  const skip = (input.page - 1) * input.limit;
  const selectFields = [
    "id",
    "issueNumber",
    "title",
    "priority",
    "dueDate",
    "startDate",
    "completedAt",
    "createdAt",
    {
      status: ["id", "name", "color"],
    },
    {
      assignee: ["id", "firstName", "lastName"],
    },
    {
      _count: ["comments", "children"],
    },
  ];
  const orderBy = [
    { statusId: 'asc' },
    { position: 'asc' }
  ];

  const options = {
    limit: input.limit,
    skip,
    selectFields,
    orderBy
  };
  if(input.projectId) {
    options.where = {
      projectId: parseInt(input.projectId)
    }
  }
  
  console.log(options, 'opptionssssssssss')

  return await commentRepository.findMany(options);
};

const findById = async (commentId) => {
  return await commentRepository.findById(commentId);
};

const update = async (commentId, data) => {
  return await commentRepository.update(commentId, data);
};

const destroy = async (commentId) => {
  return await commentRepository.delete(commentId);
};



module.exports = {
  store,
  findMany,
  findById,
  update,
  destroy,
};
