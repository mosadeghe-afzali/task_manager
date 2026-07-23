const { validationResult } = require("express-validator");
const userService = require('../services/UserService')

const index = async (req, res) => {
  const users = await userService.findMany();

  return res.status(200).json({
    success: true,
    message: "درخواست با موفقیت انجام شد.",
    data: users,
  });
}

module.exports = {
  index,
  
}