const commentRepository = require("../repositories/CommentRepository");
const ApiError = require("../helpers/ApiError");

const store = async (input) => {
  return await commentRepository.create(input);
};

const findMany = async (input) => {
  const skip = (input.page - 1) * input.limit;
  const selectFields = [
    "id",
    "taskId",
    "userId",
    "content",
    "createdAt",
    {
      user: ["id", "firstName", "lastName"],
    },
  ];
console.log(selectFields, 'sssssssssssssss')
  const orderBy = [{createdAt: "desc"}];

  const options = {
    limit: input.limit,
    skip,
    selectFields,
    orderBy,
  };
  
  options.where = {
    taskId: parseInt(input.taskId),
  };
  
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
